# Changelog

All notable changes to the Tokyo International Seventh-day Adventist Church website.

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

## [6.0.0] - 2026-04-27

### Security & Architecture
- **Netlify Functions**: Implemented secure proxy for Google Sheets data fetching, hiding Spreadsheet IDs and GIDs from the frontend.
- **Environment Variables**: Moved all sensitive configuration to Netlify environment variables.
- **Admin Dashboard**: Created `admin.html` with Netlify Identity for staff-only content management access.
- **Modular JS**: Completely rewrote `js/script.js` for better maintainability and robust error handling.

### Features
- **Sermon Library**: Added dynamic sermon grid with YouTube thumbnail integration and manual entry via Google Sheets.
- **Event Calendar**: Implemented a custom interactive calendar that pulls events directly from Google Sheets.
- **YouTube Live**: Added automated YouTube embed section based on links provided in the 'General' sheet.
- **Language Rotator**: Fixed and improved the home section welcome text rotator with smooth fade animations.
- **XSS Prevention**: Implemented `sanitizeHTML` for all dynamic content rendering.

### Documentation
- Updated `Sheet.md` with instructions for the new 6-tab system and Netlify configuration.
