import { ReactNode } from 'react';

interface SectionContainerProps {
  children: ReactNode;
  id?: string;
  className?: string;
  background?: 'default' | 'dark' | 'gradient';
}

export default function SectionContainer({ 
  children, 
  id, 
  className = '',
  background = 'default'
}: SectionContainerProps) {
  const backgrounds = {
    default: 'bg-[#02091b]',
    dark: 'bg-[#030712]',
    gradient: 'bg-gradient-to-b from-[#030712] to-[#020617]'
  };
  
  return (
    <section 
      id={id}
      className={`py-16 md:py-24 border-t border-slate-800/60 ${backgrounds[background]} ${className}`}
    >
      <div className="page-container">
        {children}
      </div>
    </section>
  );
}
