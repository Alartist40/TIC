# How to Update Website Content with Google Sheets

This guide explains how to create and connect a Google Sheet to the website. This allows you to update content like the "About Us" section, ministry descriptions, and event details without needing to code.

## Key Principles
- **One Sheet, Many Tabs:** All website data is managed in a single Google Sheet. Each tab within this sheet corresponds to a different section of the website (e.g., "About", "Ministries").
- **Key-Value Format:** Most tabs use a simple two-column format: a "Key" column to identify the piece of content (e.g., "Mission") and a "Value" column for the content itself (e.g., "To share the everlasting gospel...").
- **Publish to the Web:** The Google Sheet must be "Published to the web" as a CSV (Comma-Separated Values) file for the website to access the data.

---

## Step 1: Create or Access the Google Sheet

First, you need a Google Sheet. You can either create a new one or use an existing one.

1.  Go to [sheets.google.com](https://sheets.google.com).
2.  Create a new blank sheet or open the one you want to use.
3.  Organize your content into tabs. For example, create a tab named `about` for the "About Us" section.
4.  In the `about` tab, set up your columns. For simple content, you'll need two columns: `Key` and `Value`.

**Example for the "About" tab:**

| Key         | Value                                                 |
|-------------|-------------------------------------------------------|
| Mission     | Our mission is to...                                  |
| Vision      | Our vision is for a community where...                |
| PastorName  | John Doe                                              |
| PastorBio   | Pastor John Doe has been leading our church since...  |
| PastorImage | *URL to the pastor's image*                           |

**Example for the "Ministries" tab:**

The `ministries` tab is a list, where each row represents a single ministry. It requires three columns: `Title`, `Description`, and `ImageLink`.

| Title             | Description                                      | ImageLink                   |
|-------------------|--------------------------------------------------|-----------------------------|
| Children's Ministry | A fun and safe place for kids to learn about God. | *URL to an image*           |
| Youth Group       | Engaging activities for teens and young adults.  | *URL to another image*      |
| Community Service | Making a difference in our local community.      | *URL to a different image*  |


---

## Step 2: Publish Your Google Sheet Tab to the Web

For the website to read your sheet's data, each tab must be published as a public CSV file.

1.  In your Google Sheet, go to **File > Share > Publish to the web**.
2.  In the dialog box that appears, select the specific tab you want to publish (e.g., `about`).
3.  In the dropdown next to it, choose **Comma-separated values (.csv)**.
4.  Click the **Publish** button.
5.  Google will give you a public URL. **Copy this URL.** It's what you'll need for the next step.

---

## Step 3: Connect the Google Sheet to the Website

Now, you need to tell the website where to find your newly published CSV data.

1.  **Locate the Configuration File:** In the codebase, find the file located at `js/services/googleContent.js`. This is where all the Google Sheet URLs are stored.
2.  **Find the `SHEET_URLS` Object:** Inside this file, you will see a constant variable named `SHEET_URLS`. It looks like this:

    ```javascript
    const SHEET_URLS = {
        general: '...',
        about: '...', // <-- This is what you'll update
        ministries: '...',
        // ...and so on
    };
    ```

3.  **Update the URL:** Replace the existing URL for the relevant key (e.g., `about`) with the new URL you copied from Google Sheets in Step 2.

    **Example:**
    If you are updating the "About Us" section, you would change the `about` property:

    ```javascript
    const SHEET_URLS = {
        general: '...',
        about: 'YOUR_NEW_PUBLISHED_GOOGLE_SHEET_URL_HERE', // <-- Paste your new URL
        ministries: '...',
    };
    ```

4.  **Save the File:** Once you have replaced the URL, save the `js/services/googleContent.js` file.

That's it! The website will now fetch the data from your Google Sheet. If you update the content in the Google Sheet, the website will automatically show the latest version after a few minutes (Google's cache may take up to 5 minutes to update).
