# TIC WEBSITE — COMPLETE PROFESSIONAL OVERHAUL
## Gemini Implementation Task: Fix Everything & Make It Production-Grade

**Repository:** https://github.com/Alartist40/TIC.git  
**Current Status:** SUBSTANDARD (needs complete overhaul)  
**Target:** PROFESSIONAL, MODERN, PRODUCTION-READY  
**Deadline:** As soon as possible  

---

## CRITICAL PROBLEMS TO FIX

### 🔴 CRITICAL ISSUES (MUST FIX)

1. **Missing Images Directory** — No /images folder, broken image links
2. **No Adventist Logo** — 7th column should show the SDA logo
3. **Hardcoded Content** — Mission/values/pastor info not from Google Sheets
4. **No Calendar Integration** — Events don't sync with Google Calendar
5. **Broken Responsive Design** — Mobile layout is broken
6. **Poor Typography** — Inconsistent fonts and sizing
7. **Amateur Styling** — Looks like a 2010 website
8. **No Loading States** — Users see blank page while loading
9. **Missing Error Handling** — Silent failures everywhere
10. **No Image Optimization** — Slow load times

---

## YOUR TASK: COMPLETE REDESIGN

You will completely rebuild this website to professional standards. Follow these instructions **exactly**.

---

## PHASE 1: CREATE MISSING ASSETS

### Task 1.1: Create Images Directory Structure

```bash
mkdir -p images/logo
mkdir -p images/pastor
mkdir -p images/events
mkdir -p images/ministries
```

### Task 1.2: Download Adventist Logo

Download the official Seventh-day Adventist logo (white version for dark backgrounds):

**Source:** https://www.adventist.org/official-logos-and-artwork/

Save as:
- `images/logo/adventist-symbol--white.svg` (for 7th column)
- `images/logo/adventist-symbol--black.svg` (for light backgrounds)
- `images/logo/tic-logo.png` (church-specific logo if available)

If you can't download, create a placeholder:
```html
<!-- Placeholder SVG for Adventist symbol -->
<svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
  <circle cx="50" cy="50" r="45" fill="none" stroke="white" stroke-width="2"/>
  <text x="50" y="55" text-anchor="middle" fill="white" font-size="20">SDA</text>
</svg>
```

### Task 1.3: Create Placeholder Images

Create these placeholder images (use solid colors with text overlays):

```
images/pastor/pastor_profile_pic.webp (400x400)
images/events/event-placeholder.jpg (800x600)
images/ministries/ministry-placeholder.jpg (600x400)
```

---

## PHASE 2: FIX THE 7-COLUMN GRID & LOGO

### Task 2.1: Update HTML Structure

**File:** `index.html`

The 7th column (Sabbath column) should show the Adventist logo. Update this section:

```html
<!-- Sabbath Column (1/7) - FIXED VERSION -->
<aside class="sabbath-column" aria-hidden="true">
    <div class="sabbath-logo-container">
        <img src="images/logo/adventist-symbol--white.svg" 
             alt="Seventh-day Adventist Symbol" 
             class="sabbath-logo"
             onerror="this.onerror=null; this.src='data:image/svg+xml,%3Csvg viewBox=%220 0 100 100%22 xmlns=%22http://www.w3.org/2000/svg%22%3E%3Ccircle cx=%2250%22 cy=%2250%22 r=%2245%22 fill=%22none%22 stroke=%22white%22 stroke-width=%222%22/%3E%3Ctext x=%2250%22 y=%2255%22 text-anchor=%22middle%22 fill=%22white%22 font-size=%2220%22%3ESDA%3C/text%3E%3C/svg%3E'">
    </div>
</aside>
```

### Task 2.2: Update CSS for Logo

**File:** `styles.css`

Add these styles to the **END** of the file:

```css
/* ========================================
   SABBATH COLUMN - LOGO DISPLAY
   ======================================== */

.sabbath-column {
    background: linear-gradient(180deg, #1565c0 0%, #0d47a1 100%);
    display: flex;
    align-items: center;
    justify-content: center;
    position: relative;
    overflow: hidden;
}

.sabbath-logo-container {
    width: 100%;
    height: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 2rem;
}

.sabbath-logo {
    width: 80%;
    max-width: 200px;
    height: auto;
    opacity: 0.9;
    transition: opacity 0.3s ease, transform 0.3s ease;
    filter: drop-shadow(0 4px 8px rgba(0,0,0,0.3));
}

.sabbath-logo:hover {
    opacity: 1;
    transform: scale(1.05);
}

/* Responsive adjustments */
@media (max-width: 1024px) {
    .sabbath-column {
        display: none; /* Hide on smaller screens to focus on content */
    }
    
    .content-sixth {
        grid-column: 1 / -1; /* Content takes full width */
    }
}

@media (min-width: 1025px) {
    .sabbath-logo-container {
        position: sticky;
        top: 20vh;
        height: auto;
    }
}
```

