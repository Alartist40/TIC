import { SHEET_URLS } from './services/googleContent.js';

document.addEventListener('DOMContentLoaded', () => {
    const mobileMenuButton = document.getElementById('mobile-menu-button');
    const mobileMenu = document.getElementById('mobile-menu');

    if (mobileMenuButton && mobileMenu) {
        mobileMenuButton.addEventListener('click', () => {
            mobileMenu.style.display = mobileMenu.style.display === 'block' ? 'none' : 'block';
        });
    }

    loadContent();
});

function loadContent() {
    const contentDiv = document.getElementById('content');
    if (!contentDiv) return;

    // Clear existing content
    contentDiv.innerHTML = '';

    // Render all sections
    renderHeroSection(contentDiv);
    renderAboutSection(contentDiv);
    renderMinistrySection(contentDiv);
    renderSermonSection(contentDiv);
    renderEventsSection(contentDiv);
    renderVisitSection(contentDiv);
}

function fetchData(url, callback) {
    Papa.parse(url, {
        download: true,
        header: true,
        complete: (results) => {
            callback(results.data);
        },
        error: (error) => {
            console.error(`Error fetching data from ${url}:`, error);
        }
    });
}

function renderHeroSection(container) {
    const heroHtml = `
        <section id="home" class="relative bg-gradient-to-br from-blue-50 to-white py-20 lg:py-32">
          <div class="container mx-auto px-4 lg:px-8">
            <div class="max-w-4xl mx-auto text-center space-y-8">
              <div class="space-y-4">
                <h1 id="welcome-text" class="text-5xl lg:text-7xl font-bold text-gray-900 leading-tight min-h-[1.2em] transition-opacity duration-500">WELCOME</h1>
                <p class="text-2xl lg:text-3xl text-blue-600 font-semibold">To Grace Community Church</p>
              </div>
              <p class="text-xl lg:text-2xl text-gray-700 max-w-3xl mx-auto leading-relaxed">
                Join us as we gather together to worship, grow in faith, and serve our community. You are loved, you are valued, and you belong here.
              </p>
              <div class="flex flex-col sm:flex-row gap-4 justify-center pt-6">
                <a href="#visit" class="bg-blue-600 text-white px-8 py-4 rounded-lg text-lg font-semibold hover:bg-blue-700 transition-colors shadow-lg hover:shadow-xl">Plan Your Visit</a>
                <a href="#about" class="bg-white text-blue-600 px-8 py-4 rounded-lg text-lg font-semibold border-2 border-blue-600 hover:bg-blue-50 transition-colors">Learn More</a>
              </div>
            </div>
          </div>
        </section>
    `;
    container.innerHTML += heroHtml;

    const welcomeTextElement = document.getElementById('welcome-text');
    if (welcomeTextElement) {
        const languages = ['WELCOME', 'ようこそ', '欢迎', '환영합니다', 'BIENVENIDO', 'BEM-VINDO', 'BIENVENUE'];
        let index = 0;
        setInterval(() => {
            welcomeTextElement.style.opacity = 0;
            setTimeout(() => {
                index = (index + 1) % languages.length;
                welcomeTextElement.textContent = languages[index];
                welcomeTextElement.style.opacity = 1;
            }, 500);
        }, 3000);
    }
}

function renderAboutSection(container) {
    const aboutSection = document.createElement('section');
    aboutSection.id = 'about';
    aboutSection.className = 'py-16 lg:py-24 bg-white';

    const aboutHtml = `
      <div class="container mx-auto px-4 lg:px-8">
        <div class="max-w-6xl mx-auto space-y-16">
          <div class="text-center space-y-6">
            <h2 class="text-4xl lg:text-5xl font-bold text-gray-900">About Us</h2>
            <p class="text-xl text-gray-600 max-w-3xl mx-auto">Building a community of believers</p>
          </div>

          <!-- Story Section -->
          <div class="grid md:grid-cols-2 gap-12 items-center">
            <div><img src="https://images.unsplash.com/photo-1608569569089-5d2e3e644ea6?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjaHVyY2glMjBidWlsZGluZyUyMGV4dGVyaW9yfGVufDF8fHx8MTc2ODk5NTk0Mnww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral" alt="Church Building" class="w-full h-96 object-cover rounded-lg shadow-xl"></div>
            <div class="space-y-6">
              <h3 class="text-3xl font-bold text-gray-900">Our Story</h3>
              <p class="text-lg text-gray-700 leading-relaxed">Our church was founded in 1985 with a small group of believers who wanted to create a place of worship and community. Over the years, we have grown and evolved, but our commitment to faith, hope, and love has remained the same.</p>
            </div>
          </div>

          <!-- Mission & Vision Section -->
          <div class="grid md:grid-cols-2 gap-12">
            <div class="bg-blue-50 p-8 rounded-lg">
                <h3 class="text-3xl font-bold text-gray-900 mb-4">Our Mission</h3>
                <p class="text-lg text-gray-700 leading-relaxed">To share the love of Christ with our community and the world, and to make disciples of all nations.</p>
            </div>
            <div class="bg-blue-50 p-8 rounded-lg">
                <h3 class="text-3xl font-bold text-gray-900 mb-4">Our Vision</h3>
                <p class="text-lg text-gray-700 leading-relaxed">To be a beacon of hope and a place of refuge for all who are seeking God's love and grace.</p>
            </div>
          </div>

          <!-- Pastor Bio Section -->
          <div class="grid md:grid-cols-2 gap-12 items-center">
            <div class="space-y-6">
                <h3 class="text-3xl font-bold text-gray-900">Meet Our Pastor</h3>
                <p class="text-lg text-gray-700 leading-relaxed">Pastor John Doe has been leading our congregation for the past 10 years. He is a passionate speaker and a dedicated servant of God. He and his wife, Jane, have three children and have been married for 15 years.</p>
            </div>
            <div><img src="https://via.placeholder.com/400" alt="Pastor" class="w-full h-96 object-cover rounded-lg shadow-xl"></div>
          </div>

        </div>
      </div>`;
    aboutSection.innerHTML = aboutHtml;
    container.appendChild(aboutSection);
}

