<template>

	<Splide 
		ref="mySplide" 
		:options="options" 
		aria-label="My Favorite Images"
		class=""
		@splide:move="onSplideMove"
	>


		<SplideSlide
				v-for="x in days"
				class="splide__slide is-active is-visible" 
				id="focus-center-slide07" role="tabpanel" 
				aria-roledescription="slide" :aria-label="`${x} of 12`"
				@click="onSelectSlide"
		>

			<div class="h-[25em] w-[18em] max-h-max border border-slate-10">

				<div :data-slide-id="`${x}`" class="timeSlot w-auto h-full" :value="x">
					
					{{ x }} Slide. <br/>
					<slot></slot> 

				</div>
			</div>

		</SplideSlide>
		

	</Splide>


</template>
  
  
<script>

	import { Splide, SplideSlide } from '@splidejs/vue-splide'
	import '@splidejs/vue-splide/css/core'

	import { defineComponent, defineProps, ref, onMounted } from 'vue';
	
	
	export default defineComponent( {

		components: {
			Splide,
			SplideSlide
		},


		// ----------- Props ------------
		props: ({
			days: Number
		}),
	
	
		setup(props) {

			const mySplide = ref();

			const options = {
				perPage    : 3,
  			perMove    : 1,
				snap   : true,
				gap   : '1em',
				focus  : 'center',
				autoWidth: true,
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


			// Custom click handler to select the 'slide' the user clicks on
			// and make it active.
			function onSelectSlide(ev) {
				// console.log('ev', ev.target)
				const clickedSlideIndex = parseInt( ev.target.getAttribute("data-slide-id") ) - 1 		// slides are zero indexed.
				//console.log(clickedSlideIndex)

				// Finally found the Splide functions. Wow.
				const goTo = mySplide.value.$.proxy.go
				goTo(clickedSlideIndex)

				ev.preventDefault()

			}


			onMounted( () => {
				// if ( splide.value && splide.value.splide ) {
				// 	console.log( splide.value.splide.length );
				// }
			})

	
			return { mySplide, options, onSelectSlide, onSplideMove };

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

	.splide__slide .timeSlot {
    transition: transform 150ms;
    transform: scale(0.8);
    transform-origin: center center;
	}
    .splide__slide.is-active .timeSlot {
    	transform: scale(1);
			background-color: aquamarine;
		}



		.splide__arrow {
			border: 0;
			cursor: pointer;
			position: absolute;
			top: 50%;
			font-weight: 400;
		}
			.splide__arrow:disabled {
				opacity: .3;
				cursor: default;
			}

			.splide__arrow--prev {
				left: -2.5rem;
				transform: scaleX(-1) translateY(-50%);
			}
			.splide__arrow--next {
				right: -2.5rem;
				transform: translateY(-50%);
			}

</style>