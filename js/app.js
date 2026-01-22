// For now, we only need the navigation logic.
// The rest of the functionality will be rebuilt step-by-step.

document.addEventListener('DOMContentLoaded', () => {
    initUI();
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
