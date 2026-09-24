import { useEffect } from "react";

/**
 * Lock <body> scroll while `locked` is true. Preserves the scroll position and
 * restores it on unlock. Safe to compose (only removes lock when this hook's
 * effect that installed it unmounts).
 */
export function useScrollLock(locked: boolean) {
  useEffect(() => {
    if (!locked) return;
    const scrollY = window.scrollY;
    const body = document.body;
    const root = document.documentElement;
    const prev = {
      position: body.style.position,
      top: body.style.top,
      width: body.style.width,
      overflow: body.style.overflow,
      scrollBehavior: root.style.scrollBehavior,
    };
    body.style.position = "fixed";
    body.style.top = `-${scrollY}px`;
    body.style.width = "100%";
    body.style.overflow = "hidden";
    return () => {
      // The site uses smooth scrolling globally. Disable it while restoring
      // the locked position so closing a modal does not visibly travel from
      // the top of the page back to the content underneath.
      root.style.scrollBehavior = "auto";
      body.style.position = prev.position;
      body.style.top = prev.top;
      body.style.width = prev.width;
      body.style.overflow = prev.overflow;
      window.scrollTo(0, scrollY);
      requestAnimationFrame(() => {
        root.style.scrollBehavior = prev.scrollBehavior;
      });
    };
  }, [locked]);
}
