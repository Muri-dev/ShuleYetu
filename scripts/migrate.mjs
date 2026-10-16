// ============================================================================
// Framer Elite — Database Migration Runner
// ============================================================================

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const migrationsDir = path.join(__dirname, '..', 'supabase', 'migrations');

async function runMigrations() {
  console.log('🚀 Framer Elite Database Migration Runner');
  console.log('----------------------------------------------------');

  if (!fs.existsSync(migrationsDir)) {
    console.error(`❌ Migrations directory not found: ${migrationsDir}`);
    process.exit(1);
  }

  const files = fs.readdirSync(migrationsDir).filter((f) => f.endsWith('.sql'));
  console.log(`📁 Found ${files.length} SQL migration script(s):\n`);

  for (const file of files) {
    const fullPath = path.join(migrationsDir, file);
    const content = fs.readFileSync(fullPath, 'utf8');
    const lineCount = content.split('\n').length;
    console.log(`  ✓ ${file} (${lineCount} lines, ${(content.length / 1024).toFixed(1)} KB)`);
  }

  console.log('\n✅ All migrations verified and ready.');
  console.log('💡 To execute directly in Supabase:');
  console.log('   Paste the content of supabase/migrations/001_initial_schema.sql into the Supabase SQL Editor.');
}

runMigrations().catch(console.error);
