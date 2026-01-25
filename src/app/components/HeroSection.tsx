import { useState, useEffect } from 'react';

export function HeroSection() {
  const [welcomeText, setWelcomeText] = useState('WELCOME');
  const [fade, setFade] = useState(true);

  useEffect(() => {
    const languages = [
      'WELCOME',
      'ようこそ',
      '欢迎',
      '환영합니다',
      'BIENVENIDO',
      'BEM-VINDO',
      'BIENVENUE'
    ];
    let index = 0;

    const intervalId = setInterval(() => {
      setFade(false); // Start fade out

      setTimeout(() => {
        index = (index + 1) % languages.length;
        setWelcomeText(languages[index]);
        setFade(true); // Start fade in
      }, 500); // Wait for fade out

    }, 3000);

    return () => clearInterval(intervalId);
  }, []);

  return (
    <section id="home" className="relative bg-gradient-to-br from-blue-50 to-white py-20 lg:py-32">
      <div className="container mx-auto px-4 lg:px-8">
        <div className="max-w-4xl mx-auto text-center space-y-8">
          <div className="space-y-4">
            <h1 className="text-5xl lg:text-7xl font-bold text-gray-900 leading-tight min-h-[1.2em] transition-opacity duration-500" style={{ opacity: fade ? 1 : 0 }}>
              {welcomeText}
            </h1>
            <p className="text-2xl lg:text-3xl text-blue-600 font-semibold">
              To Grace Community Church
            </p>
          </div>

          <p className="text-xl lg:text-2xl text-gray-700 max-w-3xl mx-auto leading-relaxed">
            Join us as we gather together to worship, grow in faith, and serve our community.
            You are loved, you are valued, and you belong here.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center pt-6">
            <a
              href="#visit"
              className="bg-blue-600 text-white px-8 py-4 rounded-lg text-lg font-semibold hover:bg-blue-700 transition-colors shadow-lg hover:shadow-xl"
            >
              Plan Your Visit
            </a>
            <a
              href="#about"
              className="bg-white text-blue-600 px-8 py-4 rounded-lg text-lg font-semibold border-2 border-blue-600 hover:bg-blue-50 transition-colors"
            >
              Learn More
            </a>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 pt-12">
            <div className="bg-white p-6 rounded-lg shadow-md">
              <div className="text-3xl font-bold text-blue-600 mb-2">Sunday</div>
              <div className="text-gray-700 font-semibold">Worship Service</div>
              <div className="text-gray-600">10:00 AM</div>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-md">
              <div className="text-3xl font-bold text-blue-600 mb-2">Wednesday</div>
              <div className="text-gray-700 font-semibold">Prayer Meeting</div>
              <div className="text-gray-600">7:00 PM</div>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-md">
              <div className="text-3xl font-bold text-blue-600 mb-2">Friday</div>
              <div className="text-gray-700 font-semibold">Youth Night</div>
              <div className="text-gray-600">6:30 PM</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
