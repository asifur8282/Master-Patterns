import React, { useState, useEffect } from 'react';
import { ArrowLeft, Sparkles, Code2, Sliders } from 'lucide-react';
import { PatternControls } from './PatternControls';
import { PatternOutput } from './PatternOutput';
import { CodeViewer } from './CodeViewer';
import { StepVisualizer } from './StepVisualizer';

export function PatternLab({ pattern, onBack }) {
  const [rows, setRows] = useState(pattern.defaultRows || 5);
  const [spacePadding, setSpacePadding] = useState(pattern.defaultSpaces || 1);
  const [symbol, setSymbol] = useState(pattern.defaultSymbol || '*');

  useEffect(() => {
    setRows(pattern.defaultRows || 5);
    setSpacePadding(pattern.defaultSpaces || 1);
    setSymbol(pattern.defaultSymbol || '*');
  }, [pattern.id]);

  // Fallback to pattern default symbol if user is mid-typing empty string
  const activeSymbol = (symbol !== undefined && symbol !== null && symbol !== '') 
    ? symbol 
    : (pattern.defaultSymbol || '*');

  // Generate rendered string output
  const output = pattern.generateOutput(rows, spacePadding, activeSymbol);

  return (
    <div className="lab-container">
      {/* Navigation & Header */}
      <div className="lab-header">
        <button className="btn" onClick={onBack}>
          <ArrowLeft size={16} />
          Back to Pattern Catalog
        </button>

        <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
          <span className="badge badge-indigo" style={{ fontSize: '0.9rem', padding: '6px 14px' }}>
            {pattern.id}
          </span>
          <h2 style={{ fontSize: '1.8rem' }}>{pattern.name}</h2>
          <span className="badge badge-cyan">{pattern.category}</span>
        </div>
      </div>

      <p style={{ color: 'var(--text-secondary)', marginBottom: '24px', fontSize: '1.05rem' }}>
        {pattern.description}
      </p>

      {/* Main Grid Workspace */}
      <div className="lab-grid">
        {/* Left Column: Visual Canvas & Controls */}
        <div>
          <PatternOutput output={output} rows={rows} symbol={activeSymbol} />
          
          <PatternControls
            rows={rows}
            setRows={setRows}
            spacePadding={spacePadding}
            setSpacePadding={setSpacePadding}
            symbol={symbol}
            setSymbol={setSymbol}
            defaultSymbol={pattern.defaultSymbol || '*'}
            isSymbolCustomizable={pattern.isSymbolCustomizable}
          />
        </div>

        {/* Right Column: Code & Interactive Line Explanation */}
        <div>
          <CodeViewer
            patternId={pattern.id}
            rows={rows}
            spacePadding={spacePadding}
            symbol={activeSymbol}
          />
        </div>
      </div>

      {/* Bottom Step-by-Step Animation Debugger */}
      <StepVisualizer
        pattern={pattern}
        rows={rows}
        spacePadding={spacePadding}
        symbol={activeSymbol}
      />
    </div>
  );
}
