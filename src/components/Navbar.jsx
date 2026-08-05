import React from 'react';
import { Sun, Moon, BookOpen, Layers, MessageSquareWarning, MapPin } from 'lucide-react';

export function Navbar({ theme, toggleTheme, activeView, setActiveView }) {
  return (
    <header className="navbar">
      <div className="brand-container" onClick={() => setActiveView('gallery')}>
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
          onClick={() => setActiveView('gallery')}
          title="Catalog"
        >
          <BookOpen size={16} />
          <span className="nav-btn-text">Catalog</span>
        </button>

        <button 
          className={`btn ${activeView === 'sitemap' ? 'btn-primary' : ''}`}
          onClick={() => setActiveView('sitemap')}
          title="Platform Sitemap & Architecture"
        >
          <MapPin size={16} />
          <span className="nav-btn-text">Sitemap</span>
        </button>

        <button 
          className={`btn ${activeView === 'report' ? 'btn-primary' : ''}`}
          onClick={() => setActiveView('report')}
          title="Report an Error or Feedback"
        >
          <MessageSquareWarning size={16} />
          <span className="nav-btn-text">Report / Feedback</span>
        </button>

        <button 
          className="btn btn-icon"
          onClick={toggleTheme}
          title={`Switch to ${theme === 'dark' ? 'Light' : 'Dark'} Mode`}
        >
          {theme === 'dark' ? <Sun size={18} color="#f59e0b" /> : <Moon size={18} color="#6366f1" />}
        </button>
      </div>
    </header>
  );
}


