# CamboDecor Frontend 2.0

Next.js 15 (App Router) + React 19 + TypeScript frontend for the CamboDecor
construction-material e-commerce app, built on a feature-based clean
architecture.

## Getting started

```bash
npm install
cp .env.example .env.local   # then set NEXT_PUBLIC_API_BASE_URL
npm run dev                  # http://localhost:3000
```

Other scripts: `npm run build` · `npm run lint` · `npm run format` · `npm run typecheck`

> **STATIC MODE — no backend required.** All data currently comes from local
> JSON files (`src/data/categories.json`, `src/data/products.json`) and local
> SVG placeholder images (`public/images/products/`). `npm run dev` works out
> of the box with zero configuration. See "Static data mode" below for how to
> switch to the real API later.

## Architecture

Dependencies point inward. UI → hooks → services → API core. The API core
(`src/lib/api/client.ts`) knows nothing about React.

```
src/
├── app/                      # Routes only. Thin pages that compose features.
│   ├── layout.tsx            # Server Component shell (Header + BottomNav)
│   ├── providers.tsx         # TanStack Query client (client component)
│   ├── page.tsx              # Home: banner → categories → home style
│   ├── categories/[slug]/    # Main/Sub Category screen
│   ├── products/[id]/        # Product detail
│   └── cart/                 # Cart (Zustand-backed)
├── components/
│   ├── ui/                   # shadcn-style primitives (Button, Card, ...)
│   └── layout/               # Header, BottomNav
├── features/                 # Self-contained. Import ONLY via index.ts.
│   ├── catalog/
│   │   ├── schemas/          # Zod: validate at the network boundary
│   │   ├── services/         # fetch logic (no React)
│   │   ├── hooks/            # TanStack Query wrappers
│   │   ├── components/       # presentation
│   │   └── index.ts          # public barrel
│   ├── products/             # same layout as catalog
│   ├── cart/                 # Zustand store + CartButton (client state)
│   └── home/                 # PromoBanner, HomeStyleSection
├── lib/
│   ├── api/client.ts         # typed fetch core + ApiError
│   ├── api/query-keys.ts     # central query-key factory
│   ├── config/env.ts         # Zod-validated env
│   └── utils/cn.ts           # clsx + tailwind-merge
└── types/                    # cross-cutting shared types
```

### Rules the codebase enforces

- **Components render. Hooks decide. Services fetch.** No fetch calls in JSX.
- **Server state ≠ client state.** API data → TanStack Query; cart/toggles → Zustand.
- **Feature encapsulation** is enforced by ESLint (`no-restricted-imports`):
  `@/features/cart` ✅ · `@/features/cart/store/cart.store` ❌
- **Validate at boundaries.** Every service parses responses with Zod before
  they enter the app.

### Adding a new feature (e.g. `orders`)

1. `src/features/orders/{schemas,services,hooks,components}/`
2. Schema first → service → hook → component, then export via `index.ts`.
3. Add its query keys to `src/lib/api/query-keys.ts`.
4. Compose it in a route under `src/app/`.

## Brand tokens