function renderMinistrySection(container) {
    const ministrySection = document.createElement('section');
    ministrySection.id = 'ministries';
    ministrySection.className = 'py-16 lg:py-24 bg-gray-50';

    const headerHtml = `
        <div class="container mx-auto px-4 lg:px-8">
            <div class="max-w-6xl mx-auto space-y-12">
                <div class="text-center space-y-4">
                    <h2 class="text-4xl lg:text-5xl font-bold text-gray-900">Our Ministries</h2>
                    <p class="text-xl text-gray-600 max-w-3xl mx-auto">Find your place to serve, grow, and connect with others</p>
                </div>
                <div id="ministries-list" class="space-y-4"></div>
            </div>
        </div>
    `;
    ministrySection.innerHTML = headerHtml;
    container.appendChild(ministrySection);

    fetchData(SHEET_URLS.ministries, (data) => {
        const ministriesList = document.getElementById('ministries-list');
        if (!ministriesList) return;

        let expandedId = null;

        data.forEach((ministry, index) => {
            const ministryDiv = document.createElement('div');
            ministryDiv.className = 'bg-white rounded-lg shadow-md overflow-hidden transition-all duration-300';

            ministryDiv.innerHTML = `
                <button class="w-full px-6 py-5 flex items-center justify-between hover:bg-gray-50 transition-colors">
                    <div class="flex items-center gap-4">
                        <div class="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
                            <span class="text-2xl">🙏</span>
                        </div>
                        <h3 class="text-2xl font-bold text-gray-900">${ministry.Name}</h3>
                    </div>
                    <div class="text-blue-600">
                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="w-6 h-6 chevron-down"><path d="m6 9 6 6 6-6"></path></svg>
                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="w-6 h-6 chevron-up" style="display: none;"><path d="m18 15-6-6-6 6"></path></svg>
                    </div>
                </button>
                <div class="ministry-details px-6 pb-6 space-y-4" style="display: none;">
                    <div class="rounded-lg overflow-hidden">
                        <img src="${ministry.Image}" alt="${ministry.Name}" class="w-full h-64 object-cover">
                    </div>
                    <p class="text-lg text-gray-700 leading-relaxed">${ministry.Description}</p>
                    <div class="grid md:grid-cols-2 gap-4 pt-2">
                        <div class="bg-blue-50 p-4 rounded-lg">
                            <div class="text-sm text-blue-600 font-semibold mb-1">Schedule</div>
                            <div class="text-gray-800">${ministry.Schedule}</div>
                        </div>
                        <div class="bg-blue-50 p-4 rounded-lg">
                            <div class="text-sm text-blue-600 font-semibold mb-1">Ministry Leader</div>
                            <div class="text-gray-800">${ministry.Leader}</div>
                        </div>
                    </div>
                </div>
            `;

            const button = ministryDiv.querySelector('button');
            const details = ministryDiv.querySelector('.ministry-details');
            const chevronDown = ministryDiv.querySelector('.chevron-down');
            const chevronUp = ministryDiv.querySelector('.chevron-up');

            if (button && details && chevronDown && chevronUp) {
                button.addEventListener('click', () => {
                    const isExpanded = details.style.display === 'block';

                    // Close all other ministries
                    document.querySelectorAll('.ministry-details').forEach(d => d.style.display = 'none');
                    document.querySelectorAll('.chevron-down').forEach(d => d.style.display = 'block');
                    document.querySelectorAll('.chevron-up').forEach(d => d.style.display = 'none');

                    if (!isExpanded) {
                        details.style.display = 'block';
                        chevronDown.style.display = 'none';
                        chevronUp.style.display = 'block';
                    }
                });
            }

            ministriesList.appendChild(ministryDiv);
        });
    });
}

