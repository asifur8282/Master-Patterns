import React, { useState, useEffect } from 'react';
import { Navbar } from './components/Navbar';
import { PatternGallery } from './components/PatternGallery';
import { PatternLab } from './components/PatternLab';
import { ReportForm } from './components/ReportForm';
import { PATTERNS } from './data/patterns';

export function App() {
  // Initialize view from URL path
  const getInitialView = () => {
    const path = window.location.pathname;
    if (path === '/report' || path === '/report/') {
      return 'report';
    }
    return 'gallery';
  };

  const [activeView, setActiveView] = useState(getInitialView); // 'gallery' | 'lab' | 'report'
  const [selectedPattern, setSelectedPattern] = useState(PATTERNS[0]);
  const [reportPattern, setReportPattern] = useState(null);
  const [theme, setTheme] = useState('dark');

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
  }, [theme]);

  // Handle browser back/forward buttons
  useEffect(() => {
    const handlePopState = () => {
      const path = window.location.pathname;
      if (path === '/report' || path === '/report/') {
        setActiveView('report');
      } else if (activeView === 'report') {
        setActiveView('gallery');
      }
    };

    window.addEventListener('popstate', handlePopState);
    return () => window.removeEventListener('popstate', handlePopState);
  }, [activeView]);

  const handleNavigate = (view) => {
    setActiveView(view);
    const targetPath = view === 'report' ? '/report' : '/';
    if (window.location.pathname !== targetPath) {
      window.history.pushState({}, '', targetPath);
    }
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const toggleTheme = () => {
    setTheme((prev) => (prev === 'dark' ? 'light' : 'dark'));
  };

  const handleSelectPattern = (pattern) => {
    setSelectedPattern(pattern);
    setActiveView('lab');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleRequestReportPattern = (pattern) => {
    setReportPattern(pattern);
    handleNavigate('report');
  };

  return (
    <div className="app-container" data-theme={theme}>
      <Navbar
        theme={theme}
        toggleTheme={toggleTheme}
        activeView={activeView}
        setActiveView={handleNavigate}
      />

      <main>
        {activeView === 'gallery' && (
          <PatternGallery
            patterns={PATTERNS}
            onSelectPattern={handleSelectPattern}
          />
        )}

        {activeView === 'lab' && (
          <PatternLab
            pattern={selectedPattern}
            onBack={() => handleNavigate('gallery')}
            onRequestReport={handleRequestReportPattern}
          />
        )}

        {activeView === 'report' && (
          <ReportForm
            initialPattern={reportPattern}
            onBack={() => handleNavigate('gallery')}
          />
        )}
      </main>

      <footer style={{
        textAlign: 'center',
        padding: '32px 20px',
        borderTop: '1px solid var(--border-color)',
        marginTop: '60px',
        color: 'var(--text-muted)',
        fontSize: '0.9rem',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        gap: '12px'
      }}>
        <p>Master Patterns - Modern CS Pattern Learning Platform & Visualizer</p>
        <div style={{ display: 'flex', gap: '16px', fontSize: '0.85rem' }}>
          <button 
            onClick={() => handleNavigate('gallery')}
            style={{ background: 'none', border: 'none', color: 'var(--accent-indigo)', cursor: 'pointer', textDecoration: 'underline' }}
          >
            Catalog
          </button>
          <span>•</span>
          <button 
            onClick={() => handleNavigate('report')}
            style={{ background: 'none', border: 'none', color: 'var(--accent-indigo)', cursor: 'pointer', textDecoration: 'underline' }}
          >
            Report an Error / Feedback
          </button>
        </div>
      </footer>
    </div>
  );
}

export default App;

