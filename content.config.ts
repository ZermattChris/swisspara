import { defineCollection } from 'astro:content';
const reviewCollection = defineCollection({});

export const collections = {
  'reviews': reviewCollection
};
