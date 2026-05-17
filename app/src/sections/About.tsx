import type { AboutData } from '../types';

interface AboutProps {
  about: AboutData;
}

function sanitizeHTML(str: string): string {
  if (!str) return '';
  const div = document.createElement('div');
  div.textContent = str;
  return div.innerHTML;
}

export function About({ about }: AboutProps) {
  return (
    <section id="about" className="section">
      <h2
        style={{
          fontFamily: '"Playfair Display", Georgia, serif',
          fontSize: 'clamp(1.5rem, 4vw, 2.5rem)',
          color: '#1565C0',
          marginBottom: '1.5rem',
          textAlign: 'center',
        }}
      >
        About TIC
      </h2>

      {/* Mission/Vision/Values Card */}
      <div className="church-card">
        <h3
          style={{
            fontFamily: '"Playfair Display", Georgia, serif',
            fontSize: 'clamp(1.2rem, 3vw, 1.8rem)',
            color: '#1565C0',
            marginBottom: '1rem',
          }}
        >
          Our Mission and Vision
        </h3>
        <div className="mission-content">
          {about?.Mission && (
            <div style={{ marginBottom: '1.5rem' }}>
              <h4
                style={{
                  fontFamily: '"Inter", sans-serif',
                  fontSize: '1.1rem',
                  color: '#1565C0',
                  margin: '1.5rem 0 0.5rem 0',
                  fontWeight: 600,
                }}
              >
                Our Mission
              </h4>
              <p
                dangerouslySetInnerHTML={{
                  __html: sanitizeHTML(about.Mission),
                }}
              />
            </div>
          )}
          {about?.Vision && (
            <div style={{ marginBottom: '1.5rem' }}>
              <h4
                style={{
                  fontFamily: '"Inter", sans-serif',
                  fontSize: '1.1rem',
                  color: '#1565C0',
                  margin: '1.5rem 0 0.5rem 0',
                  fontWeight: 600,
                }}
              >
                Our Vision
              </h4>
              <p
                dangerouslySetInnerHTML={{
                  __html: sanitizeHTML(about.Vision),
                }}
              />
            </div>
          )}
          {about?.Values && (
            <div>
              <h4
                style={{
                  fontFamily: '"Inter", sans-serif',
                  fontSize: '1.1rem',
                  color: '#1565C0',
                  margin: '1.5rem 0 0.5rem 0',
                  fontWeight: 600,
                }}
              >
                Our Values
              </h4>
              <p
                dangerouslySetInnerHTML={{
                  __html: sanitizeHTML(about.Values),
                }}
              />
            </div>
          )}
        </div>
      </div>

      {/* Pastor Card */}
      <div className="church-card">
        <h3
          style={{
            fontFamily: '"Playfair Display", Georgia, serif',
            fontSize: 'clamp(1.2rem, 3vw, 1.8rem)',
            color: '#1565C0',
            marginBottom: '1rem',
          }}
        >
          Our Church Pastor
        </h3>
        <div className="pastor-content">
          <div className="pastor-verse-row">
            <div className="pastor-square">
              {about?.PastorImage ? (
                <img
                  src={about.PastorImage}
                  alt={about.PastorName || 'Pastor'}
                  loading="lazy"
                  onError={(e) => {
                    (e.target as HTMLImageElement).style.display = 'none';
                  }}
                />
              ) : (
                <div
                  style={{
                    width: '100%',
                    height: '100%',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    background: 'linear-gradient(135deg, #1565C0, #0D47A1)',
                    color: 'white',
                    fontSize: '3rem',
                  }}
                >
                  ✝
                </div>
              )}
            </div>
            <div className="verse-box">
              <p className="verse" style={{ fontStyle: 'italic' }}>
                {about?.PastorVerseText || 'For I know the plans I have for you, declares the Lord.'}
              </p>
              <span className="verse-ref">
                — {about?.PastorVerseRef || 'Jeremiah 29:11'}
              </span>
            </div>
          </div>
          {about?.PastorName && (
            <div className="pastor-info" style={{ marginTop: '1.5rem' }}>
              <h4
                className="pastor-name"
                style={{
                  fontFamily: '"Inter", sans-serif',
                  fontSize: '1.2rem',
                  color: '#1565C0',
                  margin: '0 0 0.5rem 0',
                  fontWeight: 600,
                }}
              >
                {about.PastorName}
              </h4>
              {about?.PastorBio && (
                <p className="pastor-bio">{about.PastorBio}</p>
              )}
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
