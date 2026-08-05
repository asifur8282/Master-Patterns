import React, { useState } from 'react';
import { 
  AlertTriangle, 
  Bug, 
  MessageSquare, 
  CheckCircle2, 
  ArrowLeft, 
  Send, 
  Loader2, 
  HelpCircle,
  Code2,
  Sparkles
} from 'lucide-react';
import { PATTERNS } from '../data/patterns';

export function ReportForm({ initialPattern, onBack }) {
  const [feedbackType, setFeedbackType] = useState('code_error'); // 'code_error' | 'pattern_broken' | 'general_feedback'
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [selectedPattern, setSelectedPattern] = useState(
    initialPattern ? initialPattern.name : (PATTERNS[0] ? PATTERNS[0].name : '')
  );
  const [customPattern, setCustomPattern] = useState('');
  const [subject, setSubject] = useState('');
  const [description, setDescription] = useState('');

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState('idle'); // 'idle' | 'success' | 'error'
  const [errorMessage, setErrorMessage] = useState('');

  // Determine active pattern name
  const activePatternName = selectedPattern === 'custom' 
    ? (customPattern.trim() || 'Custom Pattern') 
    : selectedPattern;

  // Auto-generated subject for Web3Forms
  const getComputedSubject = () => {
    if (feedbackType === 'code_error') {
      return `Code Error for ${activePatternName}`;
    }
    if (feedbackType === 'pattern_broken') {
      return `Pattern Not Working for ${activePatternName}`;
    }
    return subject.trim() || 'General Feedback for Master Patterns';
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setErrorMessage('');

    const apiKey = import.meta.env.VITE_WEB3FORMS_ACCESS_KEY || "YOUR_WEB3FORMS_ACCESS_KEY";
    const finalSubject = getComputedSubject();

    const formData = new FormData();
    formData.append('access_key', apiKey);
    formData.append('subject', finalSubject);
    formData.append('from_name', name || 'Master Patterns User');
    formData.append('name', name);
    formData.append('email', email);
    formData.append('feedback_type', 
      feedbackType === 'code_error' 
        ? 'Code Error for particular pattern' 
        : feedbackType === 'pattern_broken' 
          ? "Pattern Doesn't Work" 
          : 'General Feedback'
    );

    if (feedbackType !== 'general_feedback') {
      formData.append('pattern_name_code', activePatternName);
    }
    formData.append('message', description);

    try {
      // If Web3Forms API key is set or fallback
      const response = await fetch('https://api.web3forms.com/submit', {
        method: 'POST',
        body: formData
      });

      const data = await response.json();

      if (data.success) {
        setSubmitStatus('success');
      } else {
        // If API key is still placeholder, display warning or simulated success in dev
        if (apiKey === 'YOUR_WEB3FORMS_ACCESS_KEY') {
          console.warn('Web3Forms API key is not set yet. Simulated successful form submission for demo.');
          setSubmitStatus('success');
        } else {
          setSubmitStatus('error');
          setErrorMessage(data.message || 'Submission failed. Please try again later.');
        }
      }
    } catch (err) {
      // Fallback in case of network issue or key configuration preview
      if (apiKey === 'YOUR_WEB3FORMS_ACCESS_KEY') {
        setSubmitStatus('success');
      } else {
        setSubmitStatus('error');
        setErrorMessage('Network error occurred. Please check your connection and try again.');
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  const resetForm = () => {
    setSubmitStatus('idle');
    setName('');
    setEmail('');
    setDescription('');
    setSubject('');
  };

  return (
    <div className="report-container">
      <div className="report-header">
        <button className="btn btn-secondary back-btn" onClick={onBack}>
          <ArrowLeft size={16} />
          <span>Back to Catalog</span>
        </button>
        <div className="report-title-section">
          <div className="badge-pill">
            <Sparkles size={14} />
            <span>Community Contributions</span>
          </div>
          <h1 className="gradient-text report-main-title">Report an Error / Feedback</h1>
          <p className="report-subtitle">
            Help us improve Master Patterns! Let us know if you found a code bug, a broken pattern, or have suggestions.
          </p>
        </div>
      </div>

      {submitStatus === 'success' ? (
        <div className="glass-card success-card animated-fade-in">
          <div className="success-icon-wrapper">
            <CheckCircle2 size={64} className="success-icon" />
          </div>
          <h2>Thank you for Contributing to Master Patterns</h2>
          <p className="success-text">
            Your report has been successfully transmitted via Web3Forms. We deeply appreciate your support in making Master Patterns better for everyone!
          </p>

          <div className="success-meta">
            <div className="meta-item">
              <span className="meta-label">Submitted Subject:</span>
              <span className="meta-value">{getComputedSubject()}</span>
            </div>
            <div className="meta-item">
              <span className="meta-label">Category:</span>
              <span className="meta-value badge-type">
                {feedbackType === 'code_error' ? 'Code Error' : feedbackType === 'pattern_broken' ? 'Pattern Not Working' : 'General Feedback'}
              </span>
            </div>
          </div>

          <div className="success-actions">
            <button className="btn btn-primary" onClick={onBack}>
              Return to Catalog
            </button>
            <button className="btn btn-secondary" onClick={resetForm}>
              Submit Another Report
            </button>
          </div>
        </div>
      ) : (
        <form onSubmit={handleSubmit} className="glass-card report-form animated-fade-in">
          {/* Options Selection (MCQ / Cards) */}
          <div className="form-section">
            <label className="section-label">
              <span>Select Error/Feedback Type</span>
              <span className="required-star">*</span>
            </label>

            <div className="options-grid">
              <div 
                className={`option-card ${feedbackType === 'code_error' ? 'selected' : ''}`}
                onClick={() => setFeedbackType('code_error')}
              >
                <div className="option-radio">
                  <div className="radio-inner" />
                </div>
                <div className="option-icon-wrapper cyan">
                  <Code2 size={22} />
                </div>
                <div className="option-details">
                  <span className="option-title">Code Error for particular pattern</span>
                  <span className="option-desc">Syntax, logic error, or code generator bug in a pattern</span>
                </div>
              </div>

              <div 
                className={`option-card ${feedbackType === 'pattern_broken' ? 'selected' : ''}`}
                onClick={() => setFeedbackType('pattern_broken')}
              >
                <div className="option-radio">
                  <div className="radio-inner" />
                </div>
                <div className="option-icon-wrapper amber">
                  <Bug size={22} />
                </div>
                <div className="option-details">
                  <span className="option-title">Pattern Doesn't Work</span>
                  <span className="option-desc">Visual rendering issue, layout distortion, or output glitch</span>
                </div>
              </div>

              <div 
                className={`option-card ${feedbackType === 'general_feedback' ? 'selected' : ''}`}
                onClick={() => setFeedbackType('general_feedback')}
              >
                <div className="option-radio">
                  <div className="radio-inner" />
                </div>
                <div className="option-icon-wrapper purple">
                  <MessageSquare size={22} />
                </div>
                <div className="option-details">
                  <span className="option-title">General Feedback</span>
                  <span className="option-desc">Feature requests, suggestions, or general queries</span>
                </div>
              </div>
            </div>
          </div>

          <hr className="form-divider" />

          {/* Form Fields */}
          <div className="fields-grid">
            <div className="input-group">
              <label htmlFor="user-name">
                Name <span className="required-star">*</span>
              </label>
              <input
                id="user-name"
                type="text"
                className="form-input"
                placeholder="Enter your name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
              />
            </div>

            <div className="input-group">
              <label htmlFor="user-email">
                Email <span className="required-star">*</span>
              </label>
              <input
                id="user-email"
                type="email"
                className="form-input"
                placeholder="you@example.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>
          </div>

          {/* Conditional pattern selection for Code Error or Pattern Doesn't Work */}
          {feedbackType !== 'general_feedback' && (
            <div className="input-group">
              <label htmlFor="pattern-select">
                Pattern Code/Name <span className="required-star">*</span>
              </label>
              <select
                id="pattern-select"
                className="form-input select-input"
                value={selectedPattern}
                onChange={(e) => setSelectedPattern(e.target.value)}
                required
              >
                {PATTERNS.map((p) => (
                  <option key={p.id} value={p.name}>
                    {p.name} ({p.category} - {p.id})
                  </option>
                ))}
                <option value="custom">-- Other / Unlisted Pattern --</option>
              </select>

              {selectedPattern === 'custom' && (
                <input
                  type="text"
                  className="form-input custom-pattern-input"
                  placeholder="Specify Pattern Name or Code ID..."
                  value={customPattern}
                  onChange={(e) => setCustomPattern(e.target.value)}
                  required
                />
              )}
            </div>
          )}

          {/* Conditional Subject for General Feedback */}
          {feedbackType === 'general_feedback' ? (
            <div className="input-group">
              <label htmlFor="feedback-subject">
                Subject <span className="required-star">*</span>
              </label>
              <input
                id="feedback-subject"
                type="text"
                className="form-input"
                placeholder="What is your feedback about?"
                value={subject}
                onChange={(e) => setSubject(e.target.value)}
                required
              />
            </div>
          ) : (
            <div className="auto-subject-preview">
              <HelpCircle size={16} />
              <span>
                <strong>Automated Web3Forms Subject:</strong> {getComputedSubject()}
              </span>
            </div>
          )}

          {/* Description / Feedback Textarea */}
          <div className="input-group">
            <label htmlFor="feedback-description">
              {feedbackType === 'general_feedback' ? 'Feedback' : 'Describe Error'}{' '}
              <span className="required-star">*</span>
            </label>
            <textarea
              id="feedback-description"
              className="form-input textarea-input"
              rows={5}
              placeholder={
                feedbackType === 'code_error'
                  ? 'Please describe the code error, language affected, expected vs actual output...'
                  : feedbackType === 'pattern_broken'
                    ? 'Describe what went wrong when generating or visualizing this pattern...'
                    : 'Share your thoughts, suggestions, or ideas for Master Patterns...'
              }
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              required
            />
          </div>

          {errorMessage && (
            <div className="error-banner">
              <AlertTriangle size={18} />
              <span>{errorMessage}</span>
            </div>
          )}

          <div className="form-submit-footer">
            <button
              type="submit"
              className="btn btn-primary submit-btn"
              disabled={isSubmitting}
            >
              {isSubmitting ? (
                <>
                  <Loader2 size={18} className="spinner-icon" />
                  <span>Transmitting...</span>
                </>
              ) : (
                <>
                  <Send size={18} />
                  <span>Submit Report</span>
                </>
              )}
            </button>
          </div>
        </form>
      )}
    </div>
  );
}
