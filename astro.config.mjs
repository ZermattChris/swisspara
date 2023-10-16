import { defineConfig } from 'astro/config';
import prefetch from '@astrojs/prefetch';
import vue from "@astrojs/vue";
import tailwind from "@astrojs/tailwind";
// import PrimeVue from 'primevue/config';

import sitemap from "@astrojs/sitemap";

// https://astro.build/config
export default defineConfig({
  site: 'https://swisspara.netlify.app',
  integrations: [
    vue({ appEntrypoint: "/src/main.js" }), 
    tailwind(), 
    prefetch(), 
    sitemap()
  ]
});