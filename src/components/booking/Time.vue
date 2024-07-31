<template>

  <div id="flightDateBox" class="mx-auto pb-4 md:pb-6 pl-[3vw] w-full max-w-lg sm:w-3/4 md:w-4/5 lg:w-1/2  ">

    <h1
      class="select-none pb-4 tracking-tighter md:pb-8 text-4xl text-center font-black text-[color:var(--booking-hilite)] drop-shadow-md ">
      3. How Many Flying?
    </h1>

    <p class="text-center">
      Please choose a Time for each Passenger wanting to fly.
    </p>

  </div>

  <!-- Invalid Time Slot warning -->
  <div class="mx-4">
    <div class="mb-4 rounded-md bg-amber-50 p-4 mx-auto max-w-md shadow-md border-amber-500 border"
      v-if="timeSlotNoLongerAvailable === true">
      <div class="flex">
        <div class="flex-shrink-0">
          <svg class="h-8 w-8 text-amber-500 " viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
            <path fill-rule="evenodd"
              d="M8.485 2.495c.673-1.167 2.357-1.167 3.03 0l6.28 10.875c.673 1.167-.17 2.625-1.516 2.625H3.72c-1.347 0-2.189-1.458-1.515-2.625L8.485 2.495zM10 5a.75.75 0 01.75.75v3.5a.75.75 0 01-1.5 0v-3.5A.75.75 0 0110 5zm0 9a1 1 0 100-2 1 1 0 000 2z"
              clip-rule="evenodd" />
          </svg>
        </div>
        <div class="ml-3">
          <h3 class="text-md  text-amber-800">
            We're very sorry, but the Time you selected is no longer available.
            Please pick a different Time.
          </h3>
        </div>
      </div>
    </div>
  </div>

  <div class="flex justify-center   text-sm  mt-1 mb-3 mx-auto max-w-md">
    <svg class="w-6 h-6 inline-block relative -top-0.5  text-amber-600" viewBox="0 0 24 24" fill="currentColor">
      <path
        d="M9.97308 18H14.0269C14.1589 16.7984 14.7721 15.8065 15.7676 14.7226C15.8797 14.6006 16.5988 13.8564 16.6841 13.7501C17.5318 12.6931 18 11.385 18 10C18 6.68629 15.3137 4 12 4C8.68629 4 6 6.68629 6 10C6 11.3843 6.46774 12.6917 7.31462 13.7484C7.40004 13.855 8.12081 14.6012 8.23154 14.7218C9.22766 15.8064 9.84103 16.7984 9.97308 18ZM14 20H10V21H14V20ZM5.75395 14.9992C4.65645 13.6297 4 11.8915 4 10C4 5.58172 7.58172 2 12 2C16.4183 2 20 5.58172 20 10C20 11.8925 19.3428 13.6315 18.2443 15.0014C17.624 15.7748 16 17 16 18.5V21C16 22.1046 15.1046 23 14 23H10C8.89543 23 8 22.1046 8 21V18.5C8 17 6.37458 15.7736 5.75395 14.9992ZM13 10.0048H15.5L11 16.0048V12.0048H8.5L13 6V10.0048Z">
      </path>
    </svg>
    <span class="pl-1 pr-2">
      TIP: You can split a group over multiple Times.
    </span>
  </div>

  <!-- This is our wrapper around Splide  -->
  <div id="sliderWrapper" class="px-0 pt-10 max-w-screen-2xl m-auto">

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

    <TimeSlider v-if="loading === false" :data="timeSlotList" @pagevalid="onTimeSliderUpdated" :key="timeSliderKey">
    </TimeSlider>
  </div> <!-- End: Wrapper -->


</template>


<script>

// Parent component for all "Pages"
import _Page from './_Page.vue'
import { reactive, toValue, toRaw } from 'vue'

// Store
import { pageTimeSlotsStore as store } from '@stores/pageTimeSlotsStore.js'
import { datesStore } from '@stores/pageDateStore.js'

import TimeSlider from "@components/TimeSlider.vue"
import TimeSlot from "@components/TimeSlot.vue"
import timeSlotsAPI from "@components/api/timeSlotsAPI.js"

// import { getCurrentInstance } from 'vue'


export default {
  name: 'PageTime',
  stepperName: 'Time',

  extends: _Page,   // Parent class handles the valid page event emitting back to the App Shell.
  emits: ['pagevalid'], // Parent class - needs to be here too... _Page.vue

  components: {
    TimeSlider,
    TimeSlot
  },

  data() {
    return {
      timeSliderKey: 0,
      timeSlotNoLongerAvailable: false,
      //timeSlotList: store.getTimeSlotsList(),
    }
  },

  created() {
    // console.log("Time.vue component created()")
    store.initialize()
  },

  async mounted() {
    console.log("Time.vue component mounted()")

    let flightDate = datesStore.getFlightDate()
    let pSlotsStillValid = await store.arePassengersTimeSlotsStillAvailable(flightDate)

    if (pSlotsStillValid === false) {
      this.timeSlotNoLongerAvailable = true
      console.log("(Server Data) Time Slot no longer Available, please choose another. TODO: Need some sort of UI for this.")
      // reset the User's selected TimeSlots (passengers) to 0
      store.setTimeSlotsPassengersList('')
      // Force a re-render of the TimeSlider component.
      this.timeSliderKey++
    } else {
      //console.log("(Server Data) Time Slot still Available.")
    }


  },

  // updated() {
  // 	console.log('updated PAGE Time')
  // },


  computed: {


    timeSlotListLength() {
      return Object.keys(this.timeSlotList).length
    },


    timeSlotList() {
      return store.getTimeSlotsList()
    },
    loading() {
      return store.loading
    },

    /**
     * NOTE: Not catching 'change' on the sub components. Page Validation is failing...
     * 
     * This computed value is requried by the base '_Page' class.
     * It is tightly coupled, but lets the base handle all event
     * work for all child Pages in the same manner.
     */
    // TODO: remove this - use valid() method instead.
    _isPageValid() {
      console.log("Time._isPageValid() is deprecated")
      return store.isPageValid()
    },

  }, // computed

  methods: {

    /**
     * This method must be overrided in each of these Page components.
     * A new attempt at sorting out the current messy navigation system.
     */
    valid() {
      // Overriden from the base '_Page' class.
      // console.log('-> Time.vue: valid()')

      let result = false
      if (store.getTotalPassengers() > 0) {
        result = true
      }
      return result

    },

    onTimeSliderUpdated(componentName, isValidFlag) {
      // Had lots of issues figuring out that events do NOT bubble upwards
      // past the immediate Parent of the object calling the event.
      // Used manual event upwards passing to sort this, as it kept the 
      // Page validation mechanism cleaner than injecting some sort of
      // 'flag' into the appStore. Ugly, but works (wish there was a bubble=true option)
      // console.log("---> (Time) onTimeSliderUpdated:", componentName, isValidFlag )
      this.$emit('pagevalid', 'TimeSlider', isValidFlag)        // sends event back to 'App'
    }

  }, // methods.


  watch: {
    // // Update when the current Page name changes.
    // 'myValid.value'(newValid) {
    //     console.log("-> newValid: ", newValid)
    //     // this.currPage = newPage
    // }
  }, // watch

}


</script>

<style scoped>
/* .is-active:after {
		background: linear-gradient(0deg,#87de1d,#b4e900);
	} */
</style>