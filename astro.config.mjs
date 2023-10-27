import { defineConfig } from 'astro/config';
import vue from "@astrojs/vue";
import tailwind from "@astrojs/tailwind";

import sitemap from "@astrojs/sitemap";

// https://astro.build/config
export default defineConfig(

  {
    site: 'https://swisspara.netlify.app',
    integrations: [
      vue(),
      tailwind(), 
      sitemap()
    ]
  }


);