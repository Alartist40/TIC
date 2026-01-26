# Managing Website Content with Google Sheets

This document provides instructions for managing dynamic content on the Tokyo International Seventh-day Adventist Church website using Google Sheets. This allows non-developers to easily update specific sections of the site.

## General Instructions

1.  **Open the Google Sheet**: Access the provided Google Sheet URL for the section you wish to update.
2.  **Edit the Content**: Make changes to the text and links in the sheet. Make sure to follow the specific structure and column headers for each section.
3.  **Publish the Sheet**: For the changes to appear on the website, the sheet must be published to the web. To do this, go to `File > Share > Publish to web`.
4.  **Publish as CSV**: In the "Publish to the web" dialog, ensure that you select "Comma-separated values (.csv)" as the format.
5.  **Copy the URL**: Copy the generated URL and provide it to the developer to update the website's configuration.

---

## "Visit Us" Service Times

### Google Sheet Structure

The "Visit Us" service times are managed by a Google Sheet with the following columns:

| Program | Day & Time | Location |
| :--- | :--- | :--- |
| Sabbath School | Saturdays 9:00 – 10:30 | Assembly Hall (1F) |
| Divine Service | Saturdays 10:30 – 12:00 | Assembly Hall (1F) |
| Afternoon Program | Saturdays 14:00 – 16:00 | Assembly Hall (1F) |

*   `Program`: The name of the service or event.
*   `Day & Time`: The day and time of the service.
*   `Location`: The location of the service.

### Updating the URL

To update the URL for the "Visit Us" service times, please provide the new published Google Sheet URL to the developer. The developer will update the `SHEET_URLS.visit` variable in the `js/script.js` file.
