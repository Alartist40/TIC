/**
 * TIC Church Website — Main Application Script
 *
 * Secure, modular, production-ready implementation
 * All Google Sheet URLs are fetched from Netlify Functions (secure proxy)
 * No hardcoded credentials in this file
 */

// ============================================
// CONFIGURATION (All URLs now use local proxy)
// ============================================

const API = {
    sheets: {
        general: '/api/sheets?type=general',
        about: '/api/sheets?type=about',
        ministries: '/api/sheets?type=ministries',
        schedule: '/api/sheets?type=schedule',
        events: '/api/sheets?type=events',
        sermons: '/api/sheets?type=sermons'
    }
};

// Global data store
const store = {
    general: {},
    about: {},
    ministries: [],
    schedule: [],
    events: [],
    sermons: []
};

// ============================================
// CSV PARSER (Robust with quote handling)
// ============================================

function parseCSV(text) {
    const lines = text.split('\n');
    if (lines.length === 0) return [];

    const headers = parseCSVLine(lines[0]);
    const result = [];

    for (let i = 1; i < lines.length; i++) {
        const line = lines[i].trim();
        if (!line) continue;

        const values = parseCSVLine(line);
        const obj = {};

        headers.forEach((header, index) => {
            obj[header.trim()] = values[index] ? values[index].trim() : '';
        });

        result.push(obj);
    }

    return result;
}

function parseCSVLine(line) {
    const result = [];
    let current = '';
    let inQuotes = false;

    for (let i = 0; i < line.length; i++) {
        const char = line[i];

        if (char === '"') {
            if (inQuotes && line[i + 1] === '"') {
                // Escaped quote
                current += '"';
                i++; // Skip next quote
            } else {
                // Toggle quote state
                inQuotes = !inQuotes;
            }
        } else if (char === ',' && !inQuotes) {
            // End of field
            result.push(current);
            current = '';
        } else {
            current += char;
        }
    }

    result.push(current);
    return result.map(field => field.trim());
}

// ============================================
// DATA FETCHING (with error handling)
// ============================================

async function fetchSheetData(url) {
    try {
        const response = await fetch(url);

        if (!response.ok) {
            console.error(`Failed to fetch ${url}: ${response.status}`);
            return [];
        }

        const text = await response.text();
        return parseCSV(text);

    } catch (error) {
        console.error('Fetch error:', error);
        return [];
    }
}

// ============================================
// INITIALIZATION
// ============================================

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

// ============================================
// LANGUAGE ROTATOR (Fixed smooth animation)
// ============================================

function initLanguageRotator() {
    const element = document.querySelector('.language-text');
    if (!element) return;

    const languages = JSON.parse(element.getAttribute('data-languages') || '[]');
    if (languages.length === 0) return;

    let currentIndex = 0;

    function rotateLanguage() {
        // Fade out
        element.style.opacity = '0';

        setTimeout(() => {
            // Update text
            currentIndex = (currentIndex + 1) % languages.length;
            element.textContent = languages[currentIndex];

            // Fade in
            element.style.opacity = '1';
        }, 300);
    }

    // Clear existing interval if any
    if (window.languageInterval) clearInterval(window.languageInterval);

    // Rotate every 3 seconds
    window.languageInterval = setInterval(rotateLanguage, 3000);

    // Initial fade-in
    element.style.opacity = '1';
}

// ============================================
// NAVIGATION (Mobile hamburger menu)
// ============================================

function initNavigation() {
    const navToggle = document.querySelector('.nav-toggle');
    const navLinks = document.querySelector('.nav-links');

    if (!navToggle || !navLinks) return;

    // Use named function to avoid duplicate listeners
    const toggleMenu = () => {
        const isExpanded = navToggle.getAttribute('aria-expanded') === 'true';
        navToggle.setAttribute('aria-expanded', !isExpanded);
        navLinks.classList.toggle('open'); // Changed from 'active' to 'open' to match styles.css
    };

    navToggle.removeEventListener('click', toggleMenu);
    navToggle.addEventListener('click', toggleMenu);

    // Close menu when link is clicked
    navLinks.querySelectorAll('a').forEach(link => {
        link.addEventListener('click', () => {
            navToggle.setAttribute('aria-expanded', 'false');
            navLinks.classList.remove('open');
        });
    });

    // Close when clicking outside
    document.addEventListener('click', (e) => {
        if (!navToggle.contains(e.target) && !navLinks.contains(e.target) && navLinks.classList.contains('open')) {
            navToggle.setAttribute('aria-expanded', 'false');
            navLinks.classList.remove('open');
        }
    });
}

// ============================================
// CONTENT RENDERING
// ============================================

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

// --- Ministries ---

