import { ReactNode } from 'react';

interface CardProps {
  children: ReactNode;
  className?: string;
  hover?: boolean;
  glow?: boolean;
}

export default function Card({ children, className = '', hover = false, glow = false }: CardProps) {
  return (
    <div 
      className={`
        bg-[#0a0f1f] backdrop-blur-sm border border-slate-800/60 rounded-xl p-6 
        ${hover ? 'transition-all duration-300 hover:bg-[#0c1326] hover:border-[#5885fa]/40 hover:-translate-y-1' : ''}
        ${glow ? 'shadow-[0_10px_30px_rgba(88,133,250,0.12)] hover:shadow-[0_12px_36px_rgba(88,133,250,0.2)]' : ''}
        ${className}
      `}
    >
      {children}
    </div>
  );
}
