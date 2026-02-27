import type { ReactNode } from 'react';

type LegalPlaceholderProps = {
  title: string;
  children?: ReactNode;
};

export default function LegalPlaceholder({ title, children }: LegalPlaceholderProps) {
  return (
    <div className="page-container py-16 lg:py-24">
      <div className="mx-auto max-w-3xl text-center">
        <h1 className="text-4xl lg:text-5xl font-bold text-white tracking-tight">{title}</h1>
        <div className="mt-6 text-lg text-slate-400 leading-relaxed">
          {children ?? 'Obsah bude doplněn.'}
        </div>
        <div className="mt-10 text-sm text-slate-500">
          V případě dotazů nám napište na{' '}
          <a
            href="mailto:info@mescon.cz"
            className="text-accent-400 hover:text-accent-300 transition-colors"
          >
            info@mescon.cz
          </a>
          .
        </div>
      </div>
    </div>
  );
}

