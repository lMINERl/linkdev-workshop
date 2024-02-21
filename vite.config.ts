import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import autoprefixer from "autoprefixer";
import viteSVGR from "vite-plugin-svgr";
// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react(), viteSVGR()],
  css: {
    postcss: {
      plugins: [autoprefixer({})],
    },
  },
  server: {
    port: 3000,
  },
  build: {
    target: "esnext",
  },
});
