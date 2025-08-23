// lib/mdx.js (ESM)
// Minimal, future-proof Markdown-to-HTML utilities for content in /content/**

import fs from 'node:fs/promises';
import path from 'node:path';
import matter from 'gray-matter';
import { unified } from 'unified';
import remarkParse from 'remark-parse';
import remarkGfm from 'remark-gfm';
import remarkRehype from 'remark-rehype';
import rehypeStringify from 'rehype-stringify';

const ROOT = process.cwd();
export const CONTENT_DIR = path.join(ROOT, 'content');
export const ISSUES_DIR = path.join(CONTENT_DIR, 'issues');
export const PAGES_DIR = path.join(CONTENT_DIR, 'pages');

/** Titleize a slug like "clean-energy" -> "Clean Energy" */
function titleFromSlug(slug) {
  return slug
    .replace(/[-_]+/g, ' ')
    .replace(/\s+/g, ' ')
    .trim()
    .replace(/\b\w/g, (m) => m.toUpperCase());
}

/** Render raw markdown -> HTML string (no MDX runtime required) */
export async function renderMarkdownToHtml(markdown) {
  const file = await unified()
    .use(remarkParse)
    .use(remarkGfm)
    .use(remarkRehype)
    .use(rehypeStringify)
    .process(markdown);
  return String(file);
}

/** Read a .md file and return { frontmatter, html, slug } with SAFE defaults */
export async function readMarkdownFile(absPath) {
  const raw = await fs.readFile(absPath, 'utf8');
  const { content, data } = matter(raw);
  const html = await renderMarkdownToHtml(content);
  // derive slug from filename without extension
  const slug = path.basename(absPath).replace(/\.md$/i, '');
  // SAFE frontmatter (prevents undefined.title errors in pages)
  const frontmatter = {
    title: data?.title ?? titleFromSlug(slug),
    description: data?.description ?? '',
    date: data?.date ?? null,
    ...data, // keep any additional keys you may have
  };
  return { frontmatter, html, slug };
}

/** List all .md files in a directory, sorted by date desc if present */
export async function listMarkdown(dirAbs) {
  const entries = await fs.readdir(dirAbs, { withFileTypes: true });
  const files = entries.filter((e) => e.isFile() && e.name.endsWith('.md'));
  const items = await Promise.all(
    files.map((f) => readMarkdownFile(path.join(dirAbs, f.name)))
  );

  // Sort by frontmatter.date (desc) if provided, otherwise by slug asc
  items.sort((a, b) => {
    const ad = a.frontmatter?.date ? new Date(a.frontmatter.date).getTime() : 0;
    const bd = b.frontmatter?.date ? new Date(b.frontmatter.date).getTime() : 0;
    if (ad !== 0 || bd !== 0) return bd - ad;
    return a.slug.localeCompare(b.slug);
  });
  return items;
}

/** Convenience: list all issue slugs (used by sitemap, routes, etc.) */
export async function getAllIssueSlugs() {
  try {
    const entries = await fs.readdir(ISSUES_DIR, { withFileTypes: true });
    return entries
      .filter((e) => e.isFile() && e.name.endsWith('.md'))
      .map((e) => e.name.replace(/\.md$/i, ''));
  } catch {
    return [];
  }
}

/** Get a single issue by slug from /content/issues/<slug>.md */
export async function getIssueBySlug(slug) {
  const abs = path.join(ISSUES_DIR, `${slug}.md`);
  return readMarkdownFile(abs);
}

/** List all issues (frontmatter + html) */
export async function getAllIssues() {
  return listMarkdown(ISSUES_DIR);
}

/** Example: list arbitrary pages under /content/pages */
export async function getAllPages() {
  return listMarkdown(PAGES_DIR);
}

/* ------------------------------------------------------------------ */
/* Compatibility exports (to match existing imports in app code)      */
/* ------------------------------------------------------------------ */

/** Legacy alias: listIssueSlugs() -> returns ['clean-energy', 'fair-elections', ...] */
export async function listIssueSlugs() {
  return getAllIssueSlugs();
}

/** Legacy helper: getIssueMeta() -> light metadata list for index/sitemap */
export async function getIssueMeta() {
  const items = await getAllIssues();
  return items.map(({ frontmatter, slug }) => ({
    slug,
    title: frontmatter.title,          // always defined now
    description: frontmatter.description ?? '',
    date: frontmatter.date ?? null,
  }));
}
