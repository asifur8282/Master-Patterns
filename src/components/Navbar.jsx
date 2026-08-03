import React from 'react';
import { Sparkles, Sun, Moon, BookOpen, Layers } from 'lucide-react';

export function Navbar({ theme, toggleTheme, activeView, setActiveView }) {
  return (
    <header className="navbar">
      <div className="brand-container" onClick={() => setActiveView('gallery')}>
        <div className="brand-logo">
          <Layers size={24} />
        </div>
        <div>
          <h1 className="brand-title gradient-text" style={{ fontSize: '1.5rem', lineHeight: 1.1 }}>
            Master Patterns
          </h1>
          <span style={{ fontSize: '0.75rem', color: 'var(--text-secondary)', fontWeight: 500 }}>
            CS Pattern Laboratory
          </span>
        </div>
      </div>

      <div className="nav-actions">
        <button 
          className={`btn ${activeView === 'gallery' ? 'btn-primary' : ''}`}
          onClick={() => setActiveView('gallery')}
        >
          <BookOpen size={16} />
          Pattern Catalog
        </button>

        <button 
          className="btn btn-icon"
          onClick={toggleTheme}
          title={`Switch to ${theme === 'dark' ? 'Light' : 'Dark'} Mode`}
        >
          {theme === 'dark' ? <Sun size={20} color="#f59e0b" /> : <Moon size={20} color="#6366f1" />}
        </button>
      </div>
    </header>
  );
}
