import type { MinistryItem } from '../types';

interface MinistriesProps {
  ministries: MinistryItem[];
}

function isImageUrl(str: string): boolean {
  return !!str && (str.startsWith('http') || str.startsWith('/') || str.startsWith('data:'));
}

function renderMinistryImage(icon: string, title: string) {
  if (isImageUrl(icon)) {
    return (
      <div
        style={{
          width: 'calc(100% + 2rem)',
          height: '160px',
          overflow: 'hidden',
          marginBottom: '0.75rem',
          borderRadius: '6px 6px 0 0',
          marginTop: '-1rem',
          marginLeft: '-1rem',
          marginRight: '-1rem',
        }}
      >
        <img
          src={icon}
          alt={title}
          loading="lazy"
          style={{
            width: '100%',
            height: '100%',
            objectFit: 'cover',
            transition: 'transform 0.3s ease',
          }}
          onMouseEnter={(e) => {
            (e.target as HTMLImageElement).style.transform = 'scale(1.05)';
          }}
          onMouseLeave={(e) => {
            (e.target as HTMLImageElement).style.transform = 'scale(1)';
          }}
          onError={(e) => {
            const target = e.target as HTMLImageElement;
            target.style.display = 'none';
          }}
        />
      </div>
    );
  }
  return <span style={{ fontSize: '2.5rem', marginBottom: '0.75rem', display: 'block' }}>{icon || '✝️'}</span>;
}

export function Ministries({ ministries }: MinistriesProps) {
  return (
    <section id="ministries" className="section">
      <h2
        style={{
          fontFamily: '"Playfair Display", Georgia, serif',
          fontSize: 'clamp(1.5rem, 4vw, 2.5rem)',
          color: '#1565C0',
          marginBottom: '1.5rem',
          textAlign: 'center',
        }}
      >
        Ministries
      </h2>

      {ministries.length === 0 ? (
        <div className="no-events">
          <p>No ministries listed yet. Check back soon!</p>
        </div>
      ) : (
        <div className="ministries-grid">
          {ministries.map((ministry, index) => (
            <div
              key={`${ministry.Title}-${index}`}
              className="ministry-card fade-in"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              {renderMinistryImage(ministry.Icon, ministry.Title)}
              <h4>{ministry.Title}</h4>
              <p>{ministry.Description}</p>
            </div>
          ))}
        </div>
      )}

      <p
        style={{
          textAlign: 'center',
          color: '#757575',
          fontSize: '0.85rem',
          marginTop: '1.5rem',
          fontStyle: 'italic',
        }}
      >
        Want to join a ministry?{' '}
        <a href="mailto:info@tokyoadventist.org" style={{ color: '#1565C0', textDecoration: 'underline' }}>
          Contact us
        </a>
      </p>
    </section>
  );
}
