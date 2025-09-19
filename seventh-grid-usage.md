# Seventh Grid Div - Easy Implementation Guide

## Quick Start

### Option 1: Use the Complete HTML File
Open `seventh-grid-div.html` in your browser to see the working example.

### Option 2: Add to Existing Pages

#### 1. Add CSS (choose one):
- Copy contents from `seventh-grid-simple.css` to your existing `styles.css`
- Or link the new CSS file: `<link rel="stylesheet" href="seventh-grid-simple.css">`

#### 2. Add HTML Structure:
Place this right after your opening `<body>` tag:

```html
<div class="seventh-grid-container">
    <div class="content-area">
        <!-- Your existing page content goes here -->
    </div>
    <div class="seventh-column">
        <svg class="seventh-logo" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 253.71 227.63">
            <title>Seventh-day Adventist logo mark</title>
            <path fill="white" d="M67.68,120.38c-.1-9.91,2.8-18.41,20.8-36.41l39-39c10.4-10.4,19.1-19.29,19.1-29V.67c0-.89-1.1-.89-1.2,0-2.6,12.4-7.5,17.3-17.8,27.61L82.28,73.47c-17.1,17-19.5,35.1-15.8,46.91C66.78,121.38,67.68,121.47,67.68,120.38Zm64.2,38.9c0,.89,1,.89,1.2,0,2.6-12.5,7.6-17.3,17.8-27.61l39-39c10.4-10.4,19.1-19.29,19.1-29V.67c0-.89-1.1-.89-1.2,0-2.6,12.4-7.5,17.3-17.8,27.61l-39,39c-10.4,10.4-19.1,19.29-19.1,29V159.28c0,.89,1.1,.89,1.2,0Z"/>
            <path fill="white" d="M126.68,227.63c-70.4,0-127.51-57.11-127.51-127.51S56.28-27.38,126.68-27.38,254.19,29.73,254.19,100.13,197.08,227.63,126.68,227.63Zm0-237.76c-60.8,0-110.25,49.45-110.25,110.25S65.88,210.37,126.68,210.37,236.93,160.92,236.93,100.13,187.48-10.13,126.68-10.13Z"/>
            <path fill="white" d="M126.68,190.88c-50,0-90.75-40.75-90.75-90.75S76.68,9.38,126.68,9.38,217.43,50.13,217.43,100.13,176.68,190.88,126.68,190.88Zm0-181.5c-50,0-90.75,40.75-90.75,90.75S76.68,190.88,126.68,190.88,217.43,150.13,217.43,100.13,176.68,9.38,126.68,9.38Z"/>
        </svg>
    </div>
</div>
```

#### 3. Adjust Your Content:
Add this CSS to your main content container:

```css
.main-content {
    margin-left: 80px; /* Adjust based on your column width */
    padding: 1rem;
}

@media (max-width: 768px) {
    .main-content {
        margin-left: 60px;
    }
}

@media (max-width: 480px) {
    .main-content {
        margin-left: 50px;
    }
}
```

## Customization Options

### Change Colors
```css
.seventh-column {
    background-color: #your-color; /* Change blue background */
    border-left: 3px solid #your-gold; /* Change gold border */
}
```

### Change Width
```css
.seventh-column {
    min-width: 100px; /* Adjust width */
    max-width: 150px;
}
```

### Hide on Mobile
```css
@media (max-width: 768px) {
    .seventh-grid-container {
        display: none;
    }
    
    .main-content {
        margin-left: 0;
    }
}
```

## Files Created
- `seventh-grid-div.html` - Complete working example
- `seventh-grid-simple.css` - Standalone CSS file
- `seventh-grid-usage.md` - This usage guide