function renderMinistries() {
    const container = document.querySelector('.sub-cards');
    if (!container) return;

    if (store.ministries.length === 0) {
        // Only clear if empty, but might want a placeholder
        return;
    }

    container.innerHTML = '';

    store.ministries.forEach(ministry => {
        if (!ministry.Title) return;

        const card = document.createElement('div');
        card.className = 'card ministry-card';
        card.innerHTML = `
            <div class="card-icon">${ministry.Icon || '✝️'}</div>
            <h4>${sanitizeHTML(ministry.Title)}</h4>
            <p>${sanitizeHTML(ministry.Description || '')}</p>
        `;
        container.appendChild(card);
    });
}

// --- Schedule ---

function renderSchedule() {
    const container = document.querySelector('.schedule-table tbody');
    if (!container || store.schedule.length === 0) return;

    container.innerHTML = '';

    store.schedule.forEach(item => {
        if (!item.Program) return;

        // Combine location and notes for cleaner design and matching columns
        const locationHTML = item.Notes
            ? `${sanitizeHTML(item.Location || '')}<br><small>${sanitizeHTML(item.Notes)}</small>`
            : sanitizeHTML(item.Location || '');

        const row = document.createElement('tr');
        row.innerHTML = `
            <td>${sanitizeHTML(item.Program)}</td>
            <td>${sanitizeHTML(item.Time)}</td>
            <td>${locationHTML}</td>
        `;
        container.appendChild(row);
    });
}

// --- Events ---

function renderEvents() {
    const container = document.querySelector('.event-posters');
    if (!container) return;

    container.innerHTML = '';

    if (store.events.length === 0) {
        container.innerHTML = '<p class="no-events">No upcoming events. Check back soon!</p>';
        return;
    }

    // Get today at start of day
    const startOfToday = new Date();
    startOfToday.setHours(0, 0, 0, 0);

    // Filter to future/today events and sort soonest-first
    const sortedEvents = store.events
        .filter(e => {
            const eventDate = new Date(e.Date);
            return !isNaN(eventDate) && eventDate >= startOfToday;
        })
        .sort((a, b) => new Date(a.Date) - new Date(b.Date));

    if (sortedEvents.length === 0) {
        container.innerHTML = '<p class="no-events">No upcoming events. Check back soon!</p>';
        return;
    }

    sortedEvents.forEach(event => {
        if (!event.Title || !event.Date) return;

        const card = document.createElement('div');
        card.className = 'event-poster-card';

        const hasImage = event.ImageURL && event.ImageURL.trim() !== '';

        card.innerHTML = `
            <div class="poster-image">
                ${hasImage ? `<img src="${escapeAttr(event.ImageURL)}" alt="${escapeAttr(event.Title)}" loading="lazy">` : '<div class="placeholder-image">📅</div>'}
            </div>
            <div class="poster-content">
                <h3>${sanitizeHTML(event.Title)}</h3>
                <p class="event-date">📅 ${formatDate(event.Date)}</p>
                <p class="event-time">🕐 ${sanitizeHTML(event.Time)}</p>
                <p class="event-description">${sanitizeHTML(event.Description || '')}</p>
                ${isSafeUrl(event.RegistrationLink) ? `<a href="${escapeAttr(event.RegistrationLink)}" class="register-btn" target="_blank" rel="noopener noreferrer">Register</a>` : ''}
            </div>
        `;
        container.appendChild(card);
    });
}

// --- Event Calendar ---

function renderEventCalendar() {
    const container = document.querySelector('.events-calendar');
    if (!container || store.events.length === 0) return;

    // Group events by date
    const eventsByDate = {};
    store.events.forEach(event => {
        const date = event.Date; // Expected format: YYYY-MM-DD
        if (!eventsByDate[date]) eventsByDate[date] = [];
        eventsByDate[date].push(event);
    });

    // Get current month/year
    const today = new Date();
    const year = today.getFullYear();
    const month = today.getMonth();

    // Create calendar HTML
    container.innerHTML = '';
    const calendar = generateMonthCalendar(year, month, eventsByDate);
    container.appendChild(calendar);
}

