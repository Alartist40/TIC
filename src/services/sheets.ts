/**
 * Google Sheets CSV Fetcher
 * 
 * This service fetches data from Google Sheets published as CSV.
 * To connect your own sheets:
 * 1. Open your Google Sheet
 * 2. File → Share → Publish to web
 * 3. Select each sheet tab and publish as CSV
 * 4. Copy the URLs and update the SHEET_URLS config below
 * 
 * The default URLs below use a DEMO spreadsheet.
 * Replace them with your own published CSV URLs.
 */

import type {
  GeneralData,
  AboutData,
  MinistryItem,
  ScheduleItem,
  EventItem,
  SermonItem,
  CalendarEvent,
} from '../types';

// ============================================
// CONFIGURATION: Your TIC Church Google Sheet
// ============================================
// All 6 tab URLs with correct gids provided by the church team
const SHEET_URLS = {
  general:    'https://docs.google.com/spreadsheets/d/e/2PACX-1vSbebOYt_IHOmUa4ox98Ni9zYEZ4S_drnHdxOaQ7yzXxS_dB7ns_sBjjNs5xRfkpuKReoMDOGciTPiB/pub?gid=0&single=true&output=csv',
  about:      'https://docs.google.com/spreadsheets/d/e/2PACX-1vSbebOYt_IHOmUa4ox98Ni9zYEZ4S_drnHdxOaQ7yzXxS_dB7ns_sBjjNs5xRfkpuKReoMDOGciTPiB/pub?gid=684146004&single=true&output=csv',
  ministries: 'https://docs.google.com/spreadsheets/d/e/2PACX-1vSbebOYt_IHOmUa4ox98Ni9zYEZ4S_drnHdxOaQ7yzXxS_dB7ns_sBjjNs5xRfkpuKReoMDOGciTPiB/pub?gid=1239272126&single=true&output=csv',
  schedule:   'https://docs.google.com/spreadsheets/d/e/2PACX-1vSbebOYt_IHOmUa4ox98Ni9zYEZ4S_drnHdxOaQ7yzXxS_dB7ns_sBjjNs5xRfkpuKReoMDOGciTPiB/pub?gid=1862090550&single=true&output=csv',
  events:     'https://docs.google.com/spreadsheets/d/e/2PACX-1vSbebOYt_IHOmUa4ox98Ni9zYEZ4S_drnHdxOaQ7yzXxS_dB7ns_sBjjNs5xRfkpuKReoMDOGciTPiB/pub?gid=1187960815&single=true&output=csv',
  sermons:    'https://docs.google.com/spreadsheets/d/e/2PACX-1vSbebOYt_IHOmUa4ox98Ni9zYEZ4S_drnHdxOaQ7yzXxS_dB7ns_sBjjNs5xRfkpuKReoMDOGciTPiB/pub?gid=1509183046&single=true&output=csv',
};

// ============================================
// CSV PARSER (Robust with quote handling)
// ============================================

function parseCSV(text: string): Record<string, string>[] {
  const lines = text.split('\n');
  if (lines.length === 0) return [];

  const headers = parseCSVLine(lines[0]);
  const result: Record<string, string>[] = [];

  for (let i = 1; i < lines.length; i++) {
    const line = lines[i].trim();
    if (!line) continue;

    const values = parseCSVLine(line);
    const obj: Record<string, string> = {};

    headers.forEach((header, index) => {
      const key = header.trim();
      const value = values[index] ? values[index].trim() : '';
      if (key) {
        obj[key] = value;
      }
    });

    // Only add rows that have at least one non-empty value
    if (Object.values(obj).some(v => v.length > 0)) {
      result.push(obj);
    }
  }

  return result;
}

function parseCSVLine(line: string): string[] {
  const result: string[] = [];
  let current = '';
  let inQuotes = false;

  for (let i = 0; i < line.length; i++) {
    const char = line[i];

    if (char === '"') {
      if (inQuotes && line[i + 1] === '"') {
        // Escaped quote
        current += '"';
        i++; // Skip next quote
      } else {
        // Toggle quote state
        inQuotes = !inQuotes;
      }
    } else if (char === ',' && !inQuotes) {
      // End of field
      result.push(current);
      current = '';
    } else {
      current += char;
    }
  }

  result.push(current);
  return result.map(field => field.trim());
}

