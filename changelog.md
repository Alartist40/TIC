# Changelog

All notable changes to this project will be documented in this file.

## [Unreleased]

### Added
- **Project Documentation:**
  - Created `README.md` with a project overview, architecture details, and local setup instructions.
  - Created `changelog.md` to document the project's development history.
  - Created `sheet.md` to explain the Google Sheets-based content management workflow.

### Changed
- **Codebase Cleanup:**
  - Performed a full repository cleanup, removing all temporary files, test suites, and uncommitted changes from previous development cycles.

## [2024-08-01] - Initial Rebuild & Core Features

### Added
- **Complete Website Rebuild:**
  - Initiated a full rebuild of the website to be mobile-first and based on "The Creation Grid" 7-column design.
  - Established the core HTML structure and a clean, modular JavaScript architecture.

- **Core UI & Navigation:**
  - Implemented the 7-column grid with a fixed "Sabbath Column."
  - Built a functional hamburger navigation menu for mobile devices.

- **"Welcome" Section:**
  - Created the hero section with a multilingual "Welcome" message that rotates through English, Japanese, Chinese, Korean, Spanish, Portuguese, and French.

- **"About Us" Section:**
  - Developed the "About Us" section, featuring mission and vision statements.
  - Implemented the pastor's profile component, including an image, name, and biography.
  - All content is dynamically loaded from a Google Sheet.

- **"Ministries" Section:**
  - Implemented an expanding card UI for the "Ministries" section.
  - Each card displays a title, description, and image, with content managed via a Google Sheet.

### Removed
- **"Sermons" Section (Attempted & Reverted):**
  - An initial attempt to automatically fetch and embed the latest YouTube video was made.
  - This feature was reverted due to insurmountable CORS and client-side parsing challenges that made it infeasible with the current static architecture.

- **"Events" Section (Attempted & Reverted):**
  - Development was started on an "Events" section that would include an embedded Google Calendar and expanding event cards.
  - This feature was postponed and the code was reverted because the required Google Sheet URL was not available.
