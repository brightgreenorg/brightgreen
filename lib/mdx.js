// lib/mdx.js (ESM)
// Minimal, future-proof Markdown utilities for /content/**
// Exports required by the app: listIssueSlugs, listIssuesMeta, getIssueBySlug

import fs from "node:fs/promises";
import fssync from "node:fs";
import path from "node:path";
import matter from "gray-matter";
import { unified } from "unified";
import remarkParse from "remark-parse";
import remarkGfm from "remark-gfm";
import remarkRehype from "remark-rehype";
import rehypeStringify from "rehype-stringify";

/* Intrinsic size for local images to reduce CLS.
   This enables automatic width/height for /public images when 'image-size' is installed. */
let imageSize = null;
try {
  const mod = await import("image-size");
  imageSize = (mod && (mod.imageSize || mod.default)) || null;
} catch {
  imageSize = null;
}

const ROOT = process.cwd();
export const CONTENT_DIR = path.join(ROOT, "content");
export const ISSUES_DIR = path.join(CONTENT_DIR, "issues");
export const PAGES_DIR = path.join(CONTENT_DIR, "pages");
const PUBLIC_DIR = path.join(ROOT, "public");

/** Titleize a slug like "clean-energy" -> "Clean Energy" */
function titleFromSlug(slug) {
  return slug
    .replace(/[/\\]+/g, "")
    .split("-")
    .filter(Boolean)
    .map((w) => w[0]?.toUpperCase() + w.slice(1))
    .join(" ");
}

/** Normalize frontmatter.date to 'YYYY-MM-DD' if possible */
function normalizeDate(d) {
  if (!d) return null;
  try {
    const dt = new Date(d);
    if (Number.isNaN(dt.getTime())) return null;
    const yyyy = String(dt.getFullYear());
    const mm = String(dt.getMonth() + 1).padStart(2, "0");
    const dd = String(dt.getDate()).padStart(2, "0");
    return `${yyyy}-${mm}-${dd}`;
  } catch {
    return null;
  }
}

/** Simple memo for local image dimension lookups */
const dimCache = new Map();

/** Attempt to get intrinsic width/height for local /public images */
function getLocalImageDimensions(src) {
  if (!imageSize) return null;
  if (!src || typeof src !== "string") return null;
  if (!src.startsWith("/")) return null;

  const filePath = path.join(PUBLIC_DIR, src.replace(/^\/+/, ""));
  if (dimCache.has(filePath)) return dimCache.get(filePath);

  try {
    if (!fssync.existsSync(filePath)) return null;
    const { width, height, type } = imageSize(filePath) || {};
    if (!width || !height) return null;
    const dim = { width, height, type };
    dimCache.set(filePath, dim);
    return dim;
  } catch {
    return null;
  }
}

/** Rehype plugin: normalize images in rendered HTML */
function rehypeImageNormalizer() {
  return (tree) => {
    visitElements(tree, (node, index, parent) => {
      if (node.tagName === "img") {
        node.properties = node.properties || {};
        const p = node.properties;

        if (!p.loading) p.loading = "lazy";
        if (!p.decoding) p.decoding = "async";
        if (!p.sizes) p.sizes = "(min-width: 1024px) 800px, 100vw";

        if ((!p.width || !p.height) && typeof p.src === "string") {
          const dim = getLocalImageDimensions(p.src);
          if (dim) {
            p.width = p.width || dim.width;
            p.height = p.height || dim.height;
          }
        }

        // Promote markdown image "title" to <figcaption>
        if (typeof p.title === "string" && p.title.trim() && parent) {
          const captionText = p.title.trim();
          delete p.title;
          const figure = {
            type: "element",
            tagName: "figure",
            properties: {},
            children: [
              node,
              {
                type: "element",
                tagName: "figcaption",
                properties: {},
                children: [{ type: "text", value: captionText }],
              },
            ],
          };
          parent.children[index] = figure;
        }
      }

      // Raw <figure><img title="..."/></figure> → ensure <figcaption>
      if (node.tagName === "figure" && Array.isArray(node.children)) {
        const imgIndex = node.children.findIndex(
          (c) => c?.type === "element" && c.tagName === "img"
        );
        if (imgIndex !== -1) {
          const img = node.children[imgIndex];
          img.properties = img.properties || {};
          const title = img.properties.title?.trim();
          if (title) {
            delete img.properties.title;
            const hasCaption = node.children.some(
              (c) => c?.type === "element" && c.tagName === "figcaption"
            );
            if (!hasCaption) {
              node.children.push({
                type: "element",
                tagName: "figcaption",
                properties: {},
                children: [{ type: "text", value: title }],
              });
            }
          }
        }
      }
    });
  };
}

