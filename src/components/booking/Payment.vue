<template>

  <div id="headerBox"
    class=" mx-auto pb-4 pr-2 md:pb-6 pl-[3vw] w-full max-w-lg sm:w-3/4 md:w-4/5 lg:w-1/2  ">

    <h1 class="select-none pb-4 tracking-tighter md:pb-8 text-3xl text-center font-black text-[color:var(--booking-hilite)] drop-shadow-md ">
		  5. Complete Your Booking
    </h1>

    <a href="#" @click="valid()">Test Valid()</a>

    <!-- This is the Confirm Booking Intro text. -->
    <div id="confirmBookingWrapper" v-if="hasConfirmedBooking === false">
      <div>
        <p class="pb-4">
          Please check to make sure your Booking Details are correct. If you find any mistakes, 
          click the "Previous" button below...
        </p>
      </div>

      <div class="mb-6 overflow-hidden rounded-lg bg-white border-[1px] border-gray-300 shadow-lg">
        <div class="px-2 pb-6 ">


            <!-- This is the Confirm Booking Grid. -->
            <p class="mt-4 ml-4 mb-1 italic text-orange-800">
              Flight Details:
            </p>
            <div id="confirmFlightGrid"
              style="grid-template-columns: 160px auto;"
              class="m-auto   grid grid-flow-row auto-rows-max        sm:max-w-screen-sm  "
            >
              <div class="rowLabel">People Flying:</div>
              <div class="rowValue">{{ totalPassengers }}</div>

              <div class="rowLabel">Flight Date:</div>
              <div class="rowValue">{{ getFlghtDayName }} &mdash; {{ getFlghtDateFormatted }}</div>

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
            <div id="confirmContactGrid"
              style="grid-template-columns: 130px auto;"
              class="mt-0  mx-4   grid grid-flow-row-dense 
                sm:max-w-screen-sm  "
            >
              <div class="rowLabel">Telephone:</div>
              <div class="rowValue">{{ telephone }}</div>

              <div class="rowLabel">Email:</div>
              <div class="rowValue">{{ email }}</div>

            </div>
            
            <!-- Confirm Booking Button.  -->
            <div class="text-center mt-8">
              <button type="button" 
                @click="confirmBooking"
                class="animate-pulse hover:animate-none   rounded-full bg-lime-200 px-4 py-2.5 text-sm font-semibold text-gray-900 shadow-sm 
                  border-[1px] border-gray-400
                  ring-4 ring-offset-2 ring-orange-700 hover:bg-gray-100">
                Confirm Details
              </button>
            </div>

            <!-- Pasengers lising Grid. -->
            <p class="mt-4 ml-0 mb-1 italic text-orange-800">
              Passengers:
            </p>
            <div id="confirmPassengersGrid"
              style="grid-template-columns: auto 50px 50px 90px 30px;"
              class="mt-0 mx-auto   grid grid-flow-row-dense   text-sm  border-2 border-slate-50  "
            >
              <div class="cpHeader pl-2">Name</div>
              <div class="cpHeader text-center">M/F</div>
              <div class="cpHeader text-center">Age</div>
              <div class="cpHeader text-center">Confidence</div>
              <div class="cpHeader text-center">Kg</div>

              <template v-for="aPassenger in allPassengers">
                <div class="pl-2">{{ aPassenger.name }}</div>
                <div class="text-center">{{ aPassenger.sex }}</div>
                <div class="text-center">{{ aPassenger.age }}</div>
                <div class="text-center">{{ aPassenger.confidence }}</div>
                <div class="text-center">{{ aPassenger.weightKg }}</div>
              </template>

            </div>

        </div>
      </div>

    </div><!-- END: Confirm Booking Wrapper.  -->


    <!-- Payment Block -->
    <div id="checkoutWrapper" v-if="hasConfirmedBooking === true">
      <div>
        <p class="pb-6">
          Enter your card details to complete your Booking.
        </p>
      </div>

      <!-- Passengers, date and Show Booking Details...  -->
      <div class="mb-6 overflow-hidden rounded-lg bg-white border-[1px] border-gray-300 shadow">
        <div class="px-4 py-5 ">

          <p class="text-center">
            <svg class="h-8 w-8 inline mr-2 fill-orange-600"
              xmlns="http://www.w3.org/2000/svg" height="48" viewBox="0 -960 960 960" 
              width="48"
            >
              <path d="M120-120v-60h720v60H120Zm64-208L81-503l43-8 70 62 226-61-171-287 58-17 285 257 216-58q27-8 49 9.5t22 46.5q0 19-11.5 34T838-505L184-328Z"/>
            </svg>
            {{ totalPassengers }} Passenger(s): {{ getFlghtDayName }} &ndash; {{ getFlghtDateFormatted }}
          </p>

          <!-- Show Booking Detail btn  -->
          <div class="text-sm cursor-pointer hover:text-orange-800 text-center"
            @click="hasConfirmedBooking = false"
          >
            <button type="button" 
              @click="hasConfirmedBooking = true"
              class=" relative top-1.5 mr-1 rounded-full h-6 w-6  bg-white px-0 py-0 text-sm font-semibold text-gray-900 
              shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50"
            >
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" 
                class="w-6 h-6"
              >
                <path stroke-linecap="round" stroke-linejoin="round" d="M9 12.75l3 3m0 0l3-3m-3 3v-7.5M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </button>
            Show Booking Details again...
          </div>

        </div>
      </div><!-- END: Passengers, date and Show Booking Details...  -->



      <!-- Table Showing Flights w/ costs and Photos/Vids  -->
      <div class="mb-6 overflow-hidden rounded-lg bg-white border-[1px] border-gray-300 shadow">
        <div class="px-4 py-5 ">
          total costs overview...
        </div>
      </div><!-- END: Table Showing Flights w/ costs and Photos/Vids  -->



      <!-- Booking Notes  -->
      <div class="mb-6  overflow-hidden rounded-lg bg-white border-[1px] border-gray-300 shadow">
        <div class="px-4 py-5 ">

          <div id="clickBox" @click="toggleBookingMsg = !toggleBookingMsg" class="cursor-pointer  ">
            <svg 
              class="w-6 h-6 inline relative -top-0.5 fill-orange-700"
              xmlns="http://www.w3.org/2000/svg" height="48" viewBox="0 -960 960 960" 
            >
              <path d="M453-280h60v-240h-60v240Zm26.982-314q14.018 0 23.518-9.2T513-626q0-14.45-9.482-24.225-9.483-9.775-23.5-9.775-14.018 0-23.518 9.775T447-626q0 13.6 9.482 22.8 9.483 9.2 23.5 9.2Zm.284 514q-82.734 0-155.5-31.5t-127.266-86q-54.5-54.5-86-127.341Q80-397.681 80-480.5q0-82.819 31.5-155.659Q143-709 197.5-763t127.341-85.5Q397.681-880 480.5-880q82.819 0 155.659 31.5Q709-817 763-763t85.5 127Q880-563 880-480.266q0 82.734-31.5 155.5T763-197.684q-54 54.316-127 86Q563-80 480.266-80Zm.234-60Q622-140 721-239.5t99-241Q820-622 721.188-721 622.375-820 480-820q-141 0-240.5 98.812Q140-622.375 140-480q0 141 99.5 240.5t241 99.5Zm-.5-340Z"/>
            </svg>

            <p class="text-sm inline ml-1">
              Click here to add a Booking Message.
            </p>
          </div>

          <div v-if="toggleBookingMsg">

            <p class="mt-2 text-sm text-gray-700">
              If you have any questions, special wishes or have extra information regarding your Booking,
              please let us know here.
            </p>
            <div class="mt-2 px-0" >
              <textarea 
                id="assistanceMsg" name="assistanceMsg" 
                rows="4" 
                class="w-full rounded-md focus:ring-indigo-600 "
              ></textarea>
            </div>

          </div>

        </div>
      </div><!-- END: Booking Notes -->


      <!-- Stripe Checkout component  -->
      <div class="mb-6 overflow-hidden rounded-lg bg-white border-[1px] border-gray-300 shadow">
        <div class="px-4 py-5 ">
          Stripe Checkout component here.
        </div>
      </div><!-- END: Stripe Checkout component -->

      <!-- T&C's checkbox.  -->
      <div class="pl-6 pr-2 relative flex items-start">
        <div class="flex h-6 items-center">
          <input id="terms" @change="onTAndCsChecked" aria-describedby="comments-description" name="terms" type="checkbox" 
            class="h-4 w-4 cursor-pointer rounded border-gray-700 text-orange-600 focus:ring-gray-300" />
        </div>
        <div class="ml-3 text-sm leading-6">
          <label for="terms" class="font-medium cursor-pointer text-gray-900">Terms &amp; Conditions</label>
          <p id="terms-description" class="text-gray-700">
            To complete your Booking, click this checkbox to indicate that you have read and agree to the 
            <a class="underline" href="#">Terms&nbsp;&amp;&nbsp;Conditions</a>
            of Swiss Paraglide Zermatt's Customer Agreement.
          </p>
        </div>
      </div> <!-- END: T&C's checkbox.  -->

      <!-- Book Flight Btn -->
      <div class="text-center mt-6 mb-6">
        <button type="button" 
          class="inline-flex items-center gap-x-2 rounded-md bg-orange-700 px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
          :class="_isPageValid ? '': 'opacity-50' "
        >
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor"
            class="w-6 h-6">
            <path stroke-linecap="round" stroke-linejoin="round" d="M12.75 15l3-3m0 0l-3-3m3 3h-7.5M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
          Book Flight
        </button>

        <p id="bookFlightMsg" 
          v-if="tAndCsChecked"
          class="text-orag-700 text-sm pt-2"
        >
          (this will capture your card and complete your Booking)
        </p>

      </div> <!-- END: Book Flight Btn -->

    </div>

    <!-- hasConfirmedBooking: {{hasConfirmedBooking}} -- 
    storageHashChanged: {{ storageHashChanged }} -->

  </div>

  <div id="footer-spacer" class="h-14"></div>

