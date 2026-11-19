import { createUISFX } from 'uisfx';
import { useState, useEffect } from 'react';

const STORAGE_KEY_ENABLED = 'master_patterns_sound_enabled';
const STORAGE_KEY_VOLUME = 'master_patterns_sound_volume';
const STORAGE_KEY_PACK = 'master_patterns_sound_pack';
const DEFAULT_PACK = 'scifi'; // Crisp, holographic pings with high harmonic clarity across all laptop speakers

let player = null;
let currentPack = DEFAULT_PACK;
let isUnlocked = false;
let isScrolling = false;
let scrollTimeout = null;
let lastHoverTime = 0;
let lastPressTime = 0;
let lastSelectTime = 0;
let currentHoveredElement = null;
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
  if (typeof window === 'undefined') return { enabled: true, volume: 1.0, pack: DEFAULT_PACK };
  try {
    const savedEnabled = localStorage.getItem(STORAGE_KEY_ENABLED);
    const enabled = savedEnabled !== null ? savedEnabled === 'true' : true;
    const savedVolume = localStorage.getItem(STORAGE_KEY_VOLUME);
    const volume = savedVolume !== null ? parseFloat(savedVolume) : 1.0;
    const savedPack = localStorage.getItem(STORAGE_KEY_PACK);
    const pack = savedPack || DEFAULT_PACK;
    return { enabled, volume, pack };
  } catch {
    return { enabled: true, volume: 1.0, pack: DEFAULT_PACK };
  }
}

function attachWindowListeners() {
  if (typeof window === 'undefined') return;
  if (window._sound_listeners_attached) return;
  window._sound_listeners_attached = true;

  // Unlock Web Audio synchronously on genuine user gesture
  const unlockAudio = () => {
    const p = getPlayer();
    if (p) {
      p.unlock().then((ok) => {
        if (ok) isUnlocked = true;
      }).catch(() => {});
    }
  };

  ['pointerdown', 'keydown', 'click', 'touchstart'].forEach((eventType) => {
    window.addEventListener(eventType, unlockAudio, { capture: true, passive: true });
  });

  // Track scrolling to suppress passive hover noises while scrolling
  window.addEventListener('scroll', () => {
    isScrolling = true;
    if (scrollTimeout) clearTimeout(scrollTimeout);
    scrollTimeout = setTimeout(() => {
      isScrolling = false;
    }, 70);
  }, { passive: true });

  // Centralized hover delegation across all interactive buttons, cards, pills, and tabs
  window.addEventListener('pointerover', (e) => {
    if (e.pointerType === 'touch') return;
    if (!(e.target instanceof Element)) return;

    const interactive = e.target.closest('button, a, .pill, .lang-tab, .pattern-card, .clickable, .option-card, .symbol-chip, .btn');
    if (!interactive) {
      currentHoveredElement = null;
      return;
    }

    if (currentHoveredElement === interactive) return;
    currentHoveredElement = interactive;

    sound.hover();
  }, { capture: true, passive: true });
}

function getPlayer() {
  if (typeof window === 'undefined') return null;
  attachWindowListeners();
  if (player) return player;

  const { enabled, volume, pack } = getStoredPreference();
  currentPack = pack;

  player = createUISFX({
    pack: currentPack,
    volume,
    enabled,
  });

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
    const p = getPlayer();
    if (p) {
      p.setPack(pack);
    }
    notifyListeners({ enabled: this.isEnabled(), volume: this.getVolume(), pack });
  },

  getPlayer() {
    return getPlayer();
  },

  isUnlocked() {
    return isUnlocked;
  },

  async unlock() {
    if (typeof window === 'undefined') return false;
    const p = getPlayer();
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
    lastPressTime = 0;
    lastSelectTime = 0;
    currentHoveredElement = null;
    if (typeof window !== 'undefined') delete window._sound_listeners_attached;
    activeLoops.clear();
  },

  isEnabled() {
    if (typeof window === 'undefined') return false;
    const { enabled } = getStoredPreference();
    return enabled;
  },

  setEnabled(enabled) {
    if (typeof window === 'undefined') return;
    const p = getPlayer();
    if (p) {
      if (!enabled) {
        this.stopAllLoops();
        p.stopAll();
        p.setEnabled(false);
      } else {
        p.setEnabled(true);
      }
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
    if (typeof window === 'undefined') return 1.0;
    const { volume } = getStoredPreference();
    return volume;
  },

  setVolume(volume) {
    if (typeof window === 'undefined') return;
    const clamped = Math.max(0, Math.min(1, volume));
    const p = getPlayer();
    if (p) {
      p.setVolume(clamped);
    }
    try {
      localStorage.setItem(STORAGE_KEY_VOLUME, String(clamped));
    } catch {}
    notifyListeners({ enabled: this.isEnabled(), volume: clamped, pack: this.getPack() });
  },

  play(cue, options = {}) {
    if (typeof window === 'undefined') return null;
    const { enabled } = getStoredPreference();
    if (!enabled) return null;

    const p = getPlayer();
    if (!p) return null;

    try {
      const playing = p.play(cue, options);
      if (playing) {
        isUnlocked = true;
      }
      return playing;
    } catch {
      return null;
    }
  },

  press(options = {}) {
    const now = Date.now();
    if (now - lastPressTime < 30) return null;
    lastPressTime = now;
    return this.play('press', { volume: 0.95, ...options });
  },

  hover(options = {}) {
    if (typeof window === 'undefined' || isScrolling) return null;

    try {
      const isFine = window.matchMedia('(any-pointer: fine)').matches || 
                     window.matchMedia('(pointer: fine)').matches;
      if (!isFine) return null;
    } catch {}

    const now = Date.now();
    if (now - lastHoverTime < 50) return null;
    lastHoverTime = now;

    return this.play('hover', { volume: 0.70, ...options });
  },

  toggle(state, options = {}) {
    return this.play(state ? 'toggle-on' : 'toggle-off', { volume: 0.95, ...options });
  },

  select(options = {}) {
    const now = Date.now();
    if (now - lastSelectTime < 30) return null;
    lastSelectTime = now;
    return this.play('select', { volume: 0.90, ...options });
  },

  copy(options = {}) {
    return this.play('copy', { volume: 0.95, ...options });
  },

  success(options = {}) {
    return this.play('success', { volume: 1.0, isAsync: true, ...options });
  },

  error(options = {}) {
    return this.play('error', { volume: 1.0, isAsync: true, ...options });
  },

  step(options = {}) {
    return this.play('progress-step', { volume: 0.85, ...options });
  },

  playPause(isPlaying, options = {}) {
    return this.play(isPlaying ? 'play' : 'pause', { volume: 0.90, ...options });
  },

  startLoop(id, cue = 'processing', options = {}) {
    if (typeof window === 'undefined') return null;
    if (activeLoops.has(id)) {
      return activeLoops.get(id);
    }
    const { enabled } = getStoredPreference();
    if (!enabled) return null;

    const handle = this.play(cue, { loop: true, volume: 0.60, isAsync: true, ...options });
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
    }
    isUnlocked = false;
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
