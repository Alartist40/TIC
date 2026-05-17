import { useEffect, useState } from 'react';
import { SabbathColumn } from '../components/SabbathColumn';
import { LoadingOverlay } from '../components/LoadingOverlay';
import { Navigation } from '../sections/Navigation';
import { Hero } from '../sections/Hero';
import { About } from '../sections/About';
import { Ministries } from '../sections/Ministries';
import { Sermons } from '../sections/Sermons';
import { Events } from '../sections/Events';
import { Calendar } from '../sections/Calendar';
import { VisitUs } from '../sections/VisitUs';
import { Footer } from '../sections/Footer';
import { useSheetData } from '../hooks/useSheetData';

export default function Home() {
  const { general, about, ministries, schedule, events, sermons, loading } = useSheetData();
  const [showLoader, setShowLoader] = useState(true);

  useEffect(() => {
    // Show loader for at least 1 second for smooth UX
    const timer = setTimeout(() => {
      if (!loading) {
        setShowLoader(false);
      }
    }, 1000);

    return () => clearTimeout(timer);
  }, [loading]);

  useEffect(() => {
    if (!loading) {
      const timer = setTimeout(() => setShowLoader(false), 500);
      return () => clearTimeout(timer);
    }
  }, [loading]);

  return (
    <>
      <LoadingOverlay visible={showLoader} />

      {/* 7-Column Creation Grid */}
      <div className="grid-container">
        {/* Main Content (6/7) */}
        <main className="content-sixth">
          <Navigation />
          <Hero />
          <About about={about} />
          <Ministries ministries={ministries} />
          <Sermons sermons={sermons} general={general} />
          <Events events={events} />
          <Calendar events={events} calendarId={general?.GoogleCalendarID} />
          <VisitUs schedule={schedule} general={general} />
          <Footer />
        </main>

        {/* Sabbath Column (1/7) — Only the Adventist Symbol */}
        <SabbathColumn />
      </div>

    </>
  );
}
