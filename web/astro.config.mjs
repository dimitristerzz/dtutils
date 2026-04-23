import { defineConfig } from 'astro/config';
import tailwindcss from "@tailwindcss/vite";

export default defineConfig({
  vite: {
    plugins: [tailwindcss()],
  },
  site: 'https://dimitristerzz.github.io/dtutils/',
  base: 'dtutils',
  server: {
    host: true,
    port: 8080
  },
});