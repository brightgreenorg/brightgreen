// lib/mdx.js (ESM)
// Minimal, future-proof Markdown utilities for /content/**
// Exports required by the app: listIssuesMeta, getIssueBySlug, listIssueSlugs

import fs from "node:fs/promises";
import path from "node:path";
import matter from "gray-matter";
import { unified } from "unified";
import remarkParse from "remark-parse";
import remarkGfm from "remark-gfm";
import remarkRehype from "remark-rehype";
import rehypeStringify from "rehype-stringify";

const ROOT = process.cwd();
export const CONTENT_DIR = path.join(ROOT, "content");
export const ISSUES_DIR = path.join(CONTENT_DIR, "issues");
export const PAGES_DIR = path.join(CONTENT_DIR, "pages");

/** Titleize a slug like "clean-energy" -> "Clean Energy" */
function titleFromSlug(slug) {
  return slug
    .replace(/[/\\]+/g, "") // strip any sneaky path chars
    .replace(/\.mdx?$/i, "") // drop extension if present
    .replace(/[-_]+/g, " ")
    .trim()
    .replace(/\b\w/g, (m) => m.toUpperCase());
}

/** Try to derive a short summary from the first meaningful paragraph */
function deriveSummary(markdown) {
  if (!markdown) return "";
  const lines = markdown
    .split(/\r?\n/)
    // ignore headings, fences, lists, blank lines
    .filter((l) => l.trim() && !/^(\s{0,3}#|\s{0,3}```|\s{0,3}[-*+] |\s{0,3}\d+\. )/.test(l));
  const first = lines[0]?.trim() || "";
  // strip inline markdown emphasis/links for a cleaner summary
  return first
    .replace(/\[(.*?)\]\((.*?)\)/g, "$1")
    .replace(/[*_`~]/g, "")
    .slice(0, 280)
    .trim();
}

/** Render Markdown to HTML (simple, safe pipeline) */
export async function renderMarkdownToHtml(markdown) {
  const file = await unified()
    .use(remarkParse)
    .use(remarkGfm)
    .use(remarkRehype, { allowDangerousHtml: false })
    .use(rehypeStringify, { allowDangerousHtml: false })
    .process(markdown || "");
  return String(file);
}

/** List all issue slugs (without .md) e.g., ["clean-energy", ...] */
export async function listIssueSlugs() {
  // Ensure the directory exists; return [] if missing
  let entries = [];
  try {
    entries = await fs.readdir(ISSUES_DIR, { withFileTypes: true });
  } catch {
    return [];
  }

  return entries
    .filter((e) => e.isFile() && /\.mdx?$/i.test(e.name))
    .map((e) => e.name.replace(/\.mdx?$/i, ""))
    .sort();
}

/**
 * Get a single issue by slug:
 *  - Reads frontmatter
 *  - Renders Markdown content to HTML
 *  - Returns { meta, Content } where Content is a lightweight React component
 */
export async function getIssueBySlug(slug) {
  const safe = String(slug).replace(/[/\\]+/g, "").replace(/\.mdx?$/i, "");
  const fullPath = path.join(ISSUES_DIR, `${safe}.md`);
  const raw = await fs.readFile(fullPath, "utf8");
  const { data, content } = matter(raw);

  // Normalize fields
  const title = data.title || titleFromSlug(safe);
  const summary = data.summary || data.description || deriveSummary(content);
  // Normalize date to YYYY-MM-DD if possible (kept simple)
  const date = data.date ? new Date(data.date).toISOString().slice(0, 10) : null;

  // Render string HTML and wrap it in a tiny component for RSC usage
  const html = await renderMarkdownToHtml(content || "");
  const Content = function Content() {
    // eslint-disable-next-line react/no-danger
    return <div className="prose" dangerouslySetInnerHTML={{ __html: html }} />;
  };

  return {
    meta: { slug: safe, title, summary, date },
    Content,
  };
}

/**
 * Lightweight list for the issues index:
 * Returns [{ slug, title, summary, date }]
 */
export async function listIssuesMeta() {
  const slugs = await listIssueSlugs();
  const items = await Promise.all(
    slugs.map(async (s) => {
      const fullPath = path.join(ISSUES_DIR, `${s}.md`);
      const raw = await fs.readFile(fullPath, "utf8");
      const { data, content } = matter(raw);
      const title = data.title || titleFromSlug(s);
      const summary = data.summary || data.description || deriveSummary(content);
      const date = data.date ? new Date(data.date).toISOString().slice(0, 10) : null;

      return { slug: s, title, summary, date };
    })
  );

  // Sort newest first when dates exist
  items.sort((a, b) => {
    if (!a.date && !b.date) return a.title.localeCompare(b.title);
    if (!a.date) return 1;
    if (!b.date) return -1;
    return new Date(b.date) - new Date(a.date);
  });

  return items;
}
