/**
 * Helpers for the IPX image optimizer endpoint (/api/ipx).
 */

/**
 * Build a URL for the IPX image optimizer.
 *
 * @param src - Absolute source image URL (must be on an allowed 4chan CDN host)
 * @param modifiers - IPX modifiers, e.g. "w_550,f_auto"
 */
export function ipxUrl(src: string, modifiers = "f_auto"): string {
  return `/api/ipx/${modifiers}/${src}`;
}

/**
 * Optimized URL for a 4chan post image.
 *
 * - `f_auto` negotiates the best format (avif/webp) from the Accept header
 * - GIFs get the `animated` modifier so animation is preserved
 * - Omit `width` to keep the original resolution (e.g. for full-size zoom view)
 */
export function chanImageUrl(
  boardId: string,
  tim: number | string,
  ext: string,
  width?: number,
): string {
  const src = `https://i.4cdn.org/${boardId}/${tim}${ext}`;
  const modifiers = [
    ...(width ? [`w_${width}`] : []),
    "f_auto",
    ...(ext.toLowerCase() === ".gif" ? ["animated"] : []),
  ].join(",");
  return ipxUrl(src, modifiers);
}
