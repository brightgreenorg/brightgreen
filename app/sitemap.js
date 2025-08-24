// app/sitemap.js
import fs from 'node:fs';
import path from 'node:path';
import { SITE_URL } from '../lib/config';

export const revalidate = 60 * 60 * 24; // daily

const ROOT = process.cwd();
const ISSUES_DIR = path.join(ROOT, 'content', 'issues');

function getIssueSlugs() {
  try {
    return fs
      .readdirSync(ISSUES_DIR)
      .filter((f) => f.endsWith('.md') || f.endsWith('.mdx'))
      .map((f) => f.replace(/\.mdx?$/, ''));
  } catch {
    return [];
  }
}

export default async function sitemap() {
  const now = new Date();

  const core = [
    '', 'about', 'compliance', 'contact', 'donate',
    'press', 'privacy', 'terms', 'volunteer', 'issues',
  ].map((p) => ({
    url: `${SITE_URL}${p ? `/${p}` : ''}`,
    lastModified: now,
  }));

  const issues = getIssueSlugs().map((slug) => ({
    url: `${SITE_URL}/issues/${slug}`,
    lastModified: now,
  }));

  return [...core, ...issues];
}
