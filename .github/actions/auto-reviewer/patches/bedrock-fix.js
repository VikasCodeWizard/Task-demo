// Apply this patch after building or modify the source before building
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const distFile = path.join(__dirname, '../dist/index.js');
let content = fs.readFileSync(distFile, 'utf8');

// Fix the API version for Bedrock
content = content.replace(
  "anthropic_version: '2023-06-01'",
  "anthropic_version: 'bedrock-2023-05-31'"
);

fs.writeFileSync(distFile, content);
console.log('Patched Bedrock API version');
