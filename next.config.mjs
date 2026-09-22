import { PHASE_DEVELOPMENT_SERVER } from "next/constants.js";

/** Keep the local preview cache separate from production builds. */
export default function nextConfig(phase) {
  return { distDir: phase === PHASE_DEVELOPMENT_SERVER ? ".next-dev" : ".next" };
}
