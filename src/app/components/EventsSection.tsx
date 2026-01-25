import { useState } from 'react';
import { Calendar, Clock, MapPin } from 'lucide-react';
import { ImageWithFallback } from '@/app/components/figma/ImageWithFallback';

interface Event {
  id: number;
  title: string;
  date: string;
  time: string;
  location: string;
  image: string;
  description: string;
  month: number;
  day: number;
}

const events: Event[] = [
  {
    id: 1,
    title: "Easter Sunrise Service",
    date: "April 20, 2026",
    time: "6:30 AM",
    location: "Church Grounds",
    image: "https://images.unsplash.com/photo-1587392408671-b1bd44d0c4e6?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjaHVyY2glMjBldmVudCUyMHBvc3RlcnxlbnwxfHx8fDE3NjkwNzQxOTd8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
    description: "Join us for a beautiful sunrise service celebrating the resurrection of Jesus Christ.",
    month: 4,
    day: 20
  },
  {
    id: 2,
    title: "Community BBQ",
    date: "May 15, 2026",
    time: "12:00 PM",
    location: "Church Parking Lot",
    image: "https://images.unsplash.com/photo-1763901326432-4b08b99e03e4?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjb21tdW5pdHklMjBwaWNuaWMlMjBnYXRoZXJpbmd8ZW58MXx8fHwxNzY5MDc0MTk4fDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
    description: "A fun-filled afternoon with great food, games, and fellowship for the whole family.",
    month: 5,
    day: 15
  },
  {
    id: 3,
    title: "Christmas Eve Candlelight Service",
    date: "December 24, 2026",
    time: "7:00 PM",
    location: "Main Sanctuary",
    image: "https://images.unsplash.com/photo-1672166888977-47dd042fdf61?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjaHJpc3RtYXMlMjBjaHVyY2glMjBzZXJ2aWNlfGVufDF8fHx8MTc2OTA3NDE5OHww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
    description: "Experience the wonder of Christmas with carols, candlelight, and the timeless story of Jesus' birth.",
    month: 12,
    day: 24
  }
];

export function EventsSection() {
  const [selectedMonth, setSelectedMonth] = useState<number | null>(null);

  const months = [
    'January', 'February', 'March', 'April', 'May', 'June',
    'July', 'August', 'September', 'October', 'November', 'December'
  ];

  const filteredEvents = selectedMonth
    ? events.filter(event => event.month === selectedMonth)
    : events;

  const eventsByMonth = events.reduce((acc, event) => {
    if (!acc[event.month]) {
      acc[event.month] = [];
    }
    acc[event.month].push(event);
    return acc;
  }, {} as Record<number, Event[]>);

  return (
    <section id="events" className="py-16 lg:py-24 bg-gray-50">
      <div className="container mx-auto px-4 lg:px-8">
        <div className="max-w-6xl mx-auto space-y-12">
          <div className="text-center space-y-4">
            <h2 className="text-4xl lg:text-5xl font-bold text-gray-900">Upcoming Events</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Join us for these special gatherings and celebrations
            </p>
          </div>

          <div className="grid lg:grid-cols-3 gap-8">
            {/* Event Cards */}
            <div className="lg:col-span-2 space-y-6">
              {filteredEvents.map((event) => (
                <div key={event.id} className="bg-white rounded-lg shadow-lg overflow-hidden">
                  <div className="md:flex">
                    <div className="md:w-1/3">
                      <ImageWithFallback 
                        src={event.image}
                        alt={event.title}
                        className="w-full h-64 md:h-full object-cover"
                      />
                    </div>
                    <div className="md:w-2/3 p-6 space-y-4">
                      <div>
                        <h3 className="text-2xl font-bold text-gray-900 mb-2">{event.title}</h3>
                        <p className="text-gray-700">{event.description}</p>
                      </div>
                      <div className="space-y-2">
                        <div className="flex items-center gap-2 text-gray-600">
                          <Calendar className="w-5 h-5 text-blue-600" />
                          <span>{event.date}</span>
                        </div>
                        <div className="flex items-center gap-2 text-gray-600">
                          <Clock className="w-5 h-5 text-blue-600" />
                          <span>{event.time}</span>
                        </div>
                        <div className="flex items-center gap-2 text-gray-600">
                          <MapPin className="w-5 h-5 text-blue-600" />
                          <span>{event.location}</span>
                        </div>
                      </div>
                      <button className="bg-blue-600 text-white px-6 py-2 rounded-lg font-semibold hover:bg-blue-700 transition-colors">
                        Learn More
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Calendar Sidebar */}
            <div className="lg:col-span-1">
              <div className="bg-white rounded-lg shadow-lg p-6 sticky top-24">
                <h3 className="text-2xl font-bold text-gray-900 mb-6">2026 Calendar</h3>
                <div className="space-y-2">
                  <button
                    onClick={() => setSelectedMonth(null)}
                    className={`w-full text-left px-4 py-3 rounded-lg transition-colors ${
                      selectedMonth === null
                        ? 'bg-blue-600 text-white'
                        : 'bg-gray-50 text-gray-700 hover:bg-gray-100'
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <span className="font-semibold">All Events</span>
                      <span className="text-sm">{events.length}</span>
                    </div>
                  </button>
                  {months.map((month, index) => {
                    const monthNumber = index + 1;
                    const count = eventsByMonth[monthNumber]?.length || 0;
                    
                    return (
                      <button
                        key={month}
                        onClick={() => setSelectedMonth(monthNumber)}
                        disabled={count === 0}
                        className={`w-full text-left px-4 py-3 rounded-lg transition-colors ${
                          selectedMonth === monthNumber
                            ? 'bg-blue-600 text-white'
                            : count > 0
                            ? 'bg-gray-50 text-gray-700 hover:bg-gray-100'
                            : 'bg-gray-50 text-gray-400 cursor-not-allowed'
                        }`}
                      >
                        <div className="flex items-center justify-between">
                          <span>{month}</span>
                          {count > 0 && (
                            <span className="text-sm bg-blue-100 text-blue-600 px-2 py-1 rounded">
                              {count}
                            </span>
                          )}
                        </div>
                      </button>
                    );
                  })}
                </div>
              </div>
            </div>
          </div>

          <div className="bg-blue-600 rounded-lg p-8 text-center text-white">
            <h3 className="text-2xl font-bold mb-3">Want to Stay Updated?</h3>
            <p className="text-lg mb-6">
              Subscribe to our newsletter to receive event notifications and church updates
            </p>
            <div className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto">
              <input
                type="email"
                placeholder="Enter your email"
                className="flex-1 px-4 py-3 rounded-lg text-gray-900"
              />
              <button className="bg-white text-blue-600 px-6 py-3 rounded-lg font-semibold hover:bg-gray-100 transition-colors">
                Subscribe
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
