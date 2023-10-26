<template>

	<h1 class="pb-4 md:pb-8 text-4xl text-center font-black text-indigo-600 drop-shadow-md ">
		2. Select a Flight
	</h1>

  <div id="flightDateBox"
    class="mx-auto pb-8 md:pb-12 pl-[3vw] w-full sm:w-3/4 md:w-4/5 lg:w-1/2 xl:w-2/5 2xl:w-[30em] "
  >

    <!-- <p class="py-8">Need to display a selection of available flights for the user's chosen date.</p>

    <inputSelect 
      label="Choose your flight"
      @change="onChange"
      :list="flightsList"
      class="mr-4"
    ></inputSelect> -->

    <FlightSelector
      @change="onChange"
      :list="flightsList"
      :flightId="selectedFlightId"
      class="mr-4"
    ></FlightSelector>
  </div>


</template>


<script>

  // Parent component for all "Pages"
  import _Page from './_Page.vue'

  // My Components
	import inputSelect from "@components/InputSelect.vue"
	import FlightSelector from "@components/InputSelect2.vue"

	// Store
	import {pageFlightStore as store} from '@stores/pageFlightStore.js' 


  export default {
    name: 'PageFlight',
	
    extends: _Page,   // Parent class handles the valid page event emitting back to the App Shell.
    emits: ['pagevalid', 'change'], // Parent class - needs to be here too... _Page.vue

    components: {    
      inputSelect,
      FlightSelector,
    },


		data() {
			return {


        

      };
		},

		created() {
			//console.log("Date component mounted")
			store.initialize()
		},

    computed: {

      /**
       * This computed value is requried by the base '_Page' class.
       * It is tightly coupled, but lets the base handle all event
       * work for all child Pages in the same manner.
       */
      _isPageValid() {
        return store.isPageValid()
      },

      selectedFlightId() {
        return store.selectedFlight
      },

      flightsList() {
        return store._flightsList
      },




    }, // computed



		methods: {

      /**
       * Handle onChange event fired from the InputSelect component.
       * Is sent the 'id' (value) of the selected menu item. Use to lookup in this.flightsList
       * @param {int} id 
       */
      onChange(id) {
        console.log("Clicked on Flight id: ", id)
        store.setFlightChosen(id)
      },


    }, // methods


    watch: {
      
    }, // watch



  }


</script>

