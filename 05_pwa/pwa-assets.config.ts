import { defineConfig, minimal2023Preset } from "@vite-pwa/assets-generator/config";

// Generates the app icons (npm run generate:icons) from public/favicon.svg
export default defineConfig({
  preset: minimal2023Preset,
  images: ["public/favicon.svg"],
});
