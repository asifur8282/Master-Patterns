import React from 'react';
import { Plus, Minus, Sliders, Type, Hash } from 'lucide-react';

export function PatternControls({
  rows,
  setRows,
  spacePadding,
  setSpacePadding,
  symbol,
  setSymbol,
  defaultSymbol = '*'
}) {
  const quickSymbols = ['*', '%', '#', '@', '$', '🐱', '★', '&', 'A'];

  return (
    <div className="glass-card controls-card">
      <h3 className="controls-title">
        <Sliders size={20} />
        Pattern Controls & Customization
      </h3>

      {/* 4 Required Quick Action Buttons */}
      <div className="control-group">
        <label className="control-label">Quick Actions (Rows & Spacing)</label>
        <div className="quick-btn-grid">
          <button 
            className="btn" 
            onClick={() => setRows((r) => Math.min(25, r + 1))}
            title="Increase number of rows by 1"
          >
            <Plus size={16} color="var(--accent-emerald)" />
            Increase Rows
          </button>
          
          <button 
            className="btn" 
            onClick={() => setRows((r) => Math.max(1, r - 1))}
            title="Decrease number of rows by 1"
          >
            <Minus size={16} color="var(--accent-amber)" />
            Decrease Rows
          </button>

          <button 
            className="btn" 
            onClick={() => setSpacePadding((s) => Math.min(5, s + 1))}
            title="Increase spacing padding"
          >
            <Plus size={16} color="var(--accent-cyan)" />
            Increase Space
          </button>

          <button 
            className="btn" 
            onClick={() => setSpacePadding((s) => Math.max(0, s - 1))}
            title="Decrease spacing padding"
          >
            <Minus size={16} color="var(--accent-purple)" />
            Decrease Space
          </button>
        </div>
      </div>

      {/* Direct Row Count Input */}
      <div className="control-group">
        <label className="control-label" style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
          <Hash size={16} />
          Number of Rows (Direct Input)
        </label>
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
          <input
            type="number"
            min="1"
            max="30"
            className="custom-input"
            value={rows}
            onChange={(e) => {
              const val = parseInt(e.target.value, 10);
              if (!isNaN(val)) setRows(Math.max(1, Math.min(30, val)));
            }}
          />
          <input
            type="range"
            min="1"
            max="25"
            value={rows}
            onChange={(e) => setRows(parseInt(e.target.value, 10))}
            style={{ flexGrow: 1, accentColor: 'var(--accent-indigo)', cursor: 'pointer' }}
          />
        </div>
      </div>

      {/* Change your Symbol Section */}
      <div className="control-group" style={{ marginTop: '20px' }}>
        <label className="control-label" style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
          <Type size={16} />
          Change your Symbol
        </label>
        <input
          type="text"
          className="custom-input"
          placeholder="Enter custom character (e.g. %, #, @, A, 🐱)..."
          maxLength={6}
          value={symbol}
          onChange={(e) => setSymbol(e.target.value)}
          onBlur={() => {
            if (!symbol || symbol.trim() === '') {
              setSymbol(defaultSymbol);
            }
          }}
        />

        {/* Quick Symbol Chips */}
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px', marginTop: '10px' }}>
          {quickSymbols.map((sym) => (
            <button
              key={sym}
              className={`pill ${symbol === sym ? 'active' : ''}`}
              style={{ padding: '4px 12px', fontSize: '0.85rem' }}
              onClick={() => setSymbol(sym)}
            >
              {sym}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
