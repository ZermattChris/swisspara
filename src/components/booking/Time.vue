<template>

	<div id="flightDateBox"
		class="mx-auto pb-4 md:pb-6 pl-[3vw] w-full max-w-lg sm:w-3/4 md:w-4/5 lg:w-1/2  ">

		<h1 class="select-none pb-4 tracking-tighter md:pb-8 text-4xl text-center font-black text-[color:var(--booking-hilite)] drop-shadow-md ">
			3. How Many Flying?
		</h1>

		<p>Ms. Ellis admitted that the allegations of election fraud she peddled as an advocate for the effort to overturn the 2020 election were false. Two other plea deals, from Kenneth Chesebro and </p>

	</div>


	<!-- This is our wrapper around Splide  -->
	<div id="sliderWrapper" class="px-0 pt-4 max-w-screen-2xl m-auto">

		<!-- Loading spinner.  -->
		<div v-if="loading" class="relative rounded-xl overflow-auto p-8">
			<div class="flex items-center justify-center">
				<svg class="animate-spin mr-3 h-5 w-5 text-black" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
					<circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
					<path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
				</svg>
				Loading...
			</div>
		</div>

		<TimeSlider
			v-if="loading === false"
			:data="timeSlotList"
			@pagevalid="onTimeSliderUpdated"		
		></TimeSlider>
	</div>	<!-- End: Wrapper -->


</template>


<script>

	// Parent component for all "Pages"
	import _Page from './_Page.vue'

	// Store
	import {pageTimeSlotsStore as store} from '@stores/pageTimeSlotsStore.js' 

	import TimeSlider from "@components/TimeSlider.vue"
	import TimeSlot from "@components/TimeSlot.vue"

	// import { getCurrentInstance } from 'vue'
	

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

		created() {
			// console.log("Time.vue component created()")
			store.initialize()
		},

		// updated() {
		// 	console.log('updated PAGE Time')
		// },


		computed: {


			timeSlotListLength() {
				return Object.keys(this.timeSlotList).length
			},


			timeSlotList() {
				return store.getTimeSlotsList()
			},
			loading() {
				return store.loading
			},

			/**
			 * NOTE: Not catching 'change' on the sub components. Page Validation is failing...
			 * 
			 * This computed value is requried by the base '_Page' class.
			 * It is tightly coupled, but lets the base handle all event
			 * work for all child Pages in the same manner.
			 */
			_isPageValid() {
				return store.isPageValid()
			},

		}, // computed

		methods: {

      onTimeSliderUpdated(componentName, isValidFlag) {
				// Had lots of issues figuring out that events do NOT bubble upwards
				// past the immediate Parent of the object calling the event.
				// Used manual event upwards passing to sort this, as it kept the 
				// Page validation mechanism cleaner than injecting some sort of
				// 'flag' into the appStore. Ugly, but works (wish there was a bubble=true option)
				// console.log("---> (Time) onTimeSliderUpdated:", componentName, isValidFlag )
    		this.$emit( 'pagevalid', 'TimeSlider', isValidFlag)        // sends event back to 'App'
      }

		}, // methods.


		watch: {
			// // Update when the current Page name changes.
			// 'myValid.value'(newValid) {
			//     console.log("-> newValid: ", newValid)
			//     // this.currPage = newPage
			// }
		}, // watch

	}


</script>

<style scoped>

/* .is-active:after {
		background: linear-gradient(0deg,#87de1d,#b4e900);
	} */

</style>