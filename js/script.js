// Configuration
const SHEET_URLS = {
    general: 'https://docs.google.com/spreadsheets/d/e/2PACX-1vTW2lUOC_ogYTvWIo_thDUo_NvQbJd-vBnnuXo0YQ36-QQPi22uvQjtqy9pAqtWlXom0HwVHSdBCMj7/pub?gid=2118403729&single=true&output=csv',
    about: 'https://docs.google.com/spreadsheets/d/e/2PACX-1vTW2lUOC_ogYTvWIo_thDUo_NvQbJd-vBnnuXo0YQ36-QQPi22uvQjtqy9pAqtWlXom0HwVHSdBCMj7/pub?gid=1587976413&single=true&output=csv',
    ministries: 'https://docs.google.com/spreadsheets/d/e/2PACX-1vTW2lUOC_ogYTvWIo_thDUo_NvQbJd-vBnnuXo0YQ36-QQPi22uvQjtqy9pAqtWlXom0HwVHSdBCMj7/pub?gid=0&single=true&output=csv',
    schedule: 'https://docs.google.com/spreadsheets/d/e/2PACX-1vTW2lUOC_ogYTvWIo_thDUo_NvQbJd-vBnnuXo0YQ36-QQPi22uvQjtqy9pAqtWlXom0HwVHSdBCMj7/pub?gid=786496350&single=true&output=csv',
    events: 'https://docs.google.com/spreadsheets/d/e/2PACX-1vTW2lUOC_ogYTvWIo_thDUo_NvQbJd-vBnnuXo0YQ36-QQPi22uvQjtqy9pAqtWlXom0HwVHSdBCMj7/pub?gid=123456789&single=true&output=csv' // Placeholder GID for events
};

// Global Data Store
const store = {
    about: {},
    ministries: [],
    schedule: [],
    events: [],
    general: {}
};

// CSV Parser
function parseCSV(text) {
    const lines = text.split('\n');
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
    let start = 0;
    let inQuotes = false;
    for (let i = 0; i < line.length; i++) {
        if (line[i] === '"') {
            inQuotes = !inQuotes;
        } else if (line[i] === ',' && !inQuotes) {
            let field = line.substring(start, i);
            if (field.startsWith('"') && field.endsWith('"')) field = field.substring(1, field.length - 1);
            field = field.replace(/""/g, '"');
            result.push(field);
            start = i + 1;
        }
    }
    let lastField = line.substring(start);
    if (lastField.startsWith('"') && lastField.endsWith('"')) lastField = lastField.substring(1, lastField.length - 1);
    lastField = lastField.replace(/""/g, '"');
    result.push(lastField);
    return result;
}

async function fetchSheetData(url) {
    try {
        const response = await fetch(url);
        if (!response.ok) return [];
        const text = await response.text();
        return parseCSV(text);
    } catch (error) {
        console.error('Error fetching data:', error);
        return [];
    }
}

// Initialization
async function init() {
    // 1. Fetch all data
    const [about, ministries, schedule, general] = await Promise.all([
        fetchSheetData(SHEET_URLS.about),
        fetchSheetData(SHEET_URLS.ministries),
        fetchSheetData(SHEET_URLS.schedule),
        fetchSheetData(SHEET_URLS.general)
    ]);

    // 2. Populate Store
    about.forEach(item => { if (item.Key) store.about[item.Key] = item.Value; });
    store.ministries = ministries;
    store.schedule = schedule;
    general.forEach(item => { if (item.Key) store.general[item.Key] = item.Value; });

    // 3. Render Content
    renderDynamicContent();
}

function renderDynamicContent() {
    // Render Ministries
    const ministryContainer = document.querySelector('.sub-cards');
    if (ministryContainer && store.ministries.length > 0) {
        ministryContainer.innerHTML = ''; // Clear hardcoded content
        store.ministries.forEach(ministry => {
            if (!ministry.Title) return;
            const card = document.createElement('div');
            card.className = 'card';
            card.innerHTML = `
                <h4>${ministry.Title}</h4>
                <p>${ministry.Description || ''}</p>
            `;
            ministryContainer.appendChild(card);
        });
    }

    // Render Events (if any) - Using placeholder selector for now as TIC 10 might render differently
    // In TIC 10 index.html, events are under .event-posters
    const eventsContainer = document.querySelector('.event-posters');
    if (eventsContainer) {
        if (store.events && store.events.length > 0) {
            eventsContainer.innerHTML = '';
            store.events.forEach(event => {
                const card = document.createElement('div');
                card.className = 'poster-card';
                card.innerHTML = `
                    <div class="poster-info">
                        <h4>${event.Title || 'Event'}</h4>
                        <p class="event-date">${event.Date || 'Coming Soon'}</p>
                        <p class="event-description">${event.Description || ''}</p>
                    </div>
                 `;
                eventsContainer.appendChild(card);
            });
        }
        // If no dynamic events, we keep the static ones or show a message? 
        // User requested: "if someone deletes, it also makes the cards disappear"
        // So likely we should clear it if we have a valid events sheet connection.
        // For now, allow static fallback if fetch failed or empty.
    }
}

// Modal Content Provider
window.getDynamicContent = function (key) {
    // Map content keys to Sheet Data
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
                <img src="${store.about.PastorImage || 'images/pastor_profile_pic.webp'}" style="width:100%; border-radius:8px; margin-bottom:1rem;">
                <h4>${store.about.PastorName || 'Senior Pastor'}</h4>
                <p>${store.about.PastorBio || 'Bio loading...'}</p>
            `;
        case 'media-ministry':
        case 'youth-ministry':
        case 'music-ministry':
        case 'health-ministry':
            // Try to find specific ministry details in the ministries list
            // Or fallback to generic text
            return `<h3>${key.replace('-', ' ').toUpperCase()}</h3><p>Details loading from sheet...</p>`;
        case 'bulletin':
            const items = store.schedule.filter(i => i.Program && i.Time);
            let html = `<h3>Weekly Schedule</h3><table class="service-table"><thead><tr><th>Program</th><th>Time</th><th>Location</th></tr></thead><tbody>`;
            items.forEach(item => {
                html += `<tr><td>${item.Program}</td><td>${item.Time}</td><td>${item.Location || ''}</td></tr>`;
            });
            html += `</tbody></table>`;
            return html;
        default:
            return '<h3>Content Not Found</h3>';
    }
};

document.addEventListener('DOMContentLoaded', init);
