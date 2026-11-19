import { createUISFX } from 'uisfx';
import { useState, useEffect } from 'react';

const STORAGE_KEY_ENABLED = 'master_patterns_sound_enabled';
const STORAGE_KEY_VOLUME = 'master_patterns_sound_volume';
const STORAGE_KEY_PACK = 'master_patterns_sound_pack';
const DEFAULT_PACK = 'mechanical';

let player = null;
let currentPack = DEFAULT_PACK;
let isUnlocked = false;
let isScrolling = false;
let scrollTimeout = null;
let lastHoverTime = 0;
const activeLoops = new Map();
const listeners = new Set();

function notifyListeners(state) {
  listeners.forEach((listener) => {
    try {
      listener(state);
    } catch (e) {
      console.error('Error in sound listener:', e);
    }
  });
}

function getStoredPreference() {
  if (typeof window === 'undefined') return { enabled: true, volume: 0.9, pack: DEFAULT_PACK };
  try {
    const savedEnabled = localStorage.getItem(STORAGE_KEY_ENABLED);
    const enabled = savedEnabled !== null ? savedEnabled === 'true' : true;
    const savedVolume = localStorage.getItem(STORAGE_KEY_VOLUME);
    // Upgrade default to 0.9 if previously set to old low 0.5 default or unset
    const volume = (savedVolume !== null && parseFloat(savedVolume) > 0.5) ? parseFloat(savedVolume) : 0.9;
    const savedPack = localStorage.getItem(STORAGE_KEY_PACK);
    const pack = savedPack || DEFAULT_PACK;
    return { enabled, volume, pack };
  } catch {
    return { enabled: true, volume: 0.9, pack: DEFAULT_PACK };
  }
}

function initPlayer() {
  if (typeof window === 'undefined') return null;
  if (player) return player;

  const { enabled, volume, pack } = getStoredPreference();
  if (!currentPack) {
    currentPack = pack;
  }

  player = createUISFX({
    pack: currentPack,
    volume,
    enabled,
  });

  // Track scroll activity ONLY to suppress passive hover noises while scrolling
  window.addEventListener('scroll', () => {
    isScrolling = true;
    if (scrollTimeout) clearTimeout(scrollTimeout);
    scrollTimeout = setTimeout(() => {
      isScrolling = false;
    }, 70);
  }, { passive: true });

  // Unlock Web Audio on genuine user interactions
  const unlockAudio = () => {
    isUnlocked = true;
    if (player) {
      player.unlock().catch(() => {});
    }
  };

  window.addEventListener('pointerdown', unlockAudio, { passive: true });
  window.addEventListener('click', unlockAudio, { passive: true });
  window.addEventListener('keydown', unlockAudio, { passive: true });

  return player;
}

