import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import { visualizer } from "rollup-plugin-visualizer";
import compression from "vite-plugin-compression";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    react(),
    visualizer({
      open: true, // Opens the report in the browser after build
    }),
    compression({
      algorithm: "gzip", // Options: 'gzip', 'brotliCompress', 'deflate', 'deflateRaw'
      ext: ".gz", // File extension for the compressed files
      threshold: 10240, // Minimum file size (in bytes) to compress
      deleteOriginFile: false, // Keep the original uncompressed files
    }),

    // Optional: Enable Brotli compression as well
    compression({
      algorithm: "brotliCompress",
      ext: ".br",
      threshold: 10240,
    }),
  ],
  build: {
    sourcemap: true,
    rollupOptions: {
      output: {
        manualChunks: {
          vendor: ["react", "react-dom"],
        },
      },
    },
  },
});
