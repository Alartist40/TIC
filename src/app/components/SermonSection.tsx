import { Youtube, Facebook, Instagram, Podcast } from 'lucide-react';

interface SermonSectionProps {
  youtubeLink?: string;
}

export function SermonSection({ youtubeLink }: SermonSectionProps) {
  return (
    <section id="sermons" className="py-16 lg:py-24 bg-white">
      <div className="container mx-auto px-4 lg:px-8">
        <div className="max-w-6xl mx-auto space-y-12">
          <div className="text-center space-y-4">
            <h2 className="text-4xl lg:text-5xl font-bold text-gray-900">Watch & Listen</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Catch up on sermons and connect with us on social media
            </p>
          </div>

          <div className="bg-gradient-to-br from-blue-500 to-blue-700 rounded-2xl p-8 lg:p-12 text-white text-center space-y-6">
            <h3 className="text-3xl font-bold">Can't Make It to Service?</h3>
            <p className="text-xl max-w-2xl mx-auto">
              No worries! Watch our live stream or catch up on past sermons on your favorite platform.
            </p>
            {/* Show Watch Now button prominently if link exists */}
            {youtubeLink && (
              <div className="mt-6">
                <a
                  href={youtubeLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-block bg-white text-blue-600 px-8 py-3 rounded-lg font-bold hover:bg-blue-50 transition-colors shadow-lg"
                >
                  Watch Live Now
                </a>
              </div>
            )}
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            <a
              href={youtubeLink || "https://youtube.com"}
              target="_blank"
              rel="noopener noreferrer"
              className="bg-white border-2 border-gray-200 rounded-lg p-8 hover:border-blue-600 hover:shadow-lg transition-all group"
            >
              <div className="flex flex-col items-center space-y-4">
                <div className="w-20 h-20 bg-red-100 rounded-full flex items-center justify-center group-hover:bg-red-600 transition-colors">
                  <Youtube className="w-10 h-10 text-red-600 group-hover:text-white transition-colors" />
                </div>
                <div className="text-center">
                  <h4 className="text-xl font-bold text-gray-900 mb-2">YouTube</h4>
                  <p className="text-sm text-gray-600">
                    Watch full sermons and special events
                  </p>
                </div>
                <div className="text-blue-600 font-semibold group-hover:underline">
                  Visit Channel →
                </div>
              </div>
            </a>

            <a
              href="https://facebook.com"
              target="_blank"
              rel="noopener noreferrer"
              className="bg-white border-2 border-gray-200 rounded-lg p-8 hover:border-blue-600 hover:shadow-lg transition-all group"
            >
              <div className="flex flex-col items-center space-y-4">
                <div className="w-20 h-20 bg-blue-100 rounded-full flex items-center justify-center group-hover:bg-blue-600 transition-colors">
                  <Facebook className="w-10 h-10 text-blue-600 group-hover:text-white transition-colors" />
                </div>
                <div className="text-center">
                  <h4 className="text-xl font-bold text-gray-900 mb-2">Facebook</h4>
                  <p className="text-sm text-gray-600">
                    Join our community and stay updated
                  </p>
                </div>
                <div className="text-blue-600 font-semibold group-hover:underline">
                  Follow Us →
                </div>
              </div>
            </a>

            <a
              href="https://instagram.com"
              target="_blank"
              rel="noopener noreferrer"
              className="bg-white border-2 border-gray-200 rounded-lg p-8 hover:border-blue-600 hover:shadow-lg transition-all group"
            >
              <div className="flex flex-col items-center space-y-4">
                <div className="w-20 h-20 bg-pink-100 rounded-full flex items-center justify-center group-hover:bg-pink-600 transition-colors">
                  <Instagram className="w-10 h-10 text-pink-600 group-hover:text-white transition-colors" />
                </div>
                <div className="text-center">
                  <h4 className="text-xl font-bold text-gray-900 mb-2">Instagram</h4>
                  <p className="text-sm text-gray-600">
                    See photos and daily inspiration
                  </p>
                </div>
                <div className="text-blue-600 font-semibold group-hover:underline">
                  Follow Us →
                </div>
              </div>
            </a>

            <a
              href="https://podcasts.apple.com"
              target="_blank"
              rel="noopener noreferrer"
              className="bg-white border-2 border-gray-200 rounded-lg p-8 hover:border-blue-600 hover:shadow-lg transition-all group"
            >
              <div className="flex flex-col items-center space-y-4">
                <div className="w-20 h-20 bg-purple-100 rounded-full flex items-center justify-center group-hover:bg-purple-600 transition-colors">
                  <Podcast className="w-10 h-10 text-purple-600 group-hover:text-white transition-colors" />
                </div>
                <div className="text-center">
                  <h4 className="text-xl font-bold text-gray-900 mb-2">Podcast</h4>
                  <p className="text-sm text-gray-600">
                    Listen to sermons on the go
                  </p>
                </div>
                <div className="text-blue-600 font-semibold group-hover:underline">
                  Subscribe →
                </div>
              </div>
            </a>
          </div>

          <div className="bg-gray-50 rounded-lg p-8 text-center">
            <h4 className="text-2xl font-bold text-gray-900 mb-3">Live Stream Every Sunday</h4>
            <p className="text-lg text-gray-700 mb-4">
              Join us online at 10:00 AM EST for our live worship service
            </p>
            <a
              href="https://youtube.com"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-block bg-red-600 text-white px-8 py-3 rounded-lg font-semibold hover:bg-red-700 transition-colors"
            >
              Watch Live on YouTube
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
