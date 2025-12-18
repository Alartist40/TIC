# Tokyo International Church Website

A responsive, easy-to-maintain website for the Tokyo International Seventh-day Adventist Church.

## Features
- **Mobile-First Design**: Built on a robust 6:1 column grid system.
- **Dynamic Content**: Updates directly from Google Sheets (No coding required for content updates).
- **Multilingual Support**: Home page welcome message cycles through multiple languages.
- **Optimization**: Fast loading, SEO-friendly structure.

## How to Update Content (Google Sheets)
This website pulls data from Google Sheets. To update the website, simply edit the linked Google Sheets.

**Important**: Do not change the header row (Row 1) of the sheets, as the code uses these keys to identify data.

### 1. General Info & Settings
- **Sheet Name**: `General`
- **Columns**: `Key`, `Value`
- **Usage**:
  - `YoutubeLive`: Paste the link to the YouTube channel/livestream.
  - `Bulletin`: Paste the link to the PDF bulletin.

### 2. About Section
- **Sheet Name**: `About`
- **Columns**: `Key`, `Value`
- **Keys**: `Mission`, `Vision`, `Values` (comma-separated), `PastorName`, `PastorBio`, `PastorImage` (URL).

### 3. Ministries
- **Sheet Name**: `Ministries`
- **Columns**: `Title`, `Description`, `Image`, `Tag`, `ModalContent`
- **Usage**: Add rows for each ministry. `ModalContent` supports HTML for detailed views.

### 4. Schedule
- **Sheet Name**: `Schedule`
- **Columns**: `Program`, `Time`, `Location`, `Day`
- **Usage**: defining weekly service times.

## Local Development
1. Clone the repository.
2. Open `index.html` in your browser.
   - Note: Due to CORS policies, reading local files directly might be blocked by some browsers. It's recommended to use a local server (e.g., VS Code "Live Server" extension).
