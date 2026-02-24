# 💻 DarthFabax Portfolio

A high-performance, **minimalist personal portfolio** for DevOps Engineers. Inspired by Linux terminal aesthetics, this project focuses on low-latency delivery and zero-dependency builds.

---

## 🚀 Quick Start

Spin up the environment locally without any complex build tools:

```bash
# Clone the repository
git clone https://github.com/darthfabax-org/portfolio.git

# Enter the project directory
cd portfolio

# Launch local server (Python 3.x)
python3 -m http.server 8080
```

---

## 📂 Folder Structure

```bash
.
├── index.html                  # Main Entry Point (Semantic HTML5)
├── README.md                   # Project documentation
├── assets/
│   ├── css/
│   │   ├── variables.css       # Design Tokens (Color Palette, Spacing)
│   │   ├── reset.css           # Cross-browser normalization
│   │   ├── layout.css          # Grid/Flexbox containers
│   │   ├── components.css      # Terminal UI, badges, pipeline visualization
│   │   └── animations.css      # Keyframes & Reveal effects
│   ├── js/
│   │   ├── i18n.js             # Translation engine logic
│   │   ├── clock.js            # Real-time topbar clock
│   │   └── animations.js       # Scroll Observer & Terminal typing
│   └── icons/
│       └── favicon.ico         # Branding assets
└── .github/workflows/          # CI/CD Pipeline (Auto-deploy)
```

---

## 🤖 CI/CD Pipeline

This project implements a fully automated **GitOps-style deployment** workflow using GitHub Actions.

### Deployment Workflow

The pipeline is defined in `.github/workflows/deploy-gh-pages.yml` and triggers automatically on every `push` to the `main` branch. It performs the following stages:

1. **Environment Setup:** Initializes a virtual runner with the latest Ubuntu image.
2. **Code Checkout:** Synchronizes the runner with the current repository state.
3. **Security & Configuration:** Configures OIDC (OpenID Connect) tokens to securely interact with GitHub Pages.
4. **Artifact Upload:** Packages all static assets (HTML, CSS, JS) and prepares them for the edge network.
5. **Production Deployment:** Atomic deployment to GitHub's global CDN.

### Infrastructure Details

* **Provider:** GitHub Pages
* **Orchestrator:** GitHub Actions
* **Deployment Strategy:** Continuous Deployment (CD)
* **Access Point:** The site is served over HTTPS at your specific GitHub Pages domain.

---

## License

[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
