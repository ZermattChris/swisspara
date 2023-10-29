<template>

	<div id="flightDateBox"
		class="mx-auto pb-8 md:pb-12 pl-[3vw] w-full max-w-lg sm:w-3/4 md:w-4/5 lg:w-1/2  ">

		<h1 class="select-none pb-4 md:pb-8 text-4xl text-center font-black text-[color:var(--booking-hilite)] drop-shadow-md ">
			3. How Many Flying?
		</h1>

		<p>Ms. Ellis admitted that the allegations of election fraud she peddled as an advocate for the effort to overturn the 2020 election were false. Two other plea deals, from Kenneth Chesebro and </p>

	</div>


	<!-- This is our wrapper around Splide  -->
	<div id="sliderWrapper" class="px-0 pt-4 max-w-screen-2xl m-auto">
		<TimeSlider
			:data="timeSlotList"
		>

			


		</TimeSlider>
	</div>	<!-- End: Wrapper -->


</template>


<script>

// Parent component for all "Pages"
import _Page from './_Page.vue'

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


    timeSlotListLength() {
			return Object.keys(this.timeSlotList).length
		},


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
					"11:00":2,
					"12:00":-1,
					"13:00":2,
					"14:45":2,
					"15:00":2,
					"16:00":2,
					"17:00":-1,
					"18:00":2,
					"19:45":2,
					"20:00":2,
					"21:00":-1
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