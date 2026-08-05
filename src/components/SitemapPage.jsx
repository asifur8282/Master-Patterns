import React from 'react';
import { 
  MapPin, 
  BookOpen, 
  Layers, 
  Flag, 
  Code2, 
  Sparkles, 
  Cpu, 
  ArrowLeft,
  ArrowRight,
  CheckCircle2,
  Terminal,
  Grid,
  Zap,
  Globe
} from 'lucide-react';
import { PATTERNS } from '../data/patterns';

export function SitemapPage({ onNavigate }) {
  // Group patterns by category
  const categoriesMap = PATTERNS.reduce((acc, p) => {
    acc[p.category] = acc[p.category] || [];
    acc[p.category].push(p);
    return acc;
  }, {});

  const categories = Object.keys(categoriesMap);

  return (
    <div className="sitemap-container">
      {/* Header */}
      <div className="sitemap-header">
        <button className="btn btn-secondary back-btn" onClick={() => onNavigate('gallery')}>
          <ArrowLeft size={16} />
          <span>Back to Catalog</span>
        </button>

        <div className="sitemap-title-section">
          <div className="badge-pill">
            <MapPin size={14} />
            <span>Descriptive Navigation & Index</span>
          </div>
          <h1 className="gradient-text sitemap-main-title">Platform Sitemap</h1>
          <p className="sitemap-subtitle">
            A comprehensive index of pages, pattern categories, code generator modules, and platform features across Master Patterns.
          </p>
        </div>
      </div>

      {/* Main Pages Overview Cards */}
      <div className="sitemap-section">
        <h2 className="section-heading">
          <Globe size={20} className="section-icon indigo" />
          <span>Core Navigation Pages</span>
        </h2>

        <div className="pages-grid">
          <div className="sitemap-card clickable" onClick={() => onNavigate('gallery')}>
            <div className="card-top">
              <div className="icon-wrapper indigo">
                <BookOpen size={22} />
              </div>
              <span className="route-badge">/</span>
            </div>
            <h3>Pattern Catalog</h3>
            <p>
              Browse, filter, and search the complete collection of CS pattern programs. Includes category filters, search bar, and pattern difficulty tags.
            </p>
            <div className="card-footer-link">
              <span>Visit Catalog</span>
              <ArrowRight size={14} />
            </div>
          </div>

          <div className="sitemap-card clickable" onClick={() => onNavigate('report')}>
            <div className="card-top">
              <div className="icon-wrapper amber">
                <Flag size={22} />
              </div>
              <span className="route-badge">/report</span>
            </div>
            <h3>Report Error / Feedback</h3>
            <p>
              Community contribution form powered by Web3Forms. Report pattern code bugs, non-working patterns, or submit general feedback.
            </p>
            <div className="card-footer-link">
              <span>Submit Feedback</span>
              <ArrowRight size={14} />
            </div>
          </div>

          <div className="sitemap-card">
            <div className="card-top">
              <div className="icon-wrapper purple">
                <MapPin size={22} />
              </div>
              <span className="route-badge">/sitemap</span>
            </div>
            <h3>Descriptive Sitemap</h3>
            <p>
              Full architectural overview, page index, pattern classification, and multi-language code generator feature mapping.
            </p>
            <div className="card-footer-link active">
              <span>You are here</span>
            </div>
          </div>
        </div>
      </div>

      {/* Pattern Classification Index */}
      <div className="sitemap-section">
        <h2 className="section-heading">
          <Grid size={20} className="section-icon cyan" />
          <span>Pattern Collections & Index ({PATTERNS.length} Total Patterns)</span>
        </h2>

        <div className="categories-grid">
          {categories.map((cat) => (
            <div key={cat} className="category-sitemap-card glass-card">
              <div className="cat-header">
                <span className="cat-title">{cat} Patterns</span>
                <span className="badge badge-cyan">{categoriesMap[cat].length} Patterns</span>
              </div>
              <ul className="pattern-list">
                {categoriesMap[cat].map((p) => (
                  <li key={p.id} className="pattern-item" onClick={() => onNavigate('gallery')}>
                    <Code2 size={14} className="item-icon" />
                    <span className="item-name">{p.name}</span>
                    <span className="item-id">{p.id}</span>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>

      {/* Feature Architecture */}
      <div className="sitemap-section">
        <h2 className="section-heading">
          <Cpu size={20} className="section-icon purple" />
          <span>Laboratory & Code Generation Engine</span>
        </h2>

        <div className="features-grid">
          <div className="feature-box glass-card">
            <div className="feature-icon cyan">
              <Terminal size={22} />
            </div>
            <div>
              <h4>Multi-Language Code Generator</h4>
              <p>Generates production-grade loop logic for C, C++, Java, Python, and JavaScript with custom rows and symbol alignment.</p>
            </div>
          </div>

          <div className="feature-box glass-card">
            <div className="feature-icon indigo">
              <Zap size={22} />
            </div>
            <div>
              <h4>Step-by-Step Visualizer</h4>
              <p>Traces iteration states line-by-line showing row indexes, space paddings, and string construction steps.</p>
            </div>
          </div>

          <div className="feature-box glass-card">
            <div className="feature-icon amber">
              <Sparkles size={22} />
            </div>
            <div>
              <h4>Multi-Character & Symbol Customization</h4>
              <p>Supports custom unit padding, multi-character symbols, and responsive font formatting in mono space font engine.</p>
            </div>
          </div>

          <div className="feature-box glass-card">
            <div className="feature-icon emerald">
              <CheckCircle2 size={22} />
            </div>
            <div>
              <h4>SEO & Single Page Application Routing</h4>
              <p>Configured with Vercel SPA rewrites (`vercel.json`), XML sitemap (`sitemap.xml`), and HTML5 history API navigation.</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
