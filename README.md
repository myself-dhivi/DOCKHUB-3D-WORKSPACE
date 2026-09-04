# DOCKHUB-3D-WORKSPACE

DOCKHUB-3D-WORKSPACE is a production-oriented foundation for a premium, room-by-room workspace showcase. Visitors can move through static office interiors without page reloads, compare capacity and approved pricing, inspect room details, and review future pass offerings.

> The product direction changed during foundation work. This phase intentionally uses static room photography and standard web transitions. It does **not** include Three.js, WebGL, React Three Fiber, GLB assets, or camera navigation.

## Current phase

Included now:

- Public landing page with summary metrics and featured spaces, served from static data
- Guided `/showcase` experience with previous/next controls and thumbnails
- Space catalogue and detail pages
- Pricing and pass-plan pages
- Read-only admin dashboard, rooms, pricing, and passes views
- Confirmed room, pricing, and pass data in `src/data/mock-workspace.ts` (no database required)
- Six temporary room-background assets designed for easy replacement

Explicitly deferred: booking workflows, payments, authentication/authorization, admin CRUD, live inventory updates, and final room photography.

## Stack

- Next.js 16 App Router, React 19, and TypeScript
- Material UI and Emotion
- Static data module (`src/data/mock-workspace.ts`) in place of a database
- Zod
- React Hook Form and Hook Form resolvers (installed for later form work)
- Lucide React icons

Tailwind and all 3D/WebGL dependencies are intentionally absent.

## Local setup

Prerequisites:

- Node.js 20.9 or newer
- npm

Install dependencies:

```bash
npm install
```

Copy the environment template:

```bash
cp .env.example .env
```

Start development — no database or connection string needed:

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

## Useful commands

```bash
npm run dev
npm run build
npm run lint
npx tsc --noEmit
```

## Routes

| Route | Purpose |
| --- | --- |
| `/` | Landing page and workspace summary |
| `/showcase` | Client-side room-by-room tour |
| `/showcase?space=<slug>` | Tour opened at a specific space |
| `/spaces` | Full space catalogue |
| `/spaces/[slug]` | Space details, pricing, and timeline |
| `/pricing` | Active room pricing |
| `/passes` | Active public pass plans or an informational empty state |
| `/admin` | Read-only operational summary |
| `/admin/rooms` | Read-only room inventory |
| `/admin/pricing` | Read-only pricing inventory |
| `/admin/passes` | Read-only active/draft pass inventory |

## Architecture

- `src/app` contains thin server-rendered route components.
- `src/services` is the only application layer that reads workspace data; every function reads from `src/data/mock-workspace.ts` and returns the same view models it always has.
- `src/types` contains serializable view models passed to UI components.
- `src/components/showcase/ShowcaseShell.tsx` owns the small amount of client state needed for no-reload room navigation.
- Prices and dates in `mock-workspace.ts` are already plain numbers and ISO strings, matching what the service boundary used to convert from Prisma `Decimal`/`DateTime` values.
- Business pricing remains attached to each room's `pricing` records, never hardcoded elsewhere in `Room` view or React components.
- Every route is static data under the hood, so builds and runtime never require a reachable database or `DATABASE_URL`.

## Room images

Temporary assets live in `public/images/rooms/`:

```text
reception-placeholder.jpg
conference-room-placeholder.jpg
private-cabin-placeholder.jpg
meeting-room-placeholder.jpg
workspace-phase-1-placeholder.jpg
workspace-phase-2-placeholder.jpg
```

Each room stores both `backgroundImageUrl` and `thumbnailImageUrl`. Replace an asset at the same path to keep existing seed mappings, or update the room record to use a new file. Recommended production images are landscape 16:9, at least 1920×1080, compressed JPEG or AVIF, with no baked-in text. Keep the right side reasonably calm for the desktop information panel.

## Static data and known ambiguities

`src/data/mock-workspace.ts` defines six room records. Only two contain commercial pricing:

- Dockhub Workspace - Phase 1: 150 capacity, INR 9,800 regular, INR 7,999 pre-booking.
- Dockhub Workspace - Phase 2: 350 capacity, INR 8,000 regular, INR 6,499 pre-booking, available 01 January 2027.

The following require business confirmation:

- The year associated with the Phase 1 handwritten “30 Oct” note. The date is retained as timeline text; no year is invented in `availableFrom`.
- The billing period for the confirmed per-seat prices. The seed uses a `CUSTOM` pricing period and labels it as pending confirmation.
- Whether capacity can be treated as available pre-booking seats. The initial seed does so as a documented operational assumption.
- The exact address, city, building, and floor.
- Supporting-room capacities, amenities, availability, and pricing. These records are `COMING_SOON` and have no pricing.
- Private-cabin/pass values around 6/12/15 and 100/200/200, including their units and meaning. No pass records are seeded or published.

## Security and production follow-up

Before exposing admin routes publicly, add authentication and role authorization. Keep `.env` out of version control, use a managed PostgreSQL connection string in deployment, and replace generated placeholder photography with approved Dockhub assets.
