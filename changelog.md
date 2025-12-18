# Changelog

All notable changes to the Tokyo International Church website project will be documented in this file.

## [Restored Version] - 2025-12-18

### Fixed
- **Percentage-Locked 6:1 Grid**: Switched from `fr` units to hard percentage values (`85.7143%` / `14.2857%`) and added `min-width: 0` to the content column. This ensures the 6:1 ratio is mathematically enforced even if internal content attempts to overflow.
- **Fixed-Ratio Navigation**: Locked the navigation bar width to exactly `85.7143%` to match the content grid across all devices, preventing overlap with the Sabbath column.
- **Responsive Dynamic Layouts**: Rewrote the rendering logic for dynamic Google Sheet data (e.g., Schedule) to use flexible card-grids instead of rigid tables.
- **Overflow Protection**: Added global `word-break: break-word` and `max-width: 100%` rules to all dynamic content containers.
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
