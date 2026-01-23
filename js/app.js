import { fetchGoogleSheetData } from './services/googleContent.js';
import { renderGallery } from './components/renderGallery.js';
import { renderPastor } from './components/renderPastor.js';
import { renderSchedule } from './components/renderSchedule.js';

const SHEET_URLS = {
    general: 'https://docs.google.com/spreadsheets/d/e/2PACX-1vTW2lUOC_ogYTvWIo_thDUo_NvQbJd-vBnnuXo0YQ36-QQPi22uvQjtqy9pAqtWlXom0HwVHSdBCMj7/pub?gid=2118403729&single=true&output=csv',
    about: 'https://docs.google.com/spreadsheets/d/e/2PACX-1vTW2lUOC_ogYTvWIo_thDUo_NvQbJd-vBnnuXo0YQ36-QQPi22uvQjtqy9pAqtWlXom0HwVHSdBCMj7/pub?gid=1587976413&single=true&output=csv',
    ministries: 'https://docs.google.com/spreadsheets/d/e/2PACX-1vTW2lUOC_ogYTvWIo_thDUo_NvQbJd-vBnnuXo0YQ36-QQPi22uvQjtqy9pAqtWlXom0HwVHSdBCMj7/pub?gid=0&single=true&output=csv',
    sermons: 'https://docs.google.com/spreadsheets/d/e/2PACX-1vTW2lUOC_ogYTvWIo_thDUo_NvQbJd-vBnnuXo0YQ36-QQPi22uvQjtqy9pAqtWlXom0HwVHSdBCMj7/pub?gid=708079300&single=true&output=csv',
    schedule: 'https://docs.google.com/spreadsheets/d/e/2PACX-1vTW2lUOC_ogYTvWIo_thDUo_NvQbJd-vBnnuXo0YQ36-QQPi22uvQjtqy9pAqtWlXom0HwVHSdBCMj7/pub?gid=786496350&single=true&output=csv'
};

// ⚡ Bolt: Removed getCachedUrl function to allow browser caching of CSV data.
// This improves performance on repeat visits.

document.addEventListener('DOMContentLoaded', async () => {
    initUI();
    await loadContent();
});

function initUI() {
    // Mobile Menu Toggle
    const navToggle = document.querySelector('.nav-toggle');
    const navLinks = document.querySelector('.nav-links');
    if (navToggle) {
        navToggle.addEventListener('click', () => {
            navLinks.classList.toggle('open');
            const expanded = navToggle.getAttribute('aria-expanded') === 'true';
            navToggle.setAttribute('aria-expanded', !expanded);
        });
    }

    // Back to Top Button
    const backToTop = document.getElementById('back-to-top');
    window.addEventListener('scroll', () => {
        if (window.scrollY > 300) {
            backToTop.classList.add('visible');
        } else {
            backToTop.classList.remove('visible');
        }
    });

    backToTop.addEventListener('click', () => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    });

    // 7th Grid Color Transition
    const sabbathCol = document.getElementById('sabbath-column');
    window.addEventListener('scroll', () => {
        const scrollPosition = window.scrollY;
        const totalHeight = document.documentElement.scrollHeight - window.innerHeight;
        const scrollRatio = totalHeight > 0 ? Math.min(scrollPosition / totalHeight, 1) : 0;

        // Transition from #005eb8 to #ffffff
        // We can use interpolate levels or just set opacity of a white layer
        // But the user asked for the grid itself to transition.
        const r = Math.round(0 + (255 - 0) * scrollRatio);
        const g = Math.round(94 + (255 - 94) * scrollRatio);
        const b = Math.round(184 + (255 - 184) * scrollRatio);

        sabbathCol.style.backgroundColor = `rgb(${r}, ${g}, ${b})`;

        // Adjust logo brightness if needed
        const logo = sabbathCol.querySelector('.sabbath-logo');
        if (scrollRatio > 0.7) {
            logo.style.filter = 'invert(1) drop-shadow(0 0 2px rgba(0,0,0,0.2))';
        } else {
            logo.style.filter = 'none';
        }
    });

    // Multilingual Welcome Rotation
    const welcomeText = document.getElementById('welcome-text');
    const languages = [
        { text: 'WELCOME', lang: 'English' },
        { text: 'ようこそ', lang: 'Japanese' },
        { text: '欢迎', lang: 'Chinese' },
        { text: '환영합니다', lang: 'Korean' },
        { text: 'BIENVENIDO', lang: 'Spanish' },
        { text: 'BEM-VINDO', lang: 'Portuguese' },
        { text: 'BIENVENUE', lang: 'French' }
    ];
    let langIndex = 0;

    setInterval(() => {
        langIndex = (langIndex + 1) % languages.length;
        welcomeText.style.opacity = '0';
        setTimeout(() => {
            welcomeText.textContent = languages[langIndex].text;
            welcomeText.style.opacity = '1';
        }, 500);
    }, 3000);

    document.getElementById('year').textContent = new Date().getFullYear();
}

async function loadContent() {
    try {
        // ⚡ Bolt: Parallelize network requests to prevent a sequential waterfall.
        const [aboutData, ministriesData, scheduleData, generalData] = await Promise.all([
            fetchGoogleSheetData(SHEET_URLS.about),
            fetchGoogleSheetData(SHEET_URLS.ministries),
            fetchGoogleSheetData(SHEET_URLS.schedule),
            fetchGoogleSheetData(SHEET_URLS.general)
        ]);

        // Process About Data
        if (aboutData) {
            const config = {};
            aboutData.forEach(item => { if (item.Key) config[item.Key] = item.Value; });

            const container = document.getElementById('about-container');
            container.innerHTML = `
                <div class="card">
                    <h3>Our Mission and Vision</h3>
                    <h4>Our Mission</h4>
                    <p>${config.Mission || ''}</p>
                    <h4>Our Vision</h4>
                    <p>${config.Vision || ''}</p>
                    ${config.Values ? `<h4>Our Values</h4><p>${config.Values}</p>` : ''}
                </div>
            `;

            if (config.PastorName) {
                renderPastor({
                    name: config.PastorName,
                    bio: config.PastorBio,
                    image: config.PastorImage || 'images/pastor_profile_pic.webp'
                }, document.getElementById('pastor-container'));
            }
        }

        // Process Ministries
        if (ministriesData) {
            renderGallery(ministriesData, document.getElementById('ministries-grid'));
        }

        // Process Schedule
        if (scheduleData) {
            renderSchedule(scheduleData, document.getElementById('schedule-container'));
        }

        // Process Sermons/General
        if (generalData) {
            const config = {};
            generalData.forEach(item => { if (item.Key) config[item.Key] = item.Value; });
            if (config.YoutubeLive) {
                document.getElementById('sermons-container').innerHTML = `
                    <div class="card" style="text-align: center;">
                        <h3>Join Us Live on YouTube</h3>
                        <p>Watch our services live every Sabbath.</p>
                        <a href="${config.YoutubeLive}" target="_blank" class="gold-btn" style="display:inline-block; margin-top:1rem; padding: 0.75rem 1.5rem; border: 2px solid var(--accent); color: var(--accent); text-decoration:none; border-radius:4px; font-weight:600;">Watch Now</a>
                    </div>
                `;
            }
        }

    } catch (error) {
        console.error('Error loading content:', error);
    }
}
