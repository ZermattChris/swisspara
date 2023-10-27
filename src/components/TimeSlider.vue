<template>
    <Splide :options="options" aria-label="My Favorite Images">

			<SplideSlide
					v-for="x in 12"
					class="splide__slide is-active is-visible" 
					id="focus-center-slide07" role="tabpanel" 
					aria-roledescription="slide" :aria-label="`${x} of 12`"
					style=""
			>

				<div class="w-60 h-80 p-4 bg-slate-100">
						{{ x }}
				</div>
				Lorem Ipsum Dolor Sit Amet



      </SplideSlide>
      
    </Splide>
  </template>
  
  
  <script>
  import { Splide, SplideSlide } from '@splidejs/vue-splide'
  import '@splidejs/vue-splide/css/core'
  import { defineComponent } from 'vue';
  
  
  export default defineComponent( {
    components: {
      Splide,
      SplideSlide,
    },
  
  
    setup() {
      const options = {
				autoWidth: true,
        perPage: 3,
				updateOnMove: true,
				snap   : true,
        gap   : '1rem',
        focus  : 'center',
				padding: '5rem',
      };
  
  
      return { options };
    },
  } );
  </script>

<style>
    .is-active {
			border: 2px maroon solid;
			height: 600px;
		}
</style>