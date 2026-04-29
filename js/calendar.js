/**
 * Google Calendar Integration
 * Fetches church events from Google Calendar API
 */

const CALENDAR_CONFIG = {
    // Replace with actual Google Calendar ID
    calendarId: 'YOUR_CALENDAR_ID@group.calendar.google.com',
    apiKey: 'YOUR_API_KEY', // Or fetch via Netlify Function
    maxResults: 50,
    timeMin: new Date().toISOString(), // From today onwards
};

async function fetchGoogleCalendarEvents() {
    try {
        const url = `https://www.googleapis.com/calendar/v3/calendars/${encodeURIComponent(CALENDAR_CONFIG.calendarId)}/events?key=${CALENDAR_CONFIG.apiKey}&timeMin=${CALENDAR_CONFIG.timeMin}&maxResults=${CALENDAR_CONFIG.maxResults}&singleEvents=true&orderBy=startTime`;
        
        const response = await fetch(url);
        if (!response.ok) {
            throw new Error(`Calendar API error: ${response.status}`);
        }
        
        const data = await response.json();
        return data.items.map(event => ({
            Title: event.summary,
            Date: event.start.date || event.start.dateTime.split('T')[0],
            Time: event.start.dateTime ? new Date(event.start.dateTime).toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' }) : 'All Day',
            Description: event.description || '',
            Location: event.location || '',
            ImageURL: '', // Can extract from description if formatted correctly
            RegistrationLink: event.htmlLink,
            Status: 'Active'
        }));
    } catch (error) {
        console.error('Failed to fetch Google Calendar events:', error);
        return [];
    }
}

// Merge Google Calendar events with Google Sheets events
async function getMergedEvents() {
    const [sheetEvents, calendarEvents] = await Promise.all([
        fetchSheetData(API.sheets.events),
        fetchGoogleCalendarEvents()
    ]);
    
    // Combine and deduplicate
    const allEvents = [...sheetEvents, ...calendarEvents];
    const uniqueEvents = allEvents.filter((event, index, self) =>
        index === self.findIndex(e => 
            e.Title === event.Title && e.Date === event.Date
        )
    );
    
    return uniqueEvents;
}
