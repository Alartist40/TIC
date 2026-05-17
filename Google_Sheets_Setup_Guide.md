# Google Sheets Setup Guide — Tokyo International Church Website

This guide will walk you through connecting the TIC website to your Google Sheets so the church can manage all content without needing a developer.

---

## Table of Contents

1. [Quick Overview](#quick-overview)
2. [Step 1: Create Your Google Sheet](#step-1-create-your-google-sheet)
3. [Step 2: Import the Template Data](#step-2-import-the-template-data)
4. [Step 3: Publish Each Sheet as CSV](#step-3-publish-each-sheet-as-csv)
5. [Step 4: Get Your Sheet URLs](#step-4-get-your-sheet-urls)
6. [Step 5: Connect the URLs to the Website](#step-5-connect-the-urls-to-the-website)
7. [Sheet Reference](#sheet-reference)
8. [Ministry Cards — Using Photos Instead of Emojis](#ministry-cards--using-photos-instead-of-emojis)
9. [YouTube Integration Guide](#youtube-integration-guide)
10. [Google Calendar Integration Guide](#google-calendar-integration-guide)
11. [FAQ](#faq)

---

## Quick Overview

The website reads data from 6 Google Sheets. Each sheet controls a different section of the website:

| Sheet | Controls |
|-------|----------|
| **General** | Church name, phone, email, YouTube links |
| **About** | Mission, vision, values, pastor info |
| **Ministries** | Ministry cards (auto-generates new cards!) |
| **Schedule** | Service times table |
| **Events** | Upcoming event cards and calendar |
| **Sermons** | Sermon library with YouTube thumbnails |

**Key principle:** Add a row to Ministries sheet = a new ministry card appears on the website automatically. Delete a row = it disappears. No code changes needed!

---

## Step 1: Create Your Google Sheet

1. Go to [Google Sheets](https://sheets.new) (or [Google Drive](https://drive.google.com) → New → Google Sheets)
2. Name your spreadsheet: `TIC Church Website Data`
3. You now have a blank spreadsheet with one tab called "Sheet1"

---

## Step 2: Import the Template Data

I have provided 6 CSV template files. Import each one as a new tab:

### For each CSV file:

1. Download the CSV files I provided (named `01_General.csv`, `02_About.csv`, etc.)
2. In Google Sheets, click the **+ (plus)** icon at the bottom to create a new tab
3. Name the tab exactly as specified (case-sensitive!):
   - `General`
   - `About`
   - `Ministries`
   - `Schedule`
   - `Events`
   - `Sermons`
4. With the new tab selected, go to **File → Import**
5. Click **Upload** and select the matching CSV file
6. Under "Import action", choose **Replace spreadsheet**
7. Click **Import data**

**Repeat for all 6 CSV files.** You should end up with 6 tabs total.

### Delete the default "Sheet1" tab:
Right-click on "Sheet1" → Click **Delete** → Confirm.

---

## Step 3: Publish Each Sheet as CSV

The website reads data as CSV (Comma Separated Values). You need to publish each tab:

### Method A: Publish the Entire Spreadsheet (Recommended)

1. Go to **File → Share → Publish to web** (NOT "Share with people")
2. In the dialog:
   - Under "Link", select the first tab from the dropdown (e.g., `General`)
   - Change the format dropdown from "Web page" to **"Comma-separated values (.csv)"**
   - Click **Publish**
   - Click **OK** to confirm
3. **Repeat for EACH of the 6 tabs** — you need to select each tab and publish it

### Method B: Publish the Entire Document (Alternative)

1. Go to **File → Share → Publish to web**
2. Under "Entire Document", change format to **"Comma-separated values (.csv)"**
3. Click **Publish**
4. This gives you one URL that works for all tabs

---

## Step 4: Get Your Sheet URLs

### For Method A (individual tab URLs):

When you publish each tab, Google gives you a URL like:
```
https://docs.google.com/spreadsheets/d/e/2PACX-.../pub?gid=0&single=true&output=csv
```

Each tab has a unique `gid=` number. Copy each URL and label which tab it belongs to.

### For Method B (entire document URL):

You'll get one URL like:
```
https://docs.google.com/spreadsheets/d/e/2PACX-.../pub?output=csv
```

**To get each individual tab's URL**, add `&gid=X` where X is the tab's GID:

1. Look at the bottom of your spreadsheet — each tab shows a URL when you hover
2. The `gid=` value in that URL is what you need
3. Alternatively, right-click each tab → "Copy link" → extract the gid number

---

## Step 5: Connect the URLs to the Website

### Option 1: Edit the Code (For Developers)

Open `src/services/sheets.ts` in the project:

```typescript
const SHEET_URLS = {
  general: 'YOUR_GENERAL_CSV_URL_HERE',
  about: 'YOUR_ABOUT_CSV_URL_HERE',
  ministries: 'YOUR_MINISTRIES_CSV_URL_HERE',
  schedule: 'YOUR_SCHEDULE_CSV_URL_HERE',
  events: 'YOUR_EVENTS_CSV_URL_HERE',
  sermons: 'YOUR_SERMONS_CSV_URL_HERE',
};
```

Replace each URL with your published CSV URL.

### Option 2: Environment Variables (Recommended for Production)

Create a `.env` file:

```
VITE_SHEET_GENERAL=your_general_csv_url
VITE_SHEET_ABOUT=your_about_csv_url
VITE_SHEET_MINISTRIES=your_ministries_csv_url
VITE_SHEET_SCHEDULE=your_schedule_csv_url
VITE_SHEET_EVENTS=your_events_csv_url
VITE_SHEET_SERMONS=your_sermons_csv_url
```

Then update `sheets.ts` to read from `import.meta.env.VITE_SHEET_*`.

### Option 3: Use a Proxy (Most Secure)

For a production website, use a Netlify Function or similar serverless function to proxy requests. This keeps your Google Sheet URLs hidden from the public.

---

## Sheet Reference

### General Sheet (Key-Value pairs)

| Key | Description | Example |
|-----|-------------|---------|
| `ChurchName` | Full church name | Tokyo International SDA Church |
| `ChurchPhone` | Contact phone | +81 3-3402-1517 |
| `ChurchEmail` | Contact email | info@tokyoadventist.org |
| `Address` | Full address | 1-11-1 Jingumae, Shibuya... |
| `YoutubeChannel` | YouTube channel URL | https://www.youtube.com/@... |
| `YoutubeLive` | Live stream URL (when active) | Leave blank when no live stream |
| `GoogleCalendarID` | Calendar ID for embed | See Calendar section below |
| `Announcement` | Optional banner text | Leave blank for no banner |

### About Sheet (Key-Value pairs)

| Key | Description |
|-----|-------------|
| `Mission` | Church mission statement |
| `Vision` | Church vision statement |
| `Values` | Core values text |
| `PastorName` | Pastor's full name |
| `PastorBio` | Pastor's biography |
| `PastorImage` | URL to pastor's photo (or leave blank) |
| `PastorVerseText` | Pastor's favorite verse text |
| `PastorVerseRef` | Verse reference (e.g., "Jeremiah 29:11") |

### Ministries Sheet (One row = one card)

| Column | Description |
|--------|-------------|
| `Title` | Ministry name (required) |
| `Description` | Short description |
| `Icon` | Emoji OR image URL. See below for image instructions. |

**To add a ministry:** Just add a new row. The website will automatically create a card with the same styling as all other cards.

**To remove a ministry:** Delete the row. The card disappears.

### Schedule Sheet (One row = one program)

| Column | Description |
|--------|-------------|
| `Program` | Program name (e.g., "Sabbath School") |
| `Time` | Time (e.g., "9:30 AM") |
| `Location` | Room or location |
| `Notes` | Optional notes |

### Events Sheet (One row = one event)

| Column | Description |
|--------|-------------|
| `Title` | Event name |
| `Date` | Date in YYYY-MM-DD format |
| `Time` | Time (e.g., "6:00 PM") |
| `Description` | Event description |
| `ImageURL` | URL to event poster image (optional) |
| `RegistrationLink` | Registration URL (optional) |
| `Status` | "Active" or "Inactive" |

**Events are automatically filtered** — only future events are shown, sorted by date.

### Sermons Sheet (One row = one sermon)

| Column | Description |
|--------|-------------|
| `Title` | Sermon title |
| `YoutubeID` | The 11-character YouTube video ID |
| `Speaker` | Speaker name |
| `Date` | Date in YYYY-MM-DD format |
| `Scripture` | Scripture reference (optional) |
| `Duration` | Duration (e.g., "42 min") |
| `Status` | "Active" or "Inactive" |

---

## Ministry Cards — Using Photos Instead of Emojis

The `Icon` column supports two formats:

### 1. Emoji (Simple)
Just type an emoji in the cell:
```
🧒
🙌
📖
```

### 2. Image URL (Recommended for a professional look)
Upload photos to Google Drive, make them publicly accessible, and paste the URL:

1. Upload ministry group photos to **Google Drive**
2. Right-click the image → **Share** → **Anyone with the link**
3. Copy the link (it looks like: `https://drive.google.com/file/d/FILE_ID/view`)
4. Convert to a direct image URL:
   - Change the URL format to: `https://drive.google.com/uc?export=view&id=FILE_ID`
   - OR use: `https://lh3.googleusercontent.com/d/FILE_ID`
5. Paste this URL in the `Icon` column

**The website will automatically detect it's an image** and display it as a card header photo instead of an emoji.

### Tips for Ministry Photos:
- Use group photos of the ministry members
- Use ministry logos if you have them
- Recommended size: 600x400 pixels
- The image will fill the top of the card (160px height)

---

## YouTube Integration Guide

### What Works Now:
- The website has a **"Visit Our YouTube Channel"** button that links to your channel
- The **Sermons section** displays sermon cards with thumbnails (from the Sermons sheet)
- The **YouTubeID** column in the Sermons sheet just needs the 11-character video ID
- When you click a sermon card, it opens the YouTube video in a new tab

### For Auto-Fetching Latest Videos (Advanced):
To automatically pull the latest videos from YouTube, you need the **YouTube Data API**. This requires:

1. A Google Cloud project
2. Enabling the YouTube Data API v3
3. Creating an API key
4. Updating the website code to fetch from YouTube

**This is NOT required** — the current system using the Sermons sheet works perfectly. Just add new sermon rows with the YouTube video IDs and they appear on the site.

### To Add a Live Stream:
When you're live streaming, paste the YouTube live stream URL into the `YoutubeLive` cell in the General sheet. The website will automatically embed the live player. When the stream ends, clear the cell.

---

## Google Calendar Integration Guide

### The Calendar Section Has Two Parts:

**Part 1: Interactive Calendar Grid** (Built-in)
- Shows a monthly calendar with event dots
- Events come from the **Events sheet** in your Google Sheet
- Click a day with a dot to see event details
- Fully functional without any Google Calendar connection

**Part 2: Google Calendar Embed** (Optional)
To embed your actual Google Calendar:

1. Go to [Google Calendar](https://calendar.google.com)
2. Find your church calendar (or create one)
3. Click the **three dots** next to the calendar name → **Settings and sharing**
4. Scroll down to **"Integrate calendar"**
5. Copy the **Calendar ID** (looks like: `abc123@group.calendar.google.com`)
6. Paste this ID into the `GoogleCalendarID` cell in the General sheet

The website will then:
- Embed the full Google Calendar view
- Show an "Add to My Calendar" button

---

## FAQ

**Q: How long do changes take to appear?**
A: The website refreshes data every 5 minutes. Changes in your Google Sheet appear automatically within 5 minutes.

**Q: Can multiple people edit the sheet?**
A: Yes! Share the Google Sheet with your church team. Anyone with edit access can add ministries, events, etc.

**Q: What if I accidentally delete a row?**
A: Google Sheets has version history. Go to File → Version history → See version history to restore.

**Q: Can I add extra columns?**
A: Extra columns won't break anything, but they won't be used by the website either. Stick to the defined columns.

**Q: What image hosting should I use for event posters?**
A: Google Drive works well. Upload the image, make it publicly viewable, and use the direct link. You can also use any image hosting service (Imgur, Cloudinary, etc.).

**Q: How do I get the YouTube video ID?**
A: Open any YouTube video. The URL looks like `youtube.com/watch?v=ABC123xyz`. The part after `v=` is the ID (11 characters).

**Q: Do I need to know code to update the website?**
A: **No!** Once the initial setup is done, everything is managed through Google Sheets. Add rows for new ministries/events. Edit cells to update text. No code needed.
