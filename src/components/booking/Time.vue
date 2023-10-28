<template>

	<h1 class="pb-4 md:pb-8 text-4xl text-center font-black text-[color:var(--booking-hilite)] drop-shadow-md ">
		3. Choose a Time
	</h1>

	<div class="mx-0 px-0 max-w-screen-2xl">
		<TimeSlider
			v-slot="slotProps"
		>
			{{ slotProps.x }}

			<!-- // I think I'll put the TimeSlot into the TimeSlider and just use events to wire up.
			// Will keep this component a lot cleaner. -->

			<TimeSlot
				v-for="(timeSlot, key, index) in timeSlotList"
				:key="key"
			>

				{{ index }}. {{ key }}: {{ timeSlot }}

			</TimeSlot>



		</TimeSlider>
	</div>


</template>


<script>

// Parent component for all "Pages"
import { transitionEnabledOnThisPage } from 'astro:transitions/client'
import _Page from './_Page.vue'

// import { Splide, SplideSlide } from '@splidejs/vue-splide'
// import '@splidejs/vue-splide/css';

import TimeSlider from "@components/TimeSlider.vue"
import TimeSlot from "@components/TimeSlot.vue"

export default {
  name: 'PageTime',
	
  extends: _Page,   // Parent class handles the valid page event emitting back to the App Shell.
  emits: ['pagevalid'], // Parent class - needs to be here too... _Page.vue

	components: {    
		TimeSlider,
		TimeSlot
	},
	
  data() {
			return {

		}
	},

  computed: {


    timeSlotList() {
		return {
			// date as key
			"2023-11-01":{
				"08:50":3,		// TimeSlot #1. Time label. Pilots available.
				"11:00":2,
				"13:30":0,
				"15:15":-1
			},
			"2023-11-02":{
				"08:00":3,
				"09:45":1,
				"12:00":0,
				"14:00":-1
			},
			"2023-11-03":{
				"08:00":2,
				"09:45":2,
				"12:00":2,
				"14:00":-1
			},
			"2023-11-04":{
				"08:00":-1,
				"09:45":-1,
				"12:00":-1,
				"14:00":-1
			},
			"2023-11-05":{
				"08:00":-1,
				"09:45":-1,
				"12:00":-1,
				"14:00":-1
			}
		}
    },

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