<template>

	<Splide 
		ref="mySplide" 
		:options="options" 
		:has-track="false" 
		@splide:move="onSplideMove"
		@splide:click="onSplideClick"
	>

	<!-- Next | Prev buttons -->
	<div class="flex justify-center splide__arrows max-w-2xl mx-auto  relative  h-6 z-[1]">

		<!-- <div class="m-auto text-center relative -top-4" >FlightDate: {{flightDate}} :: Sel slide: {{selectedSlideIndex }} </div> -->

        <!-- Pill showing Slot's Nr Passengers if greater than Zero  -->
		<div class="flex items-center relative -top-7">
			<div id="totalPassengersPill" 
				class="rounded-full text-center font-black text-2xl pt-0 mr-2  border-amber-500 border-4  shadow-black/50   h-10 w-10 "
			>
				{{ totalPassengers }}
			</div>
        Passengers in Total
		</div>


		<button class="splide__arrow splide__arrow--prev  w-12 h-12   p-1 pl-1.5   absolute   top-4 -left-2 md:-top-4  bg-white  border-[color:var(--booking-hilite)] border-2 rounded-full shadow-md">
			<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="3.5" stroke="currentColor" class="stroke-[color:var(--booking-hilite)]">
				<path stroke-linecap="round" stroke-linejoin="round" d="M8.25 4.5l7.5 7.5-7.5 7.5" />
			</svg>
		</button>

		<button class="splide__arrow splide__arrow--next  w-12 h-12   p-1 pl-1.5   absolute top-4 -right-2 md:-top-4 bg-white  border-[color:var(--booking-hilite)] border-2 rounded-full shadow-md">
			<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="3.5" stroke="currentColor" class="stroke-[color:var(--booking-hilite)]">
				<path stroke-linecap="round" stroke-linejoin="round" d="M8.25 4.5l7.5 7.5-7.5 7.5" />
			</svg>
		</button>
	</div>




	<SplideTrack class="pb-20">

		<SplideSlide
				v-for="(dayObj, date, index) in data"
				class="splide__slide is-active is-visible" 
				:id="`focus-center-slide_${index}`" role="tabpanel" 
				aria-roledescription="slide" :aria-label="`${index} of 12`"
		>

			<div class=" w-[18em] ">

				<div :data-slide-id="index" class="timeSlot" :value="index">
					
					<!-- {{ index }} Slide. <br/>
					{{ date }} Date. <br/>
					{{ dayObj }} dayObj. <br/> -->
          <keep-alive>
            <TimeSlot
              :date="date"
              :dayObject="dayObj"
              :slideIndex="index"	
              :selectedSlide="selectedSlideIndex"
              :flightDate="flightDate"
              @passengers-updated="onPassengerCount"
              @pagevalid="onTimeSlotUpdated"
            >
            </TimeSlot>
          </keep-alive>

				</div>
			</div>

		</SplideSlide>
		
	</SplideTrack>



	</Splide>

	<!-- <div id="slideBoxBottomSpacer" class="w-fit h-[200px] bg-red-500"></div> -->