// ============================================
// DATA FETCHING
// ============================================

async function fetchSheetData(url: string): Promise<Record<string, string>[]> {
  try {
    // If URL is a placeholder/demo, return empty array
    if (url.includes('Demo_')) {
      return [];
    }

    const response = await fetch(url);

    if (!response.ok) {
      console.error(`Failed to fetch ${url}: ${response.status}`);
      return [];
    }

    const text = await response.text();
    return parseCSV(text);
  } catch (error) {
    console.error('Fetch error:', error);
    return [];
  }
}

// ============================================
// DATA TRANSFORMERS
// ============================================

function parseKeyValueData(rows: Record<string, string>[]): Record<string, string> {
  const result: Record<string, string> = {};
  rows.forEach(row => {
    const key = row['Key'] || row['key'];
    const value = row['Value'] || row['value'];
    if (key) {
      result[key] = value || '';
    }
  });
  return result;
}

// ============================================
// PUBLIC API
// ============================================

export async function fetchAllSheetData() {
  try {
    const [generalRows, aboutRows, ministriesRows, scheduleRows, eventsRows, sermonsRows] = await Promise.all([
      fetchSheetData(SHEET_URLS.general),
      fetchSheetData(SHEET_URLS.about),
      fetchSheetData(SHEET_URLS.ministries),
      fetchSheetData(SHEET_URLS.schedule),
      fetchSheetData(SHEET_URLS.events),
      fetchSheetData(SHEET_URLS.sermons),
    ]);

    const general = parseKeyValueData(generalRows) as GeneralData;
    const about = parseKeyValueData(aboutRows) as AboutData;

    // For arrays, filter out rows without the primary field
    const ministries = ministriesRows
      .filter(row => row['Title'] || row['title'])
      .map(row => ({
        Title: row['Title'] || row['title'] || '',
        Description: row['Description'] || row['description'] || '',
        Icon: row['Icon'] || row['icon'] || '✝️',
      })) as MinistryItem[];

    const schedule = scheduleRows
      .filter(row => row['Program'] || row['program'])
      .map(row => ({
        Program: row['Program'] || row['program'] || '',
        Time: row['Time'] || row['time'] || '',
        Location: row['Location'] || row['location'] || '',
        Notes: row['Notes'] || row['notes'] || '',
      })) as ScheduleItem[];

    const events = eventsRows
      .filter(row => row['Title'] || row['title'])
      .map(row => ({
        Title: row['Title'] || row['title'] || '',
        Date: row['Date'] || row['date'] || '',
        Time: row['Time'] || row['time'] || '',
        Description: row['Description'] || row['description'] || '',
        ImageURL: row['ImageURL'] || row['imageURL'] || row['image_url'] || row['Image'] || '',
        RegistrationLink: row['RegistrationLink'] || row['registrationLink'] || row['registration_link'] || '',
        Status: row['Status'] || row['status'] || 'Active',
      })) as EventItem[];

    const sermons = sermonsRows
      .filter(row => row['Title'] || row['title'])
      .map(row => ({
        Title: row['Title'] || row['title'] || '',
        YoutubeID: row['YoutubeID'] || row['youtubeID'] || row['youtube_id'] || '',
        Speaker: row['Speaker'] || row['speaker'] || '',
        Date: row['Date'] || row['date'] || '',
        Scripture: row['Scripture'] || row['scripture'] || '',
        Duration: row['Duration'] || row['duration'] || '',
        Status: row['Status'] || row['status'] || 'Active',
      })) as SermonItem[];

    return {
      general,
      about,
      ministries,
      schedule,
      events,
      sermons,
    };
  } catch (error) {
    console.error('Failed to fetch sheet data:', error);
    return {
      general: {} as GeneralData,
      about: {} as AboutData,
      ministries: [] as MinistryItem[],
      schedule: [] as ScheduleItem[],
      events: [] as EventItem[],
      sermons: [] as SermonItem[],
    };
  }
}

