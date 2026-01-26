document.addEventListener('DOMContentLoaded', function() {
    // Initialize Google Calendar integration
    const calendarId = 'your_calendar_id@group.calendar.google.com'; // Replace with your Google Calendar ID
    const apiKey = 'your_api_key'; // Replace with your Google API key

    function loadCalendar() {
        const calendarUrl = `https://www.googleapis.com/calendar/v3/calendars/${calendarId}/events?key=${apiKey}`;
        
        fetch(calendarUrl)
            .then(response => response.json())
            .then(data => {
                const eventsContainer = document.getElementById('events');
                eventsContainer.innerHTML = '';

                data.items.forEach(event => {
                    const eventElement = document.createElement('div');
                    eventElement.classList.add('event');

                    const eventTitle = document.createElement('h3');
                    eventTitle.textContent = event.summary;

                    const eventDate = document.createElement('p');
                    eventDate.textContent = new Date(event.start.dateTime || event.start.date).toLocaleString();

                    eventElement.appendChild(eventTitle);
                    eventElement.appendChild(eventDate);
                    eventsContainer.appendChild(eventElement);
                });
            })
            .catch(error => console.error('Error fetching calendar events:', error));
    }

    loadCalendar();
});