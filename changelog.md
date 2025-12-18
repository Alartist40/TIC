# Changelog

All notable changes to the Tokyo International Seventh-day Adventist Church website will be documented in this file.

## [1.0.0] - 2025-12-19

### Added
- **New 6:1 Grid Architecture**: Implemented a strict grid system where the content spans 6/7ths of the width and a sidebar (Sabbath Column) spans 1/7th.
- **Google Sheets Integration**: Integrated `PapaParse` to fetch and render content dynamically from a centralized Google Sheet.
- **Multilingual Hero Section**: Added a rotating "WELCOME" text in multiple languages.
- **Sticky Navigation**: Implemented a responsive navigation bar that stays fixed at the top.
- **7th Grid Scroll Effect**: Added a JavaScript-driven color transition for the rightmost column (fades from blue to white on scroll).
- **Modular JavaScript**: Separated fetching logic (`googleContent.js`) and rendering logic (`renderSchedule.js`, `renderGallery.js`, `renderPastor.js`).
- **Back to Top Button**: Added a smooth-scroll button for better UX.
- **Documentation**: Created `README.md` and this `changelog.md`.

### Improved
- **Visual Design**: Adopted the high-end aesthetic from `tic-website` with `tic-website`'s color palette and typography.
- **Content Manageability**: Shifted hardcoded content to dynamic rendering, allowing non-technical users to update the site via Google Sheets.
- **Mobile Experience**: Ensured the 6:1 grid remains functional on mobile devices with a 40px sidebar.
- **SEO**: Added semantic HTML tags and descriptive meta-like structure.
