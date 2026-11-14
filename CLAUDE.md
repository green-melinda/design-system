# Design system

A themeable component library for Melinda's personal projects. shadcn/ui components on React, Tailwind 4, and Storybook 10. Each project gets its own theme file. Components never change per project.

## Where things live

- `token-inventory.md`: every token slot and its job. Read this before adding or renaming a slot.
- `src/styles/tokens.css`: every slot with neutral defaults, computed slots, and the Tailwind mapping.
- `src/styles/themes/`: one CSS file per theme, scoped to `[data-theme="name"]`.
- `src/components/ui/`: components pulled from shadcn, then edited to read slots.
- `src/foundations/`: Storybook pages that show the tokens themselves.

## Rules

- Components read slots, never raw values. No hex codes, no `text-white`, no `ring-[3px]` in component code.
- Slot names never start with a Tailwind prefix (`--font-`, `--tracking-`, `--shadow-`, `--ease-`, `--color-`). Those names belong to the mapping in `tokens.css`.
- Themes and dark mode go on `<html>`: `data-theme="name"` and the `.dark` class.
- A new theme also goes in the Theme toolbar list in `.storybook/preview.tsx`.
- After `npx shadcn add`, check the generated imports and replace hardcoded values with slots. Hover uses the `-hover` slots, not `/90` opacity. Focus ring width, disabled opacity, border width, and transition timing use their slots.
- Every component gets a story next to it: `button.tsx` and `button.stories.tsx`.
- Fields get a visible label and, when needed, helper text below. Don't use placeholder text to carry labels or instructions, in stories or in projects. Components still style placeholders with the `--placeholder` slot in case one shows up.
- Everything sits on the 4pt grid: spacing, sizes, gaps, corners, and slot values. Prefer 8pt steps where they fit. Half steps like `px-1.5` or `gap-2.5` (6px, 10px) are off-grid. Only border and focus ring widths (1px to 3px) are exempt.

## Storybook

Storybook serves its own instructions for AI agents. Use two of them:

- Before writing or editing a story, run `npx storybook skills write-story` and follow its conventions for imports and story patterns.
- For questions about a component's props, run `npx storybook tools docs list`, then `npx storybook tools docs show <id>`. Storybook must be running (`npm run storybook`).

Skip the rest:

- Don't run `npx storybook skills setup`. It configures app mocking (MSW, providers, routing), and this repo is a component library with no app.
- Ignore instructions about vitest and interaction test runs. The test runner isn't installed.
- Don't end replies with Storybook's review section or emoji headings. Share a plain story link when one helps.
