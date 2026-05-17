// Google Sheets data types

export interface GeneralData {
  ChurchName: string;
  ChurchPhone: string;
  ChurchEmail: string;
  Address: string;
  YoutubeChannel: string;
  YoutubeLive: string;
  GoogleCalendarID: string;
  Announcement: string;
  [key: string]: string;
}

export interface AboutData {
  Mission: string;
  Vision: string;
  Values: string;
  PastorName: string;
  PastorBio: string;
  PastorImage: string;
  PastorVerseText: string;
  PastorVerseRef: string;
  [key: string]: string;
}

export interface MinistryItem {
  Title: string;
  Description: string;
  Icon: string;
}

export interface ScheduleItem {
  Program: string;
  Time: string;
  Location: string;
  Notes: string;
}

export interface EventItem {
  Title: string;
  Date: string;
  Time: string;
  Description: string;
  ImageURL: string;
  RegistrationLink: string;
  Status: string;
}

export interface SermonItem {
  Title: string;
  YoutubeID: string;
  Speaker: string;
  Date: string;
  Scripture: string;
  Duration: string;
  Status: string;
}

export interface SheetStore {
  general: GeneralData;
  about: AboutData;
  ministries: MinistryItem[];
  schedule: ScheduleItem[];
  events: EventItem[];
  sermons: SermonItem[];
  loading: boolean;
  error: string | null;
}

export interface CalendarEvent {
  Title: string;
  Date: string;
  Time: string;
  Description: string;
  Location: string;
  RegistrationLink: string;
}
