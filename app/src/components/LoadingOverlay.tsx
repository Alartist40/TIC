interface LoadingOverlayProps {
  visible: boolean;
}

export function LoadingOverlay({ visible }: LoadingOverlayProps) {
  if (!visible) return null;

  return (
    <div className={`loading-overlay ${!visible ? 'hidden' : ''}`}>
      <div style={{ textAlign: 'center' }}>
        <div className="loading-spinner" />
        <h2 style={{ marginTop: '1rem', color: '#1565C0', fontSize: '1.5rem', fontFamily: '"Playfair Display", Georgia, serif' }}>
          Loading TIC Website...
        </h2>
      </div>
    </div>
  );
}
