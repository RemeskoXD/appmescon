import LegalDoc from '@/components/legal/LegalDoc';
import { loadLegalText } from '@/lib/loadLegalText';

export const dynamic = 'force-static';

export default async function GdprPage() {
  const text = await loadLegalText('GDPR.txt');
  return <LegalDoc text={text} docId={2} />;
}
