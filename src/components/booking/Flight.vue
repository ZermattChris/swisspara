<template>
  <div>
    <h1 class="text-center">Select Flight page.</h1>
  </div>
</template>


<script>

  // Parent component for all "Pages"
  import _Page from './_Page.vue'


  export default {
    name: 'PageFlight',
    extends: _Page,   // Parent class handles the valid page event emitting back to the App Shell.
    

    computed: {

      /**
       * This computed value is requried by the base '_Page' class.
       * It is tightly coupled, but lets the base handle all event
       * work for all child Pages in the same manner.
       */
      _isPageValid() {
        return false
      },

    }, // computed


  }


</script>