// ============================================
// FALLBACK / DEMO DATA
// ============================================
// This data is shown when Google Sheets are not connected
// Replace the SHEET_URLS above with your own to load real data

export const DEMO_GENERAL: GeneralData = {
  ChurchName: 'Tokyo International Seventh-day Adventist Church',
  ChurchPhone: '+81 3-3402-1517',
  ChurchEmail: 'info@tokyoadventist.org',
  Address: '1-11-1 Jingumae, Shibuya, Tokyo, Japan 150-0001',
  YoutubeChannel: 'https://www.youtube.com/@liftupyourvoicemediaminist7959',
  YoutubeLive: '',
  GoogleCalendarID: '',
  Announcement: '',
};

export const DEMO_ABOUT: AboutData = {
  Mission: 'To be a multicultural community of believers united in Christ, sharing the love of God and the hope of His soon return with the people of Tokyo and beyond.',
  Vision: 'A vibrant, Christ-centered church where people from all nations come together to worship, grow, and serve as one family in Christ.',
  Values: 'Bible-based teaching • Prayerful worship • Loving fellowship • Inclusive community • Mission-minded service • Healthful living',
  PastorName: 'Pastor Jonathan Kim',
  PastorBio: 'Pastor Jonathan has served the Tokyo International Church community since 2018. With a heart for multicultural ministry and a passion for sharing the gospel, he leads our congregation in English-speaking worship services every Sabbath. He holds a Master of Divinity from Andrews University and speaks English, Japanese, and Korean.',
  PastorImage: 'pastor.png',
  PastorVerseText: 'For I know the plans I have for you, declares the Lord, plans to prosper you and not to harm you, plans to give you hope and a future.',
  PastorVerseRef: 'Jeremiah 29:11',
};

export const DEMO_MINISTRIES: MinistryItem[] = [
  { Title: "Children's Ministry", Description: 'Nurturing young hearts in faith through Sabbath School, VBS, and family activities.', Icon: '🧒' },
  { Title: 'Youth Ministry', Description: 'Empowering the next generation through fellowship, Bible study, and community outreach.', Icon: '🙌' },
  { Title: 'Adult Sabbath School', Description: 'In-depth Bible study and discussion groups for spiritual growth and fellowship.', Icon: '📖' },
  { Title: 'Music Ministry', Description: 'Praise and worship through choir, instrumental music, and special musical programs.', Icon: '🎵' },
  { Title: 'Community Outreach', Description: 'Serving our local community through food drives, health programs, and evangelism.', Icon: '🤝' },
  { Title: 'Prayer Ministry', Description: 'A dedicated team committed to intercessory prayer for the church and community.', Icon: '🙏' },
  { Title: 'Health Ministry', Description: 'Promoting healthful living through cooking classes, health seminars, and lifestyle coaching.', Icon: '💚' },
  { Title: 'Media Ministry', Description: 'Managing livestreams, recordings, and digital content to share our message worldwide.', Icon: '📹' },
];

export const DEMO_SCHEDULE: ScheduleItem[] = [
  { Program: 'Sabbath School (Adult)', Time: '9:30 AM', Location: 'Fellowship Hall', Notes: 'Bible study groups' },
  { Program: 'Sabbath School (Youth)', Time: '9:30 AM', Location: 'Youth Room', Notes: 'Ages 13-18' },
  { Program: 'Children\'s Sabbath School', Time: '9:30 AM', Location: 'Children\'s Room', Notes: 'Ages 3-12' },
  { Program: 'Divine Service', Time: '11:00 AM', Location: 'Sanctuary', Notes: 'Bilingual English/Japanese' },
  { Program: 'Fellowship Lunch', Time: '1:00 PM', Location: 'Fellowship Hall', Notes: 'Potluck every 1st Sabbath' },
  { Program: 'Afternoon Prayer Meeting', Time: '2:30 PM', Location: 'Prayer Room', Notes: 'Group prayer session' },
  { Program: 'Bible Study (Wednesday)', Time: '7:00 PM', Location: 'Fellowship Hall', Notes: 'Midweek refresh' },
];

