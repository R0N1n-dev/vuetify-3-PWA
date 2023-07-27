// Plugins
import vue from "@vitejs/plugin-vue";
import vuetify, { transformAssetUrls } from "vite-plugin-vuetify";
import { VitePWA } from "vite-plugin-pwa";
// Utilities
import { defineConfig } from "vite";
import { fileURLToPath, URL } from "node:url";
import Components from "unplugin-vue-components/vite";
import lightningcss from "vite-plugin-lightningcss";
import replace from "@rollup/plugin-replace";
import VueRouter from "unplugin-vue-router/vite";
import VueDevTools from "vite-plugin-vue-devtools";

const pwaOptions = {
  mode: "development",
  base: "/",
  includeAssets: ["favicon.svg"],
  manifest: {
    name: "Vue Vuetify 3 PWA ",
    short_name: "Vuetify 3 PWA ",
    theme_color: "#ffffff",
    display: "standalone",
    background_color: "#ffffff",
    icons: [
      {
        src: "pwa-192x192.png",
        sizes: "192x192",
        type: "image/png",
      },
      {
        src: "pwa-512x512.png",
        sizes: "512x512",
        type: "image/png",
      },
      {
        src: "pwa-512x512.png",
        sizes: "512x512",
        type: "image/png",
        purpose: "any maskable",
      },
    ],
  },
  devOptions: {
    enabled: process.env.SW_DEV === "true",
    /* when using generateSW the PWA plugin will switch to classic */
    type: "module",
    navigateFallback: "index.html",
    suppressWarnings: true,
  },
};

const replaceOptions = { __DATE__: new Date().toISOString() };
const claims = process.env.CLAIMS === "true";
const reload = process.env.RELOAD_SW === "true";
const selfDestroying = process.env.SW_DESTROY === "true";

if (process.env.SW === "true") {
  pwaOptions.srcDir = "src";
  pwaOptions.filename = claims ? "claims-sw.js" : "prompts-sw.js";
  pwaOptions.strategies = "injectManifest";
  pwaOptions.manifest.name = "Vuetify Vue 3 PWA";
  pwaOptions.manifest.short_name = "Vuetify PWA";
  pwaOptions.injectManifest = {
    globPatterns: [
      // all packaged resources are stored here
      "**/*.{css,js,html,svg,png,jpg,ico,txt,woff2}",
    ],
  };
}

if (claims) {
  pwaOptions.registerType = "autoUpdate";
  pwaOptions.workbox = {
    globPatterns: ["**/*.{css,js,html,svg,png,jpg,ico,txt,woff2}"],
  };
}

if (reload) {
  // @ts-expect-error overrides
  replaceOptions.__RELOAD_SW__ = "true";
}

if (selfDestroying) pwaOptions.selfDestroying = selfDestroying;

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    VueRouter(),
    VueDevTools(),
    vue({
      template: { transformAssetUrls },
    }),
    // https://github.com/vuetifyjs/vuetify-loader/tree/next/packages/vite-plugin
    vuetify({
      autoImport: true,
    }),
    VitePWA(pwaOptions),
    replace(replaceOptions),
    Components(),
    lightningcss({
      browserslist: ">= 0.25%",
    }),
  ],
  define: { "process.env": {} },
  resolve: {
    alias: {
      "@": fileURLToPath(new URL("./src", import.meta.url)),
    },
    extensions: [".js", ".json", ".jsx", ".mjs", ".ts", ".tsx", ".vue"],
  },
  /*server: {
    port: 3000,
  },*/
});
