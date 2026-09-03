# DOCKHUB-3D-WORKSPACE

DOCKHUB-3D-WORKSPACE is a production-oriented foundation for a premium, room-by-room workspace showcase. Visitors can move through static office interiors without page reloads, compare capacity and approved pricing, inspect room details, and review future pass offerings.

> The product direction changed during foundation work. This phase intentionally uses static room photography and standard web transitions. It does **not** include Three.js, WebGL, React Three Fiber, GLB assets, or camera navigation.

## Current phase

Included now:

- Public landing page with database-backed summary metrics and featured spaces
- Guided `/showcase` experience with previous/next controls and thumbnails
- Space catalogue and detail pages
- Pricing and pass-plan pages
- Read-only admin dashboard, rooms, pricing, and passes views
- PostgreSQL schema, repeatable Prisma seed, and initial migration
- Six temporary room-background assets designed for easy replacement

Explicitly deferred: booking workflows, payments, authentication/authorization, admin CRUD, live inventory updates, and final room photography.

## Stack

- Next.js 16 App Router, React 19, and TypeScript
- Material UI and Emotion
- Prisma ORM 6 with PostgreSQL
- Zod
- React Hook Form and Hook Form resolvers (installed for later form work)
- Lucide React icons

Tailwind and all 3D/WebGL dependencies are intentionally absent.

## Local setup

Prerequisites:

- Node.js 20.9 or newer
- npm
- PostgreSQL 14 or newer

Install dependencies:

```bash
npm install
```

Create a PostgreSQL database:

```sql
CREATE DATABASE dockhub_3d_workspace;
```

Copy the environment template and update credentials for your local PostgreSQL instance:

```bash
cp .env.example .env
```

The expected variable is:

```dotenv
DATABASE_URL="postgresql://postgres:password@localhost:5432/dockhub_3d_workspace?schema=public"
```

Generate the client, apply the migration, seed confirmed data, and start development:

```bash
npx prisma generate
npx prisma migrate dev --name initial_setup
npm run db:seed
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

## Useful commands

```bash
npm run dev
npm run build
npm run lint
npm run db:generate
npm run db:migrate
npm run db:seed
npm run db:studio
npx tsc --noEmit
npx prisma validate
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
- `src/services` is the only application layer that queries Prisma.
- `src/types` contains serializable view models passed to UI components.
- `src/components/showcase/ShowcaseShell.tsx` owns the small amount of client state needed for no-reload room navigation.
- Prisma prices are converted from `Decimal` values to numbers at the service boundary; dates are converted to ISO strings.
- Business pricing remains in `RoomPricing`, never in `Room` or React components.
- Database-backed pages are request-rendered, so production builds do not require a reachable database. Runtime pages do require a migrated and seeded PostgreSQL instance.

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

## Seed data and known ambiguities

The seed is idempotent and creates six room records. Only two contain commercial pricing:

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
