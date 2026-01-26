# Google Sheets Integration Architecture

## **Overview**

This document details the Google Sheets API integration for the Tokyo International SDA Church website, enabling non-technical staff to update content through familiar Google Sheets interfaces.

## **Google Sheets Structure**

### **1. schedule-data Sheet**
**Purpose:** Service times and locations management
**Sheet ID:** `schedule-data`
**Range:** `A1:D100`

**Columns:**
| Column | Header | Description | Example |
|--------|--------|-------------|---------|
| A | program | Service/program name | Sabbath School |
| B | day_time | Day and time | Saturdays 9:00 – 10:30 |
| C | location | Physical location | Assembly Hall (1F) |
| D | notes | Additional information | Zoom 808-212-7314 |

**Sample Data:**
```
| program | day_time | location | notes |
|---------|----------|----------|-------|
| Sabbath School | Saturdays 9:00 – 10:30 | Assembly Hall (1F) | |
| Divine Service | Saturdays 10:30 – 12:00 | Assembly Hall (1F) | |
| Midweek Connection | Wednesdays 19:30 – 20:30 | Zoom 808-212-7314 | |
```

### **2. pastor-data Sheet**
**Purpose:** Pastor bio and family information
**Sheet ID:** `pastor-data`
**Range:** `A1:G10`

**Columns:**
| Column | Header | Description | Example |
|--------|--------|-------------|---------|
| A | pastor_name | Pastor's full name | Guenji Imayuki |
| B | pastor_title | Official title | Senior Pastor |
| C | pastor_bio | Professional bio | Second-generation Japanese born in Brazil... |
| D | pastor_image | Image filename | pastor_profile_pic.webp |
| E | spouse_name | Spouse's name | Eliane Hosokawa Imayuki |
| F | spouse_bio | Spouse's bio | Comes from a pastoral family... |
| G | favorite_verse | Favorite scripture | Isaiah 55:10-11 |

**Sample Data:**
```
| pastor_name | pastor_title | pastor_bio | pastor_image | spouse_name | spouse_bio | favorite_verse |
|-------------|--------------|------------|--------------|-------------|------------|----------------|
| Guenji Imayuki | Senior Pastor | Second-generation Japanese born in Brazil... | pastor_profile_pic.webp | Eliane Hosokawa Imayuki | Comes from a pastoral family... | Isaiah 55:10-11 |
```

### **3. ministries-data Sheet**
**Purpose:** Ministry descriptions and details
**Sheet ID:** `ministries-data`
**Range:** `A1:F50`

**Columns:**
| Column | Header | Description | Example |
|--------|--------|-------------|---------|
| A | ministry_name | Ministry name | Media Ministry |
| B | ministry_description | Short description | Transforming pixels into pulpits... |
| C | ministry_details | Detailed content | Full ministry details including schedule... |
| D | ministry_image | Image filename | media-ministry.jpg |
| E | sub_ministries | Sub-ministries (JSON) | `[{"name": "Pathfinders", "description": "..."}]` |
| F | is_active | Active status | TRUE |

**Sample Data:**
```
| ministry_name | ministry_description | ministry_details | ministry_image | sub_ministries | is_active |
|---------------|---------------------|------------------|----------------|----------------|-----------|
| Media Ministry | Transforming pixels into pulpits... | Full details including volunteer schedule... | media-ministry.jpg | [{"name":"Youth Media","desc":"..."}] | TRUE |
```

### **4. bulletin-data Sheet**
**Purpose:** Weekly bulletin content
**Sheet ID:** `bulletin-data`
**Range:** `A1:D20`

**Columns:**
| Column | Header | Description | Example |
|--------|--------|-------------|---------|
| A | bulletin_date | Date of bulletin | 2024-01-06 |
| B | bulletin_title | Bulletin title | Weekly Bulletin - Jan 6 |
| C | bulletin_pdf_url | PDF file URL | https://drive.google.com/... |
| D | bulletin_summary | Brief summary | This week's announcements and events... |

**Sample Data:**
```
| bulletin_date | bulletin_title | bulletin_pdf_url | bulletin_summary |
|---------------|----------------|------------------|-----------------|
| 2024-01-06 | Weekly Bulletin - Jan 6 | https://drive.google.com/... | This week's announcements... |
```

## **API Integration Architecture**

