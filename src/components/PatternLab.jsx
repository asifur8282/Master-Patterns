import React, { useState, useEffect } from 'react';
import { ArrowLeft, Flag } from 'lucide-react';
import { PatternControls } from './PatternControls';
import { PatternOutput } from './PatternOutput';
import { CodeViewer } from './CodeViewer';
import { StepVisualizer } from './StepVisualizer';

export function PatternLab({ pattern, onBack, onRequestReport }) {
  const [rows, setRows] = useState(pattern.defaultRows || 5);
  const [spacePadding, setSpacePadding] = useState(pattern.defaultSpaces || 1);
  const [symbol, setSymbol] = useState(pattern.defaultSymbol || '*');

  useEffect(() => {
    setRows(pattern.defaultRows || 5);
    setSpacePadding(pattern.defaultSpaces || 1);
    setSymbol(pattern.defaultSymbol || '*');
  }, [pattern.id]);

  const activeSymbol = (symbol !== undefined && symbol !== null && symbol !== '') 
    ? symbol 
    : (pattern.defaultSymbol || '*');

  const output = pattern.generateOutput(rows, spacePadding, activeSymbol);

  return (
    <div className="lab-container">
      {/* Navigation & Header with Flex Wrap to Prevent Overflow */}
      <div className="lab-header">
        <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
          <button className="btn btn-sm" onClick={onBack}>
            <ArrowLeft size={16} />
            Back to Pattern Catalog
          </button>
          
          {onRequestReport && (
            <button 
              className="btn btn-sm"
              onClick={() => onRequestReport(pattern)}
              style={{ background: 'rgba(239, 68, 68, 0.12)', color: '#f87171', borderColor: 'rgba(239, 68, 68, 0.3)' }}
              title="Report an error or broken pattern"
            >
              <Flag size={14} />
              Report Issue
            </button>
          )}
        </div>

        <div style={{ display: 'flex', alignItems: 'center', gap: '8px', flexWrap: 'wrap', maxWidth: '100%', minWidth: 0 }}>
          <span className="badge badge-indigo">{pattern.id}</span>
          <h2 style={{ fontSize: '1.4rem', wordBreak: 'break-word', minWidth: 0 }}>{pattern.name}</h2>
          <span className="badge badge-cyan">{pattern.category}</span>
        </div>
      </div>


      <p style={{ color: 'var(--text-secondary)', marginBottom: '20px', fontSize: '0.95rem', wordBreak: 'break-word' }}>
        {pattern.description}
      </p>

      {/* Main Grid Workspace */}
      <div className="lab-grid">
        {/* Left Column: Visual Canvas & Controls */}
        <div style={{ minWidth: 0, width: '100%' }}>
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
        <div style={{ minWidth: 0, width: '100%' }}>
          <CodeViewer
            patternId={pattern.id}
            rows={rows}
            spacePadding={spacePadding}
            symbol={activeSymbol}
          />
        </div>
      </div>

      {/* Bottom Step Visualizer */}
      <div style={{ minWidth: 0, width: '100%' }}>
        <StepVisualizer
          pattern={pattern}
          rows={rows}
          spacePadding={spacePadding}
          symbol={activeSymbol}
        />
      </div>
    </div>
  );
}
