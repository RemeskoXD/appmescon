import fs from 'fs';
import { remark } from 'remark';
import html from 'remark-html';

const file = fs.readFileSync('OBCHODNI_PODMINKY_ZAKLAD.txt','utf8');
const lines = file.split(/\r?\n/);
const startIndex = lines.findIndex(l => l.includes('2. DEFINICE POJMŮ'));
if (startIndex === -1) {
  console.error('start not found');
  process.exit(1);
}
const slice = lines.slice(startIndex);
const EXPECTED_SECTIONS = [
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
  '12. BEZPEČNOST DAT'
];

function stripMarkdownEmphasis(text){return text.replace(/\*\*/g,'').replace(/\*/g,'').trim();}
function slugify(text){return text.toLowerCase().replace(/[^a-z0-9]+/g,'-').replace(/^-|-$/g,'');}
function isLikelyTocLink(line){const t=line.trim(); return /^\[[^\]]+\]\(https?:\/\//.test(t);} 
function normalizeLine(line){return stripMarkdownEmphasis(line).replace(/^#+\s*/, '').trim();}
function isSubSectionMarker(line){
  const trimmed=line.trim();
  if (/^##\s+/.test(trimmed)) return true;
  if (/^\d+\.\d+$/.test(trimmed)) return true;
  if (/^\d+\.\d+\s*[–-]\s+/.test(trimmed)) return true;
  if (/^\d+\.\s+/.test(trimmed)) return true; // "1. Úvodní ustanovení" subheading
  return false;
}
function normalizeSubSectionTitle(line){
  const trimmed=line.trim();
  if (trimmed.startsWith('##')) {
    return stripMarkdownEmphasis(trimmed.replace(/^##\s+/, ''));
  }
  const dashMatch = trimmed.match(/^(\d+\.\d+)\s*[–-]\s*(.*)$/);
  if (dashMatch){
    const num=dashMatch[1];
    const title=stripMarkdownEmphasis(dashMatch[2]);
    return title ? `${num} ${title}` : num;
  }
  return stripMarkdownEmphasis(trimmed);
}

function shouldSkipLine(line) {
  const trimmed = line.trim();
  if (!trimmed) return false;
  if (trimmed === '---') return true;
  if (trimmed.startsWith('# ')) return true; // drop repeated H1 lines inside sections
  return false;
}

const sections=[];
let currentSectionIndex=0;
let activeSectionTitle=null;
let activeSectionBody=[];

async function processSection(title, bodyLines){
  const sectionId = slugify(title);
  const introLines=[];
  const subSections=[];
  const usedSubIds=new Map();
  let activeSubTitle=null;
  let activeSubBody=[];
  const flushSub = async () => {
    if (!activeSubTitle) return;
    const cleanTitle = normalizeSubSectionTitle(activeSubTitle);
    const numberMatch = cleanTitle.match(/^(\d+(?:\.\d+)*)/);
    const subIdKey = numberMatch ? numberMatch[1].replace(/\./g,'-') : slugify(cleanTitle) || 'sekce';
    const subIdBase = `sub-${sectionId}-${subIdKey}`;
    const seenSubCount = usedSubIds.get(subIdBase) ?? 0;
    usedSubIds.set(subIdBase, seenSubCount + 1);
    const id = seenSubCount === 0 ? subIdBase : `${subIdBase}-${seenSubCount + 1}`;
    const subContentHtml = (await remark().use(html).process(activeSubBody.join('\n'))).toString();
    subSections.push({ id, title: cleanTitle || (numberMatch ? numberMatch[1] : 'Sekce'), contentHtml: subContentHtml });
  };
  for (const line of bodyLines){
    if (shouldSkipLine(line)) continue;
    if (!activeSubTitle){
      if (isSubSectionMarker(line)){ activeSubTitle=line; activeSubBody=[]; } else { introLines.push(line); }
    } else {
      if (isSubSectionMarker(line)){
        await flushSub();
        activeSubTitle=line;
        activeSubBody=[];
      } else {
        activeSubBody.push(line);
      }
    }
  }
  await flushSub();
  const introHtml = (await remark().use(html).process(introLines.join('\n'))).toString();
  sections.push({ id: sectionId, title, contentHtml: introHtml, subSections });
}

async function flushActive(){
  if (activeSectionTitle) await processSection(activeSectionTitle, activeSectionBody);
  activeSectionTitle=null;
  activeSectionBody=[];
}

for (let i=0;i<slice.length;i++){
  const line = slice[i];
  if (isLikelyTocLink(line)) continue;
  const normalized = normalizeLine(line);
  if (currentSectionIndex < EXPECTED_SECTIONS.length){
    const expectedTitle = EXPECTED_SECTIONS[currentSectionIndex];
    if (normalized.toUpperCase().includes(expectedTitle.toUpperCase())){
      await flushActive();
      activeSectionTitle = expectedTitle;
      activeSectionBody=[];
      currentSectionIndex++;
      continue;
    }
  }
  if (activeSectionTitle === '10. REKLAMACE A SERVIS' && currentSectionIndex === 9){
    if (normalizeSubSectionTitle(line).includes('1. Úvodní ustanovení')){
      await flushActive();
      activeSectionTitle = EXPECTED_SECTIONS[9];
      activeSectionBody=[line];
      currentSectionIndex++;
      continue;
    }
  }
  if (activeSectionTitle === '12. BEZPEČNOST DAT'){
    if (normalizeSubSectionTitle(line).includes('1. Úvodní ustanovení')) break;
    if (normalized.includes('GDPR')) break;
  }
  if (activeSectionTitle){ activeSectionBody.push(line); }
}

await flushActive();

fs.writeFileSync('tmp_sections.json', JSON.stringify(sections, null, 2));
console.log('sections', sections.length);
