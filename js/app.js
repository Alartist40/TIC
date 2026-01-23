import { SHEET_URLS, fetchGoogleSheetData } from './services/googleContent.js';

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

        const r = Math.round(0 + (255 - 0) * scrollRatio);
        const g = Math.round(94 + (255 - 94) * scrollRatio);
        const b = Math.round(184 + (255 - 184) * scrollRatio);

        sabbathCol.style.backgroundColor = `rgb(${r}, ${g}, ${b})`;

        const logo = sabbathCol.querySelector('.sabbath-logo');
        if (scrollRatio > 0.7) {
            logo.style.filter = 'invert(1) drop-shadow(0 0 2px rgba(0,0,0,0.2))';
        } else {
            logo.style.filter = 'none';
        }
    });

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

    document.getElementById('year').textContent = new Date().getFullYear();
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

    container.addEventListener('click', (event) => {
        if (event.target.classList.contains('ministry-card-header')) {
            const clickedCard = event.target.parentElement;

            document.querySelectorAll('.ministry-card').forEach(card => {
                if (card !== clickedCard) {
                    card.classList.remove('active');
                }
            });
            clickedCard.classList.toggle('active');
        }
    });
}

function renderVisit(data) {
    const container = document.getElementById('visit-container');

    const config = {};
    if (data && data.length > 0) {
        data.forEach(item => { if (item.Key) config[item.Key] = item.Value; });
    } else {
        container.innerHTML = '<div class="card"><p>Loading visitor information...</p></div>';
        return;
    }

    const encodedAddress = encodeURIComponent(config.Address);
    const mapUrl = `https://www.google.com/maps/embed/v1/place?key=YOUR_API_KEY&q=${encodedAddress}`;

    container.innerHTML = `
        <div class="card">
            <div class="service-times">
                <h3>Service Times</h3>
                <ul>
                    <li>Sabbath School<span class="time">${config.SabbathSchoolTime}</span></li>
                    <li>Worship Service<span class="time">${config.WorshipServiceTime}</span></li>
                </ul>
            </div>
            <div class="address-contact">
                <h3>Address & Contact</h3>
                <p>${config.Address}</p>
                <p>Email: <a href="mailto:${config.ContactEmail}">${config.ContactEmail}</a></p>
                <div class="map-container">
                    <iframe
                        src="${mapUrl}"
                        loading="lazy"
                        allowfullscreen>
                    </iframe>
                </div>
            </div>
        </div>
    `;
}

async function loadContent() {
    try {
        const [aboutData, ministriesData, visitData] = await Promise.all([
            fetchGoogleSheetData(SHEET_URLS.about),
            fetchGoogleSheetData(SHEET_URLS.ministries),
            fetchGoogleSheetData(SHEET_URLS.visit)
        ]);

        renderAbout(aboutData);
        renderMinistries(ministriesData);
        renderVisit(visitData);

    } catch (error) {
        console.error('Error loading content:', error);
    }
}
