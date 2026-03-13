/**
 * Bulk import script for Pet Legacy Planning Master Pack
 * Imports 600 articles: dog-breed-guide (300), pet-behavior-guide (200), pet-emergency-guide (100)
 * Run: node import-master-pack.mjs
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

// ─── Hub mapping for master pack ─────────────────────────────────────────────

const MASTER_HUB_MAP = {
  "dog-breed-guide":      { hub: "breeds",           tags: ["breeds", "dogs", "dog-breed-guide"] },
  "pet-behavior-guide":   { hub: "behavior",         tags: ["behavior", "training", "pet-behavior"] },
  "pet-emergency-guide":  { hub: "emergency-planning", tags: ["emergency", "emergency-planning", "pet-emergency"] },
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
    // Handle both **SEO Title:** and plain "SEO Title:" formats
    if (line.match(/^\*?\*?SEO Title:\*?\*?/)) {
      metaTitle = line.replace(/^\*?\*?SEO Title:\*?\*?\s*/, "").trim();
      continue;
    }
    if (line.match(/^\*?\*?SEO Description:\*?\*?/)) {
      metaDesc = line.replace(/^\*?\*?SEO Description:\*?\*?\s*/, "").trim();
      continue;
    }
    if (inBody) {
      bodyLines.push(line);
    }
  }

  const content = bodyLines.join("\n").trim();
  const excerpt = content
    .split("\n")
    .filter((l) => l.trim() && !l.startsWith("#") && !l.startsWith("**") && !l.startsWith("SEO"))
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
const MASTER_DIR = "/home/ubuntu/seo-master";
const masterFiles = readdirSync(MASTER_DIR).filter((f) => f.endsWith(".md"));

for (const filename of masterFiles) {
  const prefix = Object.keys(MASTER_HUB_MAP).find((p) => filename.startsWith(p));
  if (!prefix) continue;

  const { hub, tags } = MASTER_HUB_MAP[prefix];
  const filepath = join(MASTER_DIR, filename);
  const parsed = parseArticle(filepath);
  const slug = "master-" + toSlug(filename.replace(".md", "").trim());

  articles.push({
    hub,
    slug,
    title: parsed.title,
    excerpt: parsed.excerpt,
    content: parsed.content,
    metaTitle: parsed.metaTitle,
    metaDesc: parsed.metaDesc,
    tags: JSON.stringify(tags),
    published: true,
    featured: false,
  });
}

console.log(`📚 Master pack articles to import: ${articles.length}`);

// ─── Connect and insert ──────────────────────────────────────────────────────

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
let errors = 0;

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
          1,
          0,
        ]
      );
      inserted++;
    } catch (err) {
      console.error(`  ❌ Error inserting "${art.slug}":`, err.message);
      errors++;
    }
  }

  process.stdout.write(`\r  Progress: ${Math.min(i + BATCH, articles.length)}/${articles.length} processed...`);
}

console.log(`\n\n✅ Master pack import complete!`);
console.log(`   Inserted/updated: ${inserted}`);
console.log(`   Errors: ${errors}`);

// ─── Grand total summary ─────────────────────────────────────────────────────
const [rows] = await conn.execute(
  `SELECT hub, COUNT(*) as count FROM library_articles WHERE published = 1 GROUP BY hub ORDER BY count DESC`
);
console.log("\n📊 ALL articles per hub (grand total):");
let total = 0;
for (const row of rows) {
  console.log(`   ${row.hub}: ${row.count}`);
  total += Number(row.count);
}
console.log(`\n   🏆 GRAND TOTAL: ${total} articles`);

await conn.end();
