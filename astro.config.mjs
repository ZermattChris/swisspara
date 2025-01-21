import { defineConfig } from 'astro/config';
import vue from "@astrojs/vue";
import tailwind from "@astrojs/tailwind";

import sitemap from "@astrojs/sitemap";

// import htmx from 'astro-htmx';
// import hyperscript from 'astro-hyperscript';

// https://astro.build/config
export default defineConfig(

  {
    site: 'https://swisspara.netlify.app',
    integrations: [
      vue({ devtools: true }),
      tailwind(), 
      sitemap()
    ],
    vite: {
      build: {
        sourcemap: true
      }
    },
    prefetch: {
      prefetchAll: true
    }
  }


);