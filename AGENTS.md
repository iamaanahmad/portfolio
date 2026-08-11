# AGENTS.md

## Repository Expectations

- This is a Next.js App Router portfolio site. The main landing page lives in `app/page.tsx`.
- Keep the existing visual direction intact unless the user asks for a redesign: terminal-inspired, high-contrast, motion-heavy, cyberpunk-leaning UI.
- Prefer targeted content and component edits over large refactors.

## Project Layout

- `app/page.tsx`: primary page content, sections, and curated project data.
- `app/layout.tsx`: metadata, fonts, and root shell.
- `components/`: reusable or legacy section components. Some are not currently wired into `app/page.tsx`, so verify usage before editing broadly.
- `lib/`: shared utilities and GitHub helpers.

## Verification

- Run `npm run lint` after code changes.
- Run `npm run build` after structural UI or metadata changes when practical.
- There is no dedicated test suite in this repo right now.

## Content Guidance

- Keep portfolio claims factual and aligned with the repository state.
- When updating Codex-related copy, prefer current Codex terminology: `AGENTS.md`, skills, plugins, hooks, MCP, and subagents.
- Do not present reusable "prompts" as the primary Codex customization surface; current Codex guidance favors skills and plugins for reusable workflows.

## Dependency Guidance

- Reuse the existing Next.js, Tailwind, and Framer Motion stack.
- Do not add new production dependencies unless they are necessary for the requested change.
