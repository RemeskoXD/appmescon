import { readFile } from 'node:fs/promises';
import path from 'node:path';

const LEGAL_ROOTS = [
  path.join(process.cwd(), 'content', 'legal'),
  process.cwd(),
];

export async function loadLegalText(
  filename: 'obchodni_podminky.txt' | 'GDPR.txt'
) {
  let lastError: unknown;
  for (const root of LEGAL_ROOTS) {
    try {
      const filePath = path.join(root, filename);
      return await readFile(filePath, 'utf8');
    } catch (error) {
      lastError = error;
    }
  }

  throw lastError instanceof Error
    ? lastError
    : new Error(`Unable to read legal file: ${filename}`);
}
