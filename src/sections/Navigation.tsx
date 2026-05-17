import { useState } from 'react';

const navLinks = [
  { label: 'Home', href: '#hero' },
  { label: 'About', href: '#about' },
  { label: 'Ministries', href: '#ministries' },
  { label: 'Sermons', href: '#sermons' },
  { label: 'Events', href: '#events' },
  { label: 'Visit Us', href: '#visit' },
];

export function Navigation() {
  const [expanded, setExpanded] = useState(false);

  const handleClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    setExpanded(false);
    const target = document.querySelector(href);
    if (target) {
      target.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <nav className="main-nav">
      <div style={{ textAlign: 'center' }}>
        <h1
          style={{
            fontSize: 'clamp(0.8rem, 2vw, 1rem)',
            lineHeight: 1.2,
            color: '#1565C0',
            margin: 0,
            fontFamily: '"Playfair Display", Georgia, serif',
          }}
        >
          Tokyo International
          <br />
          Seventh-day Adventist Church
        </h1>
      </div>

      <button
        className="nav-toggle"
        aria-label="Open navigation"
        aria-expanded={expanded}
        onClick={() => setExpanded(!expanded)}
      >
        <span className="hamburger" />
      </button>

      <ul className={`nav-links ${expanded ? 'open' : ''}`}>
        {navLinks.map((link) => (
          <li key={link.href}>
            <a
              href={link.href}
              onClick={(e) => handleClick(e, link.href)}
            >
              {link.label}
            </a>
          </li>
        ))}
      </ul>
    </nav>
  );
}
