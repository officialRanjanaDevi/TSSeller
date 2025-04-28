import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    react({
      include: "**/*.{jsx,js}", // Corrected pattern
    }),
  ],
  server: {
    host: true,
    hmr: {
      overlay: false,
    },
  },
  define: {
    "process.env": {},
  },
});

