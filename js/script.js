// Configuration
const SHEET_URLS = {
    general: 'https://docs.google.com/spreadsheets/d/e/2PACX-1vTW2lUOC_ogYTvWIo_thDUo_NvQbJd-vBnnuXo0YQ36-QQPi22uvQjtqy9pAqtWlXom0HwVHSdBCMj7/pub?gid=2118403729&single=true&output=csv',
    about: 'https://docs.google.com/spreadsheets/d/e/2PACX-1vTW2lUOC_ogYTvWIo_thDUo_NvQbJd-vBnnuXo0YQ36-QQPi22uvQjtqy9pAqtWlXom0HwVHSdBCMj7/pub?gid=1587976413&single=true&output=csv',
    ministries: 'https://docs.google.com/spreadsheets/d/e/2PACX-1vTW2lUOC_ogYTvWIo_thDUo_NvQbJd-vBnnuXo0YQ36-QQPi22uvQjtqy9pAqtWlXom0HwVHSdBCMj7/pub?gid=0&single=true&output=csv',
    schedule: 'https://docs.google.com/spreadsheets/d/e/2PACX-1vTW2lUOC_ogYTvWIo_thDUo_NvQbJd-vBnnuXo0YQ36-QQPi22uvQjtqy9pAqtWlXom0HwVHSdBCMj7/pub?gid=786496350&single=true&output=csv',
    visit: 'https://docs.google.com/spreadsheets/d/e/2PACX-1vQf7T3_S-wD1s-V-2-y2f-wA6-y-wA6-y-wA6-y-wA6-y-wA6-y-wA6-y-wA6-y-wA6/pub?gid=0&single=true&output=csv', // Placeholder
    events: 'https://docs.google.com/spreadsheets/d/e/2PACX-1vTW2lUOC_ogYTvWIo_thDUo_NvQbJd-vBnnuXo0YQ36-QQPi22uvQjtqy9pAqtWlXom0HwVHSdBCMj7/pub?gid=123456789&single=true&output=csv' // Placeholder GID for events
};

