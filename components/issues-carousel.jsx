// REPLACE FILE: components/issues-carousel.jsx
"use client";

import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import Link from "next/link";
import useEmblaCarousel from "embla-carousel-react";
import IssueTeaser from "./issue-teaser";

/* ---------- Utilities: seeded shuffle ---------- */
function seededRandom(seed) {
  let h = 2166136261 >>> 0;
  for (let i = 0; i < seed.length; i++) {
    h ^= seed.charCodeAt(i);
    h = Math.imul(h, 16777619);
  }
  let state = (h || 1) >>> 0;
  return () => {
    state = (Math.imul(1664525, state) + 1013904223) >>> 0;
    return state / 2 ** 32;
  };
}
function shuffleWithSeed(arr, seed) {
  const rnd = seededRandom(seed);
  const a = arr.slice();
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(rnd() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

/* ---------- Hooks ---------- */
function useDailySeed(seedScope = "daily") {
  const [seed, setSeed] = useState("server-seed");
  useEffect(() => {
    if (typeof window === "undefined") return;
    if (seedScope === "session") {
      if (!sessionStorage.getItem("bg_seed")) {
        sessionStorage.setItem("bg_seed", Math.random().toString(36).slice(2));
      }
      setSeed(sessionStorage.getItem("bg_seed") || "session-fallback");
    } else {
      const d = new Date();
      setSeed(`${d.getFullYear()}-${d.getMonth() + 1}-${d.getDate()}`);
    }
  }, [seedScope]);
  return seed;
}

function useVisibleCount() {
  const [count, setCount] = useState(1);
  useEffect(() => {
    if (typeof window === "undefined") return;
    const mqMd = window.matchMedia("(min-width: 768px)");
    const mqLg = window.matchMedia("(min-width: 1024px)");
    const compute = () => setCount(mqLg.matches ? 3 : mqMd.matches ? 2 : 1);
    compute();
    mqMd.addEventListener("change", compute);
    mqLg.addEventListener("change", compute);
    return () => {
      mqMd.removeEventListener("change", compute);
      mqLg.removeEventListener("change", compute);
    };
  }, []);
  return count;
}

function useReducedMotion() {
  const [reduce, setReduce] = useState(false);
  useEffect(() => {
    if (typeof window === "undefined") return;
    const mql = window.matchMedia("(prefers-reduced-motion: reduce)");
    const onChange = () => setReduce(mql.matches);
    onChange();
    mql.addEventListener("change", onChange);
    return () => mql.removeEventListener("change", onChange);
  }, []);
  return reduce;
}

/* Window the expensive parts (media) around the current index */
function useWindowedIndices(length, firstIndex, visibleCount, extra = 2) {
  const set = new Set();
  const radius = visibleCount + extra;
  for (let o = 0; o < radius; o++) {
    const idx = ((firstIndex + o) % length + length) % length;
    set.add(idx);
  }
  for (let o = 1; o <= extra; o++) {
    const idx = ((firstIndex - o) % length + length) % length;
    set.add(idx);
  }
  return set;
}

/* ---------- Component ---------- */
export default function IssuesCarousel({
  issues,
  interval = 7000,
  seedScope = "daily", // "session" | "daily"
  ariaLabel = "Featured issues carousel",
}) {
  const seed = useDailySeed(seedScope);
  const ordered = useMemo(() => shuffleWithSeed(issues ?? [], seed), [issues, seed]);

  const visibleCount = useVisibleCount();
  const reduceMotion = useReducedMotion();

  const [viewportRef, emblaApi] = useEmblaCarousel({
    loop: true,
    align: "start",
    dragFree: false,
    slidesToScroll: 1,
    containScroll: "trimSnaps",
  });

  const rootRef = useRef(null);
  const [selectedSnap, setSelectedSnap] = useState(0);
  const [snapCount, setSnapCount] = useState(ordered.length);
  const len = ordered.length || 1;

  /* Re-init Embla when visibleCount changes (slide sizes change) */
  useEffect(() => {
    if (!emblaApi) return;
    emblaApi.reInit();
  }, [emblaApi, visibleCount]);

  /* Track selection & snaps */
  useEffect(() => {
    if (!emblaApi) return;
    const onSelect = () => setSelectedSnap(emblaApi.selectedScrollSnap());
    const onInit = () => {
      setSnapCount(emblaApi.scrollSnapList().length);
      onSelect();
    };
    emblaApi.on("init", onInit).on("reInit", onInit).on("select", onSelect);
    onInit();
    return () => {
      emblaApi.off("init", onInit).off("reInit", onInit).off("select", onSelect);
    };
  }, [emblaApi]);

  /* Autoplay */
  const timerRef = useRef(null);
  const clearTimer = useCallback(() => {
    if (timerRef.current) {
      clearInterval(timerRef.current);
      timerRef.current = null;
    }
  }, []);
  const startTimer = useCallback(() => {
    if (!emblaApi || reduceMotion) return;
    clearTimer();
    timerRef.current = setInterval(() => emblaApi.scrollNext(), interval);
  }, [emblaApi, interval, reduceMotion, clearTimer]);

  useEffect(() => {
    if (!emblaApi) return;
    if (reduceMotion) clearTimer();
    else startTimer();
  }, [emblaApi, reduceMotion, startTimer, clearTimer]);

  useEffect(() => {
    if (!emblaApi) return;
    const stop = () => clearTimer();
    const resume = () => startTimer();

    emblaApi.on("pointerDown", stop);
    emblaApi.on("pointerUp", resume);
    emblaApi.on("settle", resume);
    emblaApi.on("reInit", resume);

    return () => {
      emblaApi.off("pointerDown", stop);
      emblaApi.off("pointerUp", resume);
      emblaApi.off("settle", resume);
      emblaApi.off("reInit", resume);
    };
  }, [emblaApi, startTimer, clearTimer]);

  useEffect(() => {
    const el = rootRef.current;
    if (!el) return;
    const onEnter = () => clearTimer();
    const onLeave = () => startTimer();
    const onFocusIn = () => clearTimer();
    const onFocusOut = () => startTimer();
    el.addEventListener("mouseenter", onEnter);
    el.addEventListener("mouseleave", onLeave);
    el.addEventListener("focusin", onFocusIn);
    el.addEventListener("focusout", onFocusOut);
    return () => {
      el.removeEventListener("mouseenter", onEnter);
      el.removeEventListener("mouseleave", onLeave);
      el.removeEventListener("focusin", onFocusIn);
      el.removeEventListener("focusout", onFocusOut);
    };
  }, [startTimer, clearTimer]);

  useEffect(() => {
    const onVis = () => {
      if (document.hidden) clearTimer();
      else startTimer();
    };
    document.addEventListener("visibilitychange", onVis);
    return () => document.removeEventListener("visibilitychange", onVis);
  }, [startTimer, clearTimer]);

  /* === Seam-gap fix v2: half-margins on slides + base half-gap padding on viewport === */
  const basePadL = useRef(null);
  const basePadR = useRef(null);
  const lastExtra = useRef(0);

  const measureAndPad = useCallback(() => {
    if (!emblaApi) return;
    const viewportEl = emblaApi.rootNode();
    const trackEl = emblaApi.containerNode();
    if (!viewportEl || !trackEl) return;

    const firstSlide = trackEl.querySelector("article");
    if (!firstSlide) return;

    const slideWidth = firstSlide.getBoundingClientRect().width;

    // Read half-gap from the slide's computed margin (we set margin-inline: var(--gap)/2)
    const csSlide = getComputedStyle(firstSlide);
    const halfGap = parseFloat(csSlide.marginLeft || "0") || 0;
    const gap = halfGap * 2;

    // Current paddings (may already include lastExtra)
    const csViewport = getComputedStyle(viewportEl);
    const padLNow = parseFloat(csViewport.paddingLeft || "0") || 0;
    const padRNow = parseFloat(csViewport.paddingRight || "0") || 0;

    // True content width excludes padding
    const vpContentWidth = viewportEl.clientWidth - padLNow - padRNow;

    if (vpContentWidth <= 0 || slideWidth <= 0) {
      requestAnimationFrame(measureAndPad);
      return;
    }

    const groupWidth = slideWidth * visibleCount + gap * Math.max(visibleCount - 1, 0);
    const remainder = Math.max(0, vpContentWidth - groupWidth);
    const extra = Math.round(remainder / 2);

    // Record base (half-gap paddings without extra) once
    if (basePadL.current == null || basePadR.current == null) {
      basePadL.current = padLNow - (lastExtra.current || 0);
      basePadR.current = padRNow - (lastExtra.current || 0);
    }

    viewportEl.style.paddingLeft = `${(basePadL.current || 0) + extra}px`;
    viewportEl.style.paddingRight = `${(basePadR.current || 0) + extra}px`;
    lastExtra.current = extra;
  }, [emblaApi, visibleCount]);

  useEffect(() => {
    if (!emblaApi) return;
    const onInit = () => measureAndPad();
    emblaApi.on("init", onInit).on("reInit", onInit);
    onInit();
    const onResize = () => measureAndPad();
    window.addEventListener("resize", onResize);
    return () => {
      emblaApi.off("init", onInit).off("reInit", onInit);
      window.removeEventListener("resize", onResize);
    };
  }, [emblaApi, measureAndPad]);

  /* Lazy windowing set */
  const renderSet = useWindowedIndices(len, selectedSnap, visibleCount, 2);

  const prev = () => emblaApi && emblaApi.scrollPrev();
  const next = () => emblaApi && emblaApi.scrollNext();
  const goTo = (snap) => emblaApi && emblaApi.scrollTo(snap);

  /* A11y announcement text */
  const firstVisible = selectedSnap;
  const liveText =
    len > 0
      ? `Showing ${firstVisible + 1}–${Math.min(firstVisible + visibleCount, len)} of ${len}: ${
          ordered[firstVisible]?.title ?? ""
        }`
      : "";

  /* Gap token to share via CSS custom property */
  const GAP_VAR = "var(--s-4)";
  const slideBasis = `calc((100% - (var(--gap) * ${Math.max(visibleCount - 1, 0)})) / ${visibleCount})`;

  return (
    <section
      ref={rootRef}
      aria-roledescription="carousel"
      aria-label={ariaLabel}
      className="relative"
    >
      <div className="overflow-hidden rounded-2xl bg-[var(--surface-1)] py-3 shadow-lg md:py-4">
        {/* Embla viewport: set --gap and base half-gap padding; measurement may add tiny extra */}
        <div
          ref={viewportRef}
          style={{
            ["--gap"]: GAP_VAR,
            paddingLeft: "calc(var(--gap) / 2)",
            paddingRight: "calc(var(--gap) / 2)",
          }}
        >
          {/* Track (pure flex; margins on slides create gaps) */}
          <div className="flex">
            {ordered.map((issue, i) => (
              <article
                key={issue.slug || i}
                className="shrink-0"
                style={{
                  flex: `0 0 ${slideBasis}`,
                  minWidth: slideBasis,
                  marginInline: "calc(var(--gap) / 2)",
                }}
                aria-hidden={
                  i < firstVisible || i > firstVisible + visibleCount - 1 ? "true" : "false"
                }
              >
                <Link
                  href={issue?.slug ? `/issues/${issue.slug}` : "#"}
                  className="block focus:outline-none focus:ring rounded-[18px]"
                  aria-label={issue?.title ? `Read: ${issue.title}` : "Read issue"}
                >
                  <IssueTeaser
                    issue={issue}
                    variant="carousel"
                    showDate={true}
                    showTags={false}
                    ctaLabel="Read"
                  />
                </Link>
              </article>
            ))}
          </div>
        </div>
      </div>

      {/* Controls */}
      <div className="mt-3 flex items-center justify-between gap-2">
        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={prev}
            className="rounded-xl border px-3 py-2 text-sm hover:bg-[var(--surface-2)] focus:outline-none focus:ring"
            aria-label="Previous"
          >
            ←
          </button>
          <button
            type="button"
            onClick={next}
            className="rounded-xl border px-3 py-2 text-sm hover:bg-[var(--surface-2)] focus:outline-none focus:ring"
            aria-label="Next"
          >
            →
          </button>
        </div>

        {/* Dots or compact pager */}
        {snapCount <= 10 ? (
          <nav aria-label="Slides">
            <ol className="flex items-center gap-2">
              {Array.from({ length: snapCount }).map((_, i) => (
                <li key={i}>
                  <button
                    type="button"
                    aria-label={`Go to slide ${i + 1}`}
                    aria-current={i === selectedSnap ? "true" : "false"}
                    onClick={() => goTo(i)}
                    className={`h-2.5 w-2.5 rounded-full border ${
                      i === selectedSnap ? "scale-110" : "opacity-60"
                    } transition`}
                  />
                </li>
              ))}
            </ol>
          </nav>
        ) : (
          <div
            className="text-sm text-[var(--muted-ink,#555)]"
            aria-live="polite"
            aria-atomic="true"
          >
            {selectedSnap + 1} / {snapCount}
          </div>
        )}
      </div>

      {/* Live region for screen readers */}
      <p className="sr-only" aria-live="polite">
        {liveText}
      </p>
    </section>
  );
}
