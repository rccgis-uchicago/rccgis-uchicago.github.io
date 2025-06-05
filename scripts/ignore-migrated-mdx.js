import { renameSync, existsSync } from 'fs';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// List of MDX files that have been migrated to content collections
const migratedFiles = [
  'resources/software.mdx',
  // Add other migrated files here as we confirm them
];

const pagesDir = join(__dirname, '../src/pages');

migratedFiles.forEach(filePath => {
  const oldPath = join(pagesDir, filePath);
  const dir = dirname(oldPath);
  const filename = filePath.split('/').pop();
  const newPath = join(dir, `_${filename}`);

  if (existsSync(oldPath)) {
    renameSync(oldPath, newPath);
    console.log(`Renamed: ${filePath} -> _${filename}`);
  } else {
    console.log(`Skipped: ${filePath} (not found)`);
  }
});

console.log('\nDone! Please verify the changes and commit them.');
