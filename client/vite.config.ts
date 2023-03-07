import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import svgr from "vite-plugin-svgr";
import path from "path";

// https://vitejs.dev/config/
export default defineConfig({
  resolve: {
    alias: {
      "@wom": path.resolve(__dirname, "./src/components"),
    },
  },
  plugins: [react(), svgr()],
});
