# Tokyo International Seventh-day Adventist Church Website

## Overview

This repository contains the official website for the Tokyo International Seventh-day Adventist Church. It is a modern, mobile-first, single-page application designed to be both visually engaging and easy for church staff to update.

The project was rebuilt from the ground up to prioritize the mobile user experience and adhere to a specific design philosophy.

## Core Architecture & Design

The website is built with a minimalist "vanilla" technology stack for simplicity and performance, using only **HTML, CSS, and modular JavaScript**. It does not rely on any major frontend frameworks.

The visual design is based on **"The Creation Grid,"** a 7-column layout system. A key feature of this design is the fixed rightmost "Sabbath Column," which remains anchored on the screen, providing a consistent visual identity.

## Content Management via Google Sheets

One of the primary goals of this project is to empower non-developers to manage the website's content. To achieve this, all dynamic data—such as the "About Us" text, pastor's profile, and ministry descriptions—is fetched from a public Google Sheet.

This approach effectively turns a Google Sheet into a simple, user-friendly Content Management System (CMS). For detailed instructions on how to set up and manage the content, please see the `sheet.md` file.

## Running Locally

To preview changes locally, you can run a simple web server from the root of the project. If you have Python 3 installed, you can use the following command:

```bash
python3 -m http.server 8000
```

Then, open your web browser and navigate to `http://localhost:8000`.