`tailwind.config.ts` exposes `brand.navy` (#1B2A4A), `brand.orange` (#F04E23),
`brand.steel` (#5B87C5) plus shadcn CSS variables in `globals.css`. For Khmer
text, add the `Kantumruy Pro` font via `next/font/google` in `layout.tsx`.

## Responsive design (mobile-first)

Every layout is written for **0px first**, then enhanced upward. Bare utilities
style mobile; prefixed utilities only *add* behavior at wider screens — never
the reverse (no `lg:hidden`-style "desktop-first fixes" except to retire the
mobile tab bar).

| Prefix | Min width | Target        | What changes in this app                              |
|--------|-----------|---------------|-------------------------------------------------------|
| (none) | 0px       | Mobile        | Bottom tab bar, stacked search, 2-col products, 3-col categories |
| `sm:`  | 640px     | Large phone   | Promo image appears, 3-col products, 4-col categories |
| `md:`  | 768px     | Tablet        | Tab bar retires → header nav; product detail & home-style go multi-column; 4-col products, 6-col categories |
| `lg:`  | 1024px    | Laptop        | Header collapses to one row; cart gains sticky summary; 5-col products |
| `xl:`  | 1280px    | Desktop       | 8-col categories, wider search field                  |
| `2xl:` | 1536px    | Large desktop | 6-col products, container caps at 1320px              |

Conventions the codebase follows:

- **One nav per breakpoint.** `BottomNav` is `md:hidden`; the header nav is
  `hidden md:flex`. They never render together.
- **`next/image` `sizes` must match the grid.** When you change a grid's
  column counts, update the card's `sizes` attribute in the same commit, or
  you ship oversized images to phones.
- **Spacing scales with density**: `gap-3 md:gap-4`, `pt-4 md:pt-6`, container
  gutters `1rem → 1.5rem → 2rem`.
- **Sticky elements start at the breakpoint that has room for them**
  (`md:sticky md:top-24` on the product image, `lg:sticky` on the cart summary).

Verify at 375 / 640 / 768 / 1024 / 1280 / 1536 in devtools before merging any
layout change.


## Static data mode (current)

The app runs entirely from committed files — **data type: JSON, static-first**:

| What        | Where                              | Format |
|-------------|------------------------------------|--------|
| Categories  | `src/data/categories.json`         | JSON — 18 main categories, each with `subCategories[]`, Khmer names (`nameKm`), and a lucide icon name |
| Products    | `src/data/products.json`           | JSON — validated by `product.schema.ts` on every read |
| Product images | `public/images/products/*.svg`  | Local brand-styled SVG placeholders |
| Category icons | `src/components/ui/category-icon.tsx` | Maps JSON icon strings → lucide-react components |

Flow: **Home shows the category grid from JSON → tap a category → its
products are filtered from JSON by `categorySlug` → tap a sub-category chip →
filtered again by `subCategorySlug`.** Filtering, search, sort, and paging all
run in-memory inside the service, so the UI already behaves like it will
against the real API.

Two deliberate design points:

1. **Even static JSON passes through Zod.** A typo in a data file fails
   loudly in the service, never as a blank screen.
2. **A 200ms simulated latency** keeps loading skeletons testable.

### Editing the data

Add a product: append an object to `src/data/products.json` matching
`src/features/products/schemas/product.schema.ts`, set its `categorySlug` /
`subCategorySlug` to existing slugs from `categories.json`, and drop an image
in `public/images/products/`. That's it — no code changes.

### Switching to the real API later

Only the two service files change; hooks, components, and pages stay
untouched:

- `src/features/catalog/services/category.service.ts`
- `src/features/products/services/product.service.ts`

Each file's header comment contains the exact `apiClient` call to paste in.
The typed API core (`src/lib/api/client.ts`) and query keys are already built
and waiting.


## Design-file parity (CamboDecor 2.0 PDF)

The app now mirrors the screens and flow in the design file:

| PDF screen        | Route                              | Sections in order                                            |
|-------------------|------------------------------------|--------------------------------------------------------------|
| Home Page         | `/`                                | Promo banner → CATEGORIES (18) → HOME STYLE → POPULAR BRANDS → NEW STORE |
| Sub Category #1   | `/categories/[slug]`               | Sub-category icon grid → banner → SORT ⇅ + search → PRODUCT  |
| Sub Category #2   | `/categories/[slug]/[sub]`         | ‹ back + title → banner → filter chips → SORT ⇅ + search → PRODUCT |
| Product detail    | `/products/[id]`                   | Image → shop → name → red price → Add to cart                |
| Cart              | `/cart`                            | Items → total → checkout                                     |

Filter chips follow the file's two patterns:

- **Type chips** (Kitchen → Tableware: All/Plate/Spoon/Forks/Steak Knife/
  Chopsticks/Sets; Floor & Wall → Wall Decor: All/Wall Tiles/Wallpaper/
  Cement Board/Natural Stone/PVC) — driven by `children[]` in
  `categories.json`, filtering products by `typeSlug`.
- **Brand chips** (Paint: All/Nippon Paint/Jotun/Orchid/Dulux/TOA;
  Metal Paint & Spray: All/Nippon/TOA/Dulux; Decor Paint: All/Rhinoz/TOA/
  Nippon) — driven by `brands[]` in `categories.json`, filtering by `brand`.

**Partners** (`src/data/brands.json`): the 15 POPULAR BRANDS circles
(FUJIAIRE, DAIKIN, Haier, SAMSUNG, COTTO, KARAT, Rinnai, SCG, SHERA, UPG,
Dulux, JOTUN, BODA, KÄRCHER, EnGenius) plus paint brands used as filters.
Placeholder circles show brand initials in each brand's color — drop real
logo files in `public/images/brands/` and update `brand-strip.tsx` when you
have them. The NEW STORE tiles (FUJIAIRE hero, Rinnai, Jotun, 24 Store, UPG
pipes) are generated SVG banners in `public/images/banners/`.

All banner and product images are locally generated, brand-styled SVG
placeholders — replace any file in `public/images/**` with a real photo of
the same name and the UI picks it up with zero code changes.

## Pages & routes (v2.0.0 update)

Static export is enabled (`next.config.ts` → `output: "export"`), so `npm run
build` emits a fully static `out/` folder deployable to any static host.

| Route | Description |
| --- | --- |
| `/` | Home: banner carousel, categories, home style, brands, new stores |
| `/products` | Full catalog with search + sort |
| `/products/[id]` | Product detail (pre-rendered per product) |
| `/categories` | Category directory + popular brands |
| `/categories/[slug]` | Category: sub-category chips + product grid |
| `/categories/[slug]/[sub]` | Sub-category #2: filter chips + product grid |
| `/brands/[slug]` | Brand detail: brand's products + "Chat with this brand" |
| `/cart` | Cart (Zustand, persisted) |
| `/checkout` | Shipping form + order summary |
| `/chat` | Messages — **all brands** on Home; `?brand=<slug>` scopes to one |
| `/profile` | Account UI |
| `/notification` | Notifications with read/unread state |
| `*` (unmatched) | Custom 404 (`not-found.tsx`) |

### Chat brand-context rule

The Home chat (`/chat`) lists a conversation thread for **every** brand. A
brand page links to `/chat?brand=<slug>`, which scopes the inbox to **that
brand only** and auto-opens the conversation. This rule lives in one place —
`chatService.getThreads(brandSlug?)` — so swapping to a real WebSocket/SaaS
backend touches only `src/features/chat/services/`.

### New feature module

`src/features/chat/` follows the same schema → service → hooks → components
layering as the other features. Its public API is the `index.ts` barrel.

### Static data notes

All image references in `src/data/*.json` are validated to resolve against
files in `public/images/`. Missing references were remapped to the closest
existing asset; brands without a logo fall back to a coloured initials circle,
and `public/images/placeholder.svg` covers any residual gap.
