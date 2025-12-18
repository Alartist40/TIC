import { fetchGoogleSheetData } from './services/googleContent.js';
import { renderGallery } from './components/renderGallery.js';
import { renderPastor } from './components/renderPastor.js';
import { renderSchedule } from './components/renderSchedule.js';

console.log("App Initialized");

// Multi-Tab Sheet Configuration
// Updated with corrected published CSV URLs
// Cache-buster: Adding timestamp to force fresh data
const SHEET_URLS = {
    general: 'https://docs.google.com/spreadsheets/d/e/2PACX-1vTW2lUOC_ogYTvWIo_thDUo_NvQbJd-vBnnuXo0YQ36-QQPi22uvQjtqy9pAqtWlXom0HwVHSdBCMj7/pub?gid=2118403729&single=true&output=csv',
    about: 'https://docs.google.com/spreadsheets/d/e/2PACX-1vTW2lUOC_ogYTvWIo_thDUo_NvQbJd-vBnnuXo0YQ36-QQPi22uvQjtqy9pAqtWlXom0HwVHSdBCMj7/pub?gid=1587976413&single=true&output=csv',
    ministries: 'https://docs.google.com/spreadsheets/d/e/2PACX-1vTW2lUOC_ogYTvWIo_thDUo_NvQbJd-vBnnuXo0YQ36-QQPi22uvQjtqy9pAqtWlXom0HwVHSdBCMj7/pub?gid=0&single=true&output=csv',
    sermons: 'https://docs.google.com/spreadsheets/d/e/2PACX-1vTW2lUOC_ogYTvWIo_thDUo_NvQbJd-vBnnuXo0YQ36-QQPi22uvQjtqy9pAqtWlXom0HwVHSdBCMj7/pub?gid=708079300&single=true&output=csv',
    schedule: 'https://docs.google.com/spreadsheets/d/e/2PACX-1vTW2lUOC_ogYTvWIo_thDUo_NvQbJd-vBnnuXo0YQ36-QQPi22uvQjtqy9pAqtWlXom0HwVHSdBCMj7/pub?gid=786496350&single=true&output=csv'
};

// Helper function to add cache-busting parameter
function getCachedUrl(url) {
    if (!url) return url;
    const timestamp = new Date().getTime();
    return `${url}&_=${timestamp}`;
}

document.addEventListener('DOMContentLoaded', async () => {
    initMobileMenu();
    initScrollEffects();
    initGeneralModals();

    // Multilingual Welcome System
    const welcomeSystem = {
        welcomeText: document.getElementById('welcome-text'),
        languages: ['WELCOME', 'ようこそ', '欢迎', '환영합니다', 'BIENVENIDO', 'BEM-VINDO', 'BIENVENUE'],
        currentIndex: 0,
        init() {
            if (!this.welcomeText) return;
            setInterval(() => this.rotateText(), 3000);
        },
        rotateText() {
            this.currentIndex = (this.currentIndex + 1) % this.languages.length;
            const current = this.languages[this.currentIndex];
            this.welcomeText.style.opacity = '0';
            setTimeout(() => {
                this.welcomeText.textContent = current;
                this.welcomeText.style.opacity = '1';
            }, 500);
        }
    };
    welcomeSystem.init();

    // Fetch all sheet data
    await loadAllContent();
});

async function loadAllContent() {
    try {
        console.log("🔄 Starting to load all content from Google Sheets...");

        // 1. Load General Config (Service Times, YouTube Link)
        if (SHEET_URLS.general) {
            console.log("📊 Fetching General config...");
            const generalData = await fetchGoogleSheetData(getCachedUrl(SHEET_URLS.general));
            console.log("✅ General data received:", generalData);
            if (generalData && generalData.length > 0) {
                renderGeneralConfig(generalData);
            } else {
                console.warn("⚠️ General data is empty");
            }
        }

        // 2. Load About Section (Mission, Vision, Pastor)
        if (SHEET_URLS.about) {
            console.log("📊 Fetching About section...");
            const aboutData = await fetchGoogleSheetData(getCachedUrl(SHEET_URLS.about));
            console.log("✅ About data received:", aboutData);
            if (aboutData && aboutData.length > 0) {
                renderAboutSection(aboutData);
            } else {
                console.warn("⚠️ About data is empty");
            }
        }

        // 3. Load Ministries
        if (SHEET_URLS.ministries) {
            console.log("📊 Fetching Ministries...");
            const ministriesData = await fetchGoogleSheetData(getCachedUrl(SHEET_URLS.ministries));
            console.log("✅ Ministries data received:", ministriesData);
            if (ministriesData && ministriesData.length > 0) {
                const ministriesContainer = document.getElementById('ministries-grid');
                if (ministriesContainer) {
                    renderGallery(ministriesData, ministriesContainer, 'ministry');
                } else {
                    console.error("❌ Ministries container not found in HTML");
                }
            } else {
                console.warn("⚠️ Ministries data is empty");
            }
        }

        // 4. Load Sermons (Optional)
        if (SHEET_URLS.sermons) {
            console.log("📊 Fetching Sermons...");
            const sermonsData = await fetchGoogleSheetData(getCachedUrl(SHEET_URLS.sermons));
            console.log("✅ Sermons data received:", sermonsData);
            if (sermonsData && sermonsData.length > 0) {
                renderSermons(sermonsData);
            } else {
                console.warn("⚠️ Sermons data is empty");
            }
        }

        // 5. Load Schedule (NEW!)
        if (SHEET_URLS.schedule) {
            console.log("📊 Fetching Service Schedule...");
            const scheduleData = await fetchGoogleSheetData(getCachedUrl(SHEET_URLS.schedule));
            console.log("✅ Schedule data received:", scheduleData);
            if (scheduleData && scheduleData.length > 0) {
                renderSchedule(scheduleData);
            } else {
                console.warn("⚠️ Schedule data is empty");
            }
        }

        console.log("✅ All content loaded successfully!");

    } catch (error) {
        console.error("❌ Content Load Error:", error);
        console.error("Error details:", error.message, error.stack);
    }
}

