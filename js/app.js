import { SHEET_URLS, fetchGoogleSheetData } from './services/googleContent.js';

document.addEventListener('DOMContentLoaded', async () => {
    initUI();
    await loadContent();
});

function initUI() {
    // Mobile Menu Toggle
    const navToggle = document.querySelector('.nav-toggle');
    const navLinks = document.querySelector('.nav-links');

    if (navToggle && navLinks) {
        navToggle.addEventListener('click', () => {
            navLinks.classList.toggle('active');
            const isExpanded = navLinks.classList.contains('active');
            navToggle.setAttribute('aria-expanded', isExpanded);
        });
    }

    // Multilingual Welcome Rotation
    const welcomeText = document.getElementById('welcome-text');
    if (welcomeText) {
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
    }
}

function renderAbout(data) {
    if (!data) return;

    const config = {};
    data.forEach(item => { if (item.Key) config[item.Key] = item.Value; });

    const aboutContainer = document.getElementById('about-container');
    aboutContainer.innerHTML = `
        <div class="card">
            <h3>Our Mission</h3>
            <p>${config.Mission || ''}</p>
        </div>
        <div class="card">
            <h3>Our Vision</h3>
            <p>${config.Vision || ''}</p>
        </div>
    `;

    const pastorContainer = document.getElementById('pastor-container');
    if (config.PastorName) {
        const pastorTitle = config.PastorName.toLowerCase().includes('pastor') ? '' : 'Pastor ';
        pastorContainer.innerHTML = `
            <div class="pastor-profile">
                <img src="${config.PastorImage || 'images/pastor_profile_pic.webp'}" alt="Image of ${config.PastorName}">
                <div class="bio">
                    <h3>${pastorTitle}${config.PastorName}</h3>
                    <p>${config.PastorBio || ''}</p>
                </div>
            </div>
        `;
    }
}

function renderMinistries(data) {
    if (!data) return;

    const container = document.getElementById('ministries-grid');
    container.innerHTML = data.map(ministry => `
        <div class="ministry-card">
            <div class="ministry-card-header">${ministry.Title}</div>
            <div class="ministry-card-content">
                <img src="${ministry.ImageLink}" alt="${ministry.Title}">
                <p>${ministry.Description}</p>
            </div>
        </div>
    `).join('');

    // Add click event listener for expanding cards
    container.addEventListener('click', (event) => {
        if (event.target.classList.contains('ministry-card-header')) {
            const clickedCard = event.target.parentElement;

            // Close all other cards
            document.querySelectorAll('.ministry-card').forEach(card => {
                if (card !== clickedCard) {
                    card.classList.remove('active');
                }
            });

            // Toggle the clicked card
            clickedCard.classList.toggle('active');
        }
    });
}

async function loadContent() {
    try {
        const [aboutData, ministriesData] = await Promise.all([
            fetchGoogleSheetData(SHEET_URLS.about),
            fetchGoogleSheetData(SHEET_URLS.ministries)
        ]);

        renderAbout(aboutData);
        renderMinistries(ministriesData);

    } catch (error) {
        console.error('Error loading content:', error);
    }
}
