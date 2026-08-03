import React, { useState, useEffect } from 'react';
import { Navbar } from './components/Navbar';
import { PatternGallery } from './components/PatternGallery';
import { PatternLab } from './components/PatternLab';
import { PATTERNS } from './data/patterns';

export function App() {
  const [activeView, setActiveView] = useState('gallery'); // 'gallery' | 'lab'
  const [selectedPattern, setSelectedPattern] = useState(PATTERNS[0]);
  const [theme, setTheme] = useState('dark');

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
  }, [theme]);

  const toggleTheme = () => {
    setTheme((prev) => (prev === 'dark' ? 'light' : 'dark'));
  };

  const handleSelectPattern = (pattern) => {
    setSelectedPattern(pattern);
    setActiveView('lab');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="app-container" data-theme={theme}>
      <Navbar
        theme={theme}
        toggleTheme={toggleTheme}
        activeView={activeView}
        setActiveView={setActiveView}
      />

      <main>
        {activeView === 'gallery' ? (
          <PatternGallery
            patterns={PATTERNS}
            onSelectPattern={handleSelectPattern}
          />
        ) : (
          <PatternLab
            pattern={selectedPattern}
            onBack={() => setActiveView('gallery')}
          />
        )}
      </main>

      <footer style={{
        textAlign: 'center',
        padding: '32px 20px',
        borderTop: '1px solid var(--border-color)',
        marginTop: '60px',
        color: 'var(--text-muted)',
        fontSize: '0.9rem'
      }}>
        <p>Master Patterns - Modern CS Pattern Learning Platform & Visualizer</p>
      </footer>
    </div>
  );
}

export default App;
