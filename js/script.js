// Configuration
const SHEET_URLS = {
    general: 'https://docs.google.com/spreadsheets/d/e/2PACX-1vTW2lUOC_ogYTvWIo_thDUo_NvQbJd-vBnnuXo0YQ36-QQPi22uvQjtqy9pAqtWlXom0HwVHSdBCMj7/pub?gid=2118403729&single=true&output=csv',
    about: 'https://docs.google.com/spreadsheets/d/e/2PACX-1vTW2lUOC_ogYTvWIo_thDUo_NvQbJd-vBnnuXo0YQ36-QQPi22uvQjtqy9pAqtWlXom0HwVHSdBCMj7/pub?gid=1587976413&single=true&output=csv',
    ministries: 'https://docs.google.com/spreadsheets/d/e/2PACX-1vTW2lUOC_ogYTvWIo_thDUo_NvQbJd-vBnnuXo0YQ36-QQPi22uvQjtqy9pAqtWlXom0HwVHSdBCMj7/pub?gid=0&single=true&output=csv',
    sermons: 'https://docs.google.com/spreadsheets/d/e/2PACX-1vTW2lUOC_ogYTvWIo_thDUo_NvQbJd-vBnnuXo0YQ36-QQPi22uvQjtqy9pAqtWlXom0HwVHSdBCMj7/pub?gid=708079300&single=true&output=csv',
    schedule: 'https://docs.google.com/spreadsheets/d/e/2PACX-1vTW2lUOC_ogYTvWIo_thDUo_NvQbJd-vBnnuXo0YQ36-QQPi22uvQjtqy9pAqtWlXom0HwVHSdBCMj7/pub?gid=786496350&single=true&output=csv'
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

        // Map headers to values
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
            // Remove surrounding quotes if present
            if (field.startsWith('"') && field.endsWith('"')) {
                field = field.substring(1, field.length - 1);
            }
            // Handle double quotes
            field = field.replace(/""/g, '"');
            result.push(field);
            start = i + 1;
        }
    }

    // Add last field
    let lastField = line.substring(start);
    if (lastField.startsWith('"') && lastField.endsWith('"')) {
        lastField = lastField.substring(1, lastField.length - 1);
    }
    lastField = lastField.replace(/""/g, '"');
    result.push(lastField);

    return result;
}

// Data Fetching
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

// Content Rendering
async function init() {
    initHeroAnimation();

    // Parallel Fetching
    const [about, ministries, schedule, general] = await Promise.all([
        fetchSheetData(SHEET_URLS.about),
        fetchSheetData(SHEET_URLS.ministries),
        fetchSheetData(SHEET_URLS.schedule),
        fetchSheetData(SHEET_URLS.general)
    ]);

    renderAbout(about);
    renderMinistries(ministries);
    renderSchedule(schedule);
    renderGeneral(general);
}

function initHeroAnimation() {
    const el = document.getElementById('multilingual-welcome');
    const languages = [
        'WELCOME', 'ようこそ', '欢迎', '환영합니다',
        'BIENVENIDO', 'BEM-VINDO', 'BIENVENUE'
    ];
    let index = 0;

    setInterval(() => {
        el.style.opacity = '0';
        setTimeout(() => {
            index = (index + 1) % languages.length;
            el.textContent = languages[index];
            el.style.opacity = '1';
        }, 500);
    }, 3000);
}

function renderAbout(data) {
    const config = {};
    data.forEach(item => { if (item.Key) config[item.Key] = item.Value; });

    const container = document.getElementById('about');
    container.innerHTML = `
        <h2>About Our Church</h2>
        <div class="card">
            <h3>Our Mission</h3>
            <p>${config.Mission || 'Loading...'}</p>
        </div>
        <div class="card" style="margin-top: 1rem;">
            <h3>Our Vision</h3>
            <p>${config.Vision || 'Loading...'}</p>
        </div>
        
        <div class="pastor-section" style="margin-top: 2rem; display: flex; gap: 2rem; flex-wrap: wrap;">
            <div style="flex: 1; min-width: 300px;">
                <img src="${config.PastorImage || 'images/placeholder.jpg'}" alt="Pastor" style="width: 100%; border-radius: 8px;">
            </div>
            <div style="flex: 2; min-width: 300px;">
                <h3>${config.PastorName || 'Senior Pastor'}</h3>
                <p>${config.PastorBio || ''}</p>
            </div>
        </div>
    `;
}

function renderMinistries(data) {
    const container = document.getElementById('ministries-grid');
    if (!data.length) {
        container.innerHTML = '<p>No ministries found.</p>';
        return;
    }

    container.innerHTML = data.map(item => `
        <div class="card">
            <img src="https://images.unsplash.com/photo-1544427920-c49ccfb85579?fit=crop&w=500&h=300" alt="${item.Title}">
            <h3>${item.Title}</h3>
            <p>${item.Description}</p>
        </div>
    `).join('');
}

function renderSchedule(data) {
    const container = document.getElementById('schedule-container');
    const items = data.filter(item => item.Program && item.Time);

    if (!items.length) return;

    let html = `
        <table class="schedule-table">
            <thead>
                <tr>
                    <th>Program</th>
                    <th>Time</th>
                    <th>Location</th>
                </tr>
            </thead>
            <tbody>
    `;

    items.forEach(item => {
        html += `
            <tr>
                <td>${item.Program}</td>
                <td>${item.Time}</td>
                <td>${item.Location || ''}</td>
            </tr>
        `;
    });

    html += '</tbody></table>';
    container.innerHTML = html;
}

function renderGeneral(data) {
    const config = {};
    data.forEach(item => { if (item.Key) config[item.Key] = item.Value; });

    if (config.YoutubeLive) {
        const container = document.getElementById('sermons-container');
        container.innerHTML = `
            <div class="card" style="text-align: center;">
                <h3>Live Stream</h3>
                <p>Join us live every Sabbath.</p>
                <a href="${config.YoutubeLive}" target="_blank" class="cta-button" style="margin-top: 1rem;">Watch on YouTube</a>
            </div>
        `;
    }
}

// Start
document.addEventListener('DOMContentLoaded', init);

// 7th Grid Scroll Effect
window.addEventListener('scroll', () => {
    const sabbathCol = document.querySelector('.sabbath-column');
    if (window.scrollY > 300) {
        sabbathCol.classList.add('scrolled');
    } else {
        sabbathCol.classList.remove('scrolled');
    }
});