</template>


<script>

	// Stores
  import {appStore} from '@stores/appStore.js' 
	import {datesStore as dateStore} from '@stores/pageDateStore.js' 
	import {pageFlightStore as flightStore} from '@stores/pageFlightStore.js' 
	import {pageTimeSlotsStore as timeStore} from '@stores/pageTimeSlotsStore.js' 
	import {pagePassengersStore as passengersStore} from '@stores/pagePassengersStore.js' 

  // Parent component for all "Pages"
  import _Page from './_Page.vue'

	// Calendar Utils.
	import {calendarUtils as calUtils} from '@components/booking/calendarUtils.js'

  import { addDays, subDays, isAfter, isBefore, isEqual, parseISO, getDate, getMonth, getYear } from 'date-fns'

  export default {
    name: 'PagePayment',
    stepperName: 'Confirm',
	
    extends: _Page,   // Parent class handles the valid page event emitting back to the App Shell.
    emits: ['pagevalid'], // Parent class - needs to be here too... _Page.vue

		data() {
			return {
        // Use these two to show/hide the 'Confirm' Booking overview UI.
        // hasConfirmedBooking: false,
        storageHashChanged: appStore.hasStorageChanged(),
        // hasConfirmedBooking: appStore.getBookingConfirmed(),

        contactPassenger: passengersStore.getPassengerList(1),
        allPassengers: passengersStore.getAllPassengersList(),

        toggleBookingMsg: false,
        tAndCsChecked: false,
			}
		},

		mounted() {
			// console.log("PAY - Mounted.")
      if (this.storageHashChanged) {
        appStore.setBookingConfirmed('false')
      }
		},


		methods: {


      confirmBooking() {
        console.log("confirmBooking")
        appStore.setBookingConfirmed('true')
      },

      onTAndCsChecked(ev) {
        // console.log(ev.target.checked)
        this.tAndCsChecked = ev.target.checked
      },

    },


    computed: {

      hasConfirmedBooking: {
        // getter
        get() {
          return appStore.getBookingConfirmed()
        },
        // setter
        set(newValue) {
          appStore.setBookingConfirmed(newValue)
        }
      },

      // hasStorageChanged () {
      //   return this.contactPassenger.phone
      // },

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


      getFlghtDayName() {
        const fltDate = new Date( Date.parse( this.flightDate ) )
        // console.log("fltDate", fltDate)
        const dayInt = fltDate.getDay()
        return calUtils.getDayString(dayInt)
      },

      getFlghtDateFormatted () {
        const fltDate = new Date( Date.parse( this.flightDate  ) )
        //console.log("fltDate", fltDate)
        const day = fltDate.getDate()
        const dayInt = fltDate.getDay()
        const dayName = calUtils.getDayString(dayInt)
        // const dayTh = calUtils.getLocalizedDayPostfix(dayInt)
        const monthInt = fltDate.getMonth()
        const monthName = calUtils.getMonthString(monthInt)
        const year = fltDate.getFullYear()
        // console.log("fltDate", dayInt, dayName, monthName)
        return `${monthName} ${day}, ${year}`
      },



      /**
       * This computed value is requried by the base '_Page' class.
       * It is tightly coupled, but lets the base handle all event
       * work for all child Pages in the same manner.
       */
      _isPageValid() {

        if(this.hasConfirmedBooking === false) return false

        // Check if Stripe is happy...

        // and T&Cs are checked
        if ( this.tAndCsChecked === false ) return false

        return true
      },

    }, // computed


  }


</script>

<style>

  #confirmFlightGrid > div  {
    padding-left: 1rem;
    padding-right: 1rem;
    border-bottom: 1px solid rgba(0,0,0, 0.05);
  }

  #confirmContactGrid > div {
    border-bottom: 1px solid rgba(0,0,0, 0.05);
  }

    /* Gives the lower grid lines */
    #confirmFlightGrid > div:nth-child(-n + 2),
    #confirmContactGrid > div:nth-child(-n + 2) {
      border-top: 1px solid rgba(0,0,0, 0.03);
    }
    /* Row background color */
    #confirmFlightGrid > div:nth-child(4n-2) {
      background-color: rgba(0,0,0, 0.03);
    }
    #confirmFlightGrid > div:nth-child(4n-3) {
      background-color: rgba(0,0,0, 0.03);
    }

    div.cpHeader {
      font-weight: 500;
      background-color: rgba(0,0,0, 0.05);
    }
    #confirmPassengersGrid > div {
      padding-top: 0.2em;
      padding-bottom: 0.2em;
      border-bottom: 1px solid rgba(0,0,0, 0.05);
    }

</style>