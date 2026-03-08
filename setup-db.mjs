/**
 * setup-db.mjs
 * Run: node setup-db.mjs
 *
 * What this does automatically:
 *   1. Reads .env.local for Supabase credentials
 *   2. Creates the "public-media" storage bucket (public, no size limit)
 *   3. Prints the SQL to paste in Supabase Dashboard > SQL Editor
 */

import { readFileSync } from "fs";
import { resolve, dirname } from "path";
import { fileURLToPath } from "url";
import { createClient } from "@supabase/supabase-js";

// ── Load .env.local ─────────────────────────────────────────────────────────
const __dir = dirname(fileURLToPath(import.meta.url));
const envPath = resolve(__dir, ".env.local");

let envContent;
try {
  envContent = readFileSync(envPath, "utf-8");
} catch {
  console.error("❌  .env.local not found. Run this script from the project root.");
  process.exit(1);
}

function parseEnv(content) {
  const map = {};
  for (const line of content.split(/\r?\n/)) {
    const trimmed = line.trim();
    if (!trimmed || trimmed.startsWith("#")) continue;
    const eq = trimmed.indexOf("=");
    if (eq === -1) continue;
    map[trimmed.slice(0, eq).trim()] = trimmed.slice(eq + 1).trim();
  }
  return map;
}

const env = parseEnv(envContent);
const SUPABASE_URL = env["NEXT_PUBLIC_SUPABASE_URL"];
const SERVICE_ROLE_KEY = env["SUPABASE_SERVICE_ROLE_KEY"];

if (!SUPABASE_URL || !SERVICE_ROLE_KEY) {
  console.error("❌  NEXT_PUBLIC_SUPABASE_URL or SUPABASE_SERVICE_ROLE_KEY missing in .env.local");
  process.exit(1);
}

console.log(`\n🚀  Connecting to Supabase project: ${SUPABASE_URL}\n`);

const supabase = createClient(SUPABASE_URL, SERVICE_ROLE_KEY, {
  auth: { persistSession: false },
});

// ── Step 1: Create storage bucket ───────────────────────────────────────────
async function createStorageBucket() {
  const BUCKET = "public-media";

  // Check if it already exists
  const { data: buckets, error: listErr } = await supabase.storage.listBuckets();
  if (listErr) {
    console.warn("⚠️  Could not list buckets:", listErr.message);
  }

  const exists = (buckets ?? []).some((b) => b.name === BUCKET);

  if (exists) {
    console.log(`✅  Storage bucket "${BUCKET}" already exists — skipping.`);
    return;
  }

  const { error } = await supabase.storage.createBucket(BUCKET, {
    public: true,
    allowedMimeTypes: ["image/jpeg", "image/png", "image/webp", "image/gif", "image/svg+xml"],
    fileSizeLimit: 10485760, // 10 MB
  });

  if (error) {
    console.error(`❌  Failed to create bucket "${BUCKET}":`, error.message);
  } else {
    console.log(`✅  Storage bucket "${BUCKET}" created (public, 10 MB limit).`);
  }
}

// ── Step 2: Check if posts table exists ─────────────────────────────────────
async function checkPostsTable() {
  const { error } = await supabase.from("posts").select("id").limit(1);
  if (!error) {
    console.log('✅  Table "posts" already exists.\n');
    return true;
  }
  if (error.code === "42P01") {
    // Table does not exist
    return false;
  }
  // Other error (auth, network, etc.)
  console.warn("⚠️  Could not verify posts table:", error.message);
  return false; // assume it doesn't exist and show SQL
}

// ── Step 3: Print SQL instructions ──────────────────────────────────────────
function printSqlInstructions() {
  const sqlPath = resolve(__dir, "supabase/setup.sql");
  let sql;
  try {
    sql = readFileSync(sqlPath, "utf-8");
  } catch {
    sql = "(could not read supabase/setup.sql)";
  }

  console.log("─".repeat(60));
  console.log('⚠️   The "posts" table does NOT exist yet.');
  console.log("    Supabase JS cannot execute DDL directly.");
  console.log("");
  console.log("📋  ACTION REQUIRED — paste this SQL into:");
  console.log("    Supabase Dashboard → SQL Editor → New query");
  console.log("─".repeat(60));
  console.log("\n" + sql + "\n");
  console.log("─".repeat(60));
  console.log('    After running the SQL, the "posts" table will be ready.');
  console.log("─".repeat(60) + "\n");
}

// ── Main ────────────────────────────────────────────────────────────────────
(async () => {
  await createStorageBucket();

  const tableExists = await checkPostsTable();
  if (!tableExists) {
    printSqlInstructions();
  } else {
    console.log("🎉  Database is fully set up and ready for production!\n");
  }
})();
