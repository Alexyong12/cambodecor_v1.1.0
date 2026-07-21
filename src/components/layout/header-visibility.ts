/**
 * Single source of truth for which routes are "immersive" — i.e. the design
 * shows them with their own ‹ back + title bar instead of the global header
 * (see the WALL INDOOR / TABLEWARE mockups).
 *
 * Kept as data (regex list), not scattered conditionals, so adding a new
 * immersive screen is a one-line change.
 */
const IMMERSIVE_ROUTES: RegExp[] = [
      // NOTE: next.config has `trailingSlash: true`, so the exported URL is
      // e.g. "/products/prod-001/". The optional "\/?" before "$" matches
      // both the slashed and un-slashed forms — without it these never match
      // in production and the mobile header doubles up over the screen's own
      // back-bar.
      /^\/categories\/[^/]+\/[^/]+\/?$/, // Sub Category #2  (e.g. /categories/kitchen/tableware)
      /^\/products\/[^/]+\/?$/,          // Product detail
      /^\/brands\/[^/]+\/?$/,            // Brand detail (own back + title bar)
      /^\/chat\/?$/,                         // Chat (own back + title bar)
];

export function isImmersiveRoute(pathname: string): boolean {
      return IMMERSIVE_ROUTES.some((pattern) => pattern.test(pathname));
}