function generateMonthCalendar(year, month, eventsByDate) {
    const monthContainer = document.createElement('div');
    monthContainer.className = 'month-calendar';

    // Month header
    const monthNames = ['January', 'February', 'March', 'April', 'May', 'June',
                       'July', 'August', 'September', 'October', 'November', 'December'];
    const header = document.createElement('h3');
    header.textContent = `${monthNames[month]} ${year}`;
    monthContainer.appendChild(header);

    // Day names
    const dayNamesRow = document.createElement('div');
    dayNamesRow.className = 'day-names';
    const dayNames = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
    dayNames.forEach(dayName => {
        const cell = document.createElement('div');
        cell.className = 'day-name';
        cell.textContent = dayName;
        dayNamesRow.appendChild(cell);
    });
    monthContainer.appendChild(dayNamesRow);

    // Days grid
    const daysGrid = document.createElement('div');
    daysGrid.className = 'days-grid';

    const firstDay = new Date(year, month, 1).getDay();
    const daysInMonth = new Date(year, month + 1, 0).getDate();

    // Empty cells before month starts
    for (let i = 0; i < firstDay; i++) {
        const emptyCell = document.createElement('div');
        emptyCell.className = 'day-cell empty';
        daysGrid.appendChild(emptyCell);
    }

    // Days of month
    for (let day = 1; day <= daysInMonth; day++) {
        const dateStr = `${year}-${String(month + 1).padStart(2, '0')}-${String(day).padStart(2, '0')}`;
        const dayCell = document.createElement('div');
        dayCell.className = 'day-cell';
        dayCell.textContent = day;

        if (eventsByDate[dateStr]) {
            dayCell.classList.add('has-event');
            const eventTitles = eventsByDate[dateStr].map(e => e.Title).join(', ');
            dayCell.title = eventTitles;
            dayCell.style.cursor = 'pointer';
            dayCell.onclick = () => showEventDetails(dateStr);
        }

        daysGrid.appendChild(dayCell);
    }

    monthContainer.appendChild(daysGrid);
    return monthContainer;
}

function showEventDetails(dateStr) {
    // Find events on this date
    const eventsOnDate = store.events.filter(e => e.Date === dateStr);
    if (eventsOnDate.length === 0) return;

    // Create modal content
    let html = `<h3>Events on ${formatDate(dateStr)}</h3>`;
    eventsOnDate.forEach(event => {
        html += `
            <div class="event-detail">
                <h4>${sanitizeHTML(event.Title)}</h4>
                <p><strong>Time:</strong> ${sanitizeHTML(event.Time)}</p>
                <p><strong>Description:</strong> ${sanitizeHTML(event.Description)}</p>
            </div>
        `;
    });

    showModal(html);
}

// --- Sermons ---

function renderSermons() {
    const container = document.querySelector('.sermons-grid');
    if (!container || store.sermons.length === 0) return;

    container.innerHTML = '';

    // Sort sermons by date (newest first)
    const sortedSermons = [...store.sermons].sort((a, b) => {
        return new Date(b.Date) - new Date(a.Date);
    });

    sortedSermons.forEach(sermon => {
        if (!sermon.Title || !sermon.YoutubeID) return;

        const card = document.createElement('div');
        card.className = 'sermon-card';

        card.innerHTML = `
            <div class="sermon-thumbnail">
                <img src="https://img.youtube.com/vi/${sermon.YoutubeID}/maxresdefault.jpg"
                     alt="${sermon.Title}"
                     loading="lazy"
                     onerror="this.src='https://img.youtube.com/vi/${sermon.YoutubeID}/default.jpg'">
                <a href="https://www.youtube.com/watch?v=${sermon.YoutubeID}"
                   class="play-button"
                   target="_blank"
                   title="Watch on YouTube">▶</a>
            </div>
            <div class="sermon-info">
                <h4>${sanitizeHTML(sermon.Title)}</h4>
                <p class="speaker">By ${sanitizeHTML(sermon.Speaker || 'Pastor')}</p>
                <p class="date">${formatDate(sermon.Date)}</p>
                ${sermon.Scripture ? `<p class="scripture">"${sanitizeHTML(sermon.Scripture)}"</p>` : ''}
                ${sermon.Duration ? `<p class="duration">⏱ ${sanitizeHTML(sermon.Duration)}</p>` : ''}
            </div>
        `;
        container.appendChild(card);
    });
}

// --- About Section ---

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

// --- YouTube Live ---

function renderYouTubeLive() {
    const youtubeContainer = document.querySelector('.youtube-live');
    if (!youtubeContainer || !store.general.YoutubeLive) return;

    const youtubeID = extractYoutubeID(store.general.YoutubeLive);
    if (!youtubeID) return;

    youtubeContainer.innerHTML = `
        <div style="position: relative; padding-bottom: 56.25%; height: 0; overflow: hidden; max-width: 100%; border-radius: 8px;">
            <iframe
                style="position: absolute; top: 0; left: 0; width: 100%; height: 100%;"
                src="https://www.youtube.com/embed/${youtubeID}"
                title="YouTube video player"
                frameborder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                allowfullscreen>
            </iframe>
        </div>
    `;
}

// ============================================
// MODAL SYSTEM
// ============================================

