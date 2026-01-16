# Architecture

This document provides a detailed guide to the architecture of the Tokyo International Seventh-day Adventist Church website.

## File Structure

The website is structured as follows:

-   `index.html`: The main HTML file for the website.
-   `styles.css`: The main stylesheet for the website.
-   `js/`: This directory contains all the JavaScript files.
    -   `app.js`: The main JavaScript file, which initializes the UI and loads the content.
    -   `components/`: This directory contains the JavaScript files for rendering the different components of the website.
        -   `renderGallery.js`: Renders the ministry cards.
        -   `renderPastor.js`: Renders the pastor's information.
        -   `renderSchedule.js`: Renders the service schedule.
        -   `renderEvents.js`: Renders the event cards.
    -   `services/`: This directory contains the JavaScript files for fetching data from external sources.
        -   `googleContent.js`: Fetches data from Google Sheets.
-   `images/`: This directory contains all the images for the website.

## Content Management

The content of the website is managed through Google Sheets. This makes it easy to update the website without having to touch any code.

The following Google Sheets are used:

-   **General:** Contains general information about the church, such as the YouTube Live link.
-   **About:** Contains information about the church's mission, vision, and values, as well as the pastor's information.
-   **Ministries:** Contains information about the church's ministries.
-   **Sermons:** Contains information about the church's sermons.
-   **Schedule:** Contains the church's service schedule.
-   **Events:** Contains information about the church's events.

To update the content of the website, you just need to update the corresponding Google Sheet. The website will automatically update with the new content.

## Features

The website has the following features:

-   **Responsive Layout:** The website is designed to work on all devices, from desktops to smartphones.
-   **Dynamic Content:** The content of the website is loaded dynamically from Google Sheets.
-   **"See More" Functionality:** The "Visit Us" section has a "See More" button that allows users to expand and collapse the content.
-   **Event Card System:** The website has a system for displaying event posters and details as cards.
-   **Back to Top Button:** The website has a "Back to Top" button that allows users to quickly scroll to the top of the page.
-   **Multilingual Welcome:** The hero section displays the word "Welcome" in multiple languages.

## How to Update Content

To update the content of the website, you need to edit the Google Sheets. Here are the links to the Google Sheets:

-   **General:** [https://docs.google.com/spreadsheets/d/e/2PACX-1vTW2lUOC_ogYTvWIo_thDUo_NvQbJd-vBnnuXo0YQ36-QQPi22uvQjtqy9pAqtWlXom0HwVHSdBCMj7/pub?gid=2118403729&single=true&output=csv](https://docs.google.com/spreadsheets/d/e/2PACX-1vTW2lUOC_ogYTvWIo_thDUo_NvQbJd-vBnnuXo0YQ36-QQPi22uvQjtqy9pAqtWlXom0HwVHSdBCMj7/pub?gid=2118403729&single=true&output=csv)
-   **About:** [https://docs.google.com/spreadsheets/d/e/2PACX-1vTW2lUOC_ogYTvWIo_thDUo_NvQbJd-vBnnuXo0YQ36-QQPi22uvQjtqy9pAqtWlXom0HwVHSdBCMj7/pub?gid=1587976413&single=true&output=csv](https://docs.google.com/spreadsheets/d/e/2PACX-1vTW2lUOC_ogYTvWIo_thDUo_NvQbJd-vBnnuXo0YQ36-QQPi22uvQjtqy9pAqtWlXom0HwVHSdBCMj7/pub?gid=1587976413&single=true&output=csv)
-   **Ministries:** [https://docs.google.com/spreadsheets/d/e/2PACX-1vTW2lUOC_ogYTvWIo_thDUo_NvQbJd-vBnnuXo0YQ36-QQPi22uvQjtqy9pAqtWlXom0HwVHSdBCMj7/pub?gid=0&single=true&output=csv](https://docs.google.com/spreadsheets/d/e/2PACX-1vTW2lUOC_ogYTvWIo_thDUo_NvQbJd-vBnnuXo0YQ36-QQPi22uvQjtqy9pAqtWlXom0HwVHSdBCMj7/pub?gid=0&single=true&output=csv)
-   **Sermons:** [https://docs.google.com/spreadsheets/d/e/2PACX-1vTW2lUOC_ogYTvWIo_thDUo_NvQbJd-vBnnuXo0YQ36-QQPi22uvQjtqy9pAqtWlXom0HwVHSdBCMj7/pub?gid=708079300&single=true&output=csv](https://docs.google.com/spreadsheets/d/e/2PACX-1vTW2lUOC_ogYTvWIo_thDUo_NvQbJd-vBnnuXo0YQ36-QQPi22uvQjtqy9pAqtWlXom0HwVHSdBCMj7/pub?gid=708079300&single=true&output=csv)
-   **Schedule:** [https://docs.google.com/spreadsheets/d/e/2PACX-1vTW2lUOC_ogYTvWIo_thDUo_NvQbJd-vBnnuXo0YQ36-QQPi22uvQjtqy9pAqtWlXom0HwVHSdBCMj7/pub?gid=786496350&single=true&output=csv](https://docs.google.com/spreadsheets/d/e/2PACX-1vTW2lUOC_ogYTvWIo_thDUo_NvQbJd-vBnnuXo0YQ36-QQPi22uvQjtqy9pAqtWlXom0HwVHSdBCMj7/pub?gid=786496350&single=true&output=csv)

To get the URL for the new "Events" Google Sheet, please follow the instructions I sent you earlier. Once you have the URL, you'll need to add it to the `SHEET_URLS` object in `js/app.js`.
