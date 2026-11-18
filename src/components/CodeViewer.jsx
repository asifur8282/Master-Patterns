import React, { useState, useEffect, useRef } from 'react';
import { generateCode } from '../data/codeGenerators';
import { 
  Code2, 
  Copy, 
  Check, 
  Info, 
  Download, 
  Play, 
  RotateCcw, 
  Terminal, 
  AlertCircle, 
  Sparkles,
  Loader2,
  Trash2
} from 'lucide-react';

export function CodeViewer({ patternId, rows, spacePadding, symbol }) {
  const [lang, setLang] = useState('c');
  const [activeLineNumber, setActiveLineNumber] = useState(3);
  const [copied, setCopied] = useState(false);
  const [downloaded, setDownloaded] = useState(false);

  // Playground Sandbox State
  const [isPlaygroundMode, setIsPlaygroundMode] = useState(false);
  const [userCode, setUserCode] = useState('');
  const [executionOutput, setExecutionOutput] = useState(null);
  const [executionError, setExecutionError] = useState(null);
  const [executionTime, setExecutionTime] = useState(null);
  const [isRunning, setIsRunning] = useState(false);

  const textareaRef = useRef(null);
  const lineNumbersRef = useRef(null);

  const languages = [
    { id: 'c', label: 'C' },
    { id: 'cpp', label: 'C++' },
    { id: 'java', label: 'Java' },
    { id: 'python', label: 'Python' },
    { id: 'js', label: 'JavaScript' }
  ];

  const codeData = generateCode(patternId, rows, spacePadding, symbol, lang);
  const defaultJsCode = generateCode(patternId, rows, spacePadding, symbol, 'js')
    .map((l) => l.code)
    .join('\n');

  // Reset active line when language or pattern changes
  useEffect(() => {
    const defaultLine = Math.min(3, codeData.length);
    setActiveLineNumber(defaultLine);
  }, [lang, patternId, rows, symbol, codeData.length]);

  // Sync initial playground code whenever pattern/rows change
  useEffect(() => {
    setUserCode(defaultJsCode);
    setExecutionOutput(null);
    setExecutionError(null);
    setExecutionTime(null);
  }, [patternId, rows, spacePadding, symbol, defaultJsCode]);

  const activeLineObj = codeData.find((l) => l.lineNumber === activeLineNumber) || codeData[0];

  // Helper for smart filename resolution
  const getDownloadFileName = () => {
    const cleanId = patternId.toLowerCase().replace(/[^a-z0-9]/g, '_');
    const rawCode = (isPlaygroundMode && lang === 'js') 
      ? userCode 
      : codeData.map((l) => l.code).join('\n');

    switch (lang) {
      case 'c':
        return `pattern_${cleanId}.c`;
      case 'cpp':
        return `pattern_${cleanId}.cpp`;
      case 'java': {
        const classMatch = rawCode.match(/public\s+class\s+([A-Za-z0-9_]+)/);
        return classMatch ? `${classMatch[1]}.java` : `Pattern_${cleanId}.java`;
      }
      case 'python':
        return `pattern_${cleanId}.py`;
      case 'js':
        return `pattern_${cleanId}.js`;
      default:
        return `pattern_${cleanId}.txt`;
    }
  };

  const handleCopyCode = () => {
    const rawCode = (isPlaygroundMode && lang === 'js')
      ? userCode
      : codeData.map((l) => l.code).join('\n');
    navigator.clipboard.writeText(rawCode);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleDownloadCode = () => {
    const rawCode = (isPlaygroundMode && lang === 'js')
      ? userCode
      : codeData.map((l) => l.code).join('\n');
    const fileName = getDownloadFileName();
    const blob = new Blob([rawCode], { type: 'text/plain;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = fileName;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);

    setDownloaded(true);
    setTimeout(() => setDownloaded(false), 2000);
  };

  const handleTogglePlayground = () => {
    if (!isPlaygroundMode) {
      setIsPlaygroundMode(true);
      setLang('js');
      if (!userCode) {
        setUserCode(defaultJsCode);
      }
    } else {
      setIsPlaygroundMode(false);
    }
  };

  const handleResetCode = () => {
    setUserCode(defaultJsCode);
    setExecutionOutput(null);
    setExecutionError(null);
    setExecutionTime(null);
  };

  // Safe Sandboxed Runner with Infinite Loop Protection (Web Worker + Fallback)
  const runSandboxCode = () => {
    setIsRunning(true);
    setExecutionError(null);
    setExecutionOutput(null);

    const workerScript = `
      self.onmessage = function(e) {
        var code = e.data.code;
        var logs = [];
        var console = {
          log: function() {
            var args = Array.prototype.slice.call(arguments);
            logs.push(args.map(function(a) {
              if (typeof a === 'object' && a !== null) {
                try { return JSON.stringify(a); } catch(e) { return String(a); }
              }
              return String(a);
            }).join(' '));
          },
          error: function() {
            var args = Array.prototype.slice.call(arguments);
            logs.push('[Error] ' + args.join(' '));
          },
          warn: function() {
            var args = Array.prototype.slice.call(arguments);
            logs.push('[Warn] ' + args.join(' '));
          }
        };

        try {
          var startTime = Date.now();
          var runFn = new Function('console', code);
          runFn(console);
          var elapsed = Date.now() - startTime;
          self.postMessage({ success: true, logs: logs, elapsed: elapsed });
        } catch (err) {
          self.postMessage({ success: false, error: err.message || String(err) });
        }
      };
    `;

    let worker = null;
    let timer = null;

    try {
      const blob = new Blob([workerScript], { type: 'application/javascript' });
      const workerUrl = URL.createObjectURL(blob);
      worker = new Worker(workerUrl);

      timer = setTimeout(() => {
        if (worker) {
          worker.terminate();
          URL.revokeObjectURL(workerUrl);
          setIsRunning(false);
          setExecutionError('Execution timed out (1.5s). Possible infinite loop detected! Check your loop conditions (e.g. ensure loop counter increments properly).');
        }
      }, 1500);

      worker.onmessage = (e) => {
        clearTimeout(timer);
        setIsRunning(false);
        URL.revokeObjectURL(workerUrl);

        if (e.data.success) {
          const out = e.data.logs.join('\n');
          setExecutionOutput(out || '(Code ran successfully with no console output)');
          setExecutionTime(e.data.elapsed);
        } else {
          setExecutionError(e.data.error);
        }
      };

      worker.onerror = (err) => {
        clearTimeout(timer);
        setIsRunning(false);
        URL.revokeObjectURL(workerUrl);
        setExecutionError(err.message || 'Worker execution error');
      };

      worker.postMessage({ code: userCode });
    } catch {
      // In-thread fallback if Web Worker creation is blocked
      if (timer) clearTimeout(timer);
      try {
        const logs = [];
        const customConsole = {
          log: (...args) => logs.push(args.map(a => typeof a === 'object' && a !== null ? JSON.stringify(a) : String(a)).join(' ')),
          error: (...args) => logs.push('[Error] ' + args.join(' ')),
          warn: (...args) => logs.push('[Warn] ' + args.join(' '))
        };
        const startTime = Date.now();
        const runFn = new Function('console', userCode);
        runFn(customConsole);
        const elapsed = Date.now() - startTime;
        setIsRunning(false);
        setExecutionOutput(logs.join('\n') || '(Code ran successfully with no console output)');
        setExecutionTime(elapsed);
      } catch (runErr) {
        setIsRunning(false);
        setExecutionError(runErr.message || String(runErr));
      }
    }
  };

  // Keyboard shortcut: Tab indents 2 spaces; Ctrl+Enter runs
  const handleKeyDown = (e) => {
    if ((e.ctrlKey || e.metaKey) && e.key === 'Enter') {
      e.preventDefault();
      runSandboxCode();
      return;
    }
    if (e.key === 'Tab') {
      e.preventDefault();
      const target = e.target;
      const start = target.selectionStart;
      const end = target.selectionEnd;
      const newValue = userCode.substring(0, start) + '  ' + userCode.substring(end);
      setUserCode(newValue);
      setTimeout(() => {
        target.selectionStart = target.selectionEnd = start + 2;
      }, 0);
    }
  };

  // Sync line numbers scroll with textarea scroll
  const handleScroll = (e) => {
    if (lineNumbersRef.current) {
      lineNumbersRef.current.scrollTop = e.target.scrollTop;
    }
  };

  const lineCount = (userCode.match(/\n/g) || []).length + 1;

  return (
    <div className="glass-card code-card">
      {/* Header with Title and Global Action Buttons */}
      <div className="code-viewer-header">
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          <Code2 size={20} color="var(--accent-indigo)" />
          <h3 style={{ fontSize: '1.1rem', margin: 0 }}>
            {isPlaygroundMode ? 'Interactive Sandbox Playground' : 'Code & Interactive Explanation'}
          </h3>
        </div>

        <div className="code-actions-group">
          {/* Playground Mode Toggle Button */}
          <button 
            className={`btn btn-sm ${isPlaygroundMode ? 'btn-playground-active' : 'btn-secondary'}`}
            onClick={handleTogglePlayground}
            title={isPlaygroundMode ? "Switch back to Line Explanation Mode" : "Open In-Browser Sandbox Playground"}
          >
            {isPlaygroundMode ? (
              <>
                <Info size={14} />
                <span>Explain Mode</span>
              </>
            ) : (
              <>
                <Sparkles size={14} color="var(--accent-cyan)" />
                <span>Edit & Run (JS)</span>
              </>
            )}
          </button>

          {/* Download Code File */}
          <button className="btn btn-sm" onClick={handleDownloadCode} title={`Download as ${getDownloadFileName()}`}>
            {downloaded ? <Check size={14} color="var(--accent-emerald)" /> : <Download size={14} />}
            <span>{downloaded ? 'Downloaded!' : 'Download File'}</span>
          </button>

          {/* Copy Code */}
          <button className="btn btn-sm" onClick={handleCopyCode} title="Copy snippet to clipboard">
            {copied ? <Check size={14} color="var(--accent-emerald)" /> : <Copy size={14} />}
            <span>{copied ? 'Copied!' : 'Copy Code'}</span>
          </button>
        </div>
      </div>

      {/* --- PLAYGROUND SANDBOX MODE --- */}
      {isPlaygroundMode ? (
        <div className="playground-container animated-fade-in">
          {/* Playground Controls Toolbar */}
          <div className="playground-toolbar">
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px', flexWrap: 'wrap' }}>
              <button 
                className="playground-btn-run"
                onClick={runSandboxCode}
                disabled={isRunning}
                title="Execute code in sandbox (Ctrl + Enter)"
              >
                {isRunning ? (
                  <>
                    <Loader2 size={15} className="spin-animation" />
                    <span>Running...</span>
                  </>
                ) : (
                  <>
                    <Play size={15} fill="currentColor" />
                    <span>Run Code</span>
                  </>
                )}
              </button>

              <button 
                className="btn btn-sm btn-secondary"
                onClick={handleResetCode}
                title="Revert edits back to original pattern code"
              >
                <RotateCcw size={14} />
                <span>Reset Code</span>
              </button>

              <span className="playground-shortcut-hint">
                Tip: Press <kbd>Ctrl</kbd> + <kbd>Enter</kbd> to run
              </span>
            </div>

            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              {executionTime !== null && (
                <span className="badge badge-emerald" style={{ fontSize: '0.75rem' }}>
                  ⚡ {executionTime}ms
                </span>
              )}
              <span className="badge badge-cyan" style={{ fontSize: '0.75rem' }}>
                JavaScript Sandbox
              </span>
            </div>
          </div>

          <p style={{ fontSize: '0.82rem', color: 'var(--text-muted)', marginBottom: '10px' }}>
            ✏️ <strong>Live Sandbox:</strong> Tweak loop boundaries (e.g. <code>i &lt;= rows</code>), modify inner loops, or change characters. Click <strong>Run Code</strong> to see the live pattern output below!
          </p>

          {/* Interactive Code Editor with Line Numbers */}
          <div className="playground-editor-box">
            <div className="playground-gutter" ref={lineNumbersRef}>
              {Array.from({ length: Math.max(1, lineCount) }, (_, i) => (
                <div key={i + 1}>{i + 1}</div>
              ))}
            </div>
            <textarea
              ref={textareaRef}
              className="playground-textarea"
              value={userCode}
              onChange={(e) => setUserCode(e.target.value)}
              onKeyDown={handleKeyDown}
              onScroll={handleScroll}
              spellCheck="false"
              placeholder="Write or edit JavaScript loop code here..."
            />
          </div>

          {/* Live Console Output Terminal */}
          <div className="playground-console">
            <div className="playground-console-header">
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <Terminal size={14} color="var(--accent-cyan)" />
                <span>Sandbox Console Output</span>
              </div>
              {(executionOutput || executionError) && (
                <button 
                  className="btn btn-icon btn-sm"
                  style={{ padding: '2px 6px', height: 'auto', background: 'transparent', border: 'none' }}
                  onClick={() => { setExecutionOutput(null); setExecutionError(null); }}
                  title="Clear Console"
                >
                  <Trash2 size={13} color="var(--text-muted)" />
                </button>
              )}
            </div>

            <div className="playground-console-body">
              {isRunning && (
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px', color: 'var(--accent-cyan)' }}>
                  <Loader2 size={16} className="spin-animation" />
                  <span>Executing code in isolated environment...</span>
                </div>
              )}

              {executionError && (
                <div className="playground-console-error">
                  <AlertCircle size={16} style={{ flexShrink: 0, marginTop: '2px' }} />
                  <div>
                    <strong>Runtime Error:</strong> {executionError}
                  </div>
                </div>
              )}

              {!isRunning && !executionError && executionOutput && (
                <code>{executionOutput}</code>
              )}

              {!isRunning && !executionError && !executionOutput && (
                <span style={{ color: 'var(--text-muted)', fontStyle: 'italic' }}>
                  Click &ldquo;Run Code&rdquo; or press Ctrl + Enter to execute your JavaScript loop.
                </span>
              )}
            </div>
          </div>
        </div>
      ) : (
        /* --- EXPLAIN & EXPLORE MODE (DEFAULT) --- */
        <div className="explain-container animated-fade-in">
          {/* Language Switcher Tabs */}
          <div className="lang-tabs">
            {languages.map((l) => (
              <button
                key={l.id}
                className={`lang-tab ${lang === l.id ? 'active' : ''}`}
                onClick={() => setLang(l.id)}
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
      )}
    </div>
  );
}

export default CodeViewer;
