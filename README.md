# Tokyo International Seventh-day Adventist Church Website

A modern, responsive website for the Tokyo International Seventh-day Adventist Church (TIC), rebuilt using the **TIC 10 Design Language** and powered by Google Sheets.

## Features

- **TIC 10 Design**: Features a clean, card-based layout with a strict 7th Grid (Sabbath Column).
- **Dynamic Content**: Connected to Google Sheets.
    - **Ministries**: Adding a row to the 'Ministries' sheet automatically creates a new card on the website.
    - **Events**: Adding a row to the 'Events' sheet automatically creates a new event poster.
    - **Schedule**: The service times table is auto-generated from the 'Schedule' sheet.
- **Zero Dependencies**: Pure HTML, CSS, and Vanilla JavaScript.

## Setup & Content Management

Please refer to [Sheet.md](Sheet.md) for detailed instructions on how to create, structure, and connect your Google Sheets.

## Development

1.  **Clone**: `git clone https://github.com/Alartist40/TIC.git`
2.  **Run**: Open `index.html` in any browser.
3.  **Deploy**: Upload the files to GitHub Pages, Netlify, or any static host.
