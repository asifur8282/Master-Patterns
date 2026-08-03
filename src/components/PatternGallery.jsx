import React, { useState } from 'react';
import { PatternCard } from './PatternCard';
import { Search, Terminal } from 'lucide-react';

export function PatternGallery({ patterns, onSelectPattern }) {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');

  const categories = ['All', 'Star', 'Number', 'Character', 'Pyramid', 'Advanced'];

  const filteredPatterns = patterns.filter((p) => {
    const matchesSearch = p.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
                          p.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          p.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === 'All' || p.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  return (
    <div className="gallery-container">
      <div className="hero-section">
        <h1 className="hero-title">
          Master <span className="gradient-text">Patterns</span>
        </h1>
        <p className="hero-subtitle">
          Master fundamental Computer Science nested-loop logic, star variations, numbers, and custom symbols visually with line-by-line interactive code breakdowns.
        </p>
      </div>

      <div className="filter-bar">
        <div className="search-input-wrapper">
          <Search className="search-icon" size={18} />
          <input
            type="text"
            className="search-input"
            placeholder="Search patterns (e.g. ast_001, Floyd)..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>

        <div className="category-pills">
          {categories.map((cat) => (
            <button
              key={cat}
              className={`pill ${selectedCategory === cat ? 'active' : ''}`}
              onClick={() => setSelectedCategory(cat)}
            >
              {cat === 'All' ? 'All Patterns' : `${cat} Patterns`}
            </button>
          ))}
        </div>
      </div>

      <div className="pattern-grid">
        {filteredPatterns.map((pattern) => (
          <PatternCard
            key={pattern.id}
            pattern={pattern}
            onSelect={onSelectPattern}
          />
        ))}

        {filteredPatterns.length === 0 && (
          <div style={{ gridColumn: '1 / -1', textAlign: 'center', padding: '60px 20px', color: 'var(--text-muted)' }}>
            <Terminal size={48} style={{ marginBottom: '12px', opacity: 0.5 }} />
            <h2 style={{ fontSize: '1.1rem' }}>No matching patterns found</h2>
            <p>Try searching for another term like "star", "pyramid", or "001".</p>
          </div>
        )}
      </div>
    </div>
  );
}
