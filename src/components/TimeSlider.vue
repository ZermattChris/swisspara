<template>
    <Splide 
			ref="splide" 
			:options="options" 
			aria-label="My Favorite Images"
		>

			<SplideSlide
					v-for="x in 12"
					class="splide__slide is-active is-visible " 
					id="focus-center-slide07" role="tabpanel" 
					aria-roledescription="slide" :aria-label="`${x} of 12`"
					@click="selectedSlide"
			>

				<div :id="`timeSlot_${x}`" class="timeSlot h-[20em] bg-slate-100">

					<div class="w-auto">
						TimeSlot Component here...
					</div>
						{{ x }}
				</div>

      </SplideSlide>
      
    </Splide>

		<div id="bottomSpacer" class="h-20 w-auto">spacer</div>
  </template>
  
  
<script>

	import { Splide, SplideSlide } from '@splidejs/vue-splide'
	import '@splidejs/vue-splide/css/core'
	import { defineComponent, ref, onMounted } from 'vue';
	
	
	export default defineComponent( {
		components: {
			Splide,
			SplideSlide,
		},
	
	
		setup() {
			const splide = ref();

			const options = {
				perPage: 3,
				snap   : true,
				gap   : '1rem',
				focus  : 'center',
				padding: '5rem',
				autoWidth: true,
				updateOnMove: true,
			};
	
			function selectedSlide(event) {
				console.log('selectedSlide', event)
				const { Controller } = splide.Components;
				Controller.go(2)
			}


			onMounted( () => {
				// if ( splide.value && splide.value.splide ) {
				// 	console.log( splide.value.splide.length );
				// }
    	});
	
			return { splide, options, selectedSlide };

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
	:root {
		--timeslot-box-height: 90%;
	}

	.splide__slide {
		/* min-width: 200px; */
	}
    /* .splide__slide.is-active {
			border: 2px maroon solid;
			background: linear-gradient(0deg,#87de1d,#b4e900);
			height: var(--timeslot-box-width);
		}

		.splide__slide.is-active .timeSlot {
			height: 90%;
		}

		.splide__slide.is-prev, .splide__slide.is-next {
			height: 70%;
			width: var(calc(--timeslot-box-width) - 1em);
			background: linear-gradient(0deg,#dea11d,#a36a00);
		} */


</style>