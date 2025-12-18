# Changelog

All notable changes to the Tokyo International Church website project will be documented in this file.

## [Merged Version] - 2025-12-18

### Added
- **Dynamic Content Loading**: Integrated `PapaParse` and custom JS services to fetch content from Google Sheets.
- **Utility Classes**: Added `.card-grid`, `.hidden`, `.fade-in` to `styles.css` to support dynamic elements.
- **Schedule Section**: Added dynamic schedule loading to the "Visit Us" section.
- **Documentation**: Added `README.md` with instructions on managing content via Google Sheets.

### Changed
- **Design Architecture**: Reverted to the superior `tic-website` 6:1 grid layout and color palette (`#005eb8` Primary, `#d4af37` Secondary).
- **Hero Section**: Adopted the clean `tic-website` hero design but updated logic to support the "Welcome" animation without the static subtitle.
- **File Structure**: Organized JS into modular components (`components/`, `services/`) for better maintainability.

### Removed
- **Static Content**: Removed hardcoded text for specialized ministries and schedule to rely on the single source of truth (Google Sheets).