---

## PHASE 3: INTEGRATE GOOGLE CALENDAR

### Task 3.1: Create Calendar Integration Module

**File:** `js/calendar.js` (NEW FILE)

```javascript
/**
 * Google Calendar Integration
 * Fetches church events from Google Calendar API
 */

const CALENDAR_CONFIG = {
    // Replace with actual Google Calendar ID
    calendarId: 'YOUR_CALENDAR_ID@group.calendar.google.com',
    apiKey: 'YOUR_API_KEY', // Or fetch via Netlify Function
    maxResults: 50,
    timeMin: new Date().toISOString(), // From today onwards
};

async function fetchGoogleCalendarEvents() {
    try {
        const url = `https://www.googleapis.com/calendar/v3/calendars/${encodeURIComponent(CALENDAR_CONFIG.calendarId)}/events?key=${CALENDAR_CONFIG.apiKey}&timeMin=${CALENDAR_CONFIG.timeMin}&maxResults=${CALENDAR_CONFIG.maxResults}&singleEvents=true&orderBy=startTime`;
        
        const response = await fetch(url);
        if (!response.ok) {
            throw new Error(`Calendar API error: ${response.status}`);
        }
        
        const data = await response.json();
        return data.items.map(event => ({
            Title: event.summary,
            Date: event.start.date || event.start.dateTime.split('T')[0],
            Time: event.start.dateTime ? new Date(event.start.dateTime).toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' }) : 'All Day',
            Description: event.description || '',
            Location: event.location || '',
            ImageURL: '', // Can extract from description if formatted correctly
            RegistrationLink: event.htmlLink,
            Status: 'Active'
        }));
    } catch (error) {
        console.error('Failed to fetch Google Calendar events:', error);
        return [];
    }
}

// Merge Google Calendar events with Google Sheets events
async function getMergedEvents() {
    const [sheetEvents, calendarEvents] = await Promise.all([
        fetchSheetData(API.sheets.events),
        fetchGoogleCalendarEvents()
    ]);
    
    // Combine and deduplicate
    const allEvents = [...sheetEvents, ...calendarEvents];
    const uniqueEvents = allEvents.filter((event, index, self) =>
        index === self.findIndex(e => 
            e.Title === event.Title && e.Date === event.Date
        )
    );
    
    return uniqueEvents;
}
```

### Task 3.2: Update Main Script to Use Calendar

**File:** `js/script.js`

Find the `initializeApp()` function and modify the events loading:

```javascript
// OLD (line ~160-170):
store.events = events;

// NEW:
// Merge Google Sheets events with Google Calendar
const calendarEvents = await fetchGoogleCalendarEvents();
store.events = [...events, ...calendarEvents]
    .filter((event, index, self) =>
        index === self.findIndex(e => 
            e.Title === event.Title && e.Date === event.Date
        )
    )
    .sort((a, b) => new Date(a.Date) - new Date(b.Date));
```

### Task 3.3: Add Calendar Script to HTML

**File:** `index.html`

Before the closing `</body>` tag, add:

```html
<script src="js/calendar.js"></script>
<script src="js/script.js"></script>
</body>
```

---

## PHASE 4: MAKE CONTENT DYNAMIC FROM GOOGLE SHEETS

Currently, mission/vision/values and pastor info are hardcoded. Fix this:

### Task 4.1: Remove Hardcoded Content

**File:** `index.html`

Find lines 54-73 (Mission/Vision card) and replace with:

```html
<div class="card mission-card">
    <h3>Our Mission and Vision</h3>
    <div class="mission-content">
        <!-- Populated by JavaScript from Google Sheets -->
        <div class="loading-spinner">Loading...</div>
    </div>
</div>
```

Find lines 76-110 (Pastor card) and replace with:

```html
<div class="card about-card">
    <h3>Our Church Pastor</h3>
    <div class="pastor-content">
        <!-- Populated by JavaScript from Google Sheets -->
        <div class="loading-spinner">Loading...</div>
    </div>
