// Reads every slot's final value for each theme and mode, the way a browser
// resolves them, including color-mix() results that Figma can't compute.
//
// How to run: start Storybook (npm run storybook), open any story, then run
// this file in the browser console of the Storybook page (not the preview
// iframe). It returns JSON. Save it as figma/tokens.json and re-sync Figma.

const THEMES = { neutral: null, "civic-ink": "civic-ink" };
const MODES = ["light", "dark"];

const COLOR_SLOTS = [
  "background", "foreground", "card", "card-foreground", "popover", "popover-foreground",
  "muted", "muted-foreground", "placeholder", "secondary", "secondary-foreground", "secondary-hover",
  "accent", "accent-foreground", "overlay",
  "primary", "primary-foreground", "primary-hover", "link", "link-hover",
  "destructive", "destructive-foreground", "destructive-hover", "destructive-subtle",
  "success", "success-foreground", "success-subtle",
  "warning", "warning-foreground", "warning-subtle",
  "info", "info-foreground", "info-subtle",
  "border", "input", "ring",
  "chart-1", "chart-2", "chart-3", "chart-4", "chart-5",
  "sidebar", "sidebar-foreground", "sidebar-primary", "sidebar-primary-foreground",
  "sidebar-accent", "sidebar-accent-foreground", "sidebar-border", "sidebar-ring",
];

// Read as plain strings. Numbers are per theme only; they don't change in dark mode.
const OTHER_SLOTS = [
  "typeface-heading", "typeface-body", "typeface-mono", "heading-weight",
  "heading-tracking", "label-tracking", "heading-case", "label-case",
  "radius", "corner-sm", "corner-md", "corner-lg", "corner-xl",
  "border-width", "ring-width", "ring-offset", "disabled-opacity",
];

const doc = document.querySelector("#storybook-preview-iframe").contentDocument;
const root = doc.documentElement;
const saved = { theme: root.dataset.theme, dark: root.classList.contains("dark") };

const probe = doc.createElement("div");
doc.body.appendChild(probe);
const canvas = doc.createElement("canvas");
canvas.width = canvas.height = 1;
const ctx = canvas.getContext("2d", { willReadFrequently: true });

const hex = (n) => n.toString(16).padStart(2, "0").toUpperCase();
function resolveColor(slot) {
  probe.style.color = `var(--${slot})`;
  const css = getComputedStyle(probe).color;
  ctx.clearRect(0, 0, 1, 1);
  ctx.fillStyle = css;
  ctx.fillRect(0, 0, 1, 1);
  const [r, g, b, a] = ctx.getImageData(0, 0, 1, 1).data;
  return "#" + hex(r) + hex(g) + hex(b) + (a < 255 ? hex(a) : "");
}

const out = { generatedFrom: "src/styles/tokens.css + src/styles/themes/*.css", themes: {} };
for (const [name, attr] of Object.entries(THEMES)) {
  if (attr) root.dataset.theme = attr; else delete root.dataset.theme;
  out.themes[name] = { other: {} };
  for (const mode of MODES) {
    root.classList.toggle("dark", mode === "dark");
    out.themes[name][mode] = Object.fromEntries(COLOR_SLOTS.map((s) => [s, resolveColor(s)]));
  }
  root.classList.remove("dark");
  const cs = getComputedStyle(root);
  out.themes[name].other = Object.fromEntries(OTHER_SLOTS.map((s) => [s, cs.getPropertyValue(`--${s}`).trim()]));
}

probe.remove();
if (saved.theme) root.dataset.theme = saved.theme; else delete root.dataset.theme;
root.classList.toggle("dark", saved.dark);
JSON.stringify(out, null, 2);
