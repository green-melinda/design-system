# Design system

Melinda's base design system for personal projects: shadcn/ui components on React and Tailwind 4, documented in Storybook, with a matching Figma library. Each project gets its own theme file. Components never change per project.

**Live Storybook:** https://green-melinda.github.io/design-system/ (use the Theme and Mode toolbars to switch themes and light or dark mode)

## See the components

From this folder, start Storybook:

```bash
npm run storybook
```

Then open http://localhost:6006.

- **Sidebar:** Components and Foundations. Each component lists its stories, one per state.
- **Toolbar:** Theme switches between Neutral and Civic Ink. Mode switches light and dark.
- **Bottom panel:** Controls changes a component's settings live. Accessibility runs WCAG checks on the current story.

If the terminal says `command not found: npm`, your shell can't find Node. Node lives in `~/.local/bin`, and `~/.zshrc` adds it to your PATH. Open a new terminal, or run `source ~/.zshrc`.

If it says port 6006 is in use, Storybook is already running. Open the link.

## Where things live

- `token-inventory.md`: every token slot and what it's for
- `src/styles/tokens.css`: slot defaults and the Tailwind mapping
- `src/styles/themes/`: one file per theme
- `src/components/ui/`: components, each with a story next to it
- `figma/`: values and IDs for syncing the Figma library
  (https://www.figma.com/design/F5WxlYcN6W1z3K56I9OoEu)
