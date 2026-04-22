# AGENTS.md

## Purpose

This repository uses this file as the local working contract for coding agents and collaborators.

## Project Context

- Stack: Next.js 15 + React 19
- App router structure in `app/`
- Shared UI in `components/`
- Content, store state, and helpers in `lib/`
- Static assets in `public/`
- Main config file: `next.config.mjs`
- Default UI language: French, with an English toggle already present in the app

## Source Of Truth

- Treat `package.json` as the source of truth for runnable commands.
- Treat `package-lock.json` as the source of truth for installed dependency versions.
- If those two files drift, fix the inconsistency before claiming the project is healthy.

## Commands

- Development: `npm run dev`
- Production build: `npm run build`
- Production server: `npm run start`

## Working Style

- Make focused changes and keep diffs easy to review.
- Preserve the current architecture unless the task explicitly asks for a refactor.
- Reuse existing patterns from nearby files before introducing a new abstraction.
- Prefer simple client-side React code over clever indirection.
- Use ASCII by default unless a file already relies on non-ASCII text intentionally.

## Frontend Rules

- Keep the current boutique/e-commerce flow intact: home, boutique, product page, cart, account, confirmation, reviews, contact, about.
- Preserve the existing bilingual behavior when editing user-facing copy.
- Keep layouts responsive and verify both desktop and mobile surfaces for UI work.
- Reuse existing CSS classes and component structure before adding new styling patterns.
- Favor consistency with `SiteNavbar`, `SiteFooter`, `StoreProvider`, and the current page shell patterns.

## Validation Rules

- For config changes, run the smallest relevant check first.
- For app changes, prefer `npm run build` as the main verification step when feasible.
- If a command cannot be run, say exactly why.
- Never claim lint or tests passed unless they actually ran.

## Agent Workflow

- Use one agent to review and verify the codebase before or during substantial work.
- Use a separate agent to apply confirmed, minimal fixes when parallel work is useful.
- The review agent should report bugs, risks, regressions, missing scripts, and verification gaps.
- The fix agent should avoid speculative rewrites and only patch issues it can confirm.
- Do not let one agent overwrite another agent's work without first reading the latest file state.

## Safety

- Never revert unrelated user changes.
- Assume the worktree may already be dirty.
- Read files before editing them.
- Avoid destructive git commands unless the user explicitly requests them.

## Communication

- Summarize changes in plain language.
- Call out assumptions, blockers, and skipped verification clearly.
- Prefer directness over guesswork when repository state is incomplete or inconsistent.
