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

- 🌙 **Themes & Design**:
  - Dark Mode and Hazy Bluish-Pink Light Theme with modern glassmorphism, responsive grid layout, and custom typography (Fira Code, Inter, Poppins).

---

## 🛠️ Tech Stack

- **Framework**: React 19 + Vite 8
- **Styling**: Vanilla CSS Design System with CSS Custom Properties, Glassmorphism, and Fluid Flexbox/Grid
- **Icons**: Lucide React
- **Typography**: Poppins, Inter, Fira Code
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

4. **Run code quality checks**:
   ```bash
   npm run lint
   ```

5. **Build for production**:
   ```bash
   npm run build
   ```

---

## 📜 License

MIT License. Free to use for students, teachers, and developers worldwide!
