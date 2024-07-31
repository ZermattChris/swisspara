<template>

  <div id="flightDateBox" class="mx-auto pb-4 md:pb-6 pl-[3vw] w-full max-w-lg sm:w-3/4 md:w-4/5 lg:w-1/2  ">

    <h1
      class="select-none pb-4 tracking-tighter md:pb-8 text-4xl text-center font-black text-[color:var(--booking-hilite)] drop-shadow-md ">
      3. How Many Flying?
    </h1>

    <p>
      Please choose a Time Slot for each Passenger wanting to fly.
    </p>

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
      timeSliderKey: 0
    }
  },

  created() {
    // console.log("Time.vue component created()")
    store.initialize()
  },

  async mounted() {
    console.log("Time.vue component mounted()")

    // store.initialize()

    // TODO: Think this is where I need to do checks that the selected spaces are still available
    // For example: user chooses 2 spots and then I mark Slot as Offline in the booking system...
    // ... so I need to check here (and before ordering) that the selected slots are still available.
    // Put the logic in the Time Store.
    let flightDate = datesStore.getFlightDate()

    let found = false
    let passList = toRaw(store.getTimeSlotsPassengersList())
    const keys = Object.keys(passList)


    // Grab Today's Timeslot data from the server to check if the slots are still available.
    let serverData = store.callAPI()
    console.log("serverData: ", serverData)


    // This is the User's FlightDate Slotlist selection from the running App (not the server). Passengers.
    await store.callAPI()
    // Grab updated slot data from the localstorage.
    // let flightDateSlotsList = toRaw(store.getTimeSlotsList())[flightDate]

    let cachedSlotList = localStorage._cacheTimeSlotsList ? JSON.parse(localStorage._cacheTimeSlotsList) : {}
    let flightDateSlotsList = cachedSlotList[0][flightDate]

    let flightDateSlotsListKeys = Object.keys(flightDateSlotsList)
    console.log("flightDateSlotsList: (updated from Server?) ", flightDateSlotsList)

    // This gives us access to the number of passengers selected by the user in each time slot for the flight Date.
    let nrPilotsStillValid = true
    let x = 0
    for (const index in keys) {
      let key = keys[index]
      let slotNr = parseInt(index) + 1    // why is index a string???
      let serverPilotsAtSlot = flightDateSlotsListKeys[index]
      let usersBookedPilots = passList[key]
      let serverAvailablePilots = flightDateSlotsList[serverPilotsAtSlot][0]
      console.log(`Slot: ${slotNr}`, keys[index], " Booked Pilots: ", usersBookedPilots, " Server Pilots: ", serverAvailablePilots)

      if (usersBookedPilots > 0) {  // User has booked passengers at this slot.
        if (usersBookedPilots > serverAvailablePilots) {
          // if (serverAvailablePilots >= 0) {
            console.log("-> Pilots at Slot: ", passList[key], " Server Pilots: ", serverAvailablePilots)
            nrPilotsStillValid = false
            break
          // }
        }

      }

    }

    if (nrPilotsStillValid === false) {
      console.log("(Server Data) Time Slot no longer Available, please choose another. TODO: Need some sort of UI for this.")
      // reset the User's selected TimeSlots (passengers) to 0
      store.setTimeSlotsPassengersList('')
      // Force a re-render of the TimeSlider component.
      this.timeSliderKey++
    } else {
      console.log("(Server Data) Time Slot still Available.")
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