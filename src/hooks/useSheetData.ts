import { useState, useEffect, useCallback } from 'react';
import type {
  GeneralData,
  AboutData,
  MinistryItem,
  ScheduleItem,
  EventItem,
  SermonItem,
  CalendarEvent,
} from '../types';
import {
  fetchAllSheetData,
  fetchGoogleCalendarEvents,
  DEMO_GENERAL,
  DEMO_ABOUT,
  DEMO_MINISTRIES,
  DEMO_SCHEDULE,
  DEMO_EVENTS,
  DEMO_SERMONS,
} from '../services/sheets';

interface UseSheetDataReturn {
  general: GeneralData;
  about: AboutData;
  ministries: MinistryItem[];
  schedule: ScheduleItem[];
  events: EventItem[];
  calendarEvents: CalendarEvent[];
  sermons: SermonItem[];
  loading: boolean;
  error: string | null;
  refetch: () => void;
}

export function useSheetData(): UseSheetDataReturn {
  const [general, setGeneral] = useState<GeneralData>(DEMO_GENERAL);
  const [about, setAbout] = useState<AboutData>(DEMO_ABOUT);
  const [ministries, setMinistries] = useState<MinistryItem[]>(DEMO_MINISTRIES);
  const [schedule, setSchedule] = useState<ScheduleItem[]>(DEMO_SCHEDULE);
  const [events, setEvents] = useState<EventItem[]>(DEMO_EVENTS);
  const [calendarEvents, setCalendarEvents] = useState<CalendarEvent[]>([]);
  const [sermons, setSermons] = useState<SermonItem[]>(DEMO_SERMONS);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchData = useCallback(async () => {
    setLoading(true);
    setError(null);

    try {
      const data = await fetchAllSheetData();

      // Only update with sheet data if we got real data
      // (check if any meaningful data was returned)
      const hasRealGeneral = data.general && Object.keys(data.general).length > 0;
      const hasRealAbout = data.about && Object.keys(data.about).length > 0;
      const hasRealMinistries = data.ministries.length > 0;
      const hasRealSchedule = data.schedule.length > 0;
      const hasRealEvents = data.events.length > 0;
      const hasRealSermons = data.sermons.length > 0;

      if (hasRealGeneral) setGeneral(data.general);
      if (hasRealAbout) setAbout(data.about);
      if (hasRealMinistries) setMinistries(data.ministries);
      if (hasRealSchedule) setSchedule(data.schedule);
      if (hasRealEvents) setEvents(data.events);
      if (hasRealSermons) setSermons(data.sermons);

      // Try to fetch Google Calendar events if a calendar ID is configured
      if (data.general?.GoogleCalendarID) {
        try {
          const calEvents = await fetchGoogleCalendarEvents(
            data.general.GoogleCalendarID,
            // API key would normally come from environment variables
            // For now, calendar integration is optional
            ''
          );
          if (calEvents.length > 0) {
            setCalendarEvents(calEvents);
          }
        } catch {
          // Calendar fetch is optional, don't show error
        }
      }

      // If we got no real data at all, keep the demo data
      if (!hasRealGeneral && !hasRealAbout && !hasRealMinistries && !hasRealSchedule && !hasRealEvents && !hasRealSermons) {
        // Using demo data (already set by default)
      }
    } catch (err) {
      console.error('Error fetching sheet data:', err);
      setError('Failed to load some data. Showing demo content.');
      // Keep using demo data on error
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchData();

    // Refresh data every 5 minutes
    const interval = setInterval(() => {
      fetchData();
    }, 5 * 60 * 1000);

    return () => clearInterval(interval);
  }, [fetchData]);

  return {
    general,
    about,
    ministries,
    schedule,
    events,
    calendarEvents,
    sermons,
    loading,
    error,
    refetch: fetchData,
  };
}