// Global Data Store
const store = {
    about: {},
    ministries: [],
    schedule: [],
    visit: [],
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

async function init() {
    // 1. Fetch all data
    const [about, ministries, schedule, visit, general] = await Promise.all([
        fetchSheetData(SHEET_URLS.about),
        fetchSheetData(SHEET_URLS.ministries),
        fetchSheetData(SHEET_URLS.schedule),
        fetchSheetData(SHEET_URLS.visit),
        fetchSheetData(SHEET_URLS.general)
    ]);

    // 2. Populate Store
    about.forEach(item => { if (item.Key) store.about[item.Key] = item.Value; });
    store.ministries = ministries;
    store.schedule = schedule;
    store.visit = visit;
    general.forEach(item => { if (item.Key) store.general[item.Key] = item.Value; });

    // 3. Render Content
    renderDynamicContent();
    renderServiceTimes();

    // 4. Setup UI Interactions
    setupUI();
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
}

function renderServiceTimes() {
    const serviceTableBody = document.querySelector('.service-table tbody');
    if (serviceTableBody && store.visit.length > 0) {
        serviceTableBody.innerHTML = ''; // Clear hardcoded content
        store.visit.forEach(item => {
            if (!item.Program) return;
            const row = document.createElement('tr');

            const programCell = document.createElement('td');
            programCell.textContent = item.Program;
            row.appendChild(programCell);

            const timeCell = document.createElement('td');
            timeCell.textContent = item['Day & Time'] || '';
            row.appendChild(timeCell);

            const locationCell = document.createElement('td');
            locationCell.textContent = item.Location || '';
            row.appendChild(locationCell);

            serviceTableBody.appendChild(row);
        });
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

function setupUI() {
    // Fixed navigation scrolling with header offset
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            const target = document.querySelector(targetId);
            if (target) {
                const headerHeight = document.querySelector('.main-nav').offsetHeight;
                const targetPosition = target.getBoundingClientRect().top + window.pageYOffset - headerHeight;
                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
                // Close mobile menu if open
                const links = document.querySelector('.nav-links');
                const toggle = document.querySelector('.nav-toggle');
                if (links.classList.contains('open')) {
                    links.classList.remove('open');
                    toggle.setAttribute('aria-expanded', 'false');
                }
            }
        });
    });

    // Mobile navigation toggle
    const toggle = document.querySelector('.nav-toggle');
    const links = document.querySelector('.nav-links');
    if (toggle && links) {
        toggle.addEventListener('click', (e) => {
            e.stopPropagation();
            const expanded = toggle.getAttribute('aria-expanded') === 'true';
            toggle.setAttribute('aria-expanded', !expanded);
            links.classList.toggle('open');
        });

        document.addEventListener('click', (e) => {
            if (links.classList.contains('open') && !links.contains(e.target) && !toggle.contains(e.target)) {
                links.classList.remove('open');
                toggle.setAttribute('aria-expanded', 'false');
            }
        });
    }

    // Sticky Nav on Scroll
    const nav = document.querySelector('.main-nav');
    if (nav) {
        const handleScroll = () => {
            if (window.pageYOffset > 10) {
                nav.classList.add('sticky');
            } else {
                nav.classList.remove('sticky');
            }
        };
        window.addEventListener('scroll', handleScroll);
        handleScroll();
    }

    // Back to top button functionality
    const backToTopButton = document.querySelector('.back-to-top');
    if (backToTopButton) {
        backToTopButton.addEventListener('click', () => {
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        });

        // Show/hide back to top button
        window.addEventListener('scroll', () => {
            if (window.pageYOffset > 300) {
                backToTopButton.classList.add('visible');
            } else {
                backToTopButton.classList.remove('visible');
            }
        });
    }


    // Welcome message rotation
    function setupWelcomeMessageRotation() {
        const welcomeElement = document.getElementById('welcome-message');
        if (!welcomeElement) return;

        const messages = [
            "Welcome",    // English
            "ようこそ",       // Japanese
            "Bienvenido", // Spanish
            "Bem-vindo",  // Portuguese
            "欢迎",        // Chinese
            "환영"         // Korean
        ];
        let messageIndex = 0;

        // Set initial state for smooth first transition
        welcomeElement.style.opacity = '1';
        welcomeElement.style.transition = 'opacity 0.5s ease-in-out';

        setInterval(() => {
            messageIndex = (messageIndex + 1) % messages.length;

            welcomeElement.style.opacity = '0';

            setTimeout(() => {
                welcomeElement.textContent = messages[messageIndex];
                welcomeElement.style.opacity = '1';
            }, 500); // Half-second fade
        }, 3000); // 3-second display
    }
    setupWelcomeMessageRotation();

    // Modal/popup system
    const modal = document.getElementById('modal');
    const modalBody = document.querySelector('.modal-body');
    const closeModal = document.querySelector('.modal-close');

    function closeModalWindow() {
        if (modal) {
            modal.classList.remove('active');
            document.body.style.overflow = 'auto';
        }
    }

    if(closeModal) {
        closeModal.addEventListener('click', closeModalWindow);
    }

    if(modal) {
        modal.addEventListener('click', (e) => {
            if (e.target === modal) {
                closeModalWindow();
            }
        });
    }

    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && modal && modal.classList.contains('active')) {
            closeModalWindow();
        }
    });

    // Handle modal and collapsible buttons
    document.querySelectorAll('.more-btn').forEach(button => {
        button.addEventListener('click', function() {
            const contentKey = this.getAttribute('data-content');
            const targetId = this.getAttribute('data-target');

            if (contentKey) {
                loadModalContent(contentKey);
            } else if (targetId) {
                toggleCollapsibleContent(this, targetId);
            }
        });
    });

    function toggleCollapsibleContent(button, targetId) {
        const content = document.getElementById(targetId);
        if (content) {
            const isCollapsed = content.classList.toggle('collapsed');
            button.textContent = isCollapsed ? 'Read More' : 'Show Less';
        }
    }

    function loadModalContent(contentKey) {
        if(modalBody && modal) {
            modalBody.innerHTML = window.getDynamicContent(contentKey) || '<h3>Content Not Available</h3><p>Please check back later.</p>';
            modal.classList.add('active');
            document.body.style.overflow = 'hidden';
        }
    }

    // Set current year in footer
    const yearElement = document.getElementById('year');
    if(yearElement) {
        yearElement.textContent = new Date().getFullYear();
    }


    // Add loading states for iframes
    document.querySelectorAll('iframe').forEach(iframe => {
        iframe.addEventListener('load', function() {
            this.style.opacity = '1';
        });
        iframe.style.opacity = '0.7';
        iframe.style.transition = 'opacity 0.3s ease';
    });
}


document.addEventListener('DOMContentLoaded', init);