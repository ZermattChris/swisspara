import { defineCollection } from 'astro:content';
const reviewsCollection = defineCollection({});
const flightsCollection = defineCollection({});

export const collections = {
  'reviews': reviewsCollection
};
