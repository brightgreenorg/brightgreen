// lib/mdx.js (ESM)
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

/** Normalize 'YYYY-M-D' -> 'YYYY-MM-DD' */
function normalizeDate(d) {
  if (!d) return null;
  // Accept Date, number, or string
  const s = typeof d === 'string' ? d : new Date(d).toISOString().slice(0, 10);
  const m = s.match(/^(\d{4})-(\d{1,2})-(\d{1,2})$/);
  if (!m) return s;
  const [, y, mo, da] = m;
  const mm = mo.padStart(2, '0');
  const dd = da.padStart(2, '0');
  return `${y}-${mm}-${dd}`;
}

/** Strip markdown to plain text for fallback description */
function firstMeaningfulParagraph(markdown) {
  if (!markdown) return '';
  const paras = markdown
    .split(/\n{2,}/)
    .map(p => p.trim())
    .filter(Boolean);
  const first = paras.find(p => !p.startsWith('#')) || paras[0];
  if (!first) return '';
  return first.replace(/[*_`>#]/g, '').replace(/\[([^\]]+)\]\([^)]+\)/g, '$1').trim();
}

/** Load a single MD file into { slug, frontmatter, html, text, ... } */
export async function loadMarkdownFile(absPath, baseDir) {
  const raw = await fs.readFile(absPath, 'utf8');
  const { data, content } = matter(raw);

  const file = path.parse(absPath);
  const slug = file.name;

  // Normalize frontmatter
  const fm = {
    title: data.title || titleFromSlug(slug),
    description: data.description || firstMeaningfulParagraph(content).slice(0, 220),
    date: normalizeDate(data.date),
    ...data,
  };

  // Minimal markdown -> HTML for pages that need it
  const html = String(
    await unified()
      .use(remarkParse)
      .use(remarkGfm)
      .use(remarkRehype)
      .use(rehypeStringify)
      .process(content)
  );

  return {
    slug,
    ...fm,
    content,
    html,
    // for index cards
    summary: fm.description,
  };
}

/** List all issues, newest first */
export async function getIssues() {
  const files = await fs.readdir(ISSUES_DIR);
  const mdFiles = files.filter(f => f.endsWith('.md'));
  const entries = await Promise.all(
    mdFiles.map(f => loadMarkdownFile(path.join(ISSUES_DIR, f), ISSUES_DIR))
  );
  return entries
    .sort((a, b) => String(b.date || '').localeCompare(String(a.date || '')))
}

/** Load a single issue by slug */
export async function getIssue(slug) {
  const abs = path.join(ISSUES_DIR, `${slug}.md`);
  return loadMarkdownFile(abs, ISSUES_DIR);
}

/** Generic page loader if needed */
export async function getPage(slug) {
  const abs = path.join(PAGES_DIR, `${slug}.md`);
  return loadMarkdownFile(abs, PAGES_DIR);
}
