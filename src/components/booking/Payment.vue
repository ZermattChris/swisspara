<template>

  <div id="headerBox"
    class=" mx-auto pb-4 pr-2 md:pb-6 pl-[3vw] w-full max-w-lg sm:w-3/4 md:w-4/5 lg:w-1/2  ">

    <h1 class="select-none pb-4 tracking-tighter md:pb-8 text-3xl text-center font-black text-[color:var(--booking-hilite)] drop-shadow-md ">
		  5. Complete Your Booking
    </h1>
    <p class="pb-2">
      Please check to make sure your Booking Details are correct. If you find any mistakes, 
      click the "Previous" button below...
    </p>
    <p class="pb-4 ">
      If all is good, click on the "Confirm" to continue.
    </p>

  </div>

  <div id="confirmGrid"
    class="m-auto   grid grid-cols-2        sm:max-w-screen-sm  "
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
        
			}
		},



    computed: {

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
            timesString += `${value} @ ${key}  `
            firstEntry = false
          }
        }
        return timesString
      },
      flight() {
        flightStore.initialize()
        return flightStore.getFlightObj().name
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
    #confirmGrid > div:nth-child(-n + 2) {
      border-top: 1px solid rgba(0,0,0, 0.05);
    }

</style>