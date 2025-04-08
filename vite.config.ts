import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  base: "/vite-deploy-demo/",
  server: {
    port: 5174,
  },
  // esbuild: { drop: ["console", "debugger"] },
});
