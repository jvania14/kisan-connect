import { existsSync, mkdirSync, cpSync } from 'fs';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';

const __dirname = dirname(fileURLToPath(import.meta.url));
const src = join(__dirname, '..', 'node_modules', 'tslib');
const destDir = join(__dirname, '..', '.vercel', 'output', 'functions', '__server.func', 'node_modules');
const dest = join(destDir, 'tslib');

if (!existsSync(src)) {
  console.error('tslib not found in node_modules — run npm install first');
  process.exit(1);
}

mkdirSync(destDir, { recursive: true });
cpSync(src, dest, { recursive: true });
console.log('Copied tslib into deployed function bundle at', dest);