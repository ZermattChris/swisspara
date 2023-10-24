<template>

	<h1 class="pb-4 md:pb-8 text-4xl text-center font-black text-indigo-600 drop-shadow-md ">
		2. Select a Flight
	</h1>

  <div id="flightDateBox"
    class="mx-auto pb-8 md:pb-12 pl-[3vw] w-full sm:w-3/4 md:w-4/5 lg:w-1/2 xl:w-2/5 2xl:w-[30em] "
  >

    <p class="py-8">Need to display a selection of available flights for the user's chosen date.</p>

    <inputSelect 
      @change="onChange"
      :list="flightsList"
    ></inputSelect>

  </div>


</template>


<script>

  // Parent component for all "Pages"
  import _Page from './_Page.vue'

  // My Components
	import inputSelect from "@components/InputSelect.vue"

	// Store
	import {selectFlightStore as store} from '@stores/selectFlightStore.js' 


  export default {
    name: 'PageFlight',
	
    extends: _Page,   // Parent class handles the valid page event emitting back to the App Shell.
    emits: ['pagevalid'], // Parent class - needs to be here too... _Page.vue

    components: {    
      inputSelect,
    },


		data() {
			return {

        // TODO: This should come from an API call.
        flightsList: [
          { id: 1, name: 'Choose your flight', seperator: true, enabled: true },
          { id: 2, name: 'Classic High', seperator: false, enabled: true },
          { id: 3, name: 'Scenic', seperator: false , enabled: true },
          { id: 4, name: 'Specialty flights', seperator: true, enabled: true  },
          { id: 5, name: 'Elite', seperator: false, enabled: true  },
        ]

      };
		},

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


		methods: {

      onChange(ev) {
        
        const selectedIndex = ev.target.options.selectedIndex + 1
        const selectedListObj = this.flightsList[selectedIndex]
        console.log(selectedListObj.name)

        store.setFlightChosen(selectedListObj)

      },

    },


  }


</script>

