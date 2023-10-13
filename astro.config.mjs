import { defineConfig } from 'astro/config';
import prefetch from '@astrojs/prefetch';

import vue from "@astrojs/vue";
import tailwind from "@astrojs/tailwind";

// https://astro.build/config
export default defineConfig({
  integrations: [
    vue(), 
    tailwind(), 
    prefetch()
  ]
});