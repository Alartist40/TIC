# Tokyo International SDA Church Website - Technical Architecture

## **Core Design Principles to Preserve**

### **1. 7-Column Grid System**
- Maintain the existing 7-column grid (6fr + 1fr)
- Sabbath column (1/7) must remain sticky and visually distinct
- Content area (6/7) must maintain responsive behavior

### **2. Mobile-First Responsive Design**
- All new features must be mobile-optimized first
- Collapsible sections for mobile content density
- Touch-friendly interactions and spacing
- Progressive enhancement strategy

### **3. Modern Aesthetic**
- Preserve color scheme: primary (#005eb8), accent (#d4af37)
- Maintain typography: Playfair Display (headings), Inter (body)
- Keep card-based design with consistent spacing and shadows

### **4. Multi-language Welcome System**
- Preserve rotating welcome text animation
- Maintain language cycle: English, Japanese, Chinese, Korean, Spanish, Portuguese, French
- Keep smooth fade transitions

## **Technical Architecture Overview**

### **File Structure**
```
website/
├── index.html                    # Main entry point
├── styles.css                    # Core styling
├── scripts/
│   ├── google-sheets.js          # Google Sheets API integration
│   ├── mobile-ui.js              # Mobile interactions and collapsible sections
│   ├── pdf-viewer.js             # PDF modal system
│   └── caching.js                # Local storage caching
├── images/
│   ├── pastor/                   # Pastor profile images
│   ├── ministries/               # Ministry-specific images
│   ├── youtube-thumbnail.jpg     # YouTube channel thumbnail
│   └── logo/                     # Church branding assets
└── config/
    ├── sheets-config.js          # Google Sheets configuration
    └── api-keys.js               # API key management (gitignored)
```

### **Google Sheets Integration Architecture**

#### **Data Flow**
```
Google Sheets → JSON API → Local Cache → Website Content → Mobile Display
```

#### **Sheets Structure**
1. **schedule-data** - Service times and locations
   - Columns: program, day_time, location, notes
   - Used for: Visit Us section table

2. **pastor-data** - Pastor bio and family information
   - Columns: pastor_name, pastor_title, pastor_bio, pastor_image, spouse_name, spouse_bio, favorite_verse
   - Used for: About section pastor cards

3. **ministries-data** - Ministry descriptions and details
   - Columns: ministry_name, ministry_description, ministry_details, ministry_image, sub_ministries
   - Used for: Ministries section cards

4. **bulletin-data** - Weekly bulletin content
   - Columns: bulletin_date, bulletin_title, bulletin_pdf_url, bulletin_summary
   - Used for: Sermons section bulletin modal

#### **API Integration Pattern**
```javascript
// Google Sheets API integration
async function loadSheetData(sheetId, range) {
    const response = await fetch(`https://sheets.googleapis.com/v4/spreadsheets/${sheetId}/values/${range}?key=API_KEY`);
    return await response.json();
}
```

### **Mobile Collapsible System Architecture**

#### **HTML Structure**
```html
<div class="content-card">
    <div class="card-header">
        <h3>Ministry Title</h3>
        <button class="expand-btn" aria-expanded="false">
            <span class="expand-icon">+</span>
            Read More
        </button>
    </div>
    <div class="card-content collapsible">
        <p>Full detailed content loaded from Google Sheets</p>
    </div>
</div>
```

#### **CSS Implementation**
- Mobile-first approach with max-height transitions
- Smooth animations for expand/collapse
- ARIA accessibility attributes
- Touch-friendly button sizing

### **PDF Modal System Architecture**

#### **Implementation**
```javascript
// PDF Modal System
function showPDFModal(pdfUrl, title) {
    const modal = document.getElementById('pdf-modal');
    modal.innerHTML = `
        <div class="pdf-viewer">
            <h3>${title}</h3>
            <iframe src="https://docs.google.com/gview?url=${encodeURIComponent(pdfUrl)}&embedded=true" 
                    frameborder="0"></iframe>
            <a href="${pdfUrl}" download class="download-btn">Download PDF</a>
        </div>
    `;
    modal.style.display = 'block';
}
```

#### **Features**
- Google Docs embedded viewer for mobile optimization
- Download option for offline viewing
- Smooth animations and loading states
- Escape key and click-outside to close

### **Progressive Enhancement Strategy**

#### **Layer 1: Base Layer (Fallback)**
- Current static content preserved
- Works without JavaScript
- Accessible to all users

#### **Layer 2: Enhanced Layer**
- Google Sheets dynamic content loaded via API
- Cached for 1 hour in local storage
- Fallback to static content if API unavailable

#### **Layer 3: Interactive Layer**
- Collapsible sections for mobile
- PDF viewers and modals
- Smooth animations and transitions

### **Performance Optimization Strategy**

#### **Caching**
- Local storage cache for Sheets data (1-hour TTL)
- Cache invalidation on content changes
- Fallback to static content if cache unavailable

#### **Lazy Loading**
- Load Sheets data after page render
- Conditional loading for PDFs only when requested
- Image optimization for mobile

#### **Conditional Loading**
- Only load PDFs when requested
- Load YouTube thumbnails on demand
- Defer non-critical JavaScript

### **Accessibility Features**

#### **Keyboard Navigation**
- Tab navigation support
- Enter/Space to activate buttons
- Escape to close modals
- Focus indicators

#### **Screen Reader Support**
- ARIA attributes for collapsible sections
- Proper heading hierarchy
- Alt text for all images
- Semantic HTML structure

#### **Reduced Motion**
- Respect prefers-reduced-motion
- Alternative transitions
- Static content for motion-sensitive users

### **Mobile Optimization Strategy**

#### **Touch Interactions**
- Larger tap targets (minimum 44px)
- Appropriate spacing between interactive elements
- Mobile-friendly form controls
- Touch-optimized scrolling

#### **Viewport Optimization**
- Proper viewport meta tag
- Responsive typography
- Mobile-optimized tables
- Flexible image sizing

#### **Performance**
- Critical CSS inlined
- Non-critical JS deferred
- Optimized image loading
- Minimal reflows and repaints