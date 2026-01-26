// Configuration - TIC 11
const SHEET_URLS = {
    general: 'https://docs.google.com/spreadsheets/d/e/2PACX-1vTW2lUOC_ogYTvWIo_thDUo_NvQbJd-vBnnuXo0YQ36-QQPi22uvQjtqy9pAqtWlXom0HwVHSdBCMj7/pub?gid=2118403729&single=true&output=csv',
    about: 'https://docs.google.com/spreadsheets/d/e/2PACX-1vTW2lUOC_ogYTvWIo_thDUo_NvQbJd-vBnnuXo0YQ36-QQPi22uvQjtqy9pAqtWlXom0HwVHSdBCMj7/pub?gid=1587976413&single=true&output=csv',
    ministries: 'https://docs.google.com/spreadsheets/d/e/2PACX-1vTW2lUOC_ogYTvWIo_thDUo_NvQbJd-vBnnuXo0YQ36-QQPi22uvQjtqy9pAqtWlXom0HwVHSdBCMj7/pub?gid=0&single=true&output=csv',
    sermons: 'https://docs.google.com/spreadsheets/d/e/2PACX-1vTW2lUOC_ogYTvWIo_thDUo_NvQbJd-vBnnuXo0YQ36-QQPi22uvQjtqy9pAqtWlXom0HwVHSdBCMj7/pub?gid=708079300&single=true&output=csv',
    schedule: 'https://docs.google.com/spreadsheets/d/e/2PACX-1vTW2lUOC_ogYTvWIo_thDUo_NvQbJd-vBnnuXo0YQ36-QQPi22uvQjtqy9pAqtWlXom0HwVHSdBCMj7/pub?gid=786496350&single=true&output=csv'
};

// Global Data Store
const store = {
    about: {},
    ministries: [],
    schedule: [],
    general: {}
};

// Vanilla CSV Parser
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
        const text = await response.text();
        return parseCSV(text);
    } catch (error) {
        console.error('Error fetching data:', error);
        return [];
    }
}

// Initialization and Data Binding
async function init() {

    // Fetch Data
    const [about, ministries, schedule, general] = await Promise.all([
        fetchSheetData(SHEET_URLS.about),
        fetchSheetData(SHEET_URLS.ministries),
        fetchSheetData(SHEET_URLS.schedule),
        fetchSheetData(SHEET_URLS.general)
    ]);

    // Process About Data (Key-Value)
    about.forEach(item => { if (item.Key) store.about[item.Key] = item.Value; });
    store.ministries = ministries;
    store.schedule = schedule;
    general.forEach(item => { if (item.Key) store.general[item.Key] = item.Value; });

    // Initial DOM Updates
    updateStaticContent();
    setupHeroAnimation(); // Re-initialize or hook into existing logic
}

function updateStaticContent() {
    // 1. Update Mission/Vision/Values if elements exist
    // Note: TIC 11 has hardcoded structure, we can inject text if IDs existed, 
    // but since they don't, we will rely on the "More" buttons for dynamic details
    // OR we can try to find elements by context if we want to be aggressive.
    // For stability, we will focus on the Modal content which is explicitly dynamic.
}

// Function to generate modal content based on Sheet Data
window.getDynamicContent = function (key) {
    switch (key) {
        case 'mission':
            return `
                <h2>Our Mission & Vision</h2>
                <div class="card">
                    <h3>Mission</h3>
                    <p>${store.about.Mission || 'Loading...'}</p>
                </div>
                <div class="card" style="margin-top:1rem">
                    <h3>Vision</h3>
                    <p>${store.about.Vision || 'Loading...'}</p>
                </div>
                <div class="card" style="margin-top:1rem">
                    <h3>Values</h3>
                    <p>${store.about.Values || 'Loading...'}</p>
                </div>
            `;
        case 'pastor':
            return `
                <h2>Pastoral Family</h2>
                <div class="card">
                    <img src="${store.about.PastorImage || 'images/pastor_profile_pic.webp'}" style="width:100%; border-radius:8px; margin-bottom:1rem">
                    <h3>${store.about.PastorName || 'Senior Pastor'}</h3>
                    <p>${store.about.PastorBio || 'Bio loading...'}</p>
                </div>
            `;
        case 'learning-ministry': // Map to generic Ministry
        case 'media-ministry':
        case 'youth-ministry':
        case 'music-ministry':
        case 'health-ministry':
            // Find specific ministry or list all
            const ministryName = key.replace('-ministry', '');
            const relevant = store.ministries.filter(m => m.Title && m.Title.toLowerCase().includes(ministryName));

            if (relevant.length > 0) {
                return relevant.map(m => `
                    <div class="card">
                        <h3>${m.Title}</h3>
                        <p>${m.Description}</p>
                    </div>
                `).join('');
            }
            // Fallback to all ministries if specific not found or if generic request
            return store.ministries.map(m => `
                <div class="card" style="margin-bottom:1rem">
                    <h3>${m.Title}</h3>
                    <p>${m.Description}</p>
                </div>
            `).join('');

        case 'bulletin':
            // Schedule Table
            const items = store.schedule.filter(item => item.Program && item.Time);
            let html = `<h2>Weekly Schedule</h2><table class="service-table">
                <thead><tr><th>Program</th><th>Time</th><th>Location</th></tr></thead><tbody>`;
            items.forEach(item => {
                html += `<tr><td>${item.Program}</td><td>${item.Time}</td><td>${item.Location || ''}</td></tr>`;
            });
            html += `</tbody></table>`;
            return html;

        default:
            return '<h2>Content Not Found</h2>';
    }
};

function setupHeroAnimation() {
    // This logic mimics the existing inline script but connects to data if needed.
    // The inline script in TIC 11 index.html already handles the rotation well.
}

document.addEventListener('DOMContentLoaded', init);