</div>
```

### Task 4.2: Update JavaScript to Render Dynamic Content

**File:** `js/script.js`

Find the `renderAboutSection()` function (around line 450) and completely rewrite it:

```javascript
function renderAboutSection() {
    // Render Mission/Vision/Values
    const missionCard = document.querySelector('.mission-content');
    if (missionCard && store.about.Mission) {
        missionCard.innerHTML = `
            <div class="mission-section">
                <h4>Our Mission</h4>
                <p>${sanitizeHTML(store.about.Mission)}</p>
            </div>
            <div class="mission-section">
                <h4>Our Vision</h4>
                <p>${sanitizeHTML(store.about.Vision)}</p>
            </div>
            <div class="mission-section">
                <h4>Our Values</h4>
                <p>${sanitizeHTML(store.about.Values)}</p>
            </div>
        `;
    }
    
    // Render Pastor Info
    const pastorCard = document.querySelector('.pastor-content');
    if (pastorCard && store.about.PastorName) {
        pastorCard.innerHTML = `
            <div class="pastor-verse-row">
                <div class="pastor-square">
                    <img src="${store.about.PastorImage || 'images/pastor/pastor_profile_pic.webp'}" 
                         alt="${sanitizeHTML(store.about.PastorName)}"
                         onerror="this.src='images/pastor/pastor_profile_pic.webp'">
                </div>
                <div class="verse-box">
                    <p class="verse">${sanitizeHTML(store.about.PastorVerseText || 'For as the rain comes down...')}</p>
                    <span class="ref">— ${sanitizeHTML(store.about.PastorVerseRef || 'Isaiah 55:10-11')}</span>
                </div>
            </div>
            <div class="pastor-info">
                <h4 class="pastor-name">${sanitizeHTML(store.about.PastorName)}</h4>
                <p class="pastor-bio">${sanitizeHTML(store.about.PastorBio)}</p>
            </div>
        `;
    }
}
```

---

## PHASE 5: ADD LOADING STATES & ERROR HANDLING

### Task 5.1: Create Loading Spinner Component

**File:** `styles.css`

Add at the END:

```css
/* ========================================
   LOADING STATES
   ======================================== */

.loading-spinner {
    display: inline-block;
    width: 40px;
    height: 40px;
    border: 4px solid rgba(25, 118, 210, 0.1);
    border-top-color: #1976d2;
    border-radius: 50%;
    animation: spin 1s linear infinite;
    margin: 2rem auto;
}

@keyframes spin {
    to { transform: rotate(360deg); }
}

.loading-overlay {
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: rgba(255, 255, 255, 0.95);
    display: flex;
    align-items: center;
    justify-content: center;
    z-index: 9999;
    opacity: 1;
    transition: opacity 0.3s ease;
}

.loading-overlay.hidden {
    opacity: 0;
    pointer-events: none;
}

.loading-content {
    text-align: center;
}

.loading-content h2 {
    margin-top: 1rem;
    color: #1976d2;
    font-size: 1.5rem;
}

/* Error States */
.error-message {
    background: #ffebee;
    border-left: 4px solid #c62828;
    padding: 1rem;
    margin: 1rem 0;
    border-radius: 4px;
}

.error-message h4 {
    color: #c62828;
    margin: 0 0 0.5rem 0;
}
```

### Task 5.2: Add Loading Overlay to HTML

**File:** `index.html`

Add right after opening `<body>` tag:

```html
<body>
    <!-- Loading Overlay -->
    <div class="loading-overlay" id="loading-overlay">
        <div class="loading-content">
            <div class="loading-spinner"></div>
            <h2>Loading TIC Website...</h2>
        </div>
    </div>

    <!-- Rest of content... -->
