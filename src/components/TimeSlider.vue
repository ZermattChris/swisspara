<template>
    <Splide :options="options" aria-label="My Favorite Images">

        <SplideSlide
            v-for="x in 12"
            class="splide__slide is-active is-visible" 
            id="focus-center-slide07" role="tabpanel" 
            aria-roledescription="slide" aria-label="7 of 9" 
            style="margin-right: 2rem; width: calc(33.3333% - 1.33333rem); height: 10rem;"
        >

            <div class="splide__slide__container w-40 h-60 p-4 bg-slate-100">
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
        rewind: true,
        gap   : '1rem',
        focus  : 'center',
      };
  
  
      return { options };
    },
  } );
  </script>

<style>
    .site .splide--grid .splide__slide.is-active .splide__slide--col::after, .site .splide__slide--has-container .splide__slide__container::after, .site .splide__slide.is-active::after {
        background: #b4e900;
        background: linear-gradient(0deg,#87de1d,#b4e900);
    }
</style>