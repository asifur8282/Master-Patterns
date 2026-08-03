import React, { useState } from 'react';
import { generateCode } from '../data/codeGenerators';
import { Code2, Copy, Check, Info, Sparkles } from 'lucide-react';

export function CodeViewer({ patternId, rows, spacePadding, symbol }) {
  const [lang, setLang] = useState('c');
  const [activeLineNumber, setActiveLineNumber] = useState(5); // Default highlight on for loop
  const [copied, setCopied] = useState(false);

  const languages = [
    { id: 'c', label: 'C' },
    { id: 'cpp', label: 'C++' },
    { id: 'java', label: 'Java' },
    { id: 'python', label: 'Python' },
    { id: 'js', label: 'JavaScript' }
  ];

  const codeData = generateCode(patternId, rows, spacePadding, symbol, lang);
  const activeLineObj = codeData.find((l) => l.lineNumber === activeLineNumber) || codeData[0];

  const handleCopyCode = () => {
    const rawCode = codeData.map((l) => l.code).join('\n');
    navigator.clipboard.writeText(rawCode);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="glass-card code-card">
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '16px' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          <Code2 size={20} color="var(--accent-indigo)" />
          <h3 style={{ fontSize: '1.1rem' }}>Get Code & Interactive Explanation</h3>
        </div>

        <button className="btn btn-sm" onClick={handleCopyCode}>
          {copied ? <Check size={14} color="var(--accent-emerald)" /> : <Copy size={14} />}
          {copied ? 'Copied Code!' : 'Copy Code'}
        </button>
      </div>

      {/* Language Switcher Tabs */}
      <div className="lang-tabs">
        {languages.map((l) => (
          <button
            key={l.id}
            className={`lang-tab ${lang === l.id ? 'active' : ''}`}
            onClick={() => {
              setLang(l.id);
              setActiveLineNumber(4); // Reset active line
            }}
          >
            {l.label}
          </button>
        ))}
      </div>

      <p style={{ fontSize: '0.82rem', color: 'var(--text-muted)', marginBottom: '12px' }}>
        💡 <strong>Click on any line of code below</strong> to see an instant explanation of how it connects to the pattern!
      </p>

      {/* Code Container */}
      <div className="code-container">
        {codeData.map((line) => {
          const isSelected = activeLineNumber === line.lineNumber;
          return (
            <div
              key={line.lineNumber}
              className={`code-line ${isSelected ? 'active-line' : ''}`}
              onClick={() => setActiveLineNumber(line.lineNumber)}
            >
              <span className="line-num">{line.lineNumber}</span>
              <span className="line-text">{line.code}</span>
              {line.highlightType !== 'normal' && (
                <span className="line-badge">{line.highlightType}</span>
              )}
            </div>
          );
        })}
      </div>

      {/* Interactive Explanation Box */}
      {activeLineObj && (
        <div className="explanation-box">
          <div className="explanation-header">
            <Info size={18} />
            Line {activeLineObj.lineNumber} Explanation & Logic Connection
          </div>
          <div style={{ fontFamily: 'var(--font-mono)', fontSize: '0.85rem', color: 'var(--accent-cyan)', marginBottom: '8px' }}>
            <code>{activeLineObj.code}</code>
          </div>
          <div className="explanation-text">
            {activeLineObj.explanation}
          </div>
        </div>
      )}
    </div>
  );
}
