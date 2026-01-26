# Tokyo International Seventh-day Adventist Church Website

A modern, responsive website for the Tokyo International Seventh-day Adventist Church (TIC), rebuilt based on the **TIC 11 Design Language**.

## Features

- **Design Fidelity**: Matches the "TIC 11" reference design pixel-for-pixel.
- **Strict 7th Grid**: Includes the signature "Sabbath Column" (1/7th width) on the right side, consistent across all devices.
- **Dynamic Content**: Connected to Google Sheets to allow easy updates for:
    - Mission, Vision, and Values
    - Ministries
    - Service Schedule
    - Youtube Live Link
- **No Dependencies**: Built with pure HTML, CSS, and Vanilla JavaScript. No build tools required.

## Content Management

The website content is powered by a Google Sheet.
- **Update Process**: Simply edit the Google Sheet cells. The website fetches the latest CSV data on page load.
- **Modal System**: Clicking "Read More" buttons opens a dynamic modal populated with the latest data from the sheet.

## Usage

1.  **Development**: Open `index.html` in a browser.
2.  **Deployment**: Upload `index.html`, `styles.css`, `js/`, and `images/` to any static host.

## Credits

- Design Base: TIC 11 Reference
- Architecture: Vanilla JS + CSS Grid
