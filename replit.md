# Omyra Fancy Dress & School Uniforms

A marketing/e-commerce website for Omyra, built with React + Vite + Tailwind CSS.

## Run & Operate

- `pnpm --filter @workspace/omyra-website run dev` — start the dev server
- `pnpm --filter @workspace/omyra-website run build` — production build
- `pnpm --filter @workspace/omyra-website run typecheck` — type-check the website

## Stack

- pnpm workspaces, Node.js, TypeScript
- Frontend: React 19, Vite 7, Tailwind CSS v4, shadcn/ui (Radix UI), Framer Motion, Wouter (routing)
- State/Data: TanStack React Query, React Hook Form + Zod
- pnpm monorepo — **only work on `artifacts/omyra-website`**; ignore `artifacts/mockup-sandbox` and `artifacts/api-server`

## Where things live

- `artifacts/omyra-website/src/` — all source code
- `artifacts/omyra-website/src/components/` — UI components
- `artifacts/omyra-website/src/pages/` — page-level components
- `artifacts/omyra-website/public/` — static assets

## User preferences

- Work exclusively in `artifacts/omyra-website`; ignore the other artifacts
- Dev server reads `PORT` env var (defaults to 5173); artifact serves on port 19835

## Gotchas

- Vite config reads `process.env.PORT` to bind the correct port for the Replit preview proxy
