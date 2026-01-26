# Changelog

All notable changes to the Tokyo International Seventh-day Adventist Church website.

## [6.0.0] - 2026-01-27

### Added
- **Sticky Navigation**: The main navigation bar now sticks to the top of the page on scroll.
- **Mobile Menu**: The mobile hamburger menu is now functional, with a dropdown that pushes content down and can be closed by clicking the icon again or outside the menu.
- **Dynamic Hero Section**: The hero section now features a dynamic "Welcome" message that rotates through English, Japanese, Spanish, Portuguese, Chinese, and Korean.
- **"About Us" Expand/Collapse**: The "About Us" section now features a "Read More" button that expands and collapses the content.
- **Google Sheets Integration for "Visit Us"**: The service times in the "Visit Us" section are now dynamically loaded from a Google Sheet.

### Changed
- **JavaScript Refactoring**: Consolidated all JavaScript into a single `js/script.js` file, removing inline scripts from `index.html`.
- **Hero Section HTML**: Simplified the HTML structure of the hero section to accommodate the new dynamic welcome message.
- **CSS Cleanup**: Removed unused CSS related to the old language rotator.
- **`sheet.md` Update**: Added instructions for managing the "Visit Us" service times.

### Fixed
- The mobile menu is now functional.
- The "Read More" button in the "About Us" section now has functionality.

## [5.0.0] - 2026-01-26

### Design Pivot
- **TIC 10 Adoption**: Migrated to the TIC 10 design base (Card-centric, 7-column grid layout).
- **Dynamic Cards**: Implemented a system where Ministry and Event cards are dynamically generated from Google Sheet rows.
    - Added logic to `js/script.js` to fetch and render cards.
    - Supports adding/deleting content via the Sheet without code changes.

### Documentation
- Added `Sheet.md`: A comprehensive guide on setting up the Google Sheet backend.

## [4.0.0] - 2026-01-26
- TIC 11 Migration (Deprecated).

## [3.0.0] - 2026-01-26
- Vanilla JS Rebuild.
