import react from '@vitejs/plugin-react';
import path from "path";
import { defineConfig } from 'vite';

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    port: 4000,
  },
  resolve: {
    // alias: {
    //   "@": path.resolve("src"),
    // },
    alias: {
      constants: path.resolve("src/constants"),
      context: path.resolve("src/context"),
      components: path.resolve("src/components"),
      layouts: path.resolve("src/layouts"),
      pages: path.resolve("src/pages"),
      routes: path.resolve("src/routes"),
      services: path.resolve("src/services"),
      hooks: path.resolve("src/hooks"),
      utils: path.resolve("src/utils"),
    },
  },
})
