import { useEffect, useState } from 'react';
import { Header } from '@/app/components/Header';
import { HeroSection } from '@/app/components/HeroSection';
import { AboutSection } from '@/app/components/AboutSection';
import { MinistrySection, Ministry } from '@/app/components/MinistrySection';
import { SermonSection } from '@/app/components/SermonSection';
import { EventsSection } from '@/app/components/EventsSection';
import { VisitSection, ScheduleItem } from '@/app/components/VisitSection';
import { fetchGoogleSheetData, SHEET_URLS } from '@/services/googleContent';

export default function App() {
  const [aboutData, setAboutData] = useState<any>(null);
  const [ministries, setMinistries] = useState<Ministry[] | undefined>(undefined);
  const [schedule, setSchedule] = useState<ScheduleItem[] | undefined>(undefined);
  const [youtubeLink, setYoutubeLink] = useState<string | undefined>(undefined);

  useEffect(() => {
    async function loadContent() {
      try {
        const [aboutRes, ministriesRes, scheduleRes, generalRes] = await Promise.all([
          fetchGoogleSheetData(SHEET_URLS.about),
          fetchGoogleSheetData(SHEET_URLS.ministries),
          fetchGoogleSheetData(SHEET_URLS.schedule),
          fetchGoogleSheetData(SHEET_URLS.general)
        ]);

        // Process About Data
        if (aboutRes) {
          const config: any = {};
          aboutRes.forEach((item: any) => { if (item.Key) config[item.Key] = item.Value; });
          setAboutData(config);
        }

        // Process Ministries Data
        if (ministriesRes && ministriesRes.length > 0) {
          const mappedMinistries: Ministry[] = ministriesRes.map((item: any, index: number) => ({
            id: index + 1,
            name: item.Title || "Ministry",
            description: item.Description || "",
            image: "https://images.unsplash.com/photo-1438232992991-995b7058bbb3?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjaHVyY2h8ZW58MXx8fHwxNzY5MDc0MTk4fDA&ixlib=rb-4.1.0&q=80&w=1080", // Default image
            schedule: "", // Sheet doesn't have this yet
            leader: ""    // Sheet doesn't have this yet
          }));
          // Only set if we actually have data, otherwise let component use default
          if (mappedMinistries.length > 0) {
            setMinistries(mappedMinistries);
          }
        }

        // Process Schedule Data
        if (scheduleRes && scheduleRes.length > 0) {
          const mappedSchedule: ScheduleItem[] = scheduleRes
            .filter((item: any) => item.Program && item.Time)
            .map((item: any) => ({
              program: item.Program,
              time: item.Time,
              location: item.Location
            }));
          if (mappedSchedule.length > 0) {
            setSchedule(mappedSchedule);
          }
        }

        // Process General Data (Youtube Link)
        if (generalRes) {
          const config: any = {};
          generalRes.forEach((item: any) => { if (item.Key) config[item.Key] = item.Value; });
          if (config.YoutubeLive) {
            setYoutubeLink(config.YoutubeLive);
          }
        }

      } catch (error) {
        console.error("Failed to fetch Google Sheet data", error);
      }
    }

    loadContent();
  }, []);

  return (
    <div className="min-h-screen">
      {/* Main Content Area - 6/7ths of the width */}
      <div className="mr-[14.285714%] bg-white">
        <Header />
        <HeroSection />
        <AboutSection
          mission={aboutData?.Mission}
          vision={aboutData?.Vision}
          values={aboutData?.Values}
          pastorName={aboutData?.PastorName}
          pastorBio={aboutData?.PastorBio}
          pastorImage={aboutData?.PastorImage}
        />
        <MinistrySection ministries={ministries} />
        <SermonSection youtubeLink={youtubeLink} />
        <EventsSection />
        <VisitSection schedule={schedule} />

        {/* Footer */}
        <footer className="bg-gray-900 text-white py-12">
          <div className="container mx-auto px-4 lg:px-8">
            <div className="max-w-6xl mx-auto">
              <div className="grid md:grid-cols-3 gap-8 mb-8">
                <div>
                  <h3 className="text-xl font-bold mb-4">Our Church</h3>
                  <p className="text-gray-400">
                    A community of faith, hope, and love, gathering together to worship and serve.
                  </p>
                </div>
                <div>
                  <h3 className="text-xl font-bold mb-4">Quick Links</h3>
                  <ul className="space-y-2 text-gray-400">
                    <li><a href="#about" className="hover:text-white transition-colors">About Us</a></li>
                    <li><a href="#ministries" className="hover:text-white transition-colors">Ministries</a></li>
                    <li><a href="#sermons" className="hover:text-white transition-colors">Sermons</a></li>
                    <li><a href="#events" className="hover:text-white transition-colors">Events</a></li>
                  </ul>
                </div>
                <div>
                  <h3 className="text-xl font-bold mb-4">Contact</h3>
                  <ul className="space-y-2 text-gray-400">
                    <li>Sunday Service: 10:00 AM</li>
                    <li>Wednesday Prayer: 7:00 PM</li>
                    <li>Phone: (555) 123-4567</li>
                    <li>Email: info@church.org</li>
                  </ul>
                </div>
              </div>
              <div className="pt-8 border-t border-gray-800 text-center text-gray-500">
                <p>&copy; 2026 Our Church. All rights reserved.</p>
              </div>
            </div>
          </div>
        </footer>
      </div>

      {/* Sabbath Column - 1/7th of the width, full height on all screen sizes */}
      <div className="w-[14.285714%] fixed right-0 top-0 h-screen bg-gradient-to-b from-blue-500 via-indigo-600 to-purple-700">
      </div>
    </div>
  );
}
