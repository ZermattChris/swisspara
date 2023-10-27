<template>

	<h1 class="pb-4 md:pb-8 text-4xl text-center font-black text-indigo-600 drop-shadow-md ">
		3. Choose a Time
	</h1>

	<TimeSlider
		class="bg-amber-300"
	></TimeSlider>

  <!-- <Splide :options="splideOpts" 
		aria-label="My Favorite Images"
	>
			<SplideSlide 
				v-for="slideX in nrTestSlides"
				class=""
			>
				<img src="images/Paragliding-with-Linsey.webp" alt="Sample ">
				{{ slideX }}
			</SplideSlide>
  </Splide> -->

</template>


<script>

// Parent component for all "Pages"
import { transitionEnabledOnThisPage } from 'astro:transitions/client'
import _Page from './_Page.vue'

// import { Splide, SplideSlide } from '@splidejs/vue-splide'
// import '@splidejs/vue-splide/css';

import TimeSlider from "@components/TimeSlider.vue"

export default {
  name: 'PageTime',
	
  extends: _Page,   // Parent class handles the valid page event emitting back to the App Shell.
  emits: ['pagevalid'], // Parent class - needs to be here too... _Page.vue

	components: {    
		TimeSlider
	},
	
  data() {
			return {

				// splideOpts: {  
				// 	focus	: 'center',
				// 	gap		: '4rem',
				// 	perPage: 3,
				// 	hasTrack: false,
				// },

				// nrTestSlides: 7,
				
		}
	},

  computed: {

    /**
     * This computed value is requried by the base '_Page' class.
     * It is tightly coupled, but lets the base handle all event
     * work for all child Pages in the same manner.
     */
    _isPageValid() {
      return true
    },

  }, // computed

	methods: {

	} // methods.


}


</script>

<style scoped>

/* .is-active:after {
		background: linear-gradient(0deg,#87de1d,#b4e900);
	} */

</style>