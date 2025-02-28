import { defineConfig } from "astro/config";
import tailwindcss from "@tailwindcss/vite";
import icon from "astro-icon";

import vercel from "@astrojs/vercel";

export default defineConfig({
  integrations: [icon()],

  vite: {
    plugins: [tailwindcss()],
  },
  output: 'server',
  adapter: vercel(),
});