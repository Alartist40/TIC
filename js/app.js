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

async function loadContent() {
    try {
        const aboutData = await fetchGoogleSheetData(SHEET_URLS.about);

        if (aboutData) {
            const config = {};
            aboutData.forEach(item => { if (item.Key) config[item.Key] = item.Value; });

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
                pastorContainer.innerHTML = `
                    <div class="pastor-profile">
                        <img src="${config.PastorImage || 'images/pastor_profile_pic.webp'}" alt="Pastor ${config.PastorName}">
                        <div class="bio">
                            <h3>Pastor ${config.PastorName}</h3>
                            <p>${config.PastorBio || ''}</p>
                        </div>
                    </div>
                `;
            }
        }

    } catch (error) {
        console.error('Error loading content:', error);
    }
}