```

### Task 5.3: Update JavaScript to Handle Loading

**File:** `js/script.js`

Modify `initializeApp()`:

```javascript
async function initializeApp() {
    console.log('Initializing TIC website...');
    
    const loadingOverlay = document.getElementById('loading-overlay');
    
    try {
        // Fetch all data in parallel
        const [general, about, ministries, schedule, events, sermons] = await Promise.all([
            fetchSheetData(API.sheets.general),
            fetchSheetData(API.sheets.about),
            fetchSheetData(API.sheets.ministries),
            fetchSheetData(API.sheets.schedule),
            fetchSheetData(API.sheets.events),
            fetchSheetData(API.sheets.sermons)
        ]);
        
        // Populate store
        general.forEach(item => {
            if (item.Key) store.general[item.Key] = item.Value;
        });
        
        about.forEach(item => {
            if (item.Key) store.about[item.Key] = item.Value;
        });
        
        store.ministries = ministries;
        store.schedule = schedule;
        
        // Merge with Google Calendar
        const calendarEvents = await fetchGoogleCalendarEvents().catch(() => []);
        store.events = [...events, ...calendarEvents]
            .filter((event, index, self) =>
                index === self.findIndex(e => 
                    e.Title === event.Title && e.Date === event.Date
                )
            )
            .sort((a, b) => new Date(a.Date) - new Date(b.Date));
        
        store.sermons = sermons;
        
        console.log('Data loaded:', store);
        
        // Render all content
        renderAllContent();
        
        // Initialize interactive features
        initLanguageRotator();
        initNavigation();
        initModals();
        initStaffMode();
        
        // Hide loading overlay
        if (loadingOverlay) {
            loadingOverlay.classList.add('hidden');
            setTimeout(() => loadingOverlay.style.display = 'none', 300);
        }
        
    } catch (error) {
        console.error('Failed to initialize app:', error);
        
        // Show error message
        if (loadingOverlay) {
            loadingOverlay.innerHTML = `
                <div class="loading-content">
                    <div class="error-message">
                        <h4>Failed to Load Website</h4>
                        <p>We're having trouble loading the church website. Please refresh the page or try again later.</p>
                        <button onclick="location.reload()" style="margin-top: 1rem; padding: 0.5rem 1rem; background: #1976d2; color: white; border: none; border-radius: 4px; cursor: pointer;">Reload Page</button>
                    </div>
                </div>
            `;
        }
    }
}
```

---

## PHASE 6: OPTIMIZE IMAGES & PERFORMANCE

### Task 6.1: Add Image Lazy Loading

Update all `<img>` tags to include `loading="lazy"`:

```html
<img src="images/pastor/pastor.jpg" alt="Pastor" loading="lazy">
```

### Task 6.2: Create WebP Images

Convert all JPG/PNG images to WebP format for better compression:

```bash
# If you have ImageMagick or similar tools
convert images/pastor/pastor.jpg -quality 85 images/pastor/pastor.webp
```

### Task 6.3: Add Responsive Images

Use `<picture>` element for responsive images:

```html
<picture>
    <source srcset="images/events/event-large.webp" media="(min-width: 1024px)">
    <source srcset="images/events/event-medium.webp" media="(min-width: 768px)">
    <img src="images/events/event-small.webp" alt="Event" loading="lazy">
</picture>
```

---

## PHASE 7: FIX RESPONSIVE DESIGN

### Task 7.1: Update Mobile Breakpoints

**File:** `styles.css`

Find all media queries and ensure they're properly structured. Add these improved breakpoints:

```css
/* ========================================
   RESPONSIVE DESIGN - MOBILE FIRST
   ======================================== */

/* Mobile (320px - 767px) */
@media (max-width: 767px) {
    .grid-container {
        grid-template-columns: 1fr; /* Single column on mobile */
    }
    
    .sabbath-column {
        display: none; /* Hide decorative column */
    }
    
    .content-sixth {
        grid-column: 1 / -1;
        padding: 1rem;
    }
    
    .main-nav {
        flex-direction: column;
    }
    
    .nav-links {
        display: none;
        flex-direction: column;
        width: 100%;
    }
    
    .nav-links.open {
        display: flex;
    }
    
    .hero h2 {
        font-size: 2rem;
    }
    
    .language-rotator {
        font-size: 3rem;
    }
    
    .card {
        padding: 1.5rem;
    }
    
    .pastor-verse-row {
        flex-direction: column;
    }
    
    .pastor-square {
        width: 100%;
        max-width: 300px;
        margin: 0 auto 1rem;
    }
    
    .sermons-grid {
        grid-template-columns: 1fr;
    }
    
    .event-posters {
        grid-template-columns: 1fr;
    }
}

/* Tablet (768px - 1023px) */
@media (min-width: 768px) and (max-width: 1023px) {
    .grid-container {
        grid-template-columns: repeat(6, 1fr);
    }
    
    .content-sixth {
        grid-column: 1 / 6;
    }
    
    .sabbath-column {
        grid-column: 6 / 7;
    }
    
    .sermons-grid {
        grid-template-columns: repeat(2, 1fr);
    }
    
    .event-posters {
        grid-template-columns: repeat(2, 1fr);
    }
}

