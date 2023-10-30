<template>

	<Splide 
		ref="mySplide" 
		:options="options" 
		:has-track="false" 
		@splide:move="onSplideMove"
		@splide:click="onSplideClick"
	>


	<div class="splide__arrows max-w-lg mx-auto  relative  z-[1]">
		<button class="splide__arrow splide__arrow--prev  w-12 h-12   p-1 pl-1.5   relative top-8 -left-2 bg-white  border-[color:var(--booking-hilite)] border-2 rounded-full shadow-md">
			<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="3.5" stroke="currentColor" class="stroke-[color:var(--booking-hilite)]">
				<path stroke-linecap="round" stroke-linejoin="round" d="M8.25 4.5l7.5 7.5-7.5 7.5" />
			</svg>
		</button>

		<button class="splide__arrow splide__arrow--next  w-12 h-12   p-1 pl-1.5   absolute top-8 -right-2 bg-white  border-[color:var(--booking-hilite)] border-2 rounded-full shadow-md">
			<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="3.5" stroke="currentColor" class="stroke-[color:var(--booking-hilite)]">
				<path stroke-linecap="round" stroke-linejoin="round" d="M8.25 4.5l7.5 7.5-7.5 7.5" />
			</svg>
		</button>
	</div>




	<SplideTrack>

		<SplideSlide
				v-for="(dayObj, date, index) in data"
				class="splide__slide is-active is-visible" 
				:id="`focus-center-slide_${index+1}`" role="tabpanel" 
				aria-roledescription="slide" :aria-label="`${index+1} of 12`"
		>

			<div class=" w-[18em] border border-slate-10">

				<div :data-slide-id="index+1" class="timeSlot" :value="index+1">
					
					{{ index+1 }} Slide. <br/>
					{{ date }} Date. <br/>
					{{ dayObj }} dayObj. <br/>
					
					<TimeSlot
						v-for="(nrPilots, timeLabel, index) in dayObj"
					>
						TimeSlot: {{ index+1 }}.<br/>
						{{ timeLabel }}: {{ nrPilots }}

					</TimeSlot>


				</div>
			</div>

		</SplideSlide>
		
	</SplideTrack>



	</Splide>

	<div id="slideBoxBottomSpacer" class="w-fit h-10"></div>
</template>
  
  
<script>

	import TimeSlot from "@components/TimeSlot.vue"

	import { Splide, SplideSlide, SplideTrack } from '@splidejs/vue-splide'
	import '@splidejs/vue-splide/css/core'

	import { defineComponent, defineProps, ref, onMounted } from 'vue';
	
	
	export default defineComponent( {

		components: {
			Splide,
			SplideSlide,
			SplideTrack,
			TimeSlot
		},


		// ----------- Props ------------
		props: ({
			data: Object
		}),
	
	
		setup(props) {

			const mySplide = ref();

			const options = {
				start: 3,					// TODO: this should be read in from the store.
				perPage    : 3,
  			perMove    : 1,
				snap   : true,
				gap   : '1em',
				focus  : 'center',
				autoWidth: true,
				autoHeight: true,
				updateOnMove: true,
			};
	

			// Splide move event.
			function onSplideMove(evSplide, newIndex, prevIndex) {
				//console.log("onSplideMoved", newIndex, prevIndex, evSplide.length)
			}

			// // Splide moved event.
			// function onSplideMoved(evSplide, newIndex, prevIndex) {
			// 	if ( newIndex + 1 === evSplide.length) {
			// 		console.log( "On last slide, need to disable the wonky Next arrow...")
			// 		const elem = document.getElementsByClassName("splide__arrow--next")[0]
			// 		console.log( elem.disabled )
  		// 		elem.setAttribute('disabled', '')
			// 		console.log( elem.disabled )
			// 		console.log( elem )
			// 	}
			// }


			// Splide move event.
			function onSplideClick(slide, ev) {
				//console.log("onSplideClick", ev.index)
				mySplide.value.go(ev.index)
			}

			// // Custom click handler to select the 'slide' the user clicks on
			// // and make it active.
			// function onSelectSlide(ev) {
			// 	//console.log('ev', ev.target)
			// 	const clickedSlideIndex = parseInt( ev.target.getAttribute("data-slide-id") ) - 1 		// slides are zero indexed.
			// 	console.log("onSelectSlide", clickedSlideIndex)

			// 	// Finally found the Splide functions. Wow.
			// 	const goTo = mySplide.value.$.proxy.go
			// 	goTo(clickedSlideIndex)

			// 	ev.preventDefault()

			// }


			onMounted( () => {
				// if ( splide.value && splide.value.splide ) {
				// 	console.log( splide.value.splide.length );
				// }
			})

	
			return { mySplide, options, onSplideMove, onSplideClick };

		} // setup()

	}


	// 	onMounted(() => {
	//   // block esc key from closing dialog.
	//   document.addEventListener('keydown', makeDialogModal)
	// })

	// onUnmounted(() => {
	//   // block esc key from closing dialog.
	//   document.removeEventListener('keydown', makeDialogModal)
	// })

	// function makeDialogModal(e) {

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
	}
    .splide__slide.is-active .timeSlot {
    	transform: scale(1);
			background-color: aquamarine;
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
				opacity: .8;
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