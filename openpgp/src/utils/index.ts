import { appendFileSync, readFileSync, writeFileSync } from 'node:fs';
import path from 'node:path';

export function saveOutput(content: string, filename = 'output.txt', overwrite = true) {
  if (!content) return;
  const fileOutputPath = path.resolve(__dirname, path.join('./output', filename));
  overwrite ? writeFileSync(fileOutputPath, content) : appendFileSync(fileOutputPath, content);
}

export function readTxt(filename: string): string {
  const file = readFileSync(filename, 'utf8');
  return file;
}
