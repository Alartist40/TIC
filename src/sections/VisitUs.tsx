import type { ScheduleItem, GeneralData } from '../types';

interface VisitUsProps {
  schedule: ScheduleItem[];
  general: GeneralData;
}

export function VisitUs({ schedule, general }: VisitUsProps) {
  const address = general?.Address || '1-11-1 Jingumae, Shibuya, Tokyo, Japan 150-0001';
  const phone = general?.ChurchPhone || '+81 3-3402-1517';
  const email = general?.ChurchEmail || 'info@tokyoadventist.org';
  const churchName = general?.ChurchName || 'Tokyo International Seventh-day Adventist Church';

  const mapsUrl = `https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3241.689460241809!2d139.70263531525887!3d35.66947618019585!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x60188cb9f8a3c3b5%3A0x4a5e78be6c4e3d3d!2s1%20Chome-11-1%20Jingumae%2C%20Shibuya%20City%2C%20Tokyo%20150-0001!5e0!3m2!1sen!2sjp!4v1700000000000!5m2!1sen!2sjp`;

  const directionsUrl = `https://www.google.com/maps/dir//1-11-1+Jingumae,+Shibuya+City,+Tokyo+150-0001,+Japan`;

  return (
    <section id="visit" className="section">
      <h2
        style={{
          fontFamily: '"Playfair Display", Georgia, serif',
          fontSize: 'clamp(1.5rem, 4vw, 2.5rem)',
          color: '#1565C0',
          marginBottom: '1.5rem',
          textAlign: 'center',
        }}
      >
        Visit Us
      </h2>

      {/* Service Times */}
      <div className="church-card">
        <h3
          style={{
            fontFamily: '"Playfair Display", Georgia, serif',
            fontSize: 'clamp(1.2rem, 3vw, 1.5rem)',
            color: '#1565C0',
            marginBottom: '1rem',
          }}
        >
          Service Times
        </h3>
        <div className="table-wrapper">
          <table className="schedule-table">
            <thead>
              <tr>
                <th>Program</th>
                <th>Time</th>
                <th>Location</th>
              </tr>
            </thead>
            <tbody>
              {schedule.length === 0 ? (
                <tr>
                  <td colSpan={3} style={{ textAlign: 'center', color: '#757575' }}>
                    Schedule coming soon.
                  </td>
                </tr>
              ) : (
                schedule.map((item, index) => (
                  <tr key={index}>
                    <td>{item.Program}</td>
                    <td>{item.Time}</td>
                    <td>
                      {item.Location}
                      {item.Notes && (
                        <>
                          <br />
                          <small style={{ color: '#757575' }}>{item.Notes}</small>
                        </>
                      )}
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Address & Contact */}
      <div className="church-card">
        <h3
          style={{
            fontFamily: '"Playfair Display", Georgia, serif',
            fontSize: 'clamp(1.2rem, 3vw, 1.5rem)',
            color: '#1565C0',
            marginBottom: '1rem',
          }}
        >
          Address & Contact
        </h3>
        <div
          style={{
            display: 'grid',
            gap: '0.75rem',
            fontSize: '0.95rem',
            lineHeight: 1.7,
          }}
        >
          <p>
            <strong style={{ color: '#1565C0' }}>{churchName}</strong>
            <br />
            {address}
          </p>
          <p>
            <strong>Tel:</strong>{' '}
            <a href={`tel:${phone.replace(/\s/g, '')}`}>{phone}</a>
          </p>
          <p>
            <strong>Email:</strong>{' '}
            <a href={`mailto:${email}`}>{email}</a>
          </p>
        </div>
        <a
          href={directionsUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="btn-gold"
        >
          <span style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', justifyContent: 'center' }}>
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" />
              <circle cx="12" cy="10" r="3" />
            </svg>
            Open in Google Maps
          </span>
        </a>
      </div>

      {/* Map */}
      <div className="church-card">
        <h3
          style={{
            fontFamily: '"Playfair Display", Georgia, serif',
            fontSize: 'clamp(1.2rem, 3vw, 1.5rem)',
            color: '#1565C0',
            marginBottom: '1rem',
          }}
        >
          Location Map
        </h3>
        <div className="map-container">
          <iframe
            src={mapsUrl}
            title="Church Location Map"
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
          />
        </div>
      </div>

      {/* Transportation */}
      <div className="church-card">
        <h3
          style={{
            fontFamily: '"Playfair Display", Georgia, serif',
            fontSize: 'clamp(1.2rem, 3vw, 1.5rem)',
            color: '#1565C0',
            marginBottom: '1rem',
          }}
        >
          Getting Here
        </h3>
        <ol
          style={{
            marginLeft: '1.5rem',
            marginTop: '0.5rem',
            lineHeight: 1.8,
            fontSize: '0.95rem',
          }}
        >
          <li>
            <strong>From Harajuku Station (JR Yamanote Line):</strong> Take the Takeshita Exit and walk
            10 minutes toward Omotesando.
          </li>
          <li>
            <strong>From Meiji-jingumae Station (Tokyo Metro):</strong> Take Exit 4 and walk 5 minutes.
          </li>
          <li>
            <strong>From Omotesando Station:</strong> Take the A2 exit and walk 10 minutes toward Harajuku.
          </li>
          <li>
            <strong>Parking:</strong> Limited street parking. Public parking lots available nearby.
          </li>
        </ol>
      </div>
    </section>
  );
}
