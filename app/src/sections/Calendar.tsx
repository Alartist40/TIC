import { useState, useMemo } from 'react';
import type { EventItem } from '../types';

interface CalendarProps {
  events: EventItem[];
  calendarId?: string;
}

function getDaysInMonth(year: number, month: number): number {
  return new Date(year, month + 1, 0).getDate();
}

function getFirstDayOfMonth(year: number, month: number): number {
  return new Date(year, month, 1).getDay();
}

function formatDateKey(year: number, month: number, day: number): string {
  return `${year}-${String(month + 1).padStart(2, '0')}-${String(day).padStart(2, '0')}`;
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

const MONTH_NAMES = [
  'January', 'February', 'March', 'April', 'May', 'June',
  'July', 'August', 'September', 'October', 'November', 'December',
];

const DAY_NAMES = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

export function Calendar({ events, calendarId }: CalendarProps) {
  const today = new Date();
  const [currentYear, setCurrentYear] = useState(today.getFullYear());
  const [currentMonth, setCurrentMonth] = useState(today.getMonth());
  const [selectedDate, setSelectedDate] = useState<string | null>(null);

  const eventsByDate = useMemo(() => {
    const map: Record<string, EventItem[]> = {};
    events.forEach(event => {
      if (event.Date) {
        if (!map[event.Date]) map[event.Date] = [];
        map[event.Date].push(event);
      }
    });
    return map;
  }, [events]);

  const daysInMonth = getDaysInMonth(currentYear, currentMonth);
  const firstDay = getFirstDayOfMonth(currentYear, currentMonth);
  const todayKey = formatDateKey(today.getFullYear(), today.getMonth(), today.getDate());

  const prevMonth = () => {
    if (currentMonth === 0) {
      setCurrentMonth(11);
      setCurrentYear(currentYear - 1);
    } else {
      setCurrentMonth(currentMonth - 1);
    }
  };

  const nextMonth = () => {
    if (currentMonth === 11) {
      setCurrentMonth(0);
      setCurrentYear(currentYear + 1);
    } else {
      setCurrentMonth(currentMonth + 1);
    }
  };

  const selectedEvents = selectedDate ? eventsByDate[selectedDate] || [] : [];

  const calendarEmbedUrl = calendarId && calendarId !== 'YOUR_CALENDAR_ID'
    ? `https://calendar.google.com/calendar/embed?src=${encodeURIComponent(calendarId)}&ctz=Asia%2FTokyo&mode=MONTH&showNav=1&showDate=1&showPrint=0&showTabs=1&showCalendars=0&showTz=1&hl=en`
    : null;

  return (
    <section id="calendar" className="section">
      <h2
        style={{
          fontFamily: '"Playfair Display", Georgia, serif',
          fontSize: 'clamp(1.5rem, 4vw, 2.5rem)',
          color: '#1565C0',
          marginBottom: '1.5rem',
          textAlign: 'center',
        }}
      >
        Events Calendar
      </h2>

      <div className="church-card">
        {/* Calendar Navigation */}
        <div
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            marginBottom: '1rem',
          }}
        >
          <button
            onClick={prevMonth}
            className="btn-gold"
            style={{ marginTop: 0, padding: '0.5rem 1rem' }}
          >
            ← Previous
          </button>
          <h3
            style={{
              fontFamily: '"Playfair Display", Georgia, serif',
              fontSize: '1.3rem',
              color: '#1565C0',
              margin: 0,
            }}
          >
            {MONTH_NAMES[currentMonth]} {currentYear}
          </h3>
          <button
            onClick={nextMonth}
            className="btn-gold"
            style={{ marginTop: 0, padding: '0.5rem 1rem' }}
          >
            Next →
          </button>
        </div>

        {/* Day Names */}
        <div className="day-names">
          {DAY_NAMES.map(day => (
            <div key={day} className="day-name">
              {day}
            </div>
          ))}
        </div>

        {/* Days Grid */}
        <div className="days-grid">
          {/* Empty cells before the first day */}
          {Array.from({ length: firstDay }).map((_, i) => (
            <div key={`empty-${i}`} className="day-cell empty" />
          ))}

          {/* Days of the month */}
          {Array.from({ length: daysInMonth }).map((_, i) => {
            const day = i + 1;
            const dateKey = formatDateKey(currentYear, currentMonth, day);
            const hasEvent = eventsByDate[dateKey]?.length > 0;
            const isToday = dateKey === todayKey;

            return (
              <div
                key={dateKey}
                className={`day-cell ${hasEvent ? 'has-event' : ''} ${isToday ? 'today' : ''}`}
                onClick={() => hasEvent && setSelectedDate(dateKey)}
                title={hasEvent ? eventsByDate[dateKey].map(e => e.Title).join(', ') : undefined}
              >
                {day}
              </div>
            );
          })}
        </div>

        {/* Events for selected date */}
        {selectedEvents.length > 0 && (
          <div
            style={{
              marginTop: '1.5rem',
              padding: '1rem',
              background: '#f8f9fa',
              borderRadius: '8px',
            }}
          >
            <h4
              style={{
                fontFamily: '"Inter", sans-serif',
                color: '#1565C0',
                marginBottom: '0.75rem',
              }}
            >
              Events on {formatDate(selectedDate!)}
            </h4>
            {selectedEvents.map((event, i) => (
              <div
                key={i}
                style={{
                  padding: '0.75rem',
                  marginBottom: '0.5rem',
                  background: 'white',
                  borderRadius: '4px',
                  border: '1px solid #E0E0E0',
                }}
              >
                <strong style={{ color: '#1565C0' }}>{event.Title}</strong>
                {event.Time && <span style={{ color: '#757575', fontSize: '0.85rem', marginLeft: '0.5rem' }}>{event.Time}</span>}
                {event.Description && <p style={{ fontSize: '0.85rem', marginTop: '0.25rem', color: '#2D3436' }}>{event.Description}</p>}
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Google Calendar Embed */}
      {calendarEmbedUrl && (
        <div className="calendar-container" style={{ marginTop: '2rem' }}>
          <iframe
            src={calendarEmbedUrl}
            style={{ border: 0, width: '100%', height: '500px' }}
            title="Church Events Calendar"
          />
        </div>
      )}

      {/* Add to Calendar Button */}
      <div style={{ textAlign: 'center', marginTop: '2rem' }}>
        {calendarId && calendarId !== 'YOUR_CALENDAR_ID' ? (
          <a
            href={`https://calendar.google.com/calendar/render?cid=${encodeURIComponent(calendarId)}`}
            target="_blank"
            rel="noopener noreferrer"
            className="btn-gold"
          >
            <span style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', justifyContent: 'center' }}>
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <rect x="3" y="4" width="18" height="18" rx="2" ry="2" />
                <line x1="16" y1="2" x2="16" y2="6" />
                <line x1="8" y1="2" x2="8" y2="6" />
                <line x1="3" y1="10" x2="21" y2="10" />
              </svg>
              Add to My Calendar
            </span>
          </a>
        ) : (
          <p style={{ color: '#757575', fontSize: '0.9rem' }}>
            Google Calendar integration coming soon.
          </p>
        )}
      </div>
    </section>
  );
}