### **1. API Endpoint Structure**
```
https://sheets.googleapis.com/v4/spreadsheets/{spreadsheetId}/values/{range}?key={API_KEY}
```

**Example:**
```
https://sheets.googleapis.com/v4/spreadsheets/1aBcD.../values/schedule-data!A1:D100?key=AIzaSy...
```

### **2. JavaScript Integration Pattern**

#### **Core API Function**
```javascript
/**
 * Load data from Google Sheets
 * @param {string} sheetId - Google Sheet ID
 * @param {string} range - Range to fetch (e.g., "A1:D100")
 * @returns {Promise<Object>} - Sheet data in JSON format
 */
async function loadSheetData(sheetId, range) {
    try {
        const response = await fetch(`https://sheets.googleapis.com/v4/spreadsheets/${sheetId}/values/${range}?key=${API_KEY}`);
        
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        
        const data = await response.json();
        return data;
    } catch (error) {
        console.error('Error loading sheet data:', error);
        return null;
    }
}
```

#### **Data Processing Function**
```javascript
/**
 * Process raw sheet data into usable format
 * @param {Object} rawData - Raw sheet data from API
 * @param {Array} headers - Column headers mapping
 * @returns {Array} - Processed data array
 */
function processSheetData(rawData, headers) {
    if (!rawData || !rawData.values) return [];
    
    const [headerRow, ...dataRows] = rawData.values;
    const processedData = dataRows.map(row => {
        const item = {};
        headers.forEach((header, index) => {
            item[header] = row[index] || '';
        });
        return item;
    });
    
    return processedData;
}
```

### **3. Sheet-Specific Integration Functions**

#### **Schedule Data Integration**
```javascript
/**
 * Load and process schedule data
 * @returns {Promise<Array>} - Processed schedule data
 */
async function loadScheduleData() {
    const rawData = await loadSheetData(SHEET_IDS.schedule, 'A1:D100');
    if (!rawData) return null;
    
    const headers = ['program', 'day_time', 'location', 'notes'];
    const scheduleData = processSheetData(rawData, headers);
    
    // Add color coding based on program type
    return scheduleData.map(item => ({
        ...item,
        color: getProgramColor(item.program)
    }));
}

/**
 * Get color for program type
 */
function getProgramColor(program) {
    const colors = {
        'Sabbath School': '#005eb8',
        'Divine Service': '#d4af37',
        'Midweek Connection': '#28a745',
        'Vespers': '#6f42c1',
        'default': '#6c757d'
    };
    return colors[program] || colors.default;
}
```

#### **Pastor Data Integration**
```javascript
/**
 * Load and process pastor data
 * @returns {Promise<Object>} - Processed pastor data
 */
async function loadPastorData() {
    const rawData = await loadSheetData(SHEET_IDS.pastor, 'A1:G10');
    if (!rawData) return null;
    
    const headers = ['pastor_name', 'pastor_title', 'pastor_bio', 'pastor_image', 'spouse_name', 'spouse_bio', 'favorite_verse'];
    const pastorData = processSheetData(rawData, headers);
    
    // Return first pastor (assuming single pastor)
    return pastorData[0] || null;
}
```

#### **Ministries Data Integration**
```javascript
/**
 * Load and process ministries data
 * @returns {Promise<Array>} - Processed ministries data
 */
async function loadMinistriesData() {
    const rawData = await loadSheetData(SHEET_IDS.ministries, 'A1:F50');
    if (!rawData) return null;
    
    const headers = ['ministry_name', 'ministry_description', 'ministry_details', 'ministry_image', 'sub_ministries', 'is_active'];
    const ministriesData = processSheetData(rawData, headers);
    
    // Parse sub-ministries JSON and filter active ministries
    return ministriesData
        .filter(ministry => ministry.is_active === 'TRUE')
        .map(ministry => ({
            ...ministry,
            sub_ministries: ministry.sub_ministries ? JSON.parse(ministry.sub_ministries) : []
        }));
}
```

#### **Bulletin Data Integration**
```javascript
/**
 * Load and process bulletin data
 * @returns {Promise<Array>} - Processed bulletin data
 */
