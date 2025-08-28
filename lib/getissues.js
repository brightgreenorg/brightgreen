// lib/getIssues.js
import fs from "fs";
import path from "path";
import matter from "gray-matter";

const CONTENT_DIR = path.join(process.cwd(), "content", "issues");

function toTitle(slug) {
  return slug
    .replace(/\.(md|mdx)$/i, "")
    .replace(/[-_]/g, " ")
    .replace(/\b\w/g, (m) => m.toUpperCase());
}

function excerptFrom(content, limit = 160) {
  const text = content
    .replace(/```[\s\S]*?```/g, "")           // code fences
    .replace(/`([^`]+)`/g, "$1")              // inline code
    .replace(/!\[[^\]]*\]\([^)]+\)/g, "")     // images
    .replace(/\[[^\]]*\]\(([^)]+)\)/g, "$1")  // links -> text
    .replace(/^#+\s*(.*)$/gm, "$1")           // headings
    .replace(/\s+/g, " ")
    .trim();
  return text.length > limit ? text.slice(0, limit).trimEnd() + "…" : text;
}

function parseDate(input) {
  if (!input) return null;
  if (input instanceof Date) return isNaN(input) ? null : input;
  const d = new Date(String(input));
  return isNaN(d) ? null : d;
}

/**
 * Read /content/issues/*.md(x) and return items sorted by frontmatter `date`
 * (newest first). If `date` is missing/invalid, falls back to file mtime.
 * Frontmatter supported: title, summary|excerpt, slug, date, published (bool)
 */
export async function getIssues({ limit = 3 } = {}) {
  let filenames = [];
  try {
    filenames = (await fs.promises.readdir(CONTENT_DIR)).filter((f) =>
      /\.(md|mdx)$/i.test(f)
    );
  } catch {
    return [];
  }

  const items = await Promise.all(
    filenames.map(async (filename) => {
      const filePath = path.join(CONTENT_DIR, filename);
      const raw = await fs.promises.readFile(filePath, "utf8");
      const stat = await fs.promises.stat(filePath);
      const { data, content } = matter(raw);

      const base = filename.replace(/\.(md|mdx)$/i, "");
      const slug = (data.slug || base).toLowerCase();
      const title = data.title || toTitle(base);
      const summary = data.summary || data.excerpt || excerptFrom(content);
      const published = data.published !== false;

      const fmDate = parseDate(data.date);
      const date = fmDate || stat.mtime;

      return { slug, title, summary, published, date };
    })
  );

  const published = items.filter((i) => i.published);
  published.sort((a, b) => b.date - a.date); // newest first
  return typeof limit === "number" ? published.slice(0, limit) : published;
}