function renderSermonSection(container) {
    const sermonSection = document.createElement('section');
    sermonSection.id = 'sermons';
    sermonSection.className = 'py-16 lg:py-24 bg-white';

    fetchData(SHEET_URLS.sermons, (data) => {
        const youtubeLink = data.length > 0 ? data[0].YouTubeLink : 'https://youtube.com';

        sermonSection.innerHTML = `
            <div class="container mx-auto px-4 lg:px-8">
                <div class="max-w-6xl mx-auto space-y-12">
                    <div class="text-center space-y-4">
                        <h2 class="text-4xl lg:text-5xl font-bold text-gray-900">Watch & Listen</h2>
                        <p class="text-xl text-gray-600 max-w-3xl mx-auto">Catch up on sermons and connect with us on social media</p>
                    </div>
                    <div class="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
                        <a href="${youtubeLink}" target="_blank" rel="noopener noreferrer" class="bg-white border-2 border-gray-200 rounded-lg p-8 hover:border-blue-600 hover:shadow-lg transition-all group">
                            <div class="flex flex-col items-center space-y-4">
                                <h4 class="text-xl font-bold text-gray-900 mb-2">YouTube</h4>
                                <p class="text-sm text-gray-600">Watch full sermons and special events</p>
                            </div>
                        </a>
                        <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" class="bg-white border-2 border-gray-200 rounded-lg p-8 hover:border-blue-600 hover:shadow-lg transition-all group">
                            <div class="flex flex-col items-center space-y-4">
                                <h4 class="text-xl font-bold text-gray-900 mb-2">Facebook</h4>
                                <p class="text-sm text-gray-600">Join our community and stay updated</p>
                            </div>
                        </a>
                        <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" class="bg-white border-2 border-gray-200 rounded-lg p-8 hover:border-blue-600 hover:shadow-lg transition-all group">
                            <div class="flex flex-col items-center space-y-4">
                                <h4 class="text-xl font-bold text-gray-900 mb-2">Instagram</h4>
                                <p class="text-sm text-gray-600">See photos and daily inspiration</p>
                            </div>
                        </a>
                        <a href="https://podcasts.apple.com" target="_blank" rel="noopener noreferrer" class="bg-white border-2 border-gray-200 rounded-lg p-8 hover:border-blue-600 hover:shadow-lg transition-all group">
                            <div class="flex flex-col items-center space-y-4">
                                <h4 class="text-xl font-bold text-gray-900 mb-2">Podcast</h4>
                                <p class="text-sm text-gray-600">Listen to sermons on the go</p>
                            </div>
                        </a>
                    </div>
                </div>
            </div>
        `;
    });
    container.appendChild(sermonSection);
}

