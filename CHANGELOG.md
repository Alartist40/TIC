# Changelog

All notable changes to the Tokyo International Seventh-day Adventist Church website.

## [3.0.0] - 2026-01-26

### Architecture Overhaul
- **Simplified Stack**: Removed React, Vite, and Node.js dependencies. Rebuilt from scratch using Semantic HTML5, CSS3, and ES6 JavaScript.
- **Performance**: Near-instant load times due to zero-bundle architecture.

### Features
- **Strict 7th Grid**: Implemented a robust CSS Grid utilizing `6fr 1fr` columns that persists across all device capabilities, strictly adhering to the design requirement.
- **Dependency-Free Integration**: Replaced `papaparse` with a custom lightweight CSV parser.
- **Mobile Fidelity**: The Sabbath column now correctly scales to 1/7th of the viewport width on mobile devices, ensuring the "Creation Grid" metaphor is never broken.

## [2.0.0] - 2026-01-23
- *(Deprecated)* React/Vite implementation.

## [1.0.0] - 2025-12-19
- Initial Reference Implementation.
