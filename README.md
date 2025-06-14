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

**The Ledger** is an offline-first, responsive web application for building and tracking characters in *Vampire: The Masquerade* 5th Edition (V5).  Think of it as the digital equivalent of the classic paper character sheet—always at hand, version-controlled, and ready to print.

The project started as a small experiment based on the 3D dice roller from
[@prncc/vampire-dice-roller](https://github.com/prncc/vampire-dice-roller) 🩸, and quickly grew after importing rules logic, data files, and plenty of inspiration from the fantastic
[@Odin94/Progeny-vtm-v5-character-creator](https://github.com/Odin94/Progeny-vtm-v5-character-creator/) 🦇.  Huge thanks to both projects for lighting the way!

---

## Demo

Clone the repository and open `index.html`, or visit the live preview (coming soon).

![Screenshot of The Ledger](assets/readme-screenshot.png)

---

## Features

- 📄 All core V5 character sheet sections: Information, Attributes, Skills, Disciplines, Backgrounds, Advantages & Flaws, Coterie and more.
- 🎲 Optional 3-D dice roller overlay (ported from `vampire-dice-roller`).
- 💾 100 % client-side – nothing is sent to a server; your secrets stay yours.
- 📥 Export / import character data as JSON for quick backups or version control.
- 📚 Comprehensive V5 reference data automatically pulled from the community-maintained [VTM Wiki](https://vtm.paradoxwikis.com/VTM_Wiki).
- 📤 Discord integration – share dice rolls to your server via a webhook.
- 🧬 Import existing character JSON from the **Progeny** VTM character creator.
- 🎨 Built with vanilla HTML, SCSS (compiled via `sass`), and a sprinkle of Bootstrap 5 for layout.

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

4. **Open** `index.html` in your favourite browser – that's it!  No build step required.

---

## Development

All styling lives in `scss/` and is compiled to `css/` using [`sass`](https://sass-lang.com/).  The following npm scripts are available:

| Script         | Purpose                                   |
| -------------- | ----------------------------------------- |
| `npm run sass` | Watch `scss/` and re-compile on changes   |
| `npm run sass:build` | One-off, minified production build |

Feel free to raise issues or open pull requests – contributions are welcome!

---

## Folder Structure

```text
Ledger/
├── assets/       # images, fonts, icons
├── css/          # compiled CSS (git-ignored in dev)
├── scss/         # source SCSS files
├── js/           # JavaScript modules / helpers
├── data/         # JSON & YAML rules data sourced from Progeny **and** the VTM Wiki
├── index.html    # main entry point
└── package.json  # npm scripts & dev dependencies
```

---

## Acknowledgements

- **Jump-start & dice roller:**  [prncc/vampire-dice-roller](https://github.com/prncc/vampire-dice-roller)
- **Rule data & huge inspiration:**  [Odin94/Progeny-vtm-v5-character-creator](https://github.com/Odin94/Progeny-vtm-v5-character-creator/)
- **Reference data source:**  [VTM Wiki](https://vtm.paradoxwikis.com/VTM_Wiki) – thank you to the community for curating the *Vampire: The Masquerade* knowledge base.
- *Vampire: The Masquerade* and the World of Darkness are properties of Paradox Interactive AB.  This project is a non-commercial fan work under the Dark Pack guidelines.

---

## License

Distributed under the MIT License.  See `LICENSE` for more information. 