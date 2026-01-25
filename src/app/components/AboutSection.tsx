import { Heart, Users, Book } from 'lucide-react';
import { ImageWithFallback } from '@/app/components/figma/ImageWithFallback';

interface AboutSectionProps {
  mission?: string;
  vision?: string;
  values?: string;
  pastorName?: string;
  pastorBio?: string;
  pastorImage?: string;
}

export function AboutSection({
  mission = "Building a community of believers for over 50 years",
  vision,
  values,
  pastorName = "Pastor John Anderson",
  pastorBio,
  pastorImage
}: AboutSectionProps) {
  return (
    <section id="about" className="py-16 lg:py-24 bg-white">
      <div className="container mx-auto px-4 lg:px-8">
        <div className="max-w-6xl mx-auto space-y-16">
          {/* About the Church */}
          <div className="text-center space-y-6">
            <h2 className="text-4xl lg:text-5xl font-bold text-gray-900">About Our Church</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              {mission}
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <ImageWithFallback
                src="https://images.unsplash.com/photo-1608569569089-5d2e3e644ea6?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjaHVyY2glMjBidWlsZGluZyUyMGV4dGVyaW9yfGVufDF8fHx8MTc2ODk5NTk0Mnww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral"
                alt="Church Building"
                className="w-full h-96 object-cover rounded-lg shadow-xl"
              />
            </div>
            <div className="space-y-6">
              <h3 className="text-3xl font-bold text-gray-900">Our Story</h3>
              <p className="text-lg text-gray-700 leading-relaxed">
                Grace Community Church was founded in 1975 by a small group of faithful believers
                who had a vision to create a welcoming spiritual home for families in our community.
                What started as gatherings in a living room has grown into a vibrant congregation
                of over 500 members.
              </p>
              <p className="text-lg text-gray-700 leading-relaxed">
                Throughout our history, we have remained committed to our core values: authentic worship,
                biblical teaching, genuine community, and compassionate service. We believe that the
                church is not just a building, but a family of believers united in faith and purpose.
              </p>
              <div className="grid grid-cols-3 gap-4 pt-4">
                <div className="text-center">
                  <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-2">
                    <Heart className="w-8 h-8 text-blue-600" />
                  </div>
                  <div className="text-2xl font-bold text-blue-600">50+</div>
                  <div className="text-sm text-gray-600">Years</div>
                </div>
                <div className="text-center">
                  <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-2">
                    <Users className="w-8 h-8 text-blue-600" />
                  </div>
                  <div className="text-2xl font-bold text-blue-600">500+</div>
                  <div className="text-sm text-gray-600">Members</div>
                </div>
                <div className="text-center">
                  <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-2">
                    <Book className="w-8 h-8 text-blue-600" />
                  </div>
                  <div className="text-2xl font-bold text-blue-600">12</div>
                  <div className="text-sm text-gray-600">Ministries</div>
                </div>
              </div>
            </div>
          </div>

          {/* Pastor Section */}
          <div className="bg-blue-50 rounded-2xl p-8 lg:p-12">
            <div className="grid md:grid-cols-2 gap-12 items-center">
              <div className="order-2 md:order-1 space-y-6">
                <div>
                  <h3 className="text-3xl font-bold text-gray-900 mb-2">Meet Our Pastor</h3>
                  <p className="text-xl text-blue-600 font-semibold">Pastor John Anderson</p>
                </div>
                <p className="text-lg text-gray-700 leading-relaxed">
                  Pastor John has been serving our congregation since 2010. With a heart for teaching
                  and shepherding, he leads our church with wisdom, compassion, and dedication. He holds
                  a Master of Divinity from Seminary and has over 20 years of ministry experience.
                </p>
                <p className="text-lg text-gray-700 leading-relaxed">
                  Pastor John and his wife Sarah have three children and are passionate about building
                  authentic community and helping people discover their purpose in Christ.
                </p>
                <div className="bg-white p-6 rounded-lg border-l-4 border-blue-600">
                  <div className="text-sm text-gray-500 mb-2">Favorite Verse</div>
                  <blockquote className="text-lg italic text-gray-800">
                    "For I know the plans I have for you, declares the Lord, plans to prosper you and
                    not to harm you, plans to give you hope and a future."
                  </blockquote>
                  <div className="text-sm text-blue-600 font-semibold mt-2">- Jeremiah 29:11</div>
                </div>
              </div>
              <div className="order-1 md:order-2">
                <ImageWithFallback
                  src="https://images.unsplash.com/photo-1535119782-71efca81996b?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjaHVyY2glMjBwYXN0b3IlMjBwb3J0cmFpdHxlbnwxfHx8fDE3NjkwNzQxMjd8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral"
                  alt="Pastor John Anderson"
                  className="w-full h-96 object-cover rounded-lg shadow-xl"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
