import { ReactNode } from 'react';
import Link from 'next/link';

interface ButtonProps {
  children: ReactNode;
  href?: string;
  onClick?: () => void;
  variant?: 'primary' | 'secondary' | 'outline';
  size?: 'sm' | 'md' | 'lg';
  className?: string;
  disabled?: boolean;
  type?: 'button' | 'submit' | 'reset';
}

export default function Button({ 
  children, 
  href, 
  onClick, 
  variant = 'primary',
  size = 'md',
  className = '',
  disabled = false,
  type
}: ButtonProps) {
  const baseClasses = `
    relative inline-flex items-center justify-center font-semibold transition-all duration-200 
    focus:ring-2 focus:ring-offset-2 focus:ring-offset-[#020617] disabled:opacity-50 disabled:cursor-not-allowed
  `;
  
  const variants = {
    primary: 'bg-[#5885fa] text-white shadow-[0_10px_24px_rgba(88,133,250,0.28)] hover:bg-[#8aaafc] hover:-translate-y-0.5 focus:ring-[#8aaafc] border-2 border-transparent',
    secondary: 'bg-transparent border border-slate-700 text-slate-200 hover:border-[#5885fa] hover:text-white hover:bg-[#5885fa]/10 focus:ring-[#5885fa]',
    outline: 'border-2 border-[#5885fa] text-[#eef3fe] hover:bg-[#5885fa]/12 hover:text-white focus:ring-[#5885fa]'
  };
  
  const sizes = {
    sm: 'px-4 py-2 text-sm rounded-md',
    md: 'px-6 py-3 text-sm rounded-lg',
    lg: 'px-8 py-4 text-base rounded-xl'
  };
  
  const classes = `${baseClasses} ${variants[variant]} ${sizes[size]} ${className}`;
  
  if (href) {
    return (
      <Link href={href as any} className={classes}>
        <span className="relative z-10">{children}</span>
      </Link>
    );
  }
  
  return (
    <button 
      onClick={onClick} 
      className={classes}
      disabled={disabled}
      type={type}
    >
      <span className="relative z-10">{children}</span>
    </button>
  );
}
