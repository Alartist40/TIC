# Tokyo International Seventh-day Adventist Church Website

A modern, responsive website for the Tokyo International Seventh-day Adventist Church (TIC), built with a unique 6:1 grid layout and integrated with Google Sheets for easy content management.

## Features

- **6:1 Grid Layout**: A consistent design that allocates 6 parts of the viewport to main content and 1 part to a dedicated "Sabbath" column.
- **Dynamic Content**: Most website details (Mission, Pastor Bio, Service Times, Ministries) are fetched directly from a Google Sheet.
- **Multilingual Hero**: A welcoming section that rotates through multiple languages.
- **Sticky Navigation**: Easy access to sections as you scroll.
- **Sabbath Grid Transition**: The rightmost column transitions from the primary church blue to white as you scroll to the bottom.
- **Mobile Responsive**: Optimized for all devices with a 6:1 ratio and a functional mobile menu.

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
3.  **Update URLs**: Copy the generated CSV URLs for each tab and update them in `js/app.js` under the `SHEET_URLS` constant.

### Tab Details

- **General**: Key-Value pairs for site-wide settings (e.g., `YoutubeLive`).
- **About**: Contains `Mission`, `Vision`, `Values`, `PastorName`, `PastorBio`, and `PastorImage`.
- **Ministries**: Columns for `Title` and `Description`.
- **Schedule**: Columns for `Program`, `Time`, and `Location`.
- **Sermons**: Placeholder for future sermon data.

## Technologies Used

- **HTML5/CSS3**: Core structure and design.
- **JavaScript (ES6+)**: Logic and dynamic rendering.
- **PapaParse**: For parsing Google Sheets CSV data.
- **Google Fonts**: Inter and Playfair Display.

## Development

To run the project locally, simply open `index.html` in a web browser. Note that Google Sheet data fetching requires an active internet connection.
