import { ReactNode } from 'react';

interface CreationGridProps {
  children: ReactNode;
  className?: string;
}

export function CreationGrid({ 
  children, 
  className = "" 
}: CreationGridProps) {
  return (
    <div className={`creation-grid-wrapper ${className}`}>
      <div className="p-6 lg:p-8">
        {children}
      </div>
    </div>
  );
}
