/**
 * Import 200 long-tail articles from pet-legacy-all-in-one.json
 * into the library_articles table.
 */

import { readFileSync } from "fs";
import mysql from "mysql2/promise";
import * as dotenv from "dotenv";
import { fileURLToPath } from "url";
import { dirname, join } from "path";

const __dirname = dirname(fileURLToPath(import.meta.url));
dotenv.config({ path: join(__dirname, ".env") });

const db = await mysql.createConnection(process.env.DATABASE_URL);

const raw = JSON.parse(readFileSync("/home/ubuntu/seo-allinone/pet-legacy-all-in-one.json", "utf8"));
const articles = raw.long_tail_articles;

console.log(`Found ${articles.length} long-tail articles to import...`);

// Map slug prefixes to hub names
function slugToHub(slug) {
  if (slug.startsWith("who-will-take-care")) return "long-tail-guardianship";
  if (slug.startsWith("how-to-plan-for")) return "long-tail-planning";
  if (slug.startsWith("pet-emergency-plan-for")) return "long-tail-emergency";
  if (slug.startsWith("how-to-legally-protect")) return "long-tail-legal";
  if (slug.startsWith("how-to-choose-a")) return "long-tail-guardianship";
  if (slug.startsWith("how-to-leave-money")) return "long-tail-estate";
  if (slug.startsWith("pet-care-instructions-for")) return "long-tail-care";
  if (slug.startsWith("pet-trust-vs-pet")) return "long-tail-trusts";
  if (slug.startsWith("how-to-make-a")) return "long-tail-planning";
  if (slug.startsWith("what-happens-to-my")) return "long-tail-estate";
  return "long-tail-planning";
}

// Map hub to category label
function hubToCategory(hub) {
  const map = {
    "long-tail-guardianship": "Pet Guardianship",
    "long-tail-planning": "Pet Estate Planning",
    "long-tail-emergency": "Pet Emergency Guides",
    "long-tail-legal": "Pet Law By State",
    "long-tail-estate": "Pet Estate Planning",
    "long-tail-care": "Pet Care Guides",
    "long-tail-trusts": "Pet Estate Planning",
  };
  return map[hub] || "Pet Estate Planning";
}

let imported = 0;
let skipped = 0;

for (const article of articles) {
  const hub = slugToHub(article.slug);
  const category = hubToCategory(hub);
  const now = Date.now();

  // Build richer content from the template structure
  const content = `# ${article.title}

${article.content}

## Why This Matters

Planning ahead for your pet's care is one of the most loving things you can do as a pet owner. Whether you're thinking about guardianship, emergency planning, or legal protection, taking action today ensures your pet will always be cared for — no matter what life brings.

## Key Steps to Take

- Document your pet's care needs, feeding schedule, and medical history
- Designate a trusted guardian who has agreed to care for your pet
- Create an emergency care card and keep it in your wallet
- Consider a pet trust to legally protect funds set aside for your pet's care
- Review and update your plan whenever your circumstances change

## Get Started Today

Pet Legacy Planning makes it simple to protect the pets you love. Explore our planning tools, browse our library of resources, or speak with Chase — our guide — to find the right plan for your family.`;

  try {
    await db.execute(
      `INSERT INTO library_articles 
        (slug, title, metaTitle, metaDesc, excerpt, content, hub, featured, published, createdAt, updatedAt)
       VALUES (?, ?, ?, ?, ?, ?, ?, 0, 1, ?, ?)
       ON DUPLICATE KEY UPDATE updatedAt = ?`,
      [
        article.slug,
        article.title,
        article.seo_title || article.title,
        article.seo_description || `Learn about ${article.title} and how to protect your pet's future.`,
        article.seo_description || `Learn about ${article.title} and how to protect your pet's future.`,
        content,
        hub,
        now,
        now,
        now,
      ]
    );
    imported++;
    if (imported % 25 === 0) console.log(`  Imported ${imported}/${articles.length}...`);
  } catch (err) {
    console.error(`  Skipped "${article.slug}": ${err.message}`);
    skipped++;
  }
}

await db.end();
console.log(`\nDone! Imported: ${imported}, Skipped: ${skipped}`);
