<template>

	<h1 class="pb-4 md:pb-8 text-4xl text-center font-black text-indigo-600 drop-shadow-md ">
		2. Select a Flight
	</h1>

</template>


<script>

  // Parent component for all "Pages"
  import _Page from './_Page.vue'


  export default {
    name: 'PageFlight',
	
    extends: _Page,   // Parent class handles the valid page event emitting back to the App Shell.
    emits: ['pagevalid'], // Parent class - needs to be here too... _Page.vue

    

    computed: {

      /**
       * This computed value is requried by the base '_Page' class.
       * It is tightly coupled, but lets the base handle all event
       * work for all child Pages in the same manner.
       */
      _isPageValid() {
        return true
      },

    }, // computed


  }


</script>

