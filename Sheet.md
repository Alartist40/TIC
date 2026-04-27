# Google Sheets Guide for TIC Website

This guide explains how to set up and manage the content for your website using Google Sheets.

## 1. Create the Spreadsheet
Create a new Google Sheet. You will need to create 6 tabs (sheets) at the bottom with the following EXACT names:
1.  `General`
2.  `About`
3.  `Ministries`
4.  `Schedule`
5.  `Events`
6.  `Sermons`

## 2. Structure Your Tabs

### Tab 1: General
Use this for site-wide settings.
- **Row 1 Headers**: `Key`, `Value`
- **Keys**:
    - `YoutubeLive`: Link to current live stream or channel (e.g., `https://youtube.com/live/ID`)
    - `ChurchName`: Official name of the church
    - `ChurchPhone`: Contact phone number
    - `ChurchEmail`: Contact email address
    - `Address`: Physical location
    - `ServiceTime`: General service time string
    - `Announcement`: Text for the top announcement banner

### Tab 2: About
Use this for the About section content.
- **Row 1 Headers**: `Key`, `Value`
- **Keys**: `Mission`, `Vision`, `Values`, `PastorName`, `PastorBio`, `PastorImage` (URL to image).

### Tab 3: Ministries
This list generates the cards in the **Ministries** section.
- **Row 1 Headers**: `Title`, `Description`, `Icon`
- **Rows**: Add one row per ministry. `Icon` can be an emoji (e.g., 📚) or a URL to an icon.

### Tab 4: Schedule
This list generates the table in the **Service Times** section.
- **Row 1 Headers**: `Program`, `Time`, `Location`, `Notes`
- **Rows**: Add one row per program (e.g., "Divine Service", "10:30 AM", "Main Hall").

### Tab 5: Events
This list generates event posters and the calendar.
- **Row 1 Headers**: `Title`, `Date`, `Time`, `Description`, `ImageURL`, `RegistrationLink`, `Status`
- **Date format**: YYYY-MM-DD (e.g., 2026-05-15)
- **Time format**: 12-hour (e.g., 2:00 PM)

### Tab 6: Sermons
This list generates the sermon library.
- **Row 1 Headers**: `Title`, `YoutubeID`, `Speaker`, `Date`, `Scripture`, `Duration`, `Status`
- **YoutubeID**: Just the 11-character ID (e.g., dQw4w9WgXcQ), NOT the full URL.

## 3. Connect to Website (Netlify Setup)

The website now uses a secure proxy to fetch data. You do **not** need to publish the sheets to the web as CSV links anymore. Instead, the developer will configure Netlify with your Spreadsheet ID.

1.  **Spreadsheet ID**: Found in the URL of your Google Sheet: `docs.google.com/spreadsheets/d/SPREADSHEET_ID/edit`
2.  **Tab GIDs**: Each tab has a unique GID in the URL: `...#gid=123456789`
3.  Provide the Spreadsheet ID and the GID for each of the 6 tabs to the developer.

**Note**: All changes made in Google Sheets will automatically appear on the website within 5 minutes.
