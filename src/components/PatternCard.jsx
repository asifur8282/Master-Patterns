import React from 'react';
import { Play, Sparkles } from 'lucide-react';

export function PatternCard({ pattern, onSelect }) {
  // Generate mini output preview (3-4 rows)
  const miniOutput = pattern.generateOutput(4, 1, pattern.defaultSymbol);

  const getCategoryBadgeClass = (cat) => {
    switch (cat) {
      case 'Star': return 'badge-cyan';
      case 'Number': return 'badge-emerald';
      case 'Character': return 'badge-amber';
      default: return 'badge-indigo';
    }
  };

  return (
    <div className="glass-card pattern-card">
      <div>
        <div className="card-header">
          <span className="badge badge-indigo">{pattern.id}</span>
          <span className={`badge ${getCategoryBadgeClass(pattern.category)}`}>
            {pattern.category}
          </span>
        </div>

        <h2 className="card-title">{pattern.name}</h2>
        <p className="card-desc">{pattern.description}</p>

        <div className="mini-preview">
          <code>{miniOutput}</code>
        </div>
      </div>

      <button className="btn btn-primary" style={{ width: '100%' }} onClick={() => onSelect(pattern)}>
        <Play size={16} fill="currentColor" />
        Try This Pattern
      </button>
    </div>
  );
}
