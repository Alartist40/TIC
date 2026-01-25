import { MapPin, Clock, Phone, Mail, Navigation } from 'lucide-react';

export interface ScheduleItem {
  program: string;
  time: string;
  location?: string;
}

interface VisitSectionProps {
  schedule?: ScheduleItem[];
}

export function VisitSection({ schedule }: VisitSectionProps) {
  // Parsing emojis based on program name for visual flare, purely cosmetic
  const getIcon = (program: string) => {
    const p = program.toLowerCase();
    if (p.includes('worship') || p.includes('service')) return '🌅';
    if (p.includes('prayer')) return '🙏';
    if (p.includes('study') || p.includes('school')) return '📖';
    return '📅';
  };

  return (
    <section id="visit" className="py-16 lg:py-24 bg-white">
      <div className="container mx-auto px-4 lg:px-8">
        <div className="max-w-6xl mx-auto space-y-12">
          <div className="text-center space-y-4">
            <h2 className="text-4xl lg:text-5xl font-bold text-gray-900">Visit Us</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              We'd love to welcome you! Here's everything you need to know for your first visit.
            </p>
          </div>

          {/* Service Schedule */}
          <div className="bg-gradient-to-br from-blue-500 to-blue-700 rounded-2xl p-8 lg:p-12 text-white">
            <h3 className="text-3xl font-bold mb-8 text-center">Service Schedule</h3>
            <div className={`grid md:grid-cols-${schedule && schedule.length > 0 ? Math.min(schedule.length, 3) : 3} gap-6 justify-center`}>
              {schedule && schedule.length > 0 ? (
                schedule.map((item, index) => (
                  <div key={index} className="bg-white/10 backdrop-blur-sm rounded-lg p-6 text-center">
                    <div className="text-4xl mb-3">{getIcon(item.program)}</div>
                    <h4 className="text-xl font-bold mb-2">{item.program}</h4>
                    <p className="text-lg mb-1">{item.time}</p>
                    {item.location && <p className="text-sm text-blue-100">{item.location}</p>}
                  </div>
                ))
              ) : (
                <>
                  <div className="bg-white/10 backdrop-blur-sm rounded-lg p-6 text-center">
                    <div className="text-4xl mb-3">🌅</div>
                    <h4 className="text-xl font-bold mb-2">Sunday Worship</h4>
                    <p className="text-lg mb-1">10:00 AM - 11:30 AM</p>
                    <p className="text-sm text-blue-100">Main Sanctuary</p>
                  </div>
                  <div className="bg-white/10 backdrop-blur-sm rounded-lg p-6 text-center">
                    <div className="text-4xl mb-3">🙏</div>
                    <h4 className="text-xl font-bold mb-2">Wednesday Prayer</h4>
                    <p className="text-lg mb-1">7:00 PM - 8:00 PM</p>
                    <p className="text-sm text-blue-100">Fellowship Hall</p>
                  </div>
                  <div className="bg-white/10 backdrop-blur-sm rounded-lg p-6 text-center">
                    <div className="text-4xl mb-3">📖</div>
                    <h4 className="text-xl font-bold mb-2">Bible Study</h4>
                    <p className="text-lg mb-1">Tuesday 6:30 PM</p>
                    <p className="text-sm text-blue-100">Various Rooms</p>
                  </div>
                </>
              )}
            </div>
          </div>

          <div className="grid lg:grid-cols-2 gap-12">
            {/* Map */}
            <div className="space-y-4">
              <h3 className="text-2xl font-bold text-gray-900">Location</h3>
              <div className="bg-gray-200 rounded-lg h-96 flex items-center justify-center">
                <iframe
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3022.2176046891505!2d-73.98784368459395!3d40.74844097932824!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x89c259a9b3117469%3A0xd134e199a405a163!2sEmpire%20State%20Building!5e0!3m2!1sen!2sus!4v1614612345678!5m2!1sen!2sus"
                  width="100%"
                  height="100%"
                  style={{ border: 0, borderRadius: '0.5rem' }}
                  allowFullScreen
                  loading="lazy"
                  title="Church Location Map"
                ></iframe>
              </div>
            </div>

            {/* Contact & Directions */}
            <div className="space-y-6">
              <div>
                <h3 className="text-2xl font-bold text-gray-900 mb-4">Contact Information</h3>
                <div className="space-y-4">
                  <div className="flex items-start gap-3">
                    <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center flex-shrink-0">
                      <MapPin className="w-5 h-5 text-blue-600" />
                    </div>
                    <div>
                      <div className="font-semibold text-gray-900">Address</div>
                      <div className="text-gray-600">123 Faith Avenue, Springfield, ST 12345</div>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center flex-shrink-0">
                      <Phone className="w-5 h-5 text-blue-600" />
                    </div>
                    <div>
                      <div className="font-semibold text-gray-900">Phone</div>
                      <div className="text-gray-600">(555) 123-4567</div>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center flex-shrink-0">
                      <Mail className="w-5 h-5 text-blue-600" />
                    </div>
                    <div>
                      <div className="font-semibold text-gray-900">Email</div>
                      <div className="text-gray-600">info@gracechurch.org</div>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center flex-shrink-0">
                      <Clock className="w-5 h-5 text-blue-600" />
                    </div>
                    <div>
                      <div className="font-semibold text-gray-900">Office Hours</div>
                      <div className="text-gray-600">Monday - Friday: 9:00 AM - 5:00 PM</div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="bg-blue-50 rounded-lg p-6 border-l-4 border-blue-600">
                <h4 className="font-bold text-lg mb-3 text-gray-900 flex items-center gap-2">
                  <Navigation className="w-5 h-5 text-blue-600" />
                  Directions
                </h4>
                <div className="space-y-2 text-gray-700">
                  <p>
                    <strong>From North:</strong> Take Highway 45 South, exit at Faith Avenue.
                    Turn left and continue for 2 miles. Church will be on your right.
                  </p>
                  <p>
                    <strong>From South:</strong> Take Highway 45 North, exit at Faith Avenue.
                    Turn right and continue for 2 miles. Church will be on your right.
                  </p>
                  <p className="pt-2 text-sm">
                    <strong>Parking:</strong> Free parking is available in our main lot and overflow
                    parking across the street.
                  </p>
                </div>
              </div>

              <div className="bg-gray-50 rounded-lg p-6">
                <h4 className="font-bold text-lg mb-3 text-gray-900">What to Expect</h4>
                <ul className="space-y-2 text-gray-700">
                  <li className="flex items-start gap-2">
                    <span className="text-blue-600 mt-1">•</span>
                    <span>Come as you are - we welcome casual and formal attire</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-blue-600 mt-1">•</span>
                    <span>Service lasts approximately 90 minutes</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-blue-600 mt-1">•</span>
                    <span>Children's programs available during service</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-blue-600 mt-1">•</span>
                    <span>Coffee and refreshments served after service</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-blue-600 mt-1">•</span>
                    <span>Guest services team available to answer questions</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>

          <div className="text-center bg-gradient-to-r from-blue-600 to-blue-700 rounded-lg p-8 text-white">
            <h3 className="text-2xl font-bold mb-3">First Time Visiting?</h3>
            <p className="text-lg mb-6">
              Let us know you're coming so we can give you a warm welcome!
            </p>
            <button className="bg-white text-blue-600 px-8 py-3 rounded-lg font-semibold hover:bg-gray-100 transition-colors">
              Plan Your Visit
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
