/**
 * Polyfills for browser (e.g. gray-matter uses Node's Buffer).
 * Import this first in main.tsx so it runs before any code that needs Buffer.
 */
import { Buffer } from "buffer";

declare global {
  var Buffer: typeof import("buffer").Buffer;
}

if (typeof globalThis.Buffer === "undefined") {
  globalThis.Buffer = Buffer;
}
