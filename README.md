# Tokyo International Seventh-day Adventist Church Website

A modern, responsive website for the Tokyo International Seventh-day Adventist Church (TIC), built with the **Creation Grid** philosophy.

## Design Philosophy

The website uses a strict **6:1 Grid Layout**, representing the 6 days of creation and the 7th day (Sabbath).
- **Left 6/7ths**: Takes up the majority of the screen, dedicated to daily life, content, and information.
- **Right 1/7th**: A consistent, vertical column that represents the Sabbath. It stands as a perpetual reminder of rest and holiness, present on every device from mobile to desktop.

## Features

- **No Build Tools**: Built with pure HTML, CSS, and Vanilla JavaScript. No `npm`, no `build` steps, no complexity.
- **Responsive 7th Grid**: The Layout Engine ensures the 6:1 ratio is mathematically preserved on all screen widths.
- **Dynamic Content**: Connected to Google Sheets. Updates to the spreadsheet reflect immediately on the website.
    - **Sections Managed**: Vision, Mission, Pastor Bio, Ministries, Schedule, Youtube Live Link.
- **Zero Dependencies**: Custom CSV parser written in < 20 lines of code. No external libraries.

## Editing Content

Content is managed via a Google Sheet. To update the website:
1.  Open the linked Google Sheet (Administrative Access Required).
2.  Edit the cells in the `About`, `Ministries`, `Schedule`, or `General` tabs.
3.  The website will automatically fetch the new data on the next reload.

## Deployment

Simply host the files on any static file server (GitHub Pages, Netlify, Vercel, Apache, Nginx).
- `index.html`
- `css/`
- `js/`

No build command is required.