function initModals() {
    const modal = document.getElementById('content-modal');
    const closeButtons = document.querySelectorAll('.modal-close');

    if (!modal) return;

    closeButtons.forEach(btn => {
        btn.addEventListener('click', closeModal);
    });

    modal.addEventListener('click', (e) => {
        if (e.target === modal) closeModal();
    });

    // "Read More" buttons - use event delegation
    document.addEventListener('click', (e) => {
        if (e.target.classList.contains('more-btn')) {
            const content = window.getDynamicContent(e.target.dataset.content);
            showModal(content);
        }
    });
}

function showModal(content) {
    const modal = document.getElementById('content-modal');
    const modalBody = modal.querySelector('.modal-body');
    if (modalBody) {
        modalBody.innerHTML = content;
        modal.classList.add('active'); // Use 'active' to match styles.css
        document.body.style.overflow = 'hidden';
    }
}

function closeModal() {
    const modal = document.getElementById('content-modal');
    if (modal) {
        modal.classList.remove('active');
        document.body.style.overflow = 'auto';
    }
}

window.getDynamicContent = function(key) {
    switch (key) {
        case 'mission':
            return `
                <h3>Our Mission & Vision</h3>
                <h4>Mission</h4>
                <p>${store.about.Mission || 'Loading...'}</p>
                <h4>Vision</h4>
                <p>${store.about.Vision || 'Loading...'}</p>
                <h4>Values</h4>
                <p>${store.about.Values || 'Loading...'}</p>
            `;
        case 'pastor':
            return `
                <h3>Pastoral Family</h3>
                ${store.about.PastorImage ? `<img src="${store.about.PastorImage}" style="width:100%; border-radius:8px; margin-bottom:1rem;">` : ''}
                <h4>${store.about.PastorName || 'Senior Pastor'}</h4>
                <p>${store.about.PastorBio || 'Bio loading...'}</p>
            `;
        default:
            return '<h3>Content Not Found</h3><p>Please check back later.</p>';
    }
};

// ============================================
// STAFF MODE (for admin dashboard)
// ============================================

function initStaffMode() {
    // Check if user is authenticated via Netlify endpoint
    fetch('/api/auth-check')
        .then(res => res.json())
        .then(data => {
            if (data.authenticated) {
                document.body.classList.add('staff-mode');
                const staffPanel = document.getElementById('staff-panel');
                if (staffPanel) staffPanel.style.display = 'block';
                console.log('Staff mode enabled');
            }
        })
        .catch(err => console.log('Not authenticated or API error:', err));
}

// ============================================
// UTILITY FUNCTIONS
// ============================================

function sanitizeHTML(str) {
    if (!str) return '';
    const div = document.createElement('div');
    div.textContent = str;
    return div.innerHTML;
}

// Escape for HTML attributes (prevents breaking quotes)
function escapeAttr(str) {
    if (!str) return '';
    return str
        .replace(/&/g, '&amp;')
        .replace(/"/g, '&quot;')
        .replace(/'/g, '&#39;')
        .replace(/</g, '&lt;')
        .replace(/>/g, '&gt;');
}

// Validate URLs (allows http/https/mailto only)
function isSafeUrl(url) {
    if (!url) return false;
    try {
        const parsed = new URL(url, window.location.href);
        return ['https:', 'http:', 'mailto:'].includes(parsed.protocol);
    } catch {
        return false;
    }
}

function extractYoutubeID(url) {
    if (!url) return null;

    // Handle various YouTube URL formats
    const patterns = [
        /(?:v=|\/)([0-9A-Za-z_-]{11}).*/,
        /(?:embed\/)([0-9A-Za-z_-]{11}).*/,
        /(?:youtu\.be\/)([0-9A-Za-z_-]{11}).*/,
        /(?:live\/)([0-9A-Za-z_-]{11}).*/
    ];

    for (let pattern of patterns) {
        let match = url.match(pattern);
        if (match && match[1]) return match[1];
    }

    return url.length === 11 ? url : null;
}

function formatDate(dateStr) {
    if (!dateStr) return 'TBD';

    try {
        const date = new Date(dateStr + 'T00:00:00');
        if (isNaN(date.getTime())) return dateStr;
        const options = { year: 'numeric', month: 'long', day: 'numeric' };
        return date.toLocaleDateString('en-US', options);
    } catch {
        return dateStr;
    }
}

// ============================================
// INITIALIZATION
// ============================================

document.addEventListener('DOMContentLoaded', initializeApp);

// Refresh data every 5 minutes (to catch edits from Google Sheets)
setInterval(() => {
    console.log('Refreshing data from Google Sheets...');
    initializeApp();
}, 5 * 60 * 1000);

function addFadeInAnimations() {
    const cards = document.querySelectorAll('.card');
    cards.forEach((card, index) => {
        card.classList.add('fade-in');
        card.style.animationDelay = `${index * 0.1}s`;
    });
}
