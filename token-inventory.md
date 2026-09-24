# Token inventory

Draft 2 · September 2026 · Slot names and jobs. Neutral defaults live in `styles/tokens.css`

This page lists every token slot the system needs. A theme is a file that fills in these slots. Components read the slots and never read a theme directly.

Nothing here belongs to Civic Ink or any other brand. Values come later, one theme at a time.

## How the layers work

1. **Palette.** Each theme's raw colors and fonts, named however the theme likes: `acid`, `cobalt`, `Schibsted Grotesk`. Components never touch these.
2. **Slots.** The names components use: `--primary`, `--typeface-heading`, `--radius`. Every theme fills every slot, usually by pointing at its own palette.
3. **Component overrides.** A slot aimed at one component, like `--button-radius`. Avoid these. Add one only when a real theme needs it and a general slot can't do the job.

This page covers layer 2.

## Legend

- **shadcn** means the slot already exists and components use it.
- **Add** means we create it, and components we write or update will use it.
- **Add + edit** means a shadcn component hardcodes this value today, so we change that code to read the slot.

## Themed vs. shared

Themes change color, fonts, heading style, radius, border width, shadows, focus style, and motion.

Every theme shares spacing, the type size scale, breakpoints, and layout widths. If two projects feel different, it should be because of color, type, and shape. Changing spacing per theme breaks layouts in ways that are hard to spot.

---

## 1. Color

Values can be hex. Tailwind 4 accepts any CSS color.

### Surfaces

| Slot | Status | Job |
|---|---|---|
| `--background` | shadcn | Page background |
| `--card` | shadcn | Cards and panels that sit on the page |
| `--popover` | shadcn | Menus, dropdowns, tooltips |
| `--muted` | shadcn | Quiet fills: table stripes, disabled fields, code blocks |
| `--secondary` | shadcn | Secondary button fill |
| `--accent` | shadcn | Hover fill on menu items and ghost buttons. **Not a brand color.** Keep it neutral |
| `--overlay` | Add + edit | Scrim behind dialogs. shadcn hardcodes black at 50% |

### Text

Each surface above has a matching `-foreground` slot for text on that surface: `--foreground`, `--card-foreground`, `--popover-foreground`, `--muted-foreground`, `--secondary-foreground`, `--accent-foreground`. All shadcn.

`--muted-foreground` does double duty as secondary text anywhere, like captions and helper text.

### Action and brand

| Slot | Status | Job |
|---|---|---|
| `--primary` | shadcn | Main action: primary buttons, selected states, checked boxes |
| `--primary-foreground` | shadcn | Text on primary |
| `--link` | Add | Inline links. shadcn styles links with `primary`, which breaks if primary is a pale color like acid |

### Feedback

shadcn only ships `destructive`. Alerts, badges, and form validation need the full set.

| Slot | Status | Job |
|---|---|---|
| `--destructive` | shadcn | Errors, delete actions |
| `--destructive-foreground` | Add | Text on a solid destructive fill |
| `--destructive-subtle` | Add + edit | Pale background for error alerts and invalid fields |
| `--success`, `-foreground`, `-subtle` | Add | Confirmations, completed states |
| `--warning`, `-foreground`, `-subtle` | Add | Needs attention, not broken |
| `--info`, `-foreground`, `-subtle` | Add | Neutral notices |

The `-subtle` slots matter more than they look. A solid red alert box is loud. Most alerts should use the subtle fill with the strong color on the border and icon.

### Lines

| Slot | Status | Job |
|---|---|---|
| `--border` | shadcn | Dividers, card edges |
| `--input` | shadcn | Form field borders |
| `--ring` | shadcn | Focus ring color |

### Data

`--chart-1` through `--chart-5` are shadcn. Keep them. Five colors that stay distinct from each other and from feedback colors are hard to pick, so every theme has to test this set on purpose.

### Sidebar

shadcn has eight `--sidebar-*` slots. They default to the surface slots, so a theme only fills them in when it wants a sidebar that looks different from the page.

---

## 2. Typography

Tailwind 4 already has font slots. shadcn doesn't set them, so every theme inherits the browser default until we do.

| Slot | Status | Job |
|---|---|---|
| `--typeface-heading` | Add | Headings and display text |
| `--typeface-body` | Add | Everything else. Feeds Tailwind's `font-sans` |
| `--typeface-mono` | Add | Code, IDs, tabular numbers |
| `--heading-weight` | Add | A serif heading might want 400, a grotesk heading 700 |
| `--heading-tracking` | Add | Tight tracking for large display type |
| `--heading-case` | Add | `none` or `uppercase` for headings |
| `--label-case` | Add | `none` or `uppercase` for eyebrows, tags, and small labels |
| `--label-tracking` | Add | Wider letter spacing for uppercase labels, which read cramped at default spacing |

