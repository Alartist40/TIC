# Google Sheets Guide for TIC Website

This guide explains how to set up and manage the content for your website using Google Sheets.

## 1. Create the Spreadsheet
Create a new Google Sheet. You will need to create 4 tabs (sheets) at the bottom with the following EXACT names:
1.  `General`
2.  `About`
3.  `Ministries`
4.  `Schedule`

## 2. Structure Your Tabs

### Tab 1: General
Use this for site-wide settings.
- **Row 1 Headers**: `Key`, `Value`
- **Data Examples**:
    - `YoutubeLive`: `https://youtube.com/...`
    - `Announcement`: `Join us for special service!`

### Tab 2: About
Use this for the About section content.
- **Row 1 Headers**: `Key`, `Value`
- **Keys**: `Mission`, `Vision`, `Values`, `PastorName`, `PastorBio`, `PastorImage` (URL).

### Tab 3: Ministries
This list generates the cards in the **Ministries** section.
- **Row 1 Headers**: `Title`, `Description`
- **Rows**: Add one row per ministry.
    - If you add a row, a new card appears.
    - If you delete a row, the card disappears.

### Tab 4: Schedule
This list generates the table in the **Service Times** section.
- **Row 1 Headers**: `Program`, `Time`, `Location`
- **Rows**: Add one row per program (e.g., "Sabbath School", "10:00 AM", "Main Hall").

## 3. Connect to Website (Publish as CSV)
For the website to read the data, you must "Publish" each tab as a CSV file.

1.  Go to `File` > `Share` > `Publish to web`.
2.  Under "Link", select a specific tab (e.g., "Ministries") instead of "Entire Document".
3.  Change "Web page" to **"Comma-separated values (.csv)"**.
4.  Click `Publish`.
5.  Copy the generated link.
6.  Repeat for all 4 tabs.

**Note**: You will need to provide these 4 links to the developer to update the `script.js` file, or update them yourself in `js/script.js` under `SHEET_URLS`.
