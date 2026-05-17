export function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="site-footer">
      <p>&copy; {year} Tokyo International Seventh-day Adventist Church.</p>
      <p style={{ fontSize: '0.8rem', marginTop: '0.5rem' }}>
        Designed with the Creation Grid. Adventist symbol © General Conference of Seventh-day Adventists.
      </p>
    </footer>
  );
}
