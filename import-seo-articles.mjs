/**
 * Bulk import script for Pet Legacy Planning SEO articles
 * Imports all articles from both ZIP packs into the library_articles table
 * Run: node import-seo-articles.mjs
 */

import { readFileSync, readdirSync } from "fs";
import { join } from "path";
import mysql from "mysql2/promise";
import dotenv from "dotenv";

dotenv.config();

const DB_URL = process.env.DATABASE_URL;
if (!DB_URL) {
  console.error("❌ DATABASE_URL not set");
  process.exit(1);
}

// ─── Hub mapping ─────────────────────────────────────────────────────────────

// Pack 1: filename prefix → hub slug + display name
const PACK1_HUB_MAP = {
  "emergency-pet-care-plan":   { hub: "emergency-planning",    label: "Emergency Pet Care Planning" },
  "leaving-money-for-pets":    { hub: "pet-trusts",            label: "Pet Trusts & Financial Planning" },
  "pet-care-directive":        { hub: "planning-tools",        label: "Pet Care Directives & Tools" },
  "pet-estate-planning":       { hub: "estate-planning",       label: "Pet Estate Planning" },
  "pet-guardianship-clause":   { hub: "guardianship",          label: "Pet Guardianship" },
  "pet-inheritance-laws":      { hub: "legal-resources",       label: "Pet Inheritance Laws" },
  "pet-trust-cost":            { hub: "pet-trusts",            label: "Pet Trusts & Financial Planning" },
  "pet-trust-guide":           { hub: "pet-trusts",            label: "Pet Trusts & Financial Planning" },
  "protecting-pets-in-a-will": { hub: "estate-planning",       label: "Pet Estate Planning" },
  "who-takes-my-pet-if-i-die": { hub: "guardianship",          label: "Pet Guardianship" },
};

// Pack 2 Q&A: filename prefix → hub
const PACK2_QA_HUB_MAP = {
  "Can-a-pet-trust-cover-emergency-care":    { hub: "pet-trusts",       label: "Pet Trusts & Financial Planning" },
  "Can-a-pet-trust-pay-vet-bills":           { hub: "pet-trusts",       label: "Pet Trusts & Financial Planning" },
  "Can-a-will-leave-money-to-a-pet":         { hub: "estate-planning",  label: "Pet Estate Planning" },
  "Can-multiple-pets-be-included-in-a-pet-trust": { hub: "pet-trusts", label: "Pet Trusts & Financial Planning" },
  "Can-pets-inherit-money":                  { hub: "legal-resources",  label: "Pet Inheritance Laws" },
  "Do-pet-trusts-cover-food-and-grooming":   { hub: "pet-trusts",       label: "Pet Trusts & Financial Planning" },
  "Do-pet-trusts-expire":                    { hub: "pet-trusts",       label: "Pet Trusts & Financial Planning" },
  "How-do-I-protect-my-pet-if-I-die":        { hub: "guardianship",     label: "Pet Guardianship" },
  "What-happens-to-pets-in-probate":         { hub: "estate-planning",  label: "Pet Estate Planning" },
  "Who-enforces-a-pet-trust":                { hub: "pet-trusts",       label: "Pet Trusts & Financial Planning" },
};

// ─── Parse a markdown article file ──────────────────────────────────────────

