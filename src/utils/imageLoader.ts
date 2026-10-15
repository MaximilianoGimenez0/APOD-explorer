import type React from "react";

/**
 * Handles image load completion to reveal the image smoothly
 * and stop the shimmer animation on the parent container.
 */
export function handleImageLoad(e: React.SyntheticEvent<HTMLImageElement>): void {
  e.currentTarget.classList.add("loaded");
  e.currentTarget.parentElement?.classList.add("loaded");
}

/**
 * Callback ref for images to handle already-cached images instantaneously
 * without waiting for an async onLoad event.
 */
export function handleImageRef(el: HTMLImageElement | null): void {
  if (el && el.complete && el.naturalWidth > 0) {
    el.classList.add("loaded");
    el.parentElement?.classList.add("loaded");
  }
}
