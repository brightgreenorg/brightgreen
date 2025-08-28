// components/SkipNav.jsx
"use client";

import { useState, useCallback } from "react";

/**
 * Keyboard-first skip link. Hidden until focused, then pins to top-left.
 * Targets <main id="main-content"> in app/layout.jsx.
 */
export default function SkipNav() {
  const [show, setShow] = useState(false);

  const onFocus = useCallback(() => setShow(true), []);
  const onBlur = useCallback(() => setShow(false), []);

  return (
    <a
      href="#main-content"
      onFocus={onFocus}
      onBlur={onBlur}
      className={
        show
          ? "fixed top-2 left-2 z-50 bg-white text-black px-3.5 py-2.5 rounded-xl shadow font-extrabold no-underline"
          : "sr-only"
      }
    >
      Skip to content
    </a>
  );
}
