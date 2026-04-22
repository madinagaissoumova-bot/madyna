---
name: mobile-responsive
description: Audit and improve the mobile version of an interface when the user asks for better responsive behavior, cleaner mobile layouts, easier tap targets, improved mobile navigation, or mobile-first fixes. Use for CSS breakpoints, stacking, spacing, touch ergonomics, and mobile conversion flows.
---

# Mobile Responsive

Use this skill when the problem is specifically about the phone-sized experience, responsive breakpoints, or mobile usability.

## Quick Start

1. Identify the most important mobile journey first: discover, browse, buy, submit, or navigate.
2. Check the header, menu, hero, cards, forms, and CTA placement before making stylistic tweaks.
3. Fix layout breakage and touch ergonomics before polish.
4. Keep desktop behavior stable while improving mobile clarity.
5. Re-check vertical rhythm, tap targets, and next-step clarity at the end.

## Workflow

### 1. Find the highest-friction mobile surface

- Start with the main mobile path, not isolated widgets.
- Look for overflow, clipped text, cramped controls, weak hierarchy, and confusing next actions.
- Prioritize navigation, product/detail pages, carts, and forms.

### 2. Improve mobile structure

- Stack content in a natural reading order.
- Reduce side-by-side layouts that become cramped below tablet widths.
- Make section spacing consistent so screens feel intentional instead of collapsed.
- Keep key actions visible without long scanning.

### 3. Improve touch ergonomics

- Make controls comfortable to tap.
- Add enough spacing between adjacent actions.
- Keep labels readable without requiring zoom.
- Ensure focus and active states remain visible on mobile.

### 4. Improve mobile conversion flow

- Make the next step explicit on cart, account, and confirmation surfaces.
- Remove misleading labels that imply a completed backend action when the flow is still local or mocked.
- Use helper text sparingly to reduce hesitation at critical steps.

## Guardrails

- Do not shrink everything just to fit more on screen.
- Do not leave desktop-only interaction assumptions on mobile.
- Do not hide critical actions behind weak visual hierarchy.
- Do not fix one breakpoint while ignoring the overall mobile flow.

## References

- For a compact mobile audit, read `references/mobile-checklist.md`.

