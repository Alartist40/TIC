export function AdventistLogo() {
  return (
    <img
      src="/adventist-symbol--white.png"
      alt="Seventh-day Adventist Church Symbol"
      className="w-full h-auto"
      style={{
        filter: 'drop-shadow(0 4px 8px rgba(0,0,0,0.3))',
        opacity: 0.95,
        transition: 'opacity 0.3s ease, transform 0.3s ease',
      }}
      onMouseEnter={(e) => {
        (e.target as HTMLImageElement).style.opacity = '1';
        (e.target as HTMLImageElement).style.transform = 'scale(1.05)';
      }}
      onMouseLeave={(e) => {
        (e.target as HTMLImageElement).style.opacity = '0.95';
        (e.target as HTMLImageElement).style.transform = 'scale(1)';
      }}
    />
  );
}