export const sound = {
  getPack() {
    return currentPack;
  },

  setPack(pack) {
    currentPack = pack;
    try {
      localStorage.setItem(STORAGE_KEY_PACK, pack);
    } catch {}
    const p = initPlayer();
    if (p) {
      p.setPack(pack);
    }
    notifyListeners({ enabled: this.isEnabled(), volume: this.getVolume(), pack });
  },

  getPlayer() {
    return initPlayer();
  },

  isUnlocked() {
    return isUnlocked;
  },

  async unlock() {
    if (typeof window === 'undefined') return false;
    const p = initPlayer();
    if (!p) return false;
    try {
      const ok = await p.unlock();
      if (ok) isUnlocked = true;
      return ok;
    } catch {
      return false;
    }
  },

  _resetForTesting(forcedPack = DEFAULT_PACK) {
    this.stopAllLoops();
    if (player) {
      try {
        player.stopAll();
      } catch {}
    }
    player = null;
    currentPack = forcedPack;
    isUnlocked = false;
    isScrolling = false;
    lastHoverTime = 0;
    activeLoops.clear();
  },

  isEnabled() {
    if (typeof window === 'undefined') return false;
    const p = initPlayer();
    return p ? p.isEnabled() : false;
  },

  setEnabled(enabled) {
    if (typeof window === 'undefined') return;
    const p = initPlayer();
    if (!p) return;

    if (!enabled) {
      // Stop all active loops and clear retained handles before disabling
      this.stopAllLoops();
      p.stopAll();
      p.setEnabled(false);
    } else {
      p.setEnabled(true);
    }

    try {
      localStorage.setItem(STORAGE_KEY_ENABLED, String(enabled));
    } catch {}

    notifyListeners({ enabled, volume: this.getVolume(), pack: this.getPack() });
  },

  toggleEnabled() {
    const nextState = !this.isEnabled();
    if (nextState) {
      this.setEnabled(true);
      this.toggle(true);
    } else {
      this.toggle(false);
      this.setEnabled(false);
    }
    return nextState;
  },

  getVolume() {
    if (typeof window === 'undefined') return 0.9;
    const p = initPlayer();
    return p ? p.getVolume() : 0.9;
  },

  setVolume(volume) {
    if (typeof window === 'undefined') return;
    const p = initPlayer();
    if (!p) return;
    const clamped = Math.max(0, Math.min(1, volume));
    p.setVolume(clamped);
    try {
      localStorage.setItem(STORAGE_KEY_VOLUME, String(clamped));
    } catch {}
    notifyListeners({ enabled: this.isEnabled(), volume: clamped, pack: this.getPack() });
  },

  play(cue, options = {}) {
    if (typeof window === 'undefined') return null;
    const p = initPlayer();
    if (!p || !p.isEnabled()) return null;

    try {
      // Ensure Web Audio is active on genuine interaction calls
      if (!isUnlocked) {
        isUnlocked = true;
        p.unlock().catch(() => {});
      }

      const playing = p.play(cue, options);
      return playing;
    } catch {
      return null;
    }
  },

  // Semantic interaction helpers (calibrated for clear, audible feedback)
  press(options = {}) {
    return this.play('press', { volume: 0.85, ...options });
  },

  hover(options = {}) {
    if (typeof window === 'undefined' || isScrolling) return null;
    // Strictly fine pointers only (no touch triggers)
    if (!window.matchMedia('(pointer: fine)').matches) return null;

    // Fast throttle (60ms) so deliberate sweeps across buttons are responsive
    const now = Date.now();
    if (now - lastHoverTime < 60) return null;
    lastHoverTime = now;

    return this.play('hover', { volume: 0.45, ...options });
  },

  toggle(state, options = {}) {
    return this.play(state ? 'toggle-on' : 'toggle-off', { volume: 0.85, ...options });
  },

  select(options = {}) {
    return this.play('select', { volume: 0.80, ...options });
  },

  copy(options = {}) {
    return this.play('copy', { volume: 0.85, ...options });
  },

  success(options = {}) {
    return this.play('success', { volume: 0.90, isAsync: true, ...options });
  },

  error(options = {}) {
    return this.play('error', { volume: 0.90, isAsync: true, ...options });
  },

  step(options = {}) {
    return this.play('progress-step', { volume: 0.75, ...options });
  },

  playPause(isPlaying, options = {}) {
    return this.play(isPlaying ? 'play' : 'pause', { volume: 0.80, ...options });
  },

  // Loop Management (idempotent start, strict cleanup)
  startLoop(id, cue = 'processing', options = {}) {
    if (typeof window === 'undefined') return null;
    if (activeLoops.has(id)) {
      return activeLoops.get(id);
    }
    const p = initPlayer();
    if (!p || !p.isEnabled()) return null;

    const handle = this.play(cue, { loop: true, volume: 0.55, isAsync: true, ...options });
    if (handle) {
      activeLoops.set(id, handle);
    }
    return handle;
  },

  stopLoop(id) {
    const handle = activeLoops.get(id);
    if (handle) {
      try {
        handle.stop();
      } catch {}
      activeLoops.delete(id);
    }
  },

  stopAllLoops() {
    activeLoops.forEach((handle) => {
      try {
        handle.stop();
      } catch {}
    });
    activeLoops.clear();
  },

  stopAll() {
    this.stopAllLoops();
    if (player) {
      try {
        player.stopAll();
      } catch {}
    }
  },

  async destroy() {
    this.stopAllLoops();
    if (player) {
      try {
        await player.destroy();
      } catch {}
      player = null;
      isUnlocked = false;
    }
  }
};

// React hook for reactive sound state & toggles
export function useSoundPreference() {
  const [soundState, setSoundState] = useState(() => ({
    enabled: sound.isEnabled(),
    volume: sound.getVolume(),
    pack: sound.getPack(),
  }));

  useEffect(() => {
    const update = (state) => setSoundState(state);
    listeners.add(update);
    setSoundState({
      enabled: sound.isEnabled(),
      volume: sound.getVolume(),
      pack: sound.getPack(),
    });
    return () => {
      listeners.delete(update);
    };
  }, []);

  return {
    isSoundEnabled: soundState.enabled,
    toggleSound: () => sound.toggleEnabled(),
    setSoundEnabled: (val) => sound.setEnabled(val),
    soundVolume: soundState.volume,
    setSoundVolume: (val) => sound.setVolume(val),
    soundPack: soundState.pack,
    setSoundPack: (pack) => sound.setPack(pack),
  };
}

export default sound;
