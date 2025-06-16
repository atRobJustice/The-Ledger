# 🧛 **The Ledger**

*A Vampire: The Masquerade 5th Edition character ledger*

---

## Table of Contents

1. [About](#about)
2. [Demo](#demo)
3. [Features](#features)
4. [Getting&nbsp;Started](#getting-started)
5. [Development](#development)
6. [Folder&nbsp;Structure](#folder-structure)
7. [Acknowledgements](#acknowledgements)
8. [License](#license)

---

## About

**The Ledger** is an offline-first, responsive web application for building and tracking characters in *Vampire: The Masquerade* 5th Edition (V5). Think of it as the digital equivalent of the classic paper character sheet—always at hand, version-controlled, and ready to print.

The project started as a small experiment based on the 3D dice roller from [@prncc/vampire-dice-roller](https://github.com/prncc/vampire-dice-roller), and quickly grew after importing rules logic, data files, and plenty of inspiration from the fantastic [@Odin94/Progeny-vtm-v5-character-creator](https://github.com/Odin94/Progeny-vtm-v5-character-creator/). Huge thanks to both projects for lighting the way!

---

## Demo

Clone the repository and open `index.html`, or visit the [live version](https://atrobjustice.github.io/The-Ledger/).

![Screenshot of The Ledger](assets/readme-screenshot.png)

---

## Features

- 📄 **Complete Character Sheet**
  - All core V5 character sheet sections
  - Theme-aware form controls

- 🎲 **Enhanced Dice System**
  - Optional 3-D dice roller overlay
  - Hunger dice integration
  - Critical & messy critical handling
  - Discord webhook integration

- 💾 **Data Management**
  - 100% client-side – nothing is sent to a server
  - JSON export/import for backups
  - Progeny VTM character import
  - Local storage persistence

- 🎨 **UI/UX Features**
  - Clan-specific themes
  - Dark/Light mode support
  - Responsive design
  - Keyboard navigation

---

## Getting Started

1. **Clone** the repo
   ```bash
   git clone https://github.com/<your_username>/Ledger.git
   cd Ledger
   ```

2. **Install** dev dependencies (only needed if you want to re-compile SCSS)
   ```bash
   npm install
   ```

3. **Run** the SCSS watcher (optional)
   ```bash
   npm run sass
   ```

4. **Open** `index.html` in your favourite browser – that's it! No build step required.

---

## Development

All styling lives in `scss/` and is compiled to `css/` using [`sass`](https://sass-lang.com/). The following npm scripts are available:

| Script | Purpose |
| -------------- | ----------------------------------------- |
| `npm run sass` | Watch `scss/` and re-compile on changes |
| `npm run sass:build` | One-off, minified production build |

For detailed technical documentation, see [DOCUMENTATION.md](DOCUMENTATION.md).

Feel free to raise issues or open pull requests – contributions are welcome!

---

## Folder Structure

```text
Ledger/
├── assets/       # images, fonts, icons
├── css/          # compiled CSS (git-ignored in dev)
├── scss/         # source SCSS files
│   ├── base/     # typography, utilities
│   ├── components/ # reusable UI components
│   ├── layout/   # layout-specific styles
│   └── features/ # feature-specific styles
├── js/           # JavaScript modules
│   ├── lib/      # third-party libraries
│   └── references/ # game data & rules
├── data/         # JSON & YAML rules data
├── reference/    # additional reference materials
├── index.html    # main entry point
├── DOCUMENTATION.md # technical documentation
├── CHANGELOG.md  # version history
└── package.json  # npm scripts & dev dependencies
```

---

## Acknowledgements

- **Dice Roller:** [prncc/vampire-dice-roller](https://github.com/prncc/vampire-dice-roller)
- **Inspiration:** [Odin94/Progeny-vtm-v5-character-creator](https://github.com/Odin94/Progeny-vtm-v5-character-creator/)
- **Reference Data:** [VTM Wiki](https://vtm.paradoxwikis.com/VTM_Wiki) – thank you to the community for curating the *Vampire: The Masquerade* knowledge base.
- *Vampire: The Masquerade* and the World of Darkness are properties of Paradox Interactive AB. This project is a non-commercial fan work under the Dark Pack guidelines.

---

## License

Distributed under the MIT License. See `LICENSE` for more information. 