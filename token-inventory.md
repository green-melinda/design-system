# Token inventory

Draft 1 · September 2026 · Structure only, no values

This page lists every token slot the system needs. A theme is a file that fills in these slots. Components read the slots and never read a theme directly.

Nothing here belongs to Civic Ink or any other brand. Values come later, one theme at a time.

## How the layers work

1. **Palette.** Each theme's raw colors and fonts, named however the theme likes: `acid`, `cobalt`, `Playfair`. Components never touch these.
2. **Slots.** The names components use: `--primary`, `--font-heading`, `--radius`. Every theme fills every slot, usually by pointing at its own palette.
3. **Component overrides.** A slot aimed at one component, like `--button-radius`. Avoid these. Add one only when a real theme needs it and a general slot can't do the job.

This page covers layer 2.

## Legend

- **shadcn** means the slot already exists and components use it.
- **Add** means we create it. Components need no edits.
- **Add + edit** means we create it and change some component code to read it.
- **Decide** means an open question, listed at the bottom.

## Themed vs. shared

Themes change color, fonts, heading style, radius, border width, shadows, and focus style.

Every theme shares spacing, the type size scale, breakpoints, and layout widths. If two projects feel different, it should be because of color, type, and shape. Changing spacing per theme breaks layouts in ways that are hard to spot.

Motion is the exception, see question 4.

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
| `--brand` | Decide | A second brand color with no fixed job. See question 1 |

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

shadcn has eight `--sidebar-*` slots. Decide, see question 2.

---

## 2. Typography

Tailwind 4 already has font slots. shadcn doesn't set them, so every theme inherits the browser default until we do.

| Slot | Status | Job |
|---|---|---|
| `--font-heading` | Add | Headings and display text |
| `--font-body` | Add | Everything else. Maps to Tailwind's `--font-sans` |
| `--font-mono` | Add | Code, IDs, tabular numbers |
| `--font-weight-heading` | Add | A serif heading might want 400, a grotesk heading 700 |
| `--tracking-heading` | Add | Tight tracking for large display type |
| `--heading-case` | Decide | Some themes want uppercase headings or eyebrows. See question 3 |

**Shared, not themed:** the size scale from `xs` to `9xl`, line heights, and body tracking. Tailwind provides all of these. A theme that needs bigger headings should pick a heading font with a larger x-height, not resize the scale.

---

## 3. Shape

| Slot | Status | Job |
|---|---|---|
| `--radius` | shadcn | One base value. shadcn derives `sm` through `4xl` from it. `0` makes a sharp theme |
| `--border-width` | Add + edit | shadcn hardcodes 1px. Brutalist themes want 2px. Touches most components |

`--border-width` is the most expensive slot on this page. It's still worth it, because border weight changes how a theme feels more than radius does.

---

## 4. Elevation

Tailwind has `--shadow-2xs` through `--shadow-2xl`, and shadcn components already use them. Themes redefine the values.

| Slot | Used for |
|---|---|
| `--shadow-xs` | Inputs, buttons |
| `--shadow-md` | Dropdowns, popovers |
| `--shadow-lg` | Dialogs, sheets |

A flat theme sets all three to `none`. A brutalist theme sets hard offset shadows like `4px 4px 0 var(--foreground)`. No new slots needed, only a rule about which size goes where.

---

## 5. Motion

| Slot | Status | Job |
|---|---|---|
| `--duration-fast` | Add | Hover, toggles. Around 100ms |
| `--duration-base` | Add | Menus opening, accordions |
| `--duration-slow` | Add | Dialogs, page transitions |
| `--ease-out`, `--ease-in-out` | Tailwind | Curves |

Every duration drops to 0 under `prefers-reduced-motion`. That rule lives in the system, not in each theme.

---

## 6. States

shadcn handles states with hardcoded numbers inside components. Pulling them into slots lets a theme change them in one place.

| Slot | Status | Job |
|---|---|---|
| `--ring-width` | Add + edit | Focus ring thickness. shadcn uses 3px |
| `--ring-offset` | Add + edit | Gap between element and ring |
| `--disabled-opacity` | Add + edit | shadcn uses 50% |
| Hover | Decide | See question 5 |

Every theme must pass one rule. The focus ring hits 3:1 contrast against both `--background` and `--primary`. That's WCAG 1.4.11, and it's the check themes fail most often.

---

## 7. Layout

Breakpoints, container widths, and the spacing base unit are all shared. Tailwind 4 derives spacing from one `--spacing` value, 4px. No theme touches these.

---

## Open questions

Each has my recommendation. Mark up whichever ones you disagree with.

1. **`--brand` slot.** Civic Ink has two accents. Other themes might have one or three. I'd skip a generic `--brand` slot. A color with no fixed job gets used everywhere and means nothing. If a theme has a second color, give it a job first, like `--link` or `--info`.
2. **Sidebar slots.** Keep them only if your projects have app-style sidebars. The membership database probably does. I'd keep them and default them to the surface slots, so themes only fill them in when they want a different sidebar.
3. **Heading case.** CSS can't swap `text-transform` through a variable in a clean way, so this becomes a class per theme. I'd leave it out of draft 1 and add it when a theme needs it.
4. **Motion per theme.** A playful project might want bouncier curves. I'd keep durations shared and let themes change curves only.
5. **Hover.** shadcn darkens on hover by fading the fill to 90% opacity. That works for dark fills and looks muddy on pale ones like acid. The fix is `--primary-hover`, `--secondary-hover`, and so on, which is six more slots. I'd add them. Muddy hover states are the first thing that makes a theme look cheap.

## Count

About 55 slots. shadcn supplies about 30. We add about 25, and 6 of those need component edits. Question 5 would add 6 more.
