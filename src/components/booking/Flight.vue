<template>
  

	<h1 class="pb-4 md:pb-8 text-4xl text-center font-black text-[color:var(--booking-hilite)] drop-shadow-md ">
		2. Select a Flight
	</h1>



  <div id="flightDateBox"
    class="mx-auto pb-8 md:pb-12 pl-[3vw] w-full sm:w-3/4 md:w-4/5 lg:w-1/2 xl:w-2/5 2xl:w-[30em] "
  >

  		<!-- Loading spinner.  -->
      <div v-if="loading" class="relative rounded-xl overflow-auto p-8">
			<div class="flex items-center justify-center">
				<svg class="animate-spin mr-3 h-5 w-5 text-black" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
					<circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
					<path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
				</svg>
				Loading...
			</div>
		</div>

    <FlightSelector
			v-if="loading === false"
      @change="onChange"
      :list="flightsList"
      :flightId="selectedFlightId"
      class="mr-4"
    ></FlightSelector>

    <!-- Photos & Videos toggle switch  -->
    <PhotosToggle
      :label='photosPriceString'
      :enabled="photosBool"
      @change="onPhotoToggle" 
    >
    </PhotosToggle>

    <!-- <p>{{ flightObject }}</p> -->

    <!-- Flight Infos dialog.  -->
    <Modal ref="modal">
      <template v-slot:title>
        Flight -> {{flightObject.name}}
      </template>

      <p>TODO. Text goes here for selected flight, using the descriptionId: {{ flightObject.descriptionId }}</p>

      <p>TODO. Text goes here for selected flight, using the descriptionId: {{ flightObject.descriptionId }}</p>

      <p>TODO. Text goes here for selected flight, using the descriptionId: {{ flightObject.descriptionId }}</p>


      <p>TODO. Text goes here for selected flight, using the descriptioxt goes here for selected flight, using the descriptioxt goes here for selected flight, using the descriptioxt goes here for selected flight, using the descriptioxt goes here for selected flight, using the descriptioxt goes here for selected flight, using the descriptioxt goes here for selected flight, using the descriptioxt goes here for selected flight, using the descriptioxt goes here for selected flight, using the descriptioxt goes here for selected flight, using the descriptionId: {{ flightObject.descriptionId }}</p>

      <template v-slot:button>
        Got it!
      </template>
    </Modal>

    <p>
      If we're closed on the date they've chosen, then here a Message.
    </p>
    <p>
      Here we can give a short explanation of the Flight they've chosen, combined with their flight date.
      Elite gets a proper one. Classic - Rothorn, Gornergrat and Rotenboden.
    </p>
    <p>
      Head's up on age, weight and confidence levels for chosen flight + date.
    </p>

  </div>


</template>


<script>

  // Parent component for all "Pages"
  import _Page from './_Page.vue'

  // My Components
	import FlightSelector from "@components/FlightSelector.vue"
	import PhotosToggle from "@components/Toggle.vue"
	import Modal from "@components/Modal.vue"

	// Store
	import {appStore} from '@stores/appStore.js' 
	import {pageFlightStore as store} from '@stores/pageFlightStore.js' 


  export default {
    name: 'PageFlight',
    stepperName: 'Flight',
	
    extends: _Page,   // Parent class handles the valid page event emitting back to the App Shell.
    emits: ['pagevalid'], // Parent class - needs to be here too... _Page.vue

    components: {    
      FlightSelector,
      PhotosToggle,
      Modal,
    },


		data() {
			return {
        photoPrice: appStore.getVideoPrice(),
      };
		},

		created() {
			//console.log("Date component mounted")
			store.initialize()
		},

    updated() {
      //console.log("Page-Flight Updated: ", this.valid() ? 'valid page' : 'Not valid page')
    },

    mounted() {
      //console.log("Page-Flight Mounted: ", this.valid() ? 'valid page' : 'Not valid page')
    },

    computed: {

			loading() {
				return store.loading
			},

      /**
       * This computed value is requried by the base '_Page' class.
       * It is tightly coupled, but lets the base handle all event
       * work for all child Pages in the same manner.
       */
      // TODO: remove this - use valid() method instead.
      _isPageValid() {
        console.log("Flight._isPageValid() is deprecated")
        return store.isPageValid()
      },

      selectedFlightId() {
        return store.selectedFlight
      },

      flightObject() {
        return store.getFlightObj()
      },

      flightsList() {
        return store._flightsList
      },

      photosBool() {
        return store.getPhotosToggle()
      },

      photosPriceString() {
        return "Add the Photo &amp; Video Package (optional " + (this.photoPrice / 100) + ".00&nbsp;CHF)"
      },

    }, // computed



		methods: {

      /**
       * This method must be overrided in each of these Page components.
       * A new attempt at sorting out the current messy navigation system.
       */
      valid() {
        // Overriden from the base '_Page' class.
        // console.log('-> Flight.vue: valid()')

        let result = true
        // -> Flight Date checks.
        if (store.selectedFlight < 1) result = false
        return result

      },


      /**
       * Handle onChange event fired from the InputSelect component.
       * Is sent the 'id' (value) of the selected menu item. Use to lookup in this.flightsList
       * @param {int} id 
       */
      onChange(id) {
        //console.log("Clicked on Flight id: ", id)
        store.setFlightChosen(id)
        // const chosenFlightObj = store.getFlightObj(id)
        // console.log("chosenFlightObj:", chosenFlightObj)
        this.openModal()
      },

      onPhotoToggle(bool) {
        //console.log("Clicked on Photos Toggle: ", bool)
        store.setPhotosToggle(bool)
      },

      openModal() {
        this.$refs.modal.openModal();
      }


    }, // methods


    watch: {
      
    }, // watch



  }


</script>