function renderGeneralConfig(data) {
    const config = {};
    data.forEach(item => {
        if (item.Key && item.Value) config[item.Key] = item.Value;
    });

    // YouTube Live Link - Add to Sermons section
    const youtubeLink = config['YoutubeLive'];
    if (youtubeLink) {
        const sermonsSection = document.getElementById('sermons');
        if (sermonsSection) {
            let liveCard = document.getElementById('youtube-live-card');
            if (!liveCard) {
                liveCard = document.createElement('div');
                liveCard.id = 'youtube-live-card';
                liveCard.className = 'card btn-frame';
                liveCard.innerHTML = `
                    <h3>Join Us Live on YouTube</h3>
                    <p>Every Sabbath we stream our worship service—click below to watch our live streams and past sermons.</p>
                    <a class="gold-btn" href="${youtubeLink}" target="_blank" rel="noopener">Watch on YouTube</a>
                `;
                sermonsSection.insertBefore(liveCard, sermonsSection.firstChild.nextSibling);
            }
        }
    }

    // NOTE: Service times are now displayed via the Schedule tab
    // The Schedule provides comprehensive weekly program information
}

function renderAboutSection(data) {
    const config = {};
    data.forEach(item => {
        if (item.Key && item.Value) config[item.Key] = item.Value;
    });

    const aboutSection = document.getElementById('about');
    if (!aboutSection) return;

    // Update Mission/Vision card if data exists
    const missionCard = aboutSection.querySelector('.card');
    if (missionCard && config['Mission']) {
        let html = '<h3>Our Mission and Vision</h3>';

        if (config['Mission']) {
            html += `<h4>Our Mission</h4><p>${config['Mission']}</p>`;
        }
        if (config['Vision']) {
            html += `<h4>Our Vision</h4><p>${config['Vision']}</p>`;
        }
        if (config['Values']) {
            html += '<h4>Our Values</h4><ul>';
            const values = config['Values'].split(',');
            values.forEach(val => {
                html += `<li>${val.trim()}</li>`;
            });
            html += '</ul>';
        }

        missionCard.innerHTML = html;
    }

    // Update Pastor info if data exists
    if (config['PastorName']) {
        const pastorData = {
            PastorName: config['PastorName'],
            PastorBio: config['PastorBio'] || '',
            PastorImage: config['PastorImage'] || 'images/pastor_profile_pic.webp'
        };

        const pastorContainer = document.getElementById('pastor-container');
        if (pastorContainer) {
            renderPastor(pastorData, pastorContainer);
        }
    }
}

function renderSermons(data) {
    // This would render YouTube video embeds if you have sermon data
    console.log("Sermons data:", data);
}

function initMobileMenu() {
    const navToggle = document.querySelector('.nav-toggle');
    const navLinks = document.querySelector('.nav-links');

    if (navToggle && navLinks) {
        navToggle.addEventListener('click', () => {
            const isExpanded = navToggle.getAttribute('aria-expanded') === 'true';
            navToggle.setAttribute('aria-expanded', !isExpanded);
            navLinks.classList.toggle('open');
        });

        navLinks.querySelectorAll('a').forEach(link => {
            link.addEventListener('click', () => {
                navLinks.classList.remove('open');
                navToggle.setAttribute('aria-expanded', 'false');
            });
        });
    }
}

function initScrollEffects() {
    const sabbathCol = document.querySelector('.sabbath-column');

    if (sabbathCol) {
        window.addEventListener('scroll', () => {
            const scrollY = window.scrollY;
            const docHeight = document.documentElement.scrollHeight - window.innerHeight;
            const scrollPercent = scrollY / docHeight;

            // Smooth fade based on scroll percentage (0 to 1)
            const opacity = Math.max(0, 1 - (scrollPercent * 1.5)); // Fades completely at 66% scroll
            sabbathCol.style.opacity = opacity;
        });
    }
}

function initGeneralModals() {
    document.addEventListener('click', (e) => {
        if (e.target.classList.contains('more-btn') && e.target.dataset.modal) {
            alert("Modal content for '" + e.target.dataset.modal + "' would load here.");
        }
    });
}
