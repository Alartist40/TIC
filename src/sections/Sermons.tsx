import type { SermonItem, GeneralData } from '../types';

interface SermonsProps {
  sermons: SermonItem[];
  general: GeneralData;
}

function formatDate(dateStr: string): string {
  if (!dateStr) return 'TBD';
  try {
    const date = new Date(dateStr + 'T00:00:00');
    if (isNaN(date.getTime())) return dateStr;
    return date.toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' });
  } catch {
    return dateStr;
  }
}

function extractYoutubeID(url: string): string | null {
  if (!url) return null;
  const patterns = [
    /(?:v=|\/)([0-9A-Za-z_-]{11}).*/,
    /(?:embed\/)([0-9A-Za-z_-]{11}).*/,
    /(?:youtu\.be\/)([0-9A-Za-z_-]{11}).*/,
    /(?:live\/)([0-9A-Za-z_-]{11}).*/,
  ];
  for (const pattern of patterns) {
    const match = url.match(pattern);
    if (match?.[1]) return match[1];
  }
  return url.length === 11 ? url : null;
}

export function Sermons({ sermons, general }: SermonsProps) {
  const youtubeChannel = general?.YoutubeChannel || 'https://www.youtube.com/@liftupyourvoicemediaminist7959';
  const youtubeLive = general?.YoutubeLive || '';
  const liveID = extractYoutubeID(youtubeLive);

  // Filter to active sermons and sort by date (newest first)
  const activeSermons = sermons
    .filter(s => s.Status !== 'Inactive' && s.Status !== 'Hidden')
    .sort((a, b) => new Date(b.Date || '1970-01-01').getTime() - new Date(a.Date || '1970-01-01').getTime()
    );

  return (
    <section id="sermons" className="section">
      <h2
        style={{
          fontFamily: '"Playfair Display", Georgia, serif',
          fontSize: 'clamp(1.5rem, 4vw, 2.5rem)',
          color: '#1565C0',
          marginBottom: '1.5rem',
          textAlign: 'center',
        }}
      >
        YouTube & Sermons
      </h2>

      {/* YouTube Live / Channel */}
      {liveID ? (
        <div
          style={{
            position: 'relative',
            paddingBottom: '56.25%',
            height: 0,
            overflow: 'hidden',
            maxWidth: '100%',
            borderRadius: '8px',
            marginBottom: '2rem',
          }}
        >
          <iframe
            style={{
              position: 'absolute',
              top: 0,
              left: 0,
              width: '100%',
              height: '100%',
              border: 'none',
            }}
            src={`https://www.youtube.com/embed/${liveID}`}
            title="YouTube Live Stream"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
            allowFullScreen
          />
        </div>
      ) : (
        <div className="church-card" style={{ textAlign: 'center', marginBottom: '2rem' }}>
          <p style={{ marginBottom: '1rem' }}>
            Subscribe to our YouTube channel for live streams and sermon recordings.
          </p>
          <a
            href={youtubeChannel}
            target="_blank"
            rel="noopener noreferrer"
            className="btn-gold"
          >
            <span style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', justifyContent: 'center' }}>
              <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" />
              </svg>
              Visit Our YouTube Channel
            </span>
          </a>
        </div>
      )}

      {/* Recent Sermons */}
      <h3
        style={{
          fontFamily: '"Playfair Display", Georgia, serif',
          fontSize: '1.5rem',
          color: '#1565C0',
          marginTop: '2rem',
          marginBottom: '1rem',
        }}
      >
        Recent Sermons
      </h3>

      {activeSermons.length === 0 ? (
        <div className="no-events">
          <p>No sermons available yet. Check back soon!</p>
        </div>
      ) : (
        <div className="sermons-grid">
          {activeSermons.map((sermon, index) => {
            const thumbUrl = sermon.YoutubeID && sermon.YoutubeID !== 'sample12345'
              ? `https://img.youtube.com/vi/${sermon.YoutubeID}/mqdefault.jpg`
              : null;

            return (
              <a
                key={`${sermon.Title}-${index}`}
                href={sermon.YoutubeID && sermon.YoutubeID !== 'sample12345'
                  ? `https://www.youtube.com/watch?v=${sermon.YoutubeID}`
                  : youtubeChannel}
                target="_blank"
                rel="noopener noreferrer"
                className="sermon-card fade-in"
                style={{
                  animationDelay: `${index * 0.1}s`,
                  textDecoration: 'none',
                  color: 'inherit',
                }}
              >
                <div className="sermon-thumbnail">
                  {thumbUrl ? (
                    <img
                      src={thumbUrl}
                      alt={sermon.Title}
                      loading="lazy"
                      onError={(e) => {
                        (e.target as HTMLImageElement).style.display = 'none';
                      }}
                    />
                  ) : (
                    <div
                      style={{
                        position: 'absolute',
                        top: 0,
                        left: 0,
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
                      📖
                    </div>
                  )}
                  <div className="sermon-play">▶</div>
                </div>
                <div className="sermon-info">
                  <h4>{sermon.Title}</h4>
                  {sermon.Speaker && <p className="speaker">By {sermon.Speaker}</p>}
                  {sermon.Date && <p className="date">{formatDate(sermon.Date)}</p>}
                  {sermon.Scripture && (
                    <p
                      style={{
                        fontStyle: 'italic',
                        color: '#757575',
                        fontSize: '0.8rem',
                        marginTop: '0.25rem',
                      }}
                    >
                      &ldquo;{sermon.Scripture}&rdquo;
                    </p>
                  )}
                  {sermon.Duration && (
                    <p
                      style={{
                        color: '#757575',
                        fontSize: '0.8rem',
                        marginTop: '0.25rem',
                      }}
                    >
                      ⏱ {sermon.Duration}
                    </p>
                  )}
                </div>
              </a>
            );
          })}
        </div>
      )}
    </section>
  );
}
