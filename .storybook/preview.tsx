import type { Preview } from "@storybook/react-vite";
import { useEffect } from "react";

import "../src/styles/globals.css";

// Add each new theme here once its file is imported in globals.css.
const themes = [{ value: "none", title: "Neutral defaults" }];

const preview: Preview = {
  globalTypes: {
    theme: {
      description: "Theme",
      toolbar: { title: "Theme", icon: "paintbrush", items: themes, dynamicTitle: true },
    },
    mode: {
      description: "Light or dark",
      toolbar: {
        title: "Mode",
        icon: "mirror",
        items: [
          { value: "light", title: "Light" },
          { value: "dark", title: "Dark" },
        ],
        dynamicTitle: true,
      },
    },
  },
  initialGlobals: { theme: "none", mode: "light" },

  // Themes and dark mode live on <html>, the same place an app puts them.
  decorators: [
    (Story, context) => {
      const { theme, mode } = context.globals;
      useEffect(() => {
        const root = document.documentElement;
        if (theme && theme !== "none") root.dataset.theme = theme;
        else delete root.dataset.theme;
        root.classList.toggle("dark", mode === "dark");
      }, [theme, mode]);
      return <Story />;
    },
  ],

  parameters: {
    layout: "padded",
    backgrounds: { disable: true },
    controls: { matchers: { color: /(background|color)$/i, date: /Date$/i } },
    a11y: { test: "todo" },
  },
};

export default preview;
