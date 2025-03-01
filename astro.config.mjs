import { defineConfig } from "astro/config";
import tailwindcss from "@tailwindcss/vite";
import icon from "astro-icon";

import vercel from "@astrojs/vercel";

import react from "@astrojs/react";

export default defineConfig({
  integrations: [icon(), react()],

  vite: {
    plugins: [tailwindcss()],
  },
  output: 'server',
  adapter: vercel(),
});