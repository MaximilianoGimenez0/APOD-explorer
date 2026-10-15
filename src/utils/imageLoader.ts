import type React from "react";

/**
 * Handles image load completion to reveal the image smoothly
 * and stop the shimmer animation on the parent container.
 */
export function handleImageLoad(e: React.SyntheticEvent<HTMLImageElement>): void {
  const img = e.currentTarget;
  img.classList.add("loaded");
  const container = img.closest(".shimmer-media-container") || img.parentElement;
  container?.classList.add("loaded");
}

/**
 * Callback ref for images to handle already-cached or dynamically loaded images
 * without waiting exclusively for React's async synthetic onLoad event.
 */
export function handleImageRef(el: HTMLImageElement | null): void {
  if (!el) return;

  const markLoaded = () => {
    el.classList.add("loaded");
    const container = el.closest(".shimmer-media-container") || el.parentElement;
    container?.classList.add("loaded");
  };

  if (el.complete && el.naturalWidth > 0) {
    markLoaded();
  } else {
    el.addEventListener("load", markLoaded, { once: true });
    el.addEventListener("error", markLoaded, { once: true });
  }
}
