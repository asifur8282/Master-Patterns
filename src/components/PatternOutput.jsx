import React, { useState } from 'react';
import { Terminal, Copy, Check, ZoomIn, ZoomOut } from 'lucide-react';

export function PatternOutput({ output, rows, symbol }) {
  const [copied, setCopied] = useState(false);
  const [fontSize, setFontSize] = useState(1.1); // rem

  const handleCopy = () => {
    navigator.clipboard.writeText(output);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="glass-card canvas-card">
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          <Terminal size={20} color="var(--accent-cyan)" />
          <h3 style={{ fontSize: '1.1rem' }}>Live Visual Canvas</h3>
        </div>

        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          <button 
            className="btn btn-sm btn-icon" 
            onClick={() => setFontSize((s) => Math.max(0.75, s - 0.1))}
            title="Zoom Out Font"
          >
            <ZoomOut size={16} />
          </button>
          <button 
            className="btn btn-sm btn-icon" 
            onClick={() => setFontSize((s) => Math.min(1.8, s + 0.1))}
            title="Zoom In Font"
          >
            <ZoomIn size={16} />
          </button>
          <button className="btn btn-sm" onClick={handleCopy}>
            {copied ? <Check size={14} color="var(--accent-emerald)" /> : <Copy size={14} />}
            {copied ? 'Copied!' : 'Copy Output'}
          </button>
        </div>
      </div>

      <div className="canvas-terminal" style={{ fontSize: `${fontSize}rem` }}>
        <code>{output}</code>
      </div>
      
      <div style={{ marginTop: '12px', display: 'flex', gap: '16px', fontSize: '0.8rem', color: 'var(--text-muted)' }}>
        <span>Total Rows: {rows}</span>
        <span>Active Symbol: '{symbol}'</span>
        <span>Output Length: {output.length} chars</span>
      </div>
    </div>
  );
}
