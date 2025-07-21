import path from "path";
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import { VitePWA } from "vite-plugin-pwa";

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    react(),
    VitePWA({
      registerType: "autoUpdate",
      strategies: "injectManifest",
      injectRegister: "inline",
      devOptions: {
        enabled: true,
        type: "module",
        navigateFallback: "/",
      },
      manifest: {
        name: "Xamirxona",
        short_name: "xamirxona-bakery",
        description: "Islombek nonlari: Xamirxona",
        theme_color: "#1C2C57",
        icons: [
          {
            src: "logo.svg",
            sizes: "165x165",
            type: "image/png",
          },
        ],
        background_color: "#1C2C57",
        start_url: "/",
        display: "standalone",
      },
      workbox: {
        globPatterns: ["**/*.{js,css,html,png,svg,jpg}"],
        runtimeCaching: [
          {
            urlPattern: ({ request }: { request: Request }) =>
              request.destination === "document",
            handler: "NetworkFirst",
            options: {
              cacheName: "pages-cache",
            },
          },
          {
            urlPattern: /\.(?:js|css|html|png|jpg|svg)$/,
            handler: "CacheFirst",
            options: {
              cacheName: "static-assets",
              expiration: {
                maxEntries: 50,
                maxAgeSeconds: 30 * 24 * 60 * 60,
              },
            },
          },
        ],
      },
      injectManifest: {
        globPatterns: ["**/*.{js,css,html,png,svg,jpg}"],
      },
    }),
  ],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
});
