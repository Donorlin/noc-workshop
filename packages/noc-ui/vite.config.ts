import react from "@vitejs/plugin-react";
import { defineConfig } from "vitest/config";

// Tests of the library. The library has no build: applications in this repository compile its source.
export default defineConfig({
  plugins: [react()],
  test: {
    environment: "jsdom",
    globals: true,
    setupFiles: ["src/test/setup.ts"],
    css: false,
  },
});
