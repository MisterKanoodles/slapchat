import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// Relative base so the build works from the GitHub Pages subpath (/slapchat/).
export default defineConfig({
  base: "./",
  plugins: [react()]
});
