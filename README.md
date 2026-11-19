# 🌌 Master Patterns — CS Pattern Learning & Interactive Visualizer

> An aesthetic, interactive educational web platform designed to help Computer Science students and interview candidates master nested loops, pattern printing, dynamic symbol customization, and multi-language implementations visually.

🔗 **Live Website**: [https://master-patterns.vercel.app/](https://master-patterns.vercel.app/)  
👨‍💻 **Developer**: [Asifur Rahaman](https://asifur-rahaman-portfolio.vercel.app/)

---

## ✨ Features

- 🎯 **Comprehensive 26-Pattern Library**: 
  - Extensive catalog of classic CS and placement interview patterns across **Star**, **Pyramid**, **Number**, **Character**, and **Advanced Matrix** categories.
  - Includes university staples and DSA interview favorites: Right-Angled Pyramids, Inverted Pyramids, Diamonds, Floyd's Triangle, Pascal's Triangle, Palindromic Pyramids, **Binary (0-1) Triangle**, **Number Crown / Bridge**, **Concentric Number Squares (Striver #22)**, **Reverse Alphabet Triangle**, **Hollow Diamonds**, and **Heart Shape Patterns**.
  - Search and filter by category or pattern ID (`ast_001`, `num_007`, `chr_004`, etc.).

- 🎛️ **Interactive Pattern Lab**:
  - **Dynamic Controls**: `Increase Rows (+)`, `Decrease Rows (-)`, `Increase Space (+)`, and `Decrease Space (-)`.
  - **Direct Numeric Input & Range Slider**: Fine-tune row count on the fly.
  - **"Change Your Symbol"**: Real-time symbol replacement (swap `*` for `%`, `@`, `#`, emoji `🐱`, or multi-character tokens) with bulletproof spacing and alignment math.

- 💻 **Multi-Language Code Generators & Line-by-Line Breakdown**:
  - Production-ready, runnable source code in **C**, **C++**, **Java**, **Python**, and **JavaScript** with full `#include` headers, classes, and `main()` routines.
  - **Clickable Line Explanations**: Click any line of code to see an instant educational breakdown explaining *how* that exact line connects to outer loops, inner spaces, character printing, or line breaks.

- ⚡ **Live In-Browser Code Playground (JavaScript Sandbox)**:
  - **"Edit & Run (JS)" Mode**: Switch from read-only explanation mode into a live in-browser code editor.
  - **Isolated Web Worker Execution**: Runs student code in a separate background thread with a **1.5-second watchdog timer** to protect against accidental infinite loops (`while(true)`, broken counters).
  - **Integrated Console Output**: Real-time terminal output capturing `console.log(...)` results, execution timing benchmarks (e.g. `⚡ 12ms`), and helpful syntax/runtime error badges.
  - **Developer-Friendly Editor**: Synchronized line numbers gutter, <kbd>Tab</kbd> key indentation, and <kbd>Ctrl</kbd> + <kbd>Enter</kbd> (or <kbd>Cmd</kbd> + <kbd>Enter</kbd>) to run instantly.
  - **Reset to Default**: One-click restore to original pattern code.

- 💾 **One-Click Code File Downloader**:
  - Download runnable code directly to your local computer:
    - **C**: `pattern_<id>.c`
    - **C++**: `pattern_<id>.cpp`
    - **Java**: `BinaryTriangle.java`, `HeartPattern.java`, etc. (intelligently matched to the declared public class name).
    - **Python**: `pattern_<id>.py`
    - **JavaScript**: `pattern_<id>.js` (exports custom playground edits when in playground mode).

- 🎞️ **Step-by-Step Execution Visualizer**:
  - Interactive playback controls (Play, Pause, Step Forward, Step Back, Reset) and execution scrubber to watch nested loops print row-by-row with explanatory captions.

- 📬 **Community Feedback & Error Reporting**:
  - Integrated `/report` page powered by Web3Forms for submitting bug reports, broken pattern notices, or new pattern suggestions with auto-generated pattern IDs and tracking.

- 🗺️ **Platform Sitemap & Agentic Discovery**:
  - Interactive `/sitemap` navigation page.
  - Machine-readable `llms.txt` and ARD (`ai-catalog.json`) integration for AI agents and LLM crawlers.

- 🔊 **Tactile UI Sound Engine (`uisfx`)**:
  - Interactive audio feedback system powered by the Web Audio API with zero external audio assets.
  - **3 Audio Themes**: Switch between **Sci-Fi** (default FM harmonics), **Glass** (crisp acoustic resonance), and **Minimal** (subtle mechanical clicks) by right-clicking the sound button in the navbar.
  - **Comprehensive Interactive Cues**: Audio feedback on button clicks, card selections, symbol chips, code execution, download actions, theme switches, and interactive hover effects.
  - **Browser Policy & SSR Compliant**: 100% Chrome Autoplay compliant with gesture-unlocked audio contexts, mute state persistence in `localStorage`, and fine pointer detection.

- 💎 **Brand Identity & Custom Favicon System**:
  - Custom vector SVG favicon (`favicon.svg`) featuring the signature cyan-indigo-purple brand squircle and 3-tier CS pattern layers.
  - High-resolution Apple Touch Icon ($180\times180\text{px}$) for iOS/Android home screens and $32\times32\text{px}$ raster fallback.
  - PWA mobile browser theme color (`#0f172a`) and crisp high-DPI rendering across both dark and light browser chrome.

- 🌙 **Themes & Design**:
  - Dark Mode and Hazy Bluish-Pink Light Theme with modern glassmorphism, responsive grid layout, and custom typography (Fira Code, Inter, Poppins).

---

## 🛠️ Tech Stack

- **Framework**: React 19 + Vite 8
- **Audio Engine**: Web Audio API via `uisfx` (procedural synthesized sound packs)
- **Styling**: Vanilla CSS Design System with CSS Custom Properties, Glassmorphism, and Fluid Flexbox/Grid
- **Icons**: Lucide React & Custom Brand Vector Favicon
- **Typography**: Poppins, Inter, Fira Code
- **Testing & Quality**: Node.js Test Runner (`node --test`), Oxlint
- **Deployment**: Vercel Single-Page App (SPA) with rewrite routing

---

## 🚀 Quick Start

1. **Clone the repository**:
   ```bash
   git clone https://github.com/YOUR_USERNAME/master-patterns.git
   cd master-patterns
   ```

2. **Install dependencies**:
   ```bash
   npm install
   ```

3. **Run the local development server**:
   ```bash
   npm run dev
   ```

4. **Run unit tests**:
   ```bash
   npm test
   ```

5. **Run code quality checks (linter)**:
   ```bash
   npm run lint
   ```

6. **Build for production**:
   ```bash
   npm run build
   ```

---

## 📜 License

MIT License. Free to use for students, teachers, and developers worldwide!