function parseArticle(filepath) {
  const raw = readFileSync(filepath, "utf-8");
  const lines = raw.split("\n");

  let title = "";
  let metaTitle = "";
  let metaDesc = "";
  const bodyLines = [];
  let inBody = false;

  for (const line of lines) {
    if (!title && line.startsWith("# ")) {
      title = line.replace(/^# /, "").trim();
      inBody = true;
      continue;
    }
    if (line.startsWith("**SEO Title:**")) {
      metaTitle = line.replace("**SEO Title:**", "").trim();
      continue;
    }
    if (line.startsWith("**SEO Description:**")) {
      metaDesc = line.replace("**SEO Description:**", "").trim();
      continue;
    }
    if (inBody) {
      bodyLines.push(line);
    }
  }

  const content = bodyLines.join("\n").trim();
  // Excerpt: first non-empty paragraph after headings
  const excerpt = content
    .split("\n")
    .filter((l) => l.trim() && !l.startsWith("#") && !l.startsWith("**"))
    .slice(0, 2)
    .join(" ")
    .slice(0, 300);

  return {
    title: title || metaTitle || "Untitled",
    metaTitle: metaTitle || title,
    metaDesc,
    content: raw.trim(),
    excerpt,
  };
}

// ─── Slug generator ──────────────────────────────────────────────────────────

function toSlug(str) {
  return str
    .toLowerCase()
    .replace(/[^a-z0-9\s-]/g, "")
    .replace(/\s+/g, "-")
    .replace(/-+/g, "-")
    .replace(/^-|-$/g, "")
    .slice(0, 190);
}

// ─── Collect all articles ────────────────────────────────────────────────────

const articles = [];

// Pack 1: /home/ubuntu/seo-articles/
const PACK1_DIR = "/home/ubuntu/seo-articles";
const pack1Files = readdirSync(PACK1_DIR).filter((f) => f.endsWith(".md"));

for (const filename of pack1Files) {
  // Determine category prefix
  const prefix = Object.keys(PACK1_HUB_MAP).find((p) => filename.startsWith(p));
  if (!prefix) continue;

  const { hub } = PACK1_HUB_MAP[prefix];
  const filepath = join(PACK1_DIR, filename);
  const parsed = parseArticle(filepath);

  const slug = toSlug(filename.replace(".md", "").replace(/#/g, "").trim());

  articles.push({
    hub,
    slug,
    title: parsed.title,
    excerpt: parsed.excerpt,
    content: parsed.content,
    metaTitle: parsed.metaTitle,
    metaDesc: parsed.metaDesc,
    tags: JSON.stringify([hub, prefix]),
    published: true,
    featured: false,
  });
}

// Pack 2: /home/ubuntu/seo-expansion/
const PACK2_DIR = "/home/ubuntu/seo-expansion";
const pack2Files = readdirSync(PACK2_DIR).filter((f) => f.endsWith(".md") && f !== "internal-linking-guide.md");

for (const filename of pack2Files) {
  const filepath = join(PACK2_DIR, filename);
  const parsed = parseArticle(filepath);

  let hub, tags;

  if (filename.startsWith("pet-trust-laws-")) {
    // State law article
    const state = filename.replace("pet-trust-laws-", "").replace(".md", "");
    hub = "state-laws";
    tags = JSON.stringify(["state-laws", "pet-trust", state]);
  } else {
    // Q&A article
    const prefix = Object.keys(PACK2_QA_HUB_MAP).find((p) => filename.startsWith(p));
    if (!prefix) continue;
    hub = PACK2_QA_HUB_MAP[prefix].hub;
    tags = JSON.stringify([hub, prefix.toLowerCase().replace(/-/g, " ")]);
  }

  const slug = toSlug(filename.replace(".md", "").trim());

  articles.push({
    hub,
    slug,
    title: parsed.title,
    excerpt: parsed.excerpt,
    content: parsed.content,
    metaTitle: parsed.metaTitle,
    metaDesc: parsed.metaDesc,
    tags,
    published: true,
    featured: false,
  });
}

console.log(`📚 Total articles to import: ${articles.length}`);

// ─── Connect and insert ──────────────────────────────────────────────────────

// Parse DATABASE_URL: mysql://user:pass@host:port/db
function parseMysqlUrl(url) {
  const u = new URL(url);
  return {
    host: u.hostname,
    port: parseInt(u.port || "3306"),
    user: u.username,
    password: u.password,
    database: u.pathname.replace(/^\//, ""),
    ssl: { rejectUnauthorized: false },
  };
}

const conn = await mysql.createConnection(parseMysqlUrl(DB_URL));

let inserted = 0;
let skipped = 0;
let errors = 0;

// Process in batches of 50
const BATCH = 50;
for (let i = 0; i < articles.length; i += BATCH) {
  const batch = articles.slice(i, i + BATCH);

  for (const art of batch) {
    try {
      await conn.execute(
        `INSERT INTO library_articles (hub, slug, title, excerpt, content, tags, metaTitle, metaDesc, published, featured, createdAt, updatedAt)
         VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, NOW(), NOW())
         ON DUPLICATE KEY UPDATE
           title = VALUES(title),
           excerpt = VALUES(excerpt),
           content = VALUES(content),
           tags = VALUES(tags),
           metaTitle = VALUES(metaTitle),
           metaDesc = VALUES(metaDesc),
           updatedAt = NOW()`,
        [
          art.hub,
          art.slug,
          art.title,
          art.excerpt,
          art.content,
          art.tags,
          art.metaTitle,
          art.metaDesc,
          art.published ? 1 : 0,
          art.featured ? 1 : 0,
        ]
      );
      inserted++;
    } catch (err) {
      console.error(`  ❌ Error inserting "${art.slug}":`, err.message);
      errors++;
    }
  }

  process.stdout.write(`\r  Progress: ${Math.min(i + BATCH, articles.length)}/${articles.length} articles processed...`);
}

console.log(`\n\n✅ Import complete!`);
console.log(`   Inserted/updated: ${inserted}`);
console.log(`   Skipped: ${skipped}`);
console.log(`   Errors: ${errors}`);

// ─── Summary by hub ──────────────────────────────────────────────────────────
const [rows] = await conn.execute(
  `SELECT hub, COUNT(*) as count FROM library_articles WHERE published = 1 GROUP BY hub ORDER BY count DESC`
);
console.log("\n📊 Articles per hub:");
for (const row of rows) {
  console.log(`   ${row.hub}: ${row.count}`);
}

await conn.end();
