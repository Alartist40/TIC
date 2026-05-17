import { useState, useEffect, useCallback } from 'react';

const LANGUAGES = [
  { text: 'Welcome', lang: 'English' },
  { text: '欢迎', lang: 'Chinese' },
  { text: 'Bienvenido', lang: 'Spanish' },
  { text: 'Bienvenue', lang: 'French' },
  { text: 'Willkommen', lang: 'German' },
  { text: 'ようこそ', lang: 'Japanese' },
  { text: '환영합니다', lang: 'Korean' },
  { text: 'Maligayang pagdating', lang: 'Filipino' },
  { text: 'Bem-vindo', lang: 'Portuguese' },
  { text: 'Benvenuto', lang: 'Italian' },
];

export function Hero() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [opacity, setOpacity] = useState(1);

  const rotateLanguage = useCallback(() => {
    setOpacity(0);
    setTimeout(() => {
      setCurrentIndex((prev) => (prev + 1) % LANGUAGES.length);
      setOpacity(1);
    }, 300);
  }, []);

  useEffect(() => {
    const interval = setInterval(rotateLanguage, 3000);
    return () => clearInterval(interval);
  }, [rotateLanguage]);

  return (
    <section id="hero" className="hero">
      <h2
        className="welcome"
        style={{
          fontSize: 'clamp(2.5rem, 12vw, 5rem)',
          letterSpacing: '3px',
          textTransform: 'uppercase' as const,
          marginBottom: '0.5rem',
          lineHeight: 1.1,
        }}
      >
        WELCOME
      </h2>

      <div
        className="language-rotator"
        style={{
          marginTop: '1.5rem',
          minHeight: '3rem',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        <span
          className="language-text"
          style={{
            fontFamily: '"Playfair Display", Georgia, serif',
            fontSize: 'clamp(1.5rem, 5vw, 2.5rem)',
            color: '#1565C0',
            fontWeight: 700,
            opacity,
            transform: opacity === 1 ? 'translateY(0)' : 'translateY(10px)',
            transition: 'all 0.5s cubic-bezier(0.4, 0, 0.2, 1)',
            textShadow: '0 2px 4px rgba(0,0,0,0.1)',
            padding: '0.5rem 1rem',
          }}
          aria-live="polite"
          aria-label={`Welcome in ${LANGUAGES[currentIndex].lang}`}
        >
          {LANGUAGES[currentIndex].text}
        </span>
      </div>

      <p
        style={{
          fontFamily: '"Inter", sans-serif',
          fontSize: 'clamp(1rem, 3vw, 1.3rem)',
          color: '#2D3436',
          marginTop: '1rem',
          opacity: 0.8,
          fontWeight: 400,
        }}
      >
        A multicultural community of believers united in Christ.
      </p>
    </section>
  );
}
