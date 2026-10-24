# AGENTS.md

Single-app Next.js 16 (App Router) project — a travel booking landing page ("Wanderlust"). No monorepo, no tests, no CI.

## Commands

- Dev server: `npm run dev` (Turbopack; on first run `next dev` writes/re-adds the block below — commit it, don't fight it)
- Lint: `npm run lint`
- Build: `npm run build`
- Typecheck: `npx tsc --noEmit` (no dedicated script; tsconfig is `strict`, `noEmit`)
- Dependencies: npm (`package-lock.json` — do not switch package managers)

There is no test runner or formatter configured. Don't invent test commands.

## Architecture

- App Router root: `src/app/` — `layout.tsx` (root layout, uses typed `LayoutProps<"/">`) and `page.tsx` (single landing page composing `src/app/components/`: Banner, WhyChooseUs, Testimonials, CtaBanner, Navbar, Footer)
- Path alias: `@/*` → `./src/*`
- shadcn/ui components live in `src/components/ui/` and are registry-generated. Config is `components.json`, style **base-nova** — components are built on **@base-ui/react**, *not* Radix. Regenerate/extend via `npx shadcn add <component>` rather than hand-rolling primitives. Note: `shadcn` and `@shadcn/react` are runtime deps in package.json.
- Hooks: `src/hooks/`; utils (`cn` etc.): `src/lib/`

## Toolchain quirks (verify against config before assuming defaults)

- **Tailwind v4** — CSS-first config in `src/app/globals.css` (`@import "tailwindcss"`, `@theme inline`). No `tailwind.config.*`. CSS is loaded via the `@tailwindcss/turbopack` rule in `next.config.ts`, not a PostCSS config.
- **React Compiler enabled** (`reactCompiler: true` + `babel-plugin-react-compiler`). Avoid manual `React.memo`/`useMemo` optimization patterns the compiler handles.
- **`cacheComponents: true` and `partialPrefetching: true`** in `next.config.ts` change caching/fetch semantics vs. stock Next.js — read the relevant guide in `node_modules/next/dist/docs/` before writing data-fetching or cache code.
- **Images**: `images.remotePatterns` allows any `https` host; the landing page loads remote Unsplash URLs directly.

## Next.js version

Next **16.4.3** + React **19.3** — APIs and conventions may differ from older training data. See the generated block below; docs live in `node_modules/next/dist/docs/` (App Router guides under `01-app/`).

<!-- BEGIN:nextjs-agent-rules -->

## This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` (resolved from this file's directory; in monorepos the `next` package may not be visible from the repo root) before writing any code. Heed deprecation notices.

This block is written and re-added by `next dev` — verify at `node_modules/next/dist/server/lib/generate-agent-files.js`. Removing it from a diff only re-creates the uncommitted change; committing it with your work keeps the tree clean.

<!-- END:nextjs-agent-rules -->
