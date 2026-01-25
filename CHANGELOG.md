# Changelog

All notable changes to the Tokyo International Seventh-day Adventist Church website will be documented in this file.

## [2.0.0] - 2026-01-23

### Rebuild
- **Complete Redesign**: Rebuilt the website using the "Responsive Website with Creation Grid" design language.
- **Tech Stack Migration**: Migrated from vanilla HTML/JS to React + Vite + TypeScript + Tailwind CSS.
- **Feature Porting**:
    - **Google Sheets Integration**: Ported and enhanced the Google Sheets integration to fetch dynamic content (Manifest, Ministries, Schedule, etc.).
    - **Multilingual Hero**: Re-implemented the rotating multilingual welcome message in the Hero section.
- **New Components**:
    - `HeroSection`: With animated welcome text.
    - `AboutSection`: Dynamic content from Google Sheets.
    - `MinistrySection`: Dynamic list of ministries.
    - `SermonSection`: Integrated Youtube Live link.
    - `VisitSection`: integrated dynamic service schedule.

## [1.0.0] - 2025-12-19

### Added
- **New 6:1 Grid Architecture**: Implemented a strict grid system where the content spans 6/7ths of the width and a sidebar (Sabbath Column) spans 1/7th.
- **Google Sheets Integration**: Integrated `PapaParse` to fetch and render content dynamically from a centralized Google Sheet.
- **Multilingual Hero Section**: Added a rotating "WELCOME" text in multiple languages.
- **Sticky Navigation**: Implemented a responsive navigation bar that stays fixed at the top.
- **7th Grid Scroll Effect**: Added a JavaScript-driven color transition for the rightmost column (fades from blue to white on scroll).
- **Modular JavaScript**: Separated fetching logic (`googleContent.js`) and rendering logic.
- **Back to Top Button**: Added a smooth-scroll button for better UX.