/** Tiny HAST walker avoiding external deps */
function visitElements(node, fn, index = null, parent = null) {
  if (!node) return;
  const isElem = node.type === "element";
  if (isElem) fn(node, index, parent);
  const children = node.children;
  if (Array.isArray(children)) {
    for (let i = 0; i < children.length; i++) {
      visitElements(children[i], fn, i, node);
    }
  }
}

/** Build a markdown → HTML processor with our image normalizer */
function createProcessor() {
  return unified()
    .use(remarkParse)
    .use(remarkGfm)
    .use(remarkRehype, { allowDangerousHtml: true })
    .use(rehypeImageNormalizer)
    .use(rehypeStringify, { allowDangerousHtml: true });
}

/** List issue slugs from /content/issues (without extension) */
export async function listIssueSlugs() {
  const entries = await fs.readdir(ISSUES_DIR, { withFileTypes: true });
  return entries
    .filter((e) => e.isFile())
    .map((e) => e.name)
    .filter((n) => n.endsWith(".md") || n.endsWith(".mdx"))
    .map((n) => n.replace(/\.(md|mdx)$/i, ""))
    .sort();
}

/** Return lightweight metadata for Issues index/cards */
export async function listIssuesMeta() {
  const slugs = await listIssueSlugs();
  const items = await Promise.all(
    slugs.map(async (slug) => {
      const file = path.join(ISSUES_DIR, `${slug}.md`);
      const fileMdx = path.join(ISSUES_DIR, `${slug}.mdx`);
      const filepath = fssync.existsSync(file) ? file : fileMdx;
      const raw = await fs.readFile(filepath, "utf8");
      const { data } = matter(raw);

      const title = data.title || titleFromSlug(slug);
      const date = normalizeDate(data.date);
      const summary = data.summary || data.description || "";
      const description = data.description || summary || "";
      const published = data.published !== false; // default true
      const tags = Array.isArray(data.tags) ? data.tags : [];

      // normalize image + alt from frontmatter; accept snake_case fallback
      const image = typeof data.image === "string" ? data.image : "";
      const imageAlt =
        typeof data.imageAlt === "string"
          ? data.imageAlt
          : typeof data.image_alt === "string"
          ? data.image_alt
          : "";

      return {
        slug,
        title,
        date,
        summary,
        description,
        published,
        tags,
        image,
        imageAlt,
      };
    })
  );

  // newest first if date present
  return items.sort((a, b) =>
    String(b.date || "").localeCompare(String(a.date || ""))
  );
}

/** Return a full Issue by slug with rendered HTML */
export async function getIssueBySlug(slug) {
  const md = await readMarkdownBySlug(slug, ISSUES_DIR);
  const { content, data } = matter(md);

  const title = data.title || titleFromSlug(slug);
  const date = normalizeDate(data.date);
  const summary = data.summary || data.description || "";
  const description = data.description || summary || "";
  const published = data.published !== false;
  const tags = Array.isArray(data.tags) ? data.tags : [];

  // normalize image + alt as above
  const image = typeof data.image === "string" ? data.image : "";
  const imageAlt =
    typeof data.imageAlt === "string"
      ? data.imageAlt
      : typeof data.image_alt === "string"
      ? data.image_alt
      : "";

  const processor = createProcessor();
  const file = await processor.process(content);
  const contentHtml = String(file);

  return {
    slug,
    title,
    date,
    summary,
    description,
    published,
    tags,
    image,
    imageAlt,
    contentHtml,
  };
}

/** Helpers */
async function readMarkdownBySlug(slug, dir) {
  const md = path.join(dir, `${slug}.md`);
  const mdx = path.join(dir, `${slug}.mdx`);
  if (await exists(md)) return fs.readFile(md, "utf8");
  if (await exists(mdx)) return fs.readFile(mdx, "utf8");
  throw new Error(`Not found: ${slug}`);
}

async function exists(p) {
  try {
    await fs.access(p);
    return true;
  } catch {
    return false;
  }
}
