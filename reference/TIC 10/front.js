// events-loader.js
class GoogleSheetsEventManager {
    constructor() {
        this.scriptUrl = 'YOUR_GOOGLE_APPS_SCRIPT_URL';
        this.eventsContainer = document.getElementById('eventPostersContainer');
    }

    async loadEvents() {
        try {
            const response = await fetch(this.scriptUrl);
            const data = await response.json();
            this.displayEvents(data.events);
        } catch (error) {
            console.error('Error loading events:', error);
            this.showManualEvents();
        }
    }

    displayEvents(events) {
        if (!events || events.length === 0) {
            this.showNoEvents();
            return;
        }

        this.eventsContainer.innerHTML = events.map(event => `
            <div class="poster-card" onclick="openEventModal(this)">
                <img src="https://drive.google.com/thumbnail?id=${event.PosterID}&sz=w1000" 
                     alt="${event.Title}" class="poster-image"
                     onerror="this.src='images/placeholder-event.jpg'">
                <div class="poster-info">
                    <h4>${event.Title}</h4>
                    <p class="event-date">${event.Date}</p>
                    <p class="event-description">${event.Description}</p>
                    <span class="event-category">${event.Category}</span>
                </div>
            </div>
        `).join('');
    }

    showManualEvents() {
        // Fallback to manual events if API fails
        this.eventsContainer.innerHTML = `
            <!-- Manual event entries as backup -->
            <div class="poster-card">
                <img src="https://drive.google.com/thumbnail?id=1ABC123def456GHI789jkl&sz=w1000" 
                     alt="Christmas Concert" class="poster-image">
                <div class="poster-info">
                    <h4>Christmas Concert 2024</h4>
                    <p class="event-date">December 24, 2024 - 6:00 PM</p>
                    <p class="event-description">Join us for a magical evening of Christmas music and celebration.</p>
                    <span class="event-category">Worship</span>
                </div>
            </div>
        `;
    }
}