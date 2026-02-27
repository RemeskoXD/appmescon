import LegalDoc from '@/components/legal/LegalDoc';
import { loadLegalText } from '@/lib/loadLegalText';

export const dynamic = 'force-static';

export default async function ObchodniPodminkyPage() {
  const text = await loadLegalText('obchodni_podminky.txt');
  return <LegalDoc text={text} docId={1} />;
}
