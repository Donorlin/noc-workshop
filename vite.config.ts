import react from "@vitejs/plugin-react";
import { msw } from "msw/vite";
import { fileURLToPath, URL } from "node:url";
import { defineConfig } from "vitest/config";

// Requests to /api are answered by MSW mocks in development (see docs/api-and-mocks.md).
// Set VITE_API_MOCKING=disabled and API_PROXY_TARGET=https://… to call a real backend instead.
export default defineConfig({
  plugins: [react(), msw({ mode: "worker-only" })],
  resolve: {
    alias: { "@": fileURLToPath(new URL("./src", import.meta.url)) },
  },
  server: {
    port: 5173,
    proxy: process.env.API_PROXY_TARGET
      ? { "/api": { target: process.env.API_PROXY_TARGET, changeOrigin: true } }
      : undefined,
  },
  test: {
    environment: "jsdom",
    globals: true,
    setupFiles: ["src/test/setup.ts"],
    css: false,
  },
});