export const DEMO_EVENTS: EventItem[] = [
  {
    Title: 'Christmas Concert 2025',
    Date: '2025-12-20',
    Time: '6:00 PM',
    Description: 'Join us for an evening of Christmas music, scripture reading, and fellowship. Featuring our church choir and special guest musicians.',
    ImageURL: '',
    RegistrationLink: '',
    Status: 'Active',
  },
  {
    Title: 'New Year Prayer Vigil',
    Date: '2025-12-31',
    Time: '10:00 PM',
    Description: 'Welcoming the new year together in prayer, praise, and thanksgiving. Bring a dish to share for our midnight fellowship meal.',
    ImageURL: '',
    RegistrationLink: '',
    Status: 'Active',
  },
  {
    Title: 'Health & Wellness Seminar',
    Date: '2026-01-18',
    Time: '2:00 PM',
    Description: 'A practical seminar on plant-based nutrition, stress management, and the Adventist health message. Open to all.',
    ImageURL: '',
    RegistrationLink: '',
    Status: 'Active',
  },
  {
    Title: 'Community Outreach Day',
    Date: '2026-02-15',
    Time: '10:00 AM',
    Description: 'Serving our Harajuku neighborhood through a food distribution program, free health screenings, and friendship evangelism.',
    ImageURL: '',
    RegistrationLink: '',
    Status: 'Active',
  },
];

export const DEMO_SERMONS: SermonItem[] = [
  {
    Title: 'Walking in the Light',
    YoutubeID: 'sample12345',
    Speaker: 'Pastor Jonathan Kim',
    Date: '2025-05-10',
    Scripture: '1 John 1:5-7',
    Duration: '42 min',
    Status: 'Active',
  },
  {
    Title: 'Faith Over Fear',
    YoutubeID: 'sample12346',
    Speaker: 'Pastor Jonathan Kim',
    Date: '2025-05-03',
    Scripture: 'Isaiah 41:10',
    Duration: '38 min',
    Status: 'Active',
  },
  {
    Title: 'The Gift of Rest',
    YoutubeID: 'sample12347',
    Speaker: 'Pastor Jonathan Kim',
    Date: '2025-04-26',
    Scripture: 'Exodus 20:8-11',
    Duration: '45 min',
    Status: 'Active',
  },
];

// ============================================
// CALENDAR API
// ============================================

export async function fetchGoogleCalendarEvents(calendarId: string, apiKey: string): Promise<CalendarEvent[]> {
  try {
    if (!calendarId || calendarId === 'YOUR_CALENDAR_ID' || !apiKey) {
      return [];
    }

    const timeMin = new Date().toISOString();
    const url = `https://www.googleapis.com/calendar/v3/calendars/${encodeURIComponent(calendarId)}/events?key=${apiKey}&timeMin=${timeMin}&maxResults=50&singleEvents=true&orderBy=startTime`;

    const response = await fetch(url);
    if (!response.ok) {
      throw new Error(`Calendar API error: ${response.status}`);
    }

    const data = await response.json();
    return data.items.map((event: Record<string, unknown>) => ({
      Title: (event.summary as string) || '',
      Date: ((event.start as Record<string, string>)?.date || (event.start as Record<string, string>)?.dateTime?.split('T')[0]) || '',
      Time: ((event.start as Record<string, string>)?.dateTime ? new Date((event.start as Record<string, string>).dateTime).toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' }) : 'All Day'),
      Description: (event.description as string) || '',
      Location: (event.location as string) || '',
      RegistrationLink: (event.htmlLink as string) || '',
    }));
  } catch (error) {
    console.error('Failed to fetch Google Calendar events:', error);
    return [];
  }
}
