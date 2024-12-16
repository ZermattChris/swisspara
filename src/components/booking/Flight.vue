<template>


  <h1 class="pb-4 md:pb-8 text-4xl text-center font-black text-[color:var(--booking-hilite)] drop-shadow-md ">
    2. Select a Flight
  </h1>


  <div id="flightDateBox"
    class="mx-auto pb-8 md:pb-12 pl-[3vw] sm:pl-0 w-full sm:w-3/4 md:w-4/5 lg:w-1/2 xl:w-2/5 2xl:w-[30em] ">


    <p class="mt-6 mb-4">
      Please choose an available flight from the list below.
    </p>


    <!-- Loading spinner.  -->
    <div v-if="loading" class="relative rounded-xl overflow-auto p-8">
      <div class="flex items-center justify-center">
        <svg class="animate-spin mr-3 h-5 w-5 text-black" xmlns="http://www.w3.org/2000/svg" fill="none"
          viewBox="0 0 24 24">
          <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
          <path class="opacity-75" fill="currentColor"
            d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z">
          </path>
        </svg>
        Loading...
      </div>
    </div>

    <FlightSelector v-if="loading === false" @change="onChange" :list="onlineFlightsList" :flightId="selectedFlightId"
      class="mr-4"></FlightSelector>

    <!-- Photos & Videos toggle switch  -->
    <PhotosToggle :label='photosToggleLabel' :description="photosToggleDesc" :enabled="photosBool"
      @change="onPhotoToggle">
    </PhotosToggle>

    <!-- <p>{{ flightObject }}</p> -->

    <!-- Flight Infos dialog.  -->
    <Modal ref="modal">
      <template v-slot:title>
        The {{ flightName() }}
      </template>

      <div v-if="flightObject.name === 'classic'">
        <p>
          The Classic flight requires that you be reasonably fit and sporty.
        </p>
      </div>

      <div v-if="flightObject.name === 'scenic'">
        <p>
          The Scenic flight is our most popular flight summer flight, with easy, grassy take offs.
        </p>
      </div>

      <div v-if="flightObject.name === 'elite'">
        <p>
          Elite (Classic) is the highest Tandem flight available in the Alps. As such it requires a high level of
          fitness
          for your age and weight.
        </p>
      </div>

      <template v-slot:button>
        Got it!
      </template>
    </Modal>

    <div id="flightDateDescBox" v-if="getSeasonString() === 'winter'">
      <div v-if="flightObject.name === 'classic'">
        <p>
          The Classic flight requires that you be reasonably fit and sporty.
        </p>
      </div>
      <div v-if="flightObject.name === 'elite'">
        <p>
          The Elite (Classic) is also available in the winter season.
        </p>
        <p>
          As it is often too windy up high in the winter, the Classic flight from Rothorn as a backup.
        </p>
      </div>
    </div> <!-- END:: Winter  -->

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
import { appStore } from '@stores/appStore.js'
import { pageFlightStore as flightsStore } from '@stores/pageFlightStore.js'
import { datesStore } from '@stores/pageDateStore.js'

import { isBefore, isAfter } from 'date-fns'

// dynamic imports for Flight Descriptions.
//import { defineAsyncComponent, ref, computed } from 'vue'



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
    flightsStore.initialize()
  },

  updated() {
    //console.log("Page-Flight Updated: ", this.valid() ? 'valid page' : 'Not valid page')
  },

  mounted() {
    console.log("Page - Flight Mounted")
    // Make sure cache matches the current state of the flightsStore.
    flightsStore.setFlightChosen(flightsStore.getFlightChosen())

    //console.log("Page-Flight Mounted: ", this.valid() ? 'valid page' : 'Not valid page')
  },

  computed: {

    loading() {
      return flightsStore.loading
    },

    /**
     * This computed value is requried by the base '_Page' class.
     * It is tightly coupled, but lets the base handle all event
     * work for all child Pages in the same manner.
     */
    // TODO: remove this - use valid() method instead.
    _isPageValid() {
      console.log("Flight._isPageValid() is deprecated")
      return flightsStore.isPageValid()
    },

    selectedFlightId() {
      return flightsStore.selectedFlight
    },



    flightObject() {
      return flightsStore.getFlightObj()
    },

    flightsList() {
      return flightsStore._flightsList
    },

    // TODO: This should be done on the server side.  
    // The server might return a Flight that's not available for online booking.
    // Only display the flights that are available for online booking.
    onlineFlightsList() {
      let rawFlightsList = flightsStore._flightsList
      return rawFlightsList.filter(f => f.show_online === 1)
    },

    photosBool() {
      return flightsStore.getPhotosToggle()
    },


    photosToggleLabel() {
      return "Photo &amp; Video Package"
    },
    photosToggleDesc() {
      return "(optional " + (this.photoPrice / 100) + ".00&nbsp;CHF)"
    },

  }, // computed



  methods: {

    // Seasons are used to display a flight message.
    getSeasonString() {

      // Use flight date to display season specific messages.
      const fd = new Date(datesStore.getFlightDate())
      console.log("Flight Date: ", fd)

      // todo -- grab this year..

      // Winter Season
      if (isBefore(fd, new Date('2022-04-20')) && isAfter(fd, new Date('2021-11-30'))) return 'winter'
      // Spring Season
      if (isBefore(fd, new Date('2022-06-01')) && isAfter(fd, new Date('2022-04-20'))) return 'spring'
      // Summer Season
      if (isBefore(fd, new Date('2022-10-01')) && isAfter(fd, new Date('2022-05-31'))) return 'summer'
      // Autumn Season
      if (isBefore(fd, new Date('2022-12-01')) && isAfter(fd, new Date('2022-10-01'))) return 'autumn'

      return 'winter'
    },



    flightName() {
      var fObj = flightsStore.getFlightObj()
      return this.capitalizeFirstLetter(fObj.name)
    },

    capitalizeFirstLetter(string) {
      return string.charAt(0).toUpperCase() + string.slice(1);
    },

    /**
     * This method must be overrided in each of these Page components.
     * A new attempt at sorting out the current messy navigation system.
     */
    valid() {
      // Overriden from the base '_Page' class.
      // console.log('-> Flight.vue: valid()')

      let result = true
      // -> Flight Date checks.
      if (flightsStore.selectedFlight < 1) result = false

      // Also need to check that the flight date is valid (not the best solution here...) 
      // var fd = datesStore.getFlightDate()
      // if ( isBefore( new Date(fd), new Date(new Date().toDateString()) ) ) result = false

      return result

    },


    /**
     * Handle onChange event fired from the InputSelect component.
     * Is sent the 'id' (value) of the selected menu item. Use to lookup in this.flightsList
     * @param {int} id 
     */
    onChange(id) {
      //console.log("Clicked on Flight id: ", id)
      flightsStore.setFlightChosen(id)
      // const chosenFlightObj = flightsStore.getFlightObj(id)
      // console.log("chosenFlightObj:", chosenFlightObj)
      this.openModal()
    },

    onPhotoToggle(bool) {
      //console.log("Clicked on Photos Toggle: ", bool)
      flightsStore.setPhotosToggle(bool)
    },

    openModal() {
      this.$refs.modal.openModal();
    }


  }, // methods


  watch: {

  }, // watch



}


</script>import type { datesStore } from '../stores/pageDateStore'