</template>
  
  
<script>

	import {datesStore as datesStore} from '@stores/pageDateStore.js' 
	import {pageTimeSlotsStore as store} from '@stores/pageTimeSlotsStore.js' 

	import TimeSlot from "@components/TimeSlot.vue"

	import { Splide, SplideSlide, SplideTrack } from '@splidejs/vue-splide'
	import '@splidejs/vue-splide/css/core'

	import { defineComponent, defineProps, ref, onMounted, onUpdated } from 'vue';
	
	
	export default defineComponent( {

		components: {
			Splide,
			SplideSlide,
			SplideTrack,
			TimeSlot,
		},

		// ----------- Events ------------
		emits: ['pagevalid'],

		// ----------- Props ------------
		props: ({
			data: Object
		}),
	
	
		setup(props, { emit }) {

			const mySplide = ref();

			const selectedSlideIndex = ref(-1)
			const totalPassengers = ref(store.getTotalPassengers())

			const flightDate = datesStore.getFlightDate()

			// const slideActive = ref(false);



			const options = {
				start: selectedSlideIndex.value,				// Needs to be set onMount from store, to current flight DAte.
  			perMove    : 1,
				snap   : true,
				gap   : '0em',
				focus  : 'center',
				autoWidth: true,
				autoHeight: true,
				updateOnMove: true,
			};
	
			/**
			 * NOTE: TODO: Click is okay. Dragging causing wierdness.
			 */

			// // Splide Active event.
			// function onActive(evSlide) {
			// 	console.log("onActive:", evSlide, selectedSlideIndex.value )
			// 	slideActive.value = selectedSlideIndex.value
			// }


			function onTimeSlotUpdated(componentName, isValidFlag) {
				// Had lots of issues figuring out that events do NOT bubble upwards
				// past the immediate Parent of the object calling the event.
				// Used manual event upwards passing to sort this, as it kept the 
				// Page validation mechanism cleaner than injecting some sort of
				// 'flag' into the appStore. Ugly, but works (wish there was a bubble=true option)
				// console.log("-> (TimeSlider) onTimeSlotUpdated:", componentName, isValidFlag )
    		emit( 'pagevalid', 'TimeSlider', isValidFlag)        // sends event back to 'App'
			}



			function onPassengerCount(passengerCount) {
				// console.log("passengerCount: ", passengerCount.value)
				totalPassengers.value = passengerCount
				// Update the Store.
				store.setTotalPassengers(passengerCount)
			}

			// Splide move event.
			function onSplideMove(evSplide, newIndex, prevIndex) {
				// console.log("onSplideMoved: target slide: ", newIndex)
				selectedSlideIndex.value = newIndex
			}

			// Splide moved event.
			function onSplideMoved(evSplide, newIndex, prevIndex) {
				//console.log("onSplideMoved", newIndex, prevIndex, evSplide.length)
				//console.log("onSplideMoved: target slide: ", newIndex)
				selectedSlideIndex.value = newIndex
			}

			// Splide move event.
			function onSplideClick(slide, ev) {
				//console.log("onSplideClick: ", ev.index)
				selectedSlideIndex.value = ev.index	
				mySplide.value.go(ev.index)
			}

			// Find the Slide index that matches the FlightDate (FD)
			function findSlideIndex() {
				const fd = datesStore.getFlightDate()
				const keys = Object.keys(props.data)
				let x = 0
				for (const index in keys) {
					//console.log("index", index, keys[index], fd)
					if ( keys[index] == fd ) {
						// Found day index for FlightDate 
						//console.log("Found Slide Nr: ", index, keys[index])
						return x	// found the matching index!
					}
					x++
				}
				return -1 // Failed.
			}

			onMounted( () => {

				// Need to set the initial slide to match the FlightDate.
				selectedSlideIndex.value = findSlideIndex()
				mySplide.value.go(selectedSlideIndex.value)		// Needs updating manually.


        //alert("totalPassengers: ", store.getTotalPassengers())

			})


			// onUpdated( () => {
			// 	console.log('updated PAGE TimeSlider')
			// })
	
			return { 
				emit,
				onTimeSlotUpdated,
				mySplide, 
				options, 
				// slideActive,
				selectedSlideIndex, 
				onSplideMove, 
				onSplideMoved,
				onSplideClick,
				onPassengerCount,
				totalPassengers,
				flightDate,
			};

		} // setup()

	}


	);
</script>

<style>

.splide__pagination {
	display: none;
}

/* #splide01-list li:first-child::before {
	content: "xx";
  border: 2px solid orange;
	margin-left: 2em;
} */

#splide01-track {
	padding-left: 30px !important;
	padding-right: 30px !important;
}

	.splide__slide .timeSlot {
    transition: transform 150ms;
    transform: scale(0.9);
    transform-origin: top center;
		padding-top: 1em;
	}
    .splide__slide.is-active .timeSlot {
    	transform: scale(1);
			padding-top: 0;
		}



	/* .splide__arrows {
		width: 1px;
	} */

		.splide__arrow {
			cursor: pointer;
		}
			.splide__arrow:disabled {
				border-color: rgba(0,0,0, 0.2);
			}


			.splide__arrow--prev {
				transform: scaleX(-1) translateY(-50%);
			}
				.splide__arrow--prev:disabled {
					opacity: .8;
					cursor: default;
				}
					.splide__arrow--prev:disabled > svg {
						opacity: .5;
						cursor: default;
					}

			.splide__arrow--next {
				transform: translateY(-50%);
			}
				.splide__arrow--next:disabled {
					opacity: .5;
					cursor: default;
				}
					.splide__arrow--next:disabled > svg {
						opacity: .5;
						cursor: default;
					}

</style>