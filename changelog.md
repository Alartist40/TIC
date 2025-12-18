# Changelog

All notable changes to the Tokyo International Church website project will be documented in this file.

## [Restored Version] - 2025-12-18

### Fixed
- **Sticky Navigation**: Successfully enabled the navigation bar to follow the user on scroll by optimizing container overflow properties without affecting the 6:1 grid structure.
- **Layout Restoration**: Reverted `styles.css` to the original `tic-website` version to restore the consistent 6:1 grid layout across all devices.
- **Sticky Navigation**: Re-implemented the sticky navigation bar with a high `z-index` to ensure accessibility while maintaining the grid structure.
- **Content Scaling**: Ensured Google Maps and Calendars are correctly constrained to the 6/7 content grid to prevent layout shifting on mobile.
- **Grid Consistency**: Fixed an issue where the 7th grid was being pushed or compressed on smaller screens.

## [Merged Version] - 2025-12-18

### Added
- **Dynamic Content Loading**: Integrated `PapaParse` and custom JS services to fetch content from Google Sheets.
- **Utility Classes**: Added `.card-grid`, `.hidden`, `.fade-in` to `styles.css` to support dynamic elements.
- **Schedule Section**: Added dynamic schedule loading to the "Visit Us" section.
- **Documentation**: Added `README.md` with instructions on managing content via Google Sheets.
- **Sticky Navigation**: Fixed navigation bar behavior to follow the user on scroll for consistent accessibility across sections.
- **Git Push**: Forcefully pushed the merged codebase to the `TIC` repository for centralized version control.

### Changed
- **Design Architecture**: Reverted to the superior `tic-website` 6:1 grid layout and color palette (`#005eb8` Primary, `#d4af37` Secondary).
- **Hero Section**: Adopted the clean `tic-website` hero design but updated logic to support the "Welcome" animation without the static subtitle.
- **File Structure**: Organized JS into modular components (`components/`, `services/`) for better maintainability.

### Removed
- **Static Content**: Removed hardcoded text for specialized ministries and schedule to rely on the single source of truth (Google Sheets).
