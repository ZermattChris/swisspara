import { defineCollection } from 'astro:content';
const reviewCollection = defineCollection({});
const flightsCollection = defineCollection({});

export const collections = {
  'reviews': reviewCollection
};
