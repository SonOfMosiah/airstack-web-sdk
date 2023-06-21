import react from "@vitejs/plugin-react";
import path from "node:path";
import { defineConfig, configDefaults } from "vitest/config";
import dts from "vite-plugin-dts";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react(), dts()],
  build: {
    lib: {
      entry: path.resolve(__dirname, "src/lib/index.ts"),
      name: "airstack-web-sdk",
      formats: ["es", "umd"],
      fileName: (format) => `airstack-web-sdk.${format}.js`,
    },
    rollupOptions: {
      external: ["react", "react-dom"],
      output: {
        globals: {
          react: "React",
          "react-dom": "ReactDOM",
        },
      },
    },
  },
  test: {
    exclude: [...configDefaults.exclude],
    environment: "jsdom",
    globals: true,
    setupFiles: ["./setupTests.js"],
  },
});
