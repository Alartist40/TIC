import { useState } from 'react';
import { ChevronDown, ChevronUp } from 'lucide-react';
import { ImageWithFallback } from '@/app/components/figma/ImageWithFallback';

export interface Ministry {
  id: number;
  name: string;
  image: string;
  description: string;
  schedule?: string;
  leader?: string;
}

const defaultMinistries: Ministry[] = [
  {
    id: 1,
    name: "Youth Ministry",
    image: "https://images.unsplash.com/photo-1594913495702-0872744c6968?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx5b3V0aCUyMGdyb3VwJTIwY2h1cmNofGVufDF8fHx8MTc2OTA3NDE1MXww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
    description: "Our Youth Ministry is dedicated to helping teenagers grow in their faith while building lasting friendships. We meet weekly for Bible study, games, worship, and community service projects. It's a safe space where young people can ask questions, explore their faith, and develop into strong Christian leaders.",
    schedule: "Fridays, 6:30 PM - 8:30 PM",
    leader: "Pastor Mike Johnson"
  },
  {
    id: 2,
    name: "Worship Ministry",
    image: "https://images.unsplash.com/photo-1547351137-6f92b9d8c30f?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx3b3JzaGlwJTIwdGVhbSUyMG11c2ljfGVufDF8fHx8MTc2OTA3NDE1MXww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
    description: "Our Worship Ministry creates an atmosphere where people can encounter God through music and song. From contemporary worship to traditional hymns, our talented team leads the congregation in heartfelt praise. We welcome musicians, vocalists, and anyone with a passion for worship to join us.",
    schedule: "Sundays, 9:00 AM (rehearsal) | Service at 10:00 AM",
    leader: "Sarah Martinez"
  },
  {
    id: 3,
    name: "Children's Ministry",
    image: "https://images.unsplash.com/photo-1713012633197-1426a345ca99?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjaGlsZHJlbiUyMHN1bmRheSUyMHNjaG9vbHxlbnwxfHx8fDE3NjkwNzQxNTN8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
    description: "We believe that children are a vital part of our church family. Our Children's Ministry provides age-appropriate Bible lessons, crafts, games, and activities that make learning about God fun and engaging. We focus on building a strong foundation of faith in a safe, nurturing environment.",
    schedule: "Sundays, 10:00 AM (during service)",
    leader: "Emily Carter"
  },
  {
    id: 4,
    name: "Outreach Ministry",
    image: "https://images.unsplash.com/photo-1760992004210-44a502a2872d?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjb21tdW5pdHklMjBzZXJ2aWNlJTIwdm9sdW50ZWVyc3xlbnwxfHx8fDE3NjkwNTY5NzZ8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
    description: "Our Outreach Ministry embodies Christ's love by serving our local community and beyond. From food drives to mission trips, from visiting nursing homes to supporting local shelters, we seek opportunities to be the hands and feet of Jesus. Everyone is welcome to participate in making a difference.",
    schedule: "Various times throughout the month",
    leader: "David Thompson"
  }
];

interface MinistrySectionProps {
  ministries?: Ministry[];
}

export function MinistrySection({ ministries = defaultMinistries }: MinistrySectionProps) {
  const [expandedId, setExpandedId] = useState<number | null>(null);

  const toggleMinistry = (id: number) => {
    setExpandedId(expandedId === id ? null : id);
  };

  return (
    <section id="ministries" className="py-16 lg:py-24 bg-gray-50">
      <div className="container mx-auto px-4 lg:px-8">
        <div className="max-w-6xl mx-auto space-y-12">
          <div className="text-center space-y-4">
            <h2 className="text-4xl lg:text-5xl font-bold text-gray-900">Our Ministries</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Find your place to serve, grow, and connect with others
            </p>
          </div>

          <div className="space-y-4">
            {ministries.map((ministry) => (
              <div
                key={ministry.id}
                className="bg-white rounded-lg shadow-md overflow-hidden transition-all duration-300"
              >
                <button
                  onClick={() => toggleMinistry(ministry.id)}
                  className="w-full px-6 py-5 flex items-center justify-between hover:bg-gray-50 transition-colors"
                >
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
                      <span className="text-2xl">🙏</span>
                    </div>
                    <h3 className="text-2xl font-bold text-gray-900">{ministry.name}</h3>
                  </div>
                  <div className="text-blue-600">
                    {expandedId === ministry.id ? (
                      <ChevronUp className="w-6 h-6" />
                    ) : (
                      <ChevronDown className="w-6 h-6" />
                    )}
                  </div>
                </button>

                {expandedId === ministry.id && (
                  <div className="px-6 pb-6 space-y-4 animate-in fade-in duration-300">
                    <div className="rounded-lg overflow-hidden">
                      <ImageWithFallback
                        src={ministry.image}
                        alt={ministry.name}
                        className="w-full h-64 object-cover"
                      />
                    </div>
                    <p className="text-lg text-gray-700 leading-relaxed">
                      {ministry.description}
                    </p>
                    <div className="grid md:grid-cols-2 gap-4 pt-2">
                      {/* Only show schedule and leader if they exist */}
                      {ministry.schedule && (
                        <div className="bg-blue-50 p-4 rounded-lg">
                          <div className="text-sm text-blue-600 font-semibold mb-1">Schedule</div>
                          <div className="text-gray-800">{ministry.schedule}</div>
                        </div>
                      )}
                      {ministry.leader && (
                        <div className="bg-blue-50 p-4 rounded-lg">
                          <div className="text-sm text-blue-600 font-semibold mb-1">Ministry Leader</div>
                          <div className="text-gray-800">{ministry.leader}</div>
                        </div>
                      )}
                    </div>
                    <button className="mt-4 bg-blue-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-blue-700 transition-colors">
                      Get Involved
                    </button>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
