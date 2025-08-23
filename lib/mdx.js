// lib/mdx.js
import fs from "node:fs/promises";
import path from "node:path";
import { remark } from "remark";
import html from "remark-html";
import matter from "gray-matter";

const ROOT = process.cwd();
const CONTENT_DIR = path.join(ROOT, "content", "issues");

export async function listIssueSlugs() {
  const files = await fs.readdir(CONTENT_DIR);
  return files.filter((f) => f.endsWith(".md")).map((f) => f.replace(/\.md$/, ""));
}

export async function getIssueMeta(slug) {
  const src = await fs.readFile(path.join(CONTENT_DIR, `${slug}.md`), "utf8");
  const { data } = matter(src);
  return {
    slug,
    title: data.title || slug,
    description: data.description || "",
    date: data.date || null, // <-- include date so the index can sort
  };
}

export async function getIssueBySlug(slug) {
  const file = await fs.readFile(path.join(CONTENT_DIR, `${slug}.md`), "utf8");
  const { content, data } = matter(file);
  const processed = await remark().use(html).process(content);
  return { meta: data, html: String(processed) };
}
