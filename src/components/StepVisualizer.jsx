import React, { useState, useEffect } from 'react';
import { Play, Pause, SkipBack, SkipForward, RefreshCw, Eye } from 'lucide-react';

export function StepVisualizer({ pattern, rows, spacePadding, symbol }) {
  const steps = pattern.getStepByStepData ? pattern.getStepByStepData(rows, spacePadding, symbol) : [];
  const [currentStepIndex, setCurrentStepIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);

  useEffect(() => {
    setCurrentStepIndex(0);
    setIsPlaying(false);
  }, [pattern.id, rows, spacePadding, symbol]);

  useEffect(() => {
    let timer;
    if (isPlaying && steps.length > 0) {
      timer = setInterval(() => {
        setCurrentStepIndex((prev) => {
          if (prev >= steps.length - 1) {
            setIsPlaying(false);
            return prev;
          }
          return prev + 1;
        });
      }, 750);
    }
    return () => clearInterval(timer);
  }, [isPlaying, steps.length]);

  if (!steps || steps.length === 0) return null;

  const currentStep = steps[currentStepIndex] || steps[0];

  return (
    <div className="glass-card" style={{ padding: '24px', marginTop: '24px' }}>
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '16px' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          <Eye size={20} color="var(--accent-purple)" />
          <h3 style={{ fontSize: '1.1rem' }}>Step-by-Step Execution Visualizer</h3>
        </div>
        <span className="badge badge-purple">
          Step {currentStepIndex + 1} of {steps.length}
        </span>
      </div>

      {/* Visual Step Output Terminal */}
      <div className="canvas-terminal" style={{ minHeight: '180px', maxHeight: '240px', marginBottom: '16px' }}>
        <code>{currentStep.fullOutput}</code>
      </div>

      {/* Current Step Explanation */}
      <div style={{ padding: '12px 16px', background: 'var(--bg-input)', borderRadius: 'var(--radius-md)', border: '1px solid var(--border-color)', marginBottom: '16px', fontSize: '0.9rem' }}>
        <strong>Current Execution:</strong> {currentStep.explanation}
      </div>

      {/* Controls Bar */}
      <div style={{ display: 'flex', alignItems: 'center', gap: '12px', flexWrap: 'wrap' }}>
        <button 
          className="btn btn-primary"
          onClick={() => setIsPlaying(!isPlaying)}
        >
          {isPlaying ? <Pause size={16} /> : <Play size={16} fill="currentColor" />}
          {isPlaying ? 'Pause' : 'Play Execution'}
        </button>

        <button 
          className="btn btn-icon"
          onClick={() => {
            setIsPlaying(false);
            setCurrentStepIndex((prev) => Math.max(0, prev - 1));
          }}
          disabled={currentStepIndex === 0}
        >
          <SkipBack size={16} />
        </button>

        <button 
          className="btn btn-icon"
          onClick={() => {
            setIsPlaying(false);
            setCurrentStepIndex((prev) => Math.min(steps.length - 1, prev + 1));
          }}
          disabled={currentStepIndex === steps.length - 1}
        >
          <SkipForward size={16} />
        </button>

        <button 
          className="btn btn-icon"
          onClick={() => {
            setIsPlaying(false);
            setCurrentStepIndex(0);
          }}
          title="Reset to Step 1"
        >
          <RefreshCw size={16} />
        </button>

        {/* Step Slider */}
        <input
          type="range"
          min="0"
          max={steps.length - 1}
          value={currentStepIndex}
          onChange={(e) => {
            setIsPlaying(false);
            setCurrentStepIndex(parseInt(e.target.value, 10));
          }}
          style={{ flexGrow: 1, accentColor: 'var(--accent-purple)', cursor: 'pointer' }}
        />
      </div>
    </div>
  );
}
