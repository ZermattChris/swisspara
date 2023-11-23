<template>

  <div id="headerBox"
    class=" mx-auto pb-4 pr-2 md:pb-6 pl-[3vw] w-full max-w-lg sm:w-3/4 md:w-4/5 lg:w-1/2  ">

    <h1 class="select-none pb-4 tracking-tighter md:pb-8 text-3xl text-center font-black text-[color:var(--booking-hilite)] drop-shadow-md ">
		  5. Complete Your Booking
    </h1>

    <!-- This is the Confirm Booking Intro text. -->
    <div id="confirmBookingWrapper" v-if="hasConfirmedBooking === false">
      <div>
        <p class="pb-2">
          Please check to make sure your Booking Details are correct. If you find any mistakes, 
          click the "Previous" button below...
        </p>
        <p class="">
          If all is good, click on the "Confirm" to continue.
        </p>
      </div>


      <!-- This is the Confirm Booking Grid. -->
      <p class="mt-4 ml-4 mb-1 italic text-orange-800">
        Flight Details:
      </p>
      <div id="confirmGrid"
        style="grid-template-columns: 200px auto;"
        class="m-auto   grid grid-flow-row auto-rows-max        sm:max-w-screen-sm  "
      >
        <div class="rowLabel">People Flying:</div>
        <div class="rowValue">{{ totalPassengers }}</div>

        <div class="rowLabel">Flight Date:</div>
        <div class="rowValue">{{ flightDate }}</div>

        <div class="rowLabel">Meeting Time(s):</div>
        <div class="rowValue">{{ meetingTime }}</div>

        <div class="rowLabel">Flight:</div>
        <div class="rowValue">{{ flight }}</div>

        <div class="rowLabel">Photos + Videos:</div>
        <div class="rowValue">{{ photos }}</div>
      </div>

      <!-- This is the Confirm Contact Grid. -->
      <p class="mt-4 ml-4 mb-1 italic text-orange-800">
        Contact Details:
      </p>
      <div id="confirmGrid"
        style="grid-template-columns: 200px auto;"
        class="mt-0 mx-auto   grid grid-flow-row auto-rows-max   sm:max-w-screen-sm  "
      >
        <div class="rowLabel">Telephone:</div>
        <div class="rowValue">{{ telephone }}</div>

        <div class="rowLabel">Email:</div>
        <div class="rowValue">{{ email }}</div>

      </div>

      <div class="text-center mt-8">
        <button type="button" 
          @click="hasConfirmedBooking = true"
          class="animate-pulse   rounded-full bg-gray-50 px-4 py-2.5 text-sm font-semibold text-gray-900 shadow-sm 
            ring-2 ring-inset ring-orange-700 hover:bg-gray-100">
          Confirm Booking
        </button>
      </div>

      <!-- This is the Confirm Contact Grid. -->
      <p class="mt-4 ml-4 mb-1 italic text-orange-800">
        Passengers:
      </p>
      <div id="confirmGrid"
        style="grid-template-columns: 200px auto;"
        class="mt-0 mx-auto   grid grid-flow-row auto-rows-max   sm:max-w-screen-sm  "
      >
        <div class="rowLabel">Telephone:</div>
        <div class="rowValue">{{ telephone }}</div>

        <div class="rowLabel">Email:</div>
        <div class="rowValue">{{ email }}</div>

      </div>


    </div><!-- END: Confirm Booking Wrapper.  -->



  </div>


</template>


<script>

	// Stores
	import {flightDateStore as dateStore} from '@stores/pageDateStore.js' 
	import {pageFlightStore as flightStore} from '@stores/pageFlightStore.js' 
	import {pageTimeSlotsStore as timeStore} from '@stores/pageTimeSlotsStore.js' 
	import {pagePassengersStore as passengersStore} from '@stores/pagePassengersStore.js' 

  // Parent component for all "Pages"
  import _Page from './_Page.vue'


  export default {
    name: 'PagePayment',
	
    extends: _Page,   // Parent class handles the valid page event emitting back to the App Shell.
    emits: ['pagevalid'], // Parent class - needs to be here too... _Page.vue

		data() {
			return {
        hasConfirmedBooking: false,
        contactPassenger: passengersStore.getPassengerList(1)
			}
		},



    computed: {

      telephone () {
        return this.contactPassenger.phone
      },
      email () {
        return this.contactPassenger.email
      },

      totalPassengers() {
        return timeStore.getTotalPassengers()
      },
      flightDate() {
        return dateStore.getFlightDate()
      },
      meetingTime() {
        const passengerTimeSlots = timeStore.getTimeSlotsPassengersList()
        console.log("passengerTimeSlots", passengerTimeSlots.value)
        /** passengerTimeSlots ->
          "08:00": 0
          "10:00": 0
          "12:00": 2
          "14:00": 1
          "16:00": 0
          "18:00": 0
         */
        let timesString = ''
        let firstEntry = true
        for (const [key, value] of Object.entries(passengerTimeSlots)) {
          //console.log("aTSlot", `${key}: ${value}`)
          if (value > 0) {
            if (!firstEntry) timesString += ' :: '
            timesString += `${value}x @ ${key}  `
            firstEntry = false
          }
        }
        return timesString
      },
      flight() {
        flightStore.initialize()
        const flObj = flightStore.getFlightObj()
        return flObj.name + ": " + flObj.price + ".- CHF"
      },
      photos() {
        const photoFlag = flightStore.getPhotosToggle()
        if (photoFlag) return "✓ Photos/Videos Package"
        if (!photoFlag) return "✗ No Photos/Videos"
        // TODO: Put an actual green/red Toggle button here, to let the user
        //       change their minds easily.
      },

      /**
       * This computed value is requried by the base '_Page' class.
       * It is tightly coupled, but lets the base handle all event
       * work for all child Pages in the same manner.
       */
      _isPageValid() {
        if(this.hasConfirmedBooking === false) return false
        return true
      },

    }, // computed


  }


</script>

<style>

  #confirmGrid > div {
    padding-left: 1rem;
    padding-right: 1rem;
    border-bottom: 1px solid rgba(0,0,0, 0.05);
  }
    /* Gives the lower grid lines */
    #confirmGrid > div:nth-child(-n + 2) {
      border-top: 1px solid rgba(0,0,0, 0.03);
    }
    /* Row background color */
    #confirmGrid > div:nth-child(4n-2) {
      background-color: rgba(0,0,0, 0.03);
    }
    #confirmGrid > div:nth-child(4n-3) {
      background-color: rgba(0,0,0, 0.03);
    }

</style>