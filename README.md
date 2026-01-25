# Tokyo International Seventh-day Adventist Church Website

A modern, responsive website for the Tokyo International Seventh-day Adventist Church (TIC), featuring a beautiful creation-grid design and dynamic content integration.

## Features

- **Responsive Design**: Built with React and Tailwind CSS, featuring a unique creation-grid layout that looks great on all devices.
- **Dynamic Content**: Integrates with Google Sheets to allow easy content updates for:
    - Mission, Vision, and Values
    - Ministries
    - Service Schedule
    - Youtube Live Link
- **Multilingual Welcome**: Animated welcome message in multiple languages.
- **Modern Tech Stack**: Vite, React, TypeScript, Tailwind CSS.

## How to Use the Google Sheet

The website is powered by a Google Sheet. Non-technical staff can update the website content by simply editing the sheet.

### Setup Instructions

1.  **Sheet Structure**: Ensure your Google Sheet has tabs named `General`, `About`, `Ministries`, `Sermons`, and `Schedule`.
2.  **Publish to the Web**:
    - Open your Google Sheet.
    - Go to `File` > `Share` > `Publish to web`.
    - Select the entire document or specific tabs.
    - Choose `CSV` as the output format.
    - Click `Publish`.
3.  **Update URLs**: The URLs are configured in `src/services/googleContent.ts`.

### Tab Details

- **General**: Key-Value pairs (e.g., `YoutubeLive`).
- **About**: Contains `Mission`, `Vision`, `Values`, `PastorName`, `PastorBio`, `PastorImage`.
- **Ministries**: Columns for `Title` and `Description`.
- **Schedule**: Columns for `Program`, `Time`, and `Location`.

## Development

### Prerequisites

- Node.js (v16 or higher)
- npm or pnpm

### Setup

```bash
# Install dependencies
npm install
```

### Run Locally

```bash
# Start dev server
npm run dev
```

### Build

```bash
# Build for production
npm run build
```

## Technologies Used

- **React**: UI Library
- **Vite**: Build tool
- **TypeScript**: Type safety
- **Tailwind CSS**: Styling
- **PapaParse**: CSV parsing
- **Lucide React**: Icons
