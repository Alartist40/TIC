import { useEffect, useState, useRef } from 'react';
import { AdventistLogo } from './AdventistLogo';

export function SabbathColumn() {
  const [scrollProgress, setScrollProgress] = useState(0);
  const rafRef = useRef<number>(0);
  const lastScrollRef = useRef(0);

  useEffect(() => {
    const handleScroll = () => {
      // Throttle using requestAnimationFrame
      if (rafRef.current) return;
      
      rafRef.current = requestAnimationFrame(() => {
        const scrollTop = window.scrollY;
        const docHeight = document.documentElement.scrollHeight - window.innerHeight;
        
        // Calculate progress (0 at top, 1 at bottom)
        // Use the first 60% of scroll for the transition
        const progress = Math.min(scrollTop / (docHeight * 0.6), 1);
        
        // Only update if change is significant (reduces re-renders)
        if (Math.abs(progress - lastScrollRef.current) > 0.02) {
          lastScrollRef.current = progress;
          setScrollProgress(progress);
        }
        
        rafRef.current = 0;
      });
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => {
      window.removeEventListener('scroll', handleScroll);
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
    };
  }, []);

  // Interpolate colors from blue gradient to white
  // Start: linear-gradient(180deg, #1565C0 0%, #0D47A1 100%)
  // End: #ffffff
  const bgStyle = {
    background: scrollProgress < 0.05
      ? 'linear-gradient(180deg, #1565C0 0%, #0D47A1 100%)'
      : scrollProgress > 0.95
        ? '#ffffff'
        : `linear-gradient(180deg, 
            rgb(${21 + (255 - 21) * scrollProgress}, ${101 + (255 - 101) * scrollProgress}, ${192 + (255 - 192) * scrollProgress}) 0%, 
            rgb(${13 + (255 - 13) * scrollProgress}, ${71 + (255 - 71) * scrollProgress}, ${161 + (255 - 161) * scrollProgress}) 100%)`,
    transition: 'background 0.1s ease-out',
  };

  // Logo opacity transitions from white (1) to blue-tinted (0.3) as background becomes white
  const logoOpacity = Math.max(0.25, 1 - scrollProgress * 0.75);

  return (
    <aside
      className="sabbath-column"
      aria-hidden="true"
      style={bgStyle}
    >
      <div className="sabbath-logo-container">
        <div style={{ opacity: logoOpacity, transition: 'opacity 0.1s ease-out' }}>
          <AdventistLogo />
        </div>
      </div>
    </aside>
  );
}