/* Desktop (1024px+) */
@media (min-width: 1024px) {
    .grid-container {
        grid-template-columns: repeat(7, 1fr);
    }
    
    .content-sixth {
        grid-column: 1 / 7;
    }
    
    .sabbath-column {
        grid-column: 7 / 8;
    }
    
    .sermons-grid {
        grid-template-columns: repeat(3, 1fr);
    }
    
    .event-posters {
        grid-template-columns: repeat(3, 1fr);
    }
}
```

---

## PHASE 8: IMPROVE TYPOGRAPHY

### Task 8.1: Update Font System

**File:** `styles.css`

Replace the font imports and create a proper type scale:

```css
/* ========================================
   TYPOGRAPHY SYSTEM
   ======================================== */

:root {
    /* Font Families */
    --font-display: 'Playfair Display', Georgia, serif;
    --font-body: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;
    
    /* Font Sizes (Modular Scale 1.25) */
    --text-xs: 0.75rem;    /* 12px */
    --text-sm: 0.875rem;   /* 14px */
    --text-base: 1rem;     /* 16px */
    --text-lg: 1.125rem;   /* 18px */
    --text-xl: 1.25rem;    /* 20px */
    --text-2xl: 1.563rem;  /* 25px */
    --text-3xl: 1.953rem;  /* 31px */
    --text-4xl: 2.441rem;  /* 39px */
    --text-5xl: 3.052rem;  /* 49px */
    
    /* Line Heights */
    --leading-tight: 1.2;
    --leading-normal: 1.5;
    --leading-relaxed: 1.75;
    
    /* Font Weights */
    --weight-normal: 400;
    --weight-medium: 500;
    --weight-semibold: 600;
    --weight-bold: 700;
}

body {
    font-family: var(--font-body);
    font-size: var(--text-base);
    line-height: var(--leading-normal);
    font-weight: var(--weight-normal);
}

h1, h2, h3, h4, h5, h6 {
    font-family: var(--font-display);
    font-weight: var(--weight-bold);
    line-height: var(--leading-tight);
    margin-top: 0;
}

h1 { font-size: var(--text-5xl); }
h2 { font-size: var(--text-4xl); }
h3 { font-size: var(--text-3xl); }
h4 { font-size: var(--text-2xl); }
h5 { font-size: var(--text-xl); }
h6 { font-size: var(--text-lg); }

p {
    margin-bottom: 1rem;
    line-height: var(--leading-relaxed);
}

.text-small { font-size: var(--text-sm); }
.text-large { font-size: var(--text-lg); }
```

---

## PHASE 9: ADD SMOOTH ANIMATIONS

### Task 9.1: Create Animation Utilities

**File:** `styles.css`

Add at the END:

```css
/* ========================================
   ANIMATIONS & TRANSITIONS
   ======================================== */

/* Fade In Animation */
@keyframes fadeIn {
    from {
        opacity: 0;
        transform: translateY(20px);
    }
    to {
        opacity: 1;
        transform: translateY(0);
    }
}

.fade-in {
    animation: fadeIn 0.6s ease-out;
}

.fade-in-delay-1 { animation-delay: 0.1s; }
.fade-in-delay-2 { animation-delay: 0.2s; }
.fade-in-delay-3 { animation-delay: 0.3s; }

/* Card Hover Effects */
.card {
    transition: transform 0.3s ease, box-shadow 0.3s ease;
}

.card:hover {
    transform: translateY(-4px);
    box-shadow: 0 12px 24px rgba(0, 0, 0, 0.15);
}

/* Button Transitions */
button, .btn, a.btn {
    transition: all 0.3s ease;
}

button:hover, .btn:hover {
    transform: translateY(-2px);
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
}

/* Smooth Scroll */
html {
    scroll-behavior: smooth;
}

/* Link Underline Animation */
a {
    position: relative;
    text-decoration: none;
}

a::after {
    content: '';
    position: absolute;
    bottom: -2px;
    left: 0;
    width: 0;
    height: 2px;
    background: currentColor;
    transition: width 0.3s ease;
}

