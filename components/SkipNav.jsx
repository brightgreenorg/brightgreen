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
      className={!show ? "sr-only" : undefined}
      style={
        show
          ? {
              position: "fixed",
              top: 8,
              left: 8,
              zIndex: 50,
              background: "#fff",
              color: "#111",
              padding: "10px 14px",
              borderRadius: 12,
              boxShadow: "var(--shadow)",
              textDecoration: "none",
              fontWeight: 700,
              fontFamily:
                "var(--font-display, 'League Spartan'), system-ui, sans-serif",
            }
          : undefined
      }
    >
      Skip to content
    </a>
  );
}
