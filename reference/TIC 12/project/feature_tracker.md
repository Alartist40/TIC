Excellent! I can see you've built a sophisticated church website with a strong design system and clear requirements. Let me help you create a comprehensive feature tracker and enhancement plan.

## **FEATURE TRACKER & ENHANCEMENT PLAN - Tokyo International SDA Church Website**

### **Current Successes (Version 11)**
- ✅ **7-Column Grid System** - Core design principle implemented
- ✅ **Mobile-First Responsive Design** - Works well on phones
- ✅ **Modern Aesthetic** - Clean, professional church branding
- ✅ **Multi-language Welcome System** - International focus
- ✅ **Comprehensive Sections** - About, Ministries, Sermons, Events, Visit Us

### **Required Google Integrations**

#### **1. Google Sheets CMS Integration**
**Purpose:** Allow non-technical staff to update content without coding

**Sheets Needed:**
- **ministries-data** - Ministry descriptions, details, images
- **pastor-data** - Pastor bio, photo, family information  
- **schedule-data** - Service times and locations
- **bulletin-data** - Weekly bulletin content

**Implementation:**
```javascript
// Google Sheets API integration
async function loadSheetData(sheetId, range) {
    const response = await fetch(`https://sheets.googleapis.com/v4/spreadsheets/${sheetId}/values/${range}?key=API_KEY`);
    return await response.json();
}
```

#### **2. Enhanced Mobile Dropdown System**
**Purpose:** Reduce clutter while preserving all content

**Implementation Strategy:**
```html
<!-- Enhanced card with collapsible content -->
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

#### **3. Dynamic Pastor Section**
**Purpose:** Easy pastor profile updates

**Google Sheets Structure:**
```
| pastor_name | pastor_title | pastor_bio | pastor_image | spouse_name | spouse_bio | favorite_verse |
```

**Implementation:**
- Auto-load pastor image and details from Sheets
- Fallback to current content if Sheets unavailable
- Image optimization for mobile

#### **4. Enhanced YouTube Integration**
**Purpose:** Better visual engagement

**Implementation:**
```html
<div class="youtube-card">
    <a href="https://youtube.com/channel/..." class="youtube-thumbnail">
        <img src="https://img.youtube.com/vi/LATEST_VIDEO_ID/maxresdefault.jpg" 
             alt="Watch our latest sermon on YouTube">
        <div class="play-button">▶</div>
    </a>
    <p>Click the image to visit our YouTube channel</p>
</div>
```

#### **5. Dynamic Schedule Table**
**Purpose:** Easy service time updates

**Google Sheets Structure:**
```
| program | day_time | location | notes |
```

**Implementation:**
- Auto-populate service table from Sheets
- Color-coding for different service types
- Mobile-optimized table layout

#### **6. PDF Pop-up System**
**Purpose:** Display detailed documents and bulletins

**Implementation:**
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

### **Technical Architecture**

#### **File Structure Enhancement**
```
website/
├── index.html
├── styles.css
├── scripts/
│   ├── google-sheets.js
│   ├── mobile-ui.js
│   └── pdf-viewer.js
├── images/
│   ├── pastor/
│   ├── ministries/
│   └── youtube-thumbnail.jpg
└── config/
    └── sheets-config.js
```

#### **Progressive Enhancement Strategy**
1. **Base Layer:** Current static content (fallback)
2. **Enhanced Layer:** Google Sheets dynamic content
3. **Interactive Layer:** Collapsible sections, PDF viewers

### **Mobile-First Collapsible System**

#### **Implementation Plan:**
```css
/* Collapsible mobile styles */
@media (max-width: 768px) {
    .card-content.collapsible {
        max-height: 0;
        overflow: hidden;
        transition: max-height 0.3s ease;
    }
    
    .card-content.collapsible.expanded {
        max-height: 1000px; /* Enough for content */
    }
    
    .expand-btn .expand-icon {
        transition: transform 0.3s ease;
    }
    
    .expand-btn[aria-expanded="true"] .expand-icon {
        transform: rotate(45deg);
    }
}
```

### **Google Sheets Integration Features**

#### **Content Management Benefits:**
- **Ministry Leaders** can update their own sections
- **Administrators** can modify service times instantly
- **Pastor** can update bio and family information
- **Media Team** can update YouTube links and thumbnails

#### **Data Flow:**
```
Google Sheets → JSON API → Website Content → Mobile-Optimized Display
```

### **PDF Integration Features**

#### **Use Cases:**
- Weekly bulletins with beautiful layouts
- Event brochures and flyers
- Ministry application forms
- Doctrinal documents

#### **User Experience:**
- Click PDF link → Pop-up modal with embedded viewer
- Mobile-optimized PDF rendering
- Download option for offline viewing
- Smooth animations and loading states

### **Performance Considerations**

#### **Optimization Strategies:**
- **Lazy Loading:** Load Sheets data after page render
- **Caching:** Store Sheets data locally for 1 hour
- **Progressive Images:** Optimize pastor and ministry images
- **Conditional Loading:** Only load PDFs when requested

### **Implementation Priority**

#### **Phase 1 (Critical)**
1. Google Sheets integration for schedule table
2. Mobile collapsible sections
3. Enhanced YouTube thumbnail

#### **Phase 2 (Important)**
4. Dynamic pastor section
5. Ministries Google Sheets CMS
6. PDF pop-up system

#### **Phase 3 (Enhancements)**
7. Advanced caching and performance
8. Offline functionality
9. Analytics integration

### **Success Metrics**

#### **User Engagement:**
- Reduced bounce rate on mobile
- Increased time spent reading content
- Higher PDF download rates
- More YouTube channel clicks

#### **Administrative Efficiency:**
- Reduced time to update website content
- Multiple staff members can manage content
- No technical skills required for updates

---

## **Ready for Implementation**

This plan maintains your successful visual design while adding the requested Google integrations and mobile enhancements. The 7-column grid remains untouched as required.

**Key Advantages:**
- **Non-technical staff** can update content via familiar Google Sheets
- **Mobile users** get clean, uncluttered experience with optional details
- **All existing content** is preserved with enhanced functionality
- **Performance** remains excellent with progressive enhancement

Would you like me to start implementing any specific part of this enhancement plan? I can begin with the Google Sheets integration or the mobile collapsible sections based on your priority.