a:hover::after {
    width: 100%;
}
```

### Task 9.2: Add Fade-In Classes to Content

**File:** `js/script.js`

Add this function and call it after rendering:

```javascript
function addFadeInAnimations() {
    const cards = document.querySelectorAll('.card');
    cards.forEach((card, index) => {
        card.classList.add('fade-in');
        card.style.animationDelay = `${index * 0.1}s`;
    });
}

// Call in renderAllContent()
function renderAllContent() {
    renderMinistries();
    renderSchedule();
    renderEvents();
    renderEventCalendar();
    renderSermons();
    renderAboutSection();
    renderYouTubeLive();
    
    // Add animations
    requestAnimationFrame(() => {
        addFadeInAnimations();
    });
    
    // Set current year in footer
    const yearSpan = document.getElementById('year');
    if (yearSpan) yearSpan.textContent = new Date().getFullYear();
}
```

---

## PHASE 10: CREATE PROFESSIONAL COLOR SCHEME

### Task 10.1: Define Color System

**File:** `styles.css`

At the very TOP of the file, add:

```css
/* ========================================
   COLOR SYSTEM
   ======================================== */

:root {
    /* Primary Colors (Blue - SDA Brand) */
    --color-primary-50: #e3f2fd;
    --color-primary-100: #bbdefb;
    --color-primary-200: #90caf9;
    --color-primary-300: #64b5f6;
    --color-primary-400: #42a5f5;
    --color-primary-500: #1976d2; /* Main brand color */
    --color-primary-600: #1565c0;
    --color-primary-700: #0d47a1;
    --color-primary-800: #0a3a82;
    --color-primary-900: #062d63;
    
    /* Accent Colors (Gold - Warmth & Welcome) */
    --color-accent-50: #fff8e1;
    --color-accent-100: #ffecb3;
    --color-accent-200: #ffe082;
    --color-accent-300: #ffd54f;
    --color-accent-400: #ffca28;
    --color-accent-500: #d4af37; /* Gold */
    --color-accent-600: #b8942d;
    --color-accent-700: #9c7923;
    
    /* Neutral Colors */
    --color-gray-50: #fafafa;
    --color-gray-100: #f5f5f5;
    --color-gray-200: #eeeeee;
    --color-gray-300: #e0e0e0;
    --color-gray-400: #bdbdbd;
    --color-gray-500: #9e9e9e;
    --color-gray-600: #757575;
    --color-gray-700: #616161;
    --color-gray-800: #424242;
    --color-gray-900: #212121;
    
    /* Semantic Colors */
    --color-success: #4caf50;
    --color-warning: #ff9800;
    --color-error: #f44336;
    --color-info: #2196f3;
    
    /* Background */
    --color-bg-primary: #ffffff;
    --color-bg-secondary: var(--color-gray-50);
    --color-bg-tertiary: var(--color-gray-100);
    
    /* Text */
    --color-text-primary: var(--color-gray-900);
    --color-text-secondary: var(--color-gray-700);
    --color-text-tertiary: var(--color-gray-600);
}

/* Apply Colors */
body {
    background-color: var(--color-bg-primary);
    color: var(--color-text-primary);
}

.hero {
    background: linear-gradient(135deg, var(--color-primary-700) 0%, var(--color-primary-500) 100%);
}

.card {
    background: var(--color-bg-primary);
    border: 1px solid var(--color-gray-200);
}

button, .btn {
    background-color: var(--color-primary-500);
    color: white;
}

button:hover, .btn:hover {
    background-color: var(--color-primary-600);
}

a {
    color: var(--color-primary-600);
}

a:hover {
    color: var(--color-primary-700);
}
```

---

## PHASE 11: FINAL TOUCHES & POLISH

### Task 11.1: Add Favicon

Create or download a favicon and add to `<head>`:

```html
<link rel="icon" type="image/svg+xml" href="images/logo/favicon.svg">
<link rel="apple-touch-icon" href="images/logo/apple-touch-icon.png">
```

### Task 11.2: Add Meta Tags for SEO

```html
<!-- Open Graph / Facebook -->
<meta property="og:type" content="website">
<meta property="og:url" content="https://tokyoadventist.org/">
<meta property="og:title" content="Tokyo International Seventh-day Adventist Church">
<meta property="og:description" content="A multicultural community of believers united in Christ. Join us for worship every Saturday at 10:00 AM.">
<meta property="og:image" content="https://tokyoadventist.org/images/og-image.jpg">