async function loadBulletinData() {
    const rawData = await loadSheetData(SHEET_IDS.bulletin, 'A1:D20');
    if (!rawData) return null;
    
    const headers = ['bulletin_date', 'bulletin_title', 'bulletin_pdf_url', 'bulletin_summary'];
    const bulletinData = processSheetData(rawData, headers);
    
    // Sort by date (newest first)
    return bulletinData.sort((a, b) => new Date(b.bulletin_date) - new Date(a.bulletin_date));
}
```

## **Caching Strategy**

### **1. Local Storage Cache**
```javascript
/**
 * Get cached data with TTL check
 * @param {string} key - Cache key
 * @param {number} ttl - Time-to-live in milliseconds (default: 1 hour)
 * @returns {Object|null} - Cached data or null if expired
 */
function getCachedData(key, ttl = 3600000) {
    const cached = localStorage.getItem(key);
    if (!cached) return null;
    
    const { data, timestamp } = JSON.parse(cached);
    const now = Date.now();
    
    if (now - timestamp > ttl) {
        localStorage.removeItem(key);
        return null;
    }
    
    return data;
}

/**
 * Set data in cache with timestamp
 * @param {string} key - Cache key
 * @param {Object} data - Data to cache
 */
function setCachedData(key, data) {
    const cacheData = {
        data,
        timestamp: Date.now()
    };
    localStorage.setItem(key, JSON.stringify(cacheData));
}
```

### **2. Cache Keys**
- `schedule_data_cache` - Schedule data
- `pastor_data_cache` - Pastor data
- `ministries_data_cache` - Ministries data
- `bulletin_data_cache` - Bulletin data

### **3. Cache Usage Pattern**
```javascript
/**
 * Load data with caching
 * @param {string} cacheKey - Cache key
 * @param {Function} loadFunction - Function to load fresh data
 * @param {number} ttl - Cache TTL
 * @returns {Promise<Object>} - Cached or fresh data
 */
async function loadWithCache(cacheKey, loadFunction, ttl = 3600000) {
    // Try to get from cache first
    const cachedData = getCachedData(cacheKey, ttl);
    if (cachedData) {
        return cachedData;
    }
    
    // Load fresh data
    const freshData = await loadFunction();
    if (freshData) {
        setCachedData(cacheKey, freshData);
    }
    
    return freshData;
}
```

## **Error Handling & Fallbacks**

### **1. Error States**
- **API Error:** Network issues, invalid API key, rate limiting
- **Sheet Error:** Invalid sheet ID, missing columns, malformed data
- **Cache Error:** Local storage unavailable, cache corruption

### **2. Fallback Strategy**
1. **Primary:** Google Sheets API data
2. **Secondary:** Cached data (if available)
3. **Tertiary:** Static content (original TIC 11 content)
4. **Quaternary:** Error message with retry option

### **3. Error Handling Pattern**
```javascript
/**
 * Load data with comprehensive error handling
 * @param {string} cacheKey - Cache key
 * @param {Function} loadFunction - Function to load fresh data
 * @param {Function} renderFunction - Function to render data
 * @param {Function} fallbackFunction - Function to render fallback
 */
async function loadDataWithFallback(cacheKey, loadFunction, renderFunction, fallbackFunction) {
    try {
        // Show loading state
        showLoadingState();
        
        // Try to load with cache
        const data = await loadWithCache(cacheKey, loadFunction);
        
        if (data) {
            renderFunction(data);
        } else {
            // Fallback to static content
            fallbackFunction();
        }
    } catch (error) {
        console.error('Data loading failed:', error);
        // Fallback to static content
        fallbackFunction();
    } finally {
        // Hide loading state
        hideLoadingState();
    }
}
```

## **Configuration Management**

### **1. Configuration File (config/sheets-config.js)**
```javascript
// Google Sheets Configuration
const SHEET_IDS = {
    schedule: '1aBcD...',      // Schedule data sheet ID
    pastor: '2eFgH...',        // Pastor data sheet ID
    ministries: '3iJkL...',    // Ministries data sheet ID
    bulletin: '4mNoP...'       // Bulletin data sheet ID
};

// API Configuration
const API_KEY = 'AIzaSy...';   // Google Sheets API key

// Cache Configuration
const CACHE_TTL = 3600000;     // 1 hour in milliseconds

// Sheet Ranges
const SHEET_RANGES = {
    schedule: 'A1:D100',
    pastor: 'A1:G10',
    ministries: 'A1:F50',
    bulletin: 'A1:D20'
};
```

### **2. Security Considerations**
- API key stored in config file (gitignored)
- Rate limiting handled by Google Sheets API
- Input validation for all data processing
- Error logging without sensitive data