Write all copy in sentence case and let the case slots uppercase it. Screen readers then read the words normally, and switching themes never means rewriting copy.

**Shared, not themed:** the size scale from `xs` to `9xl`, line heights, and body tracking. Tailwind provides all of these. A theme that needs bigger headings should pick a heading font with a larger x-height, not resize the scale.

---

## 3. Shape

| Slot | Status | Job |
|---|---|---|
| `--radius` | shadcn | One base value on the 4pt grid. `0` makes a sharp theme |
| `--corner-sm`, `-md`, `-lg`, `-xl` | Add | Every corner size. All four default to `--radius`, so corners are flat unless a theme asks for a graduated scale |
| `--border-width` | Add + edit | shadcn hardcodes 1px. Brutalist themes want 2px. Touches most components |

shadcn used to derive corner sizes by multiplying `--radius`, which put a 4px theme at 3.2px and 2.4px. The corner slots replace that, so every value a theme sets is a value you chose.

`--border-width` is the most expensive slot on this page. It's still worth it, because border weight changes how a theme feels more than radius does.

---

## 4. Elevation

shadcn components use Tailwind's `shadow-xs`, `shadow-md`, and `shadow-lg` classes. Three slots feed those classes, named by what they sit under.

| Slot | Status | Job |
|---|---|---|
| `--elevation-control` | Add | Inputs, buttons. Feeds `shadow-xs` and `shadow-sm` |
| `--elevation-popover` | Add | Dropdowns, popovers. Feeds `shadow-md` |
| `--elevation-dialog` | Add | Dialogs, sheets. Feeds `shadow-lg` |

A flat theme sets all three to `none`. A brutalist theme sets hard offset shadows like `4px 4px 0 var(--foreground)`.

---

## 5. Motion

| Slot | Status | Job |
|---|---|---|
Themes control both parts of motion. Duration is how long a movement takes. Easing is the speed curve during it.

| Slot | Status | Job |
|---|---|---|
| `--duration-fast` | Add | Hover, toggles. Default 100ms |
| `--duration-base` | Add | Menus opening, accordions. Default 200ms |
| `--duration-slow` | Add | Dialogs, page transitions. Default 300ms |
| `--easing-out` | Add | Things arriving: fast start, gentle stop |
| `--easing-in-out` | Add | Things moving from one place to another |

Every duration drops to 0 under `prefers-reduced-motion`, whatever the theme says. That rule lives in the token file, and themes can't override it.

---

## 6. States

shadcn handles states with hardcoded numbers inside components. Pulling them into slots lets a theme change them in one place.

The hover slots default to the base color mixed 12% toward `--foreground`. That darkens on light themes and lightens on dark ones. A theme only sets them when the default looks muddy, which pale fills like acid will.

| Slot | Status | Job |
|---|---|---|
| `--ring-width` | Add + edit | Focus ring thickness. shadcn uses 3px |
| `--ring-offset` | Add + edit | Gap between element and ring |
| `--disabled-opacity` | Add + edit | shadcn uses 50% |
| `--primary-hover` | Add | Hover fill for primary buttons |
| `--secondary-hover` | Add | Hover fill for secondary buttons |
| `--destructive-hover` | Add | Hover fill for destructive buttons |
| `--link-hover` | Add | Link color on hover |

Every theme must pass one rule. The focus ring hits 3:1 contrast against both `--background` and `--primary`. That's WCAG 1.4.11, and it's the check themes fail most often.

---

## 7. Layout

Breakpoints, container widths, and the spacing base unit are all shared. Tailwind 4 derives spacing from one `--spacing` value, 4px. No theme touches these.

---

## Decisions

1. **No generic `--brand` slot.** A color with no fixed job gets used everywhere and means nothing. A theme's second color gets a job, like `--link` or `--info`.
2. **Sidebar slots stay,** defaulting to the surface slots.
3. **Heading and label case are themed.** Copy stays in sentence case.
4. **Themes control motion,** both duration and easing.
5. **Explicit hover slots,** with a computed default so most themes can skip them.

## Count

72 slots. 16 of them compute themselves from other slots (hovers, subtle fills, sidebar), so a theme sets 56 at most and can usually leave the neutral defaults for many of those.

shadcn's components already read 32 slots. The other 40 do nothing until components use them. That happens as we pull in each component, not all at once.