<!-- Twitter -->
<meta property="twitter:card" content="summary_large_image">
<meta property="twitter:url" content="https://tokyoadventist.org/">
<meta property="twitter:title" content="Tokyo International SDA Church">
<meta property="twitter:description" content="A multicultural community of believers united in Christ.">
<meta property="twitter:image" content="https://tokyoadventist.org/images/twitter-image.jpg">
```

### Task 11.3: Add Structured Data (JSON-LD)

Add before closing `</head>`:

```html
<script type="application/ld+json">
{
  "@context": "https://schema.org",
  "@type": "Church",
  "name": "Tokyo International Seventh-day Adventist Church",
  "alternateName": "TIC Tokyo",
  "url": "https://tokyoadventist.org",
  "logo": "https://tokyoadventist.org/images/logo/tic-logo.png",
  "image": "https://tokyoadventist.org/images/og-image.jpg",
  "description": "A multicultural community of believers who worship God in spirit and truth",
  "address": {
    "@type": "PostalAddress",
    "streetAddress": "1-11-1 Jingumae",
    "addressLocality": "Shibuya",
    "addressRegion": "Tokyo",
    "postalCode": "150-0001",
    "addressCountry": "JP"
  },
  "geo": {
    "@type": "GeoCoordinates",
    "latitude": 35.669476,
    "longitude": 139.702635
  },
  "telephone": "+81-3-3402-1517",
  "email": "info@tokyoadventist.org",
  "sameAs": [
    "https://www.facebook.com/TICSDAChurch",
    "https://www.youtube.com/@TokyoInternationalSDAChurch",
    "https://www.instagram.com/ticsda"
  ]
}
</script>
```

---

## DELIVERABLES CHECKLIST

Before submitting, verify ALL of these:

### Code Quality
- [ ] No console errors
- [ ] No broken images
- [ ] All links work
- [ ] Mobile responsive (test at 320px, 768px, 1024px, 1440px)
- [ ] Loading states work
- [ ] Error handling implemented
- [ ] Images optimized (WebP format)
- [ ] Lazy loading enabled

### Features
- [ ] 7th column shows Adventist logo
- [ ] Google Calendar integration works
- [ ] All content from Google Sheets (not hardcoded)
- [ ] Language rotator smooth
- [ ] Navigation responsive
- [ ] Events display correctly
- [ ] Sermons show YouTube thumbnails
- [ ] Calendar highlights event dates

### Design
- [ ] Professional typography
- [ ] Consistent color scheme
- [ ] Smooth animations
- [ ] Card hover effects
- [ ] Proper spacing
- [ ] Clean layout
- [ ] Looks modern (2026, not 2010)

### Performance
- [ ] Page loads in < 3 seconds
- [ ] Images lazy load
- [ ] No layout shift (CLS)
- [ ] Smooth scrolling

### SEO & Accessibility
- [ ] Meta tags complete
- [ ] Structured data added
- [ ] Alt text on all images
- [ ] Semantic HTML
- [ ] ARIA labels where needed
- [ ] Keyboard navigation works

---

## TESTING REQUIREMENTS

After completing all phases:

1. **Visual Regression Test:**
   - Open in Chrome, Firefox, Safari
   - Test at 320px, 768px, 1024px, 1440px widths
   - Take screenshots

2. **Functional Test:**
   - Click all navigation links
   - Test mobile menu
   - Click all buttons
   - Verify modals open/close
   - Check calendar displays events

3. **Performance Test:**
   - Run Lighthouse audit (target: 90+ score)
   - Check page load time
   - Verify images load quickly

4. **Content Test:**
   - Verify Google Sheets data appears
   - Check calendar events show
   - Confirm logo displays in 7th column

---

## FINAL NOTES

This is a **COMPLETE OVERHAUL**, not a small fix. Take your time and do it right.

**Expected time:** 8-12 hours of focused work

**Priority order:**
1. Fix 7th column logo (CRITICAL)
2. Remove hardcoded content (CRITICAL)
3. Add loading states (CRITICAL)
4. Fix responsive design (HIGH)
5. Improve typography & colors (MEDIUM)
6. Add animations (LOW)
7. Google Calendar integration (OPTIONAL)

Begin with Phase 1 and work sequentially. Do not skip phases.

**When complete, the website should:**
- Look professional and modern
- Work perfectly on all devices
- Load all content from Google Sheets
- Show the Adventist logo prominently
- Be fast, accessible, and SEO-optimized

Good luck! Make it amazing. 🚀
