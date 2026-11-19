import React from 'react';
import { Sun, Moon, BookOpen, Layers, MessageSquareWarning, MapPin, Volume2, VolumeX } from 'lucide-react';
import sound, { useSoundPreference } from '../services/sound';

export function Navbar({ theme, toggleTheme, activeView, setActiveView }) {
  const { isSoundEnabled, toggleSound, soundPack, setSoundPack } = useSoundPreference();

  const handleNav = (view) => {
    sound.select();
    setActiveView(view);
  };

  const handleToggleTheme = () => {
    sound.toggle(theme === 'dark');
    toggleTheme();
  };

  const handleCyclePack = (e) => {
    e.preventDefault();
    const nextPack = soundPack === 'scifi' ? 'glass' : soundPack === 'glass' ? 'minimal' : 'scifi';
    setSoundPack(nextPack);
    sound.press();
  };

  return (
    <header className="navbar">
      <div 
        className="brand-container" 
        onClick={() => { sound.press(); setActiveView('gallery'); }}
        onMouseEnter={() => sound.hover()}
      >
        <div className="brand-logo">
          <Layers size={22} />
        </div>
        <div>
          <h1 className="brand-title gradient-text" style={{ fontSize: '1.4rem', lineHeight: 1.1 }}>
            Master Patterns
          </h1>
          <span className="brand-subtitle" style={{ fontSize: '0.72rem', color: 'var(--text-secondary)', fontWeight: 500 }}>
            CS Pattern Laboratory
          </span>
        </div>
      </div>

      <div className="nav-actions">
        <button 
          className={`btn ${activeView === 'gallery' ? 'btn-primary' : ''}`}
          onClick={() => handleNav('gallery')}
          onMouseEnter={() => sound.hover()}
          title="Catalog"
        >
          <BookOpen size={16} />
          <span className="nav-btn-text">Catalog</span>
        </button>

        <button 
          className={`btn ${activeView === 'sitemap' ? 'btn-primary' : ''}`}
          onClick={() => handleNav('sitemap')}
          onMouseEnter={() => sound.hover()}
          title="Platform Sitemap & Architecture"
        >
          <MapPin size={16} />
          <span className="nav-btn-text">Sitemap</span>
        </button>

        <button 
          className={`btn ${activeView === 'report' ? 'btn-primary' : ''}`}
          onClick={() => handleNav('report')}
          onMouseEnter={() => sound.hover()}
          title="Report an Error or Feedback"
        >
          <MessageSquareWarning size={16} />
          <span className="nav-btn-text">Report / Feedback</span>
        </button>

        <button 
          className="btn btn-icon"
          onClick={handleToggleTheme}
          onMouseEnter={() => sound.hover()}
          title={`Switch to ${theme === 'dark' ? 'Light' : 'Dark'} Mode`}
        >
          {theme === 'dark' ? <Sun size={18} color="#f59e0b" /> : <Moon size={18} color="#6366f1" />}
        </button>

        <button 
          className="btn btn-icon"
          onClick={toggleSound}
          onContextMenu={handleCyclePack}
          onMouseEnter={() => sound.hover()}
          title={isSoundEnabled ? `Sound Active: ${soundPack.toUpperCase()} — Right-click to switch sound pack` : "Enable sound effects"}
          aria-label={isSoundEnabled ? "Mute sound effects" : "Enable sound effects"}
        >
          {isSoundEnabled ? <Volume2 size={18} color="var(--accent-cyan)" /> : <VolumeX size={18} color="var(--text-muted)" />}
        </button>
      </div>
    </header>
  );
}


