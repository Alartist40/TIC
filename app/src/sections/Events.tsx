import { useState } from 'react';
import type { EventItem } from '../types';

interface EventsProps {
  events: EventItem[];
}

function formatDate(dateStr: string): string {
  if (!dateStr) return 'TBD';
  try {
    const date = new Date(dateStr + 'T00:00:00');
    if (isNaN(date.getTime())) return dateStr;
    return date.toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' });
  } catch {
    return dateStr;
  }
}

function isValidUrl(url: string): boolean {
  if (!url) return false;
  try {
    const parsed = new URL(url, window.location.href);
    return ['https:', 'http:', 'mailto:'].includes(parsed.protocol);
  } catch {
    return false;
  }
}

function isFutureEvent(dateStr: string): boolean {
  if (!dateStr) return false;
  try {
    const eventDate = new Date(dateStr + 'T00:00:00');
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    return !isNaN(eventDate.getTime()) && eventDate >= today;
  } catch {
    return false;
  }
}

export function Events({ events }: EventsProps) {
  const [selectedEvent, setSelectedEvent] = useState<EventItem | null>(null);

  // Filter to future events and sort by date
  const upcomingEvents = events
    .filter(e => isFutureEvent(e.Date))
    .sort((a, b) => new Date(a.Date).getTime() - new Date(b.Date).getTime())
    .slice(0, 6); // Show max 6 upcoming events

  return (
    <section id="events" className="section">
      <h2
        style={{
          fontFamily: '"Playfair Display", Georgia, serif',
          fontSize: 'clamp(1.5rem, 4vw, 2.5rem)',
          color: '#1565C0',
          marginBottom: '1.5rem',
          textAlign: 'center',
        }}
      >
        Upcoming Events
      </h2>

      {upcomingEvents.length === 0 ? (
        <div className="no-events">
          <p>No upcoming events scheduled. Check back soon!</p>
        </div>
      ) : (
        <div className="events-grid">
          {upcomingEvents.map((event, index) => (
            <div
              key={`${event.Title}-${index}`}
              className="event-card fade-in"
              style={{ animationDelay: `${index * 0.1}s`, cursor: 'pointer' }}
              onClick={() => setSelectedEvent(event)}
            >
              {event.ImageURL && isValidUrl(event.ImageURL) ? (
                <img
                  className="event-image"
                  src={event.ImageURL}
                  alt={event.Title}
                  loading="lazy"
                  onError={(e) => {
                    (e.target as HTMLImageElement).style.display = 'none';
                  }}
                />
              ) : (
                <div className="event-placeholder">
                  <span role="img" aria-label="Event">📅</span>
                </div>
              )}
              <div className="event-info">
                <h4>{event.Title}</h4>
                <p className="event-date">📅 {formatDate(event.Date)}</p>
                {event.Time && (
                  <p
                    style={{
                      color: '#2D3436',
                      fontSize: '0.85rem',
                      marginBottom: '0.5rem',
                    }}
                  >
                    🕐 {event.Time}
                  </p>
                )}
                <p className="event-description">
                  {event.Description.length > 120
                    ? event.Description.substring(0, 120) + '...'
                    : event.Description}
                </p>
                {isValidUrl(event.RegistrationLink) && (
                  <a
                    href={event.RegistrationLink}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="btn-primary"
                    style={{ marginTop: '0.75rem', fontSize: '0.85rem', padding: '0.5rem 1rem' }}
                    onClick={(e) => e.stopPropagation()}
                  >
                    Register
                  </a>
                )}
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Event Detail Modal */}
      {selectedEvent && (
        <div
          className="modal-overlay active"
          onClick={() => setSelectedEvent(null)}
        >
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <button
              className="modal-close"
              aria-label="Close modal"
              onClick={() => setSelectedEvent(null)}
            >
              ✕
            </button>
            <h3
              style={{
                fontFamily: '"Playfair Display", Georgia, serif',
                color: '#1565C0',
                marginBottom: '1rem',
              }}
            >
              {selectedEvent.Title}
            </h3>
            <p className="event-date" style={{ marginBottom: '0.5rem' }}>
              📅 {formatDate(selectedEvent.Date)}
            </p>
            {selectedEvent.Time && (
              <p style={{ marginBottom: '0.5rem' }}>🕐 {selectedEvent.Time}</p>
            )}
            <p style={{ lineHeight: 1.6, marginBottom: '1rem' }}>
              {selectedEvent.Description}
            </p>
            {isValidUrl(selectedEvent.RegistrationLink) && (
              <a
                href={selectedEvent.RegistrationLink}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-primary"
              >
                Register for Event
              </a>
            )}
          </div>
        </div>
      )}
    </section>
  );
}
