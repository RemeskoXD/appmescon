import LegalDocClient from './LegalDocClient';
import { parseLegalText } from '@/lib/legalParser';

type LegalDocProps = {
  text: string;
  docId: number | string;
  title?: string;
};

export default function LegalDoc({ text, docId, title }: LegalDocProps) {
  const allowedMainHeadings =
    docId === 1
      ? [
          '1. ÚVODNÍ USTANOVENÍ',
          '2. DEFINICE POJMŮ',
          '3. SLUŽBY – OBECNÁ USTANOVENÍ',
          '4. UZAVŘENÍ SMLOUVY',
          '5. PLATEBNÍ PODMÍNKY',
          '6. SANKCE A SMLUVNÍ POKUTY',
          '7. SLA A TECHNICKÉ ZÁRUKY',
          '8. SPOLUPRÁCE',
          '9. LICENCE A AUTORSKÁ PRÁVA',
          '10. REKLAMACE A SERVIS',
          '11. UKONČENÍ SMLOUVY',
          '12. BEZPEČNOST DAT',
          '13. GDPR – Zpracování osobních údajů',
        ]
      : undefined;

  const parsed = parseLegalText(text, { docId, allowedMainHeadings });
  const doc = { ...parsed, title: parsed.title || title || '' };

  return <LegalDocClient doc={doc} />;
}