function renderEventsSection(container) {
    const eventsSection = document.createElement('section');
    eventsSection.id = 'events';
    eventsSection.className = 'py-16 lg:py-24 bg-gray-50';

    const sectionHtml = `
        <div class="container mx-auto px-4 lg:px-8">
            <div class="max-w-6xl mx-auto space-y-12">
                <div class="text-center space-y-4">
                    <h2 class="text-4xl lg:text-5xl font-bold text-gray-900">Upcoming Events</h2>
                    <p class="text-xl text-gray-600 max-w-3xl mx-auto">Join us for these special gatherings and celebrations</p>
                </div>
                <div class="grid lg:grid-cols-3 gap-8">
                    <div id="events-list" class="lg:col-span-2 space-y-6"></div>
                    <div id="calendar-sidebar" class="lg:col-span-1"></div>
                </div>
            </div>
        </div>
    `;
    eventsSection.innerHTML = sectionHtml;
    container.appendChild(eventsSection);

    fetchData(SHEET_URLS.events, (events) => {
        const eventsList = document.getElementById('events-list');
        const calendarSidebar = document.getElementById('calendar-sidebar');
        if (!eventsList || !calendarSidebar) return;

        const months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
        const eventsByMonth = events.reduce((acc, event) => {
            const month = new Date(event.Date).getMonth() + 1;
            if (!acc[month]) acc[month] = [];
            acc[month].push(event);
            return acc;
        }, {});

        function renderEventCards(filteredEvents) {
            eventsList.innerHTML = filteredEvents.map(event => `
                <div class="bg-white rounded-lg shadow-lg overflow-hidden">
                    <div class="md:flex">
                        <div class="md:w-1/3">
                            <img src="${event.Image}" alt="${event.Title}" class="w-full h-64 md:h-full object-cover">
                        </div>
                        <div class="md:w-2/3 p-6 space-y-4">
                            <div>
                                <h3 class="text-2xl font-bold text-gray-900 mb-2">${event.Title}</h3>
                                <p class="text-gray-700">${event.Description}</p>
                            </div>
                        </div>
                    </div>
                </div>
            `).join('');
        }

        function renderCalendarSidebar(selectedMonth) {
            let sidebarHtml = `
                <div class="bg-white rounded-lg shadow-lg p-6 sticky top-24">
                    <h3 class="text-2xl font-bold text-gray-900 mb-6">Calendar</h3>
                    <div class="space-y-2">
                        <button data-month="null" class="w-full text-left px-4 py-3 rounded-lg transition-colors ${selectedMonth === null ? 'bg-blue-600 text-white' : 'bg-gray-50 text-gray-700 hover:bg-gray-100'}">
                            All Events
                        </button>
            `;
            months.forEach((month, index) => {
                const monthNumber = index + 1;
                const count = eventsByMonth[monthNumber]?.length || 0;
                sidebarHtml += `
                    <button data-month="${monthNumber}" class="w-full text-left px-4 py-3 rounded-lg transition-colors ${selectedMonth === monthNumber ? 'bg-blue-600 text-white' : count > 0 ? 'bg-gray-50 text-gray-700 hover:bg-gray-100' : 'bg-gray-50 text-gray-400 cursor-not-allowed'}" ${count === 0 ? 'disabled' : ''}>
                        ${month}
                    </button>
                `;
            });
            sidebarHtml += `</div></div>`;
            calendarSidebar.innerHTML = sidebarHtml;

            calendarSidebar.querySelectorAll('button[data-month]').forEach(button => {
                button.addEventListener('click', () => {
                    const month = button.dataset.month === 'null' ? null : parseInt(button.dataset.month);
                    const filteredEvents = month ? events.filter(e => new Date(e.Date).getMonth() + 1 === month) : events;
                    renderEventCards(filteredEvents);
                    renderCalendarSidebar(month);
                });
            });
        }

        renderEventCards(events);
        renderCalendarSidebar(null);
    });
}

function renderVisitSection(container) {
    const visitSection = document.createElement('section');
    visitSection.id = 'visit';
    visitSection.className = 'py-16 lg:py-24 bg-white';

    fetchData(SHEET_URLS.visit, (data) => {
        const schedule = data.filter(item => item.Type === 'Schedule');
        const contact = data.find(item => item.Type === 'Contact');

        visitSection.innerHTML = `
            <div class="container mx-auto px-4 lg:px-8">
                <div class="max-w-6xl mx-auto space-y-12">
                    <div class="text-center space-y-4">
                        <h2 class="text-4xl lg:text-5xl font-bold text-gray-900">Visit Us</h2>
                        <p class="text-xl text-gray-600 max-w-3xl mx-auto">We'd love to welcome you! Here's everything you need to know for your first visit.</p>
                    </div>
                    <div class="bg-gradient-to-br from-blue-500 to-blue-700 rounded-2xl p-8 lg:p-12 text-white">
                        <h3 class="text-3xl font-bold mb-8 text-center">Service Schedule</h3>
                        <div class="grid md:grid-cols-${schedule.length > 0 ? Math.min(schedule.length, 3) : 3} gap-6 justify-center">
                            ${schedule.map(item => `
                                <div class="bg-white/10 backdrop-blur-sm rounded-lg p-6 text-center">
                                    <h4 class="text-xl font-bold mb-2">${item.Key}</h4>
                                    <p class="text-lg mb-1">${item.Value}</p>
                                </div>
                            `).join('')}
                        </div>
                    </div>
                    <div class="grid lg:grid-cols-2 gap-12">
                        <div class="space-y-4">
                            <h3 class="text-2xl font-bold text-gray-900">Location</h3>
                            <div class="bg-gray-200 rounded-lg h-96 flex items-center justify-center">
                                <iframe src="${contact ? contact.MapEmbedURL : ''}" width="100%" height="100%" style="border:0; border-radius: 0.5rem;" allowfullscreen="" loading="lazy"></iframe>
                            </div>
                        </div>
                        <div class="space-y-6">
                             <div>
                                <h3 class="text-2xl font-bold text-gray-900 mb-4">Contact Information</h3>
                                <div class="space-y-4">
                                    <p><strong>Address:</strong> ${contact ? contact.Address : ''}</p>
                                    <p><strong>Phone:</strong> ${contact ? contact.Phone : ''}</p>
                                    <p><strong>Email:</strong> ${contact ? contact.Email : ''}</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        `;
    });

    container.appendChild(visitSection);
}
