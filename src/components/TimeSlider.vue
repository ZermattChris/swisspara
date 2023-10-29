<template>
    <Splide 
			ref="mySplide" 
			:options="options" 
			aria-label="My Favorite Images"
			class=""
		>


			<SplideSlide
					v-for="x in 12"
					class="splide__slide is-active is-visible" 
					id="focus-center-slide07" role="tabpanel" 
					aria-roledescription="slide" :aria-label="`${x} of 12`"
					@click="onSelectSlide"
			>

				<div class="h-[25em] w-[18em] max-h-max bg-slate-100/30">

					<div :data-slide-id="`${x}`" class="timeSlot w-auto border-2 border-amber-600 rounded-lg h-full" :value="x">
						
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
	import { defineComponent, ref, onMounted } from 'vue';
	
	
	export default defineComponent( {
		components: {
			Splide,
			SplideSlide
		},
	
	
		setup() {
			const mySplide = ref();

			const options = {
				perPage    : 3,
  				perMove    : 1,
				snap   : true,
				gap   : '1rem',
				focus  : 'center',
				autoWidth: true,
				updateOnMove: true,
			};
	
			function onSelectSlide(ev) {
				// console.log('ev', ev.target)
				const clickedSlideIndex = parseInt( ev.target.getAttribute("data-slide-id") ) - 1 		// slides are zero indexed.
				//console.log(clickedSlideIndex)

				// Finally found the Splide functions. Wow.
				const goTo = mySplide.value.$.proxy.go
				goTo(clickedSlideIndex)

				ev.preventDefault()

				// const { Controller } = splide.Components;
				//console.log('splide', mySplide.value.$.components.SplideTrack)
				// Go(2)
			}


			onMounted( () => {
				// if ( splide.value && splide.value.splide ) {
				// 	console.log( splide.value.splide.length );
				// }
    		})
	
			return { mySplide, options, onSelectSlide };

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

	.splide__slide {
    transition: transform 50ms;
    transform: scale(.95);
    transform-origin: center center;
	}
    .splide__slide.is-active {
    	transform: scale(1);
		}

		.splide__slide.is-active .timeSlot {
			background-color: aquamarine;
		}

		/* .splide__slide.is-prev, .splide__slide.is-next {
			height: 70%;
			width: var(calc(--timeslot-box-width) - 1em);
			background: linear-gradient(0deg,#dea11d,#a36a00);
		} */

		.splide__arrow {
			border: 0;
			cursor: pointer;
			position: absolute;
			top: 50%;
			font-weight: 400;
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