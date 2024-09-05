<template>

  <div id="headerBox" class=" mx-auto pb-4 md:pb-6 py-[3vw] w-full max-w-lg sm:w-3/4 md:w-4/5 lg:w-1/2  ">

    <h1
      class="select-none pb-4 tracking-tighter md:pb-8 text-3xl text-center font-black text-[color:var(--booking-hilite)] drop-shadow-md ">
      5. Confirm Your Booking
    </h1>

    <!-- <a href="#" @click="console.log(valid() ? '5. Confirm - valid page' : '5. Confirm - Not valid page')">Test
      Valid()</a> -->

    <!-- This is the Confirm Booking Intro text. -->
    <div id="confirmBookingWrapper" v-if="hasConfirmedBooking === false">
      <div>
        <p class="pb-4 px-2">
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
          <div id="confirmFlightGrid" style="grid-template-columns: 160px auto;"
            class="m-auto   grid grid-flow-row auto-rows-max        sm:max-w-screen-sm  ">
            <div class="rowLabel">People Flying:</div>
            <div class="rowValue">{{ totalPassengers }}</div>

            <div class="rowLabel">Flight Date:</div>
            <div class="rowValue">{{ getFlghtDayName }} &mdash; {{ getFlghtDateFormatted }}</div>

            <div class="rowLabel">Meeting Time(s):</div>
            <div class="rowValue">{{ meetingTime }}</div>

            <div class="rowLabel">Flight:</div>
            <div class="rowValue">{{ flightAndPrice }}</div>

            <div class="rowLabel">Photos + Videos:</div>
            <div class="rowValue text-green-700" v-if="hasPhotos">{{ photos }}</div>
            <div class="rowValue text-red-700" v-if="!hasPhotos">{{ photos }}</div>
          </div>

          <!-- This is the Confirm Contact Grid. -->
          <p class="mt-4 ml-4 mb-1 italic text-orange-800">
            Contact Details:
          </p>
          <div id="confirmContactGrid" style="grid-template-columns: 130px auto;" class="mt-0  mx-4   grid grid-flow-row-dense 
                sm:max-w-screen-sm  ">
            <div class="rowLabel">Telephone:</div>
            <div class="rowValue">{{ telephone }}</div>

            <div class="rowLabel">Email:</div>
            <div class="rowValue underline">{{ email }}</div>

          </div>

          <!-- Confirm Booking Button.  -->
          <div class="text-center mt-8">
            <button type="button" @click="confirmBooking" class="uppercase   animate-pulse hover:animate-none   rounded-full bg-lime-200 px-4 py-2.5 text-sm font-semibold text-gray-900 shadow-sm 
                  border-[1px] border-gray-400
                  ring-4 ring-offset-2 ring-orange-700 hover:bg-lime-200 hover:text-green-900 hover:shadow-lg">
              Confirm
            </button>
          </div>

          <!-- Pasengers lising Grid. -->
          <p class="mt-4 ml-0 mb-1 italic text-orange-800">
            Passengers:
          </p>
          <div id="confirmPassengersGrid" style="grid-template-columns: auto 50px 50px 90px 30px;"
            class="mt-0 mx-auto   grid grid-flow-row-dense   text-sm  border-2 border-slate-50  ">
            <div class="cpHeader pl-2">Name</div>
            <div class="cpHeader text-center">M/F</div>
            <div class="cpHeader text-center">Age</div>
            <div class="cpHeader text-center">Confidence</div>
            <div class="cpHeader text-center">
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" role="img" aria-hidden="true"
                class="h-5 w-5 ml-1">
                <path
                  d="M12,3A4,4 0 0,1 16,7C16,7.73 15.81,8.41 15.46,9H18C18.95,9 19.75,9.67 19.95,10.56C21.96,18.57 22,18.78 22,19A2,2 0 0,1 20,21H4A2,2 0 0,1 2,19C2,18.78 2.04,18.57 4.05,10.56C4.25,9.67 5.05,9 6,9H8.54C8.19,8.41 8,7.73 8,7A4,4 0 0,1 12,3M12,5A2,2 0 0,0 10,7A2,2 0 0,0 12,9A2,2 0 0,0 14,7A2,2 0 0,0 12,5M6,11V19H8V16.5L9,17.5V19H11V17L9,15L11,13V11H9V12.5L8,13.5V11H6M15,11C13.89,11 13,11.89 13,13V17C13,18.11 13.89,19 15,19H18V14H16V17H15V13H18V11H15Z">
                </path>
              </svg>
            </div>

            <template v-for="aPassenger in allPassengers">
              <div class="pl-2">{{ aPassenger.name }}</div>
              <div class="text-center">{{ ucFirst(aPassenger.sex) }}</div>
              <div class="text-center">{{ aPassenger.age }}<span class="text-gray-500 text-xs pl-0.5">years</span></div>
              <div class="text-center">{{ aPassenger.confidence }}</div>
              <div class="text-center">{{ aPassenger.weightKg }}<span class="text-gray-500 text-xs pl-0.5">Kg</span>
              </div>
            </template>

          </div>

          <div class=" text-indigo-800 text-sm mt-4 text-center" v-if="!hasPhotos">
            Tip: you can always ask for the photos after your flight as well...
          </div>

        </div>
      </div>

    </div><!-- END: Confirm Booking Wrapper.  -->



    <!-- Payment Block -->
    <div id="checkoutWrapper" v-show="hasConfirmedBooking === true">
      <div>
        <p class="pb-6 px-2">
          After checking that your details are correct, enter your Credit Card details to complete your booking. Your
          card
          will only be captured (not charged until after your flight).
        </p>
      </div>

      <!-- Passengers, date and Show Booking Details...  -->
      <div class="mb-6 overflow-hidden rounded-lg bg-white border-[1px] border-gray-300 shadow">
        <div class="px-4 py-5 ">

          <p class="text-center">
            <svg class="h-8 w-8 inline mr-2 fill-orange-600" xmlns="http://www.w3.org/2000/svg" height="48"
              viewBox="0 -960 960 960" width="48">
              <path
                d="M120-120v-60h720v60H120Zm64-208L81-503l43-8 70 62 226-61-171-287 58-17 285 257 216-58q27-8 49 9.5t22 46.5q0 19-11.5 34T838-505L184-328Z" />
            </svg>
            {{ totalPassengers }} Passenger(s): {{ getFlghtDayName }} &ndash; {{ getFlghtDateFormatted }}
          </p>

          <!-- Show Booking Detail btn  -->
          <div class="text-sm cursor-pointer hover:text-orange-800 text-center" @click="hasConfirmedBooking = false">
            <button type="button" @click="hasConfirmedBooking = true" class=" relative top-1.5 mr-1 rounded-full h-6 w-6  bg-white px-0 py-0 text-sm font-semibold text-gray-900 
              shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50">
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5"
                stroke="currentColor" class="w-6 h-6">
                <path stroke-linecap="round" stroke-linejoin="round"
                  d="M9 12.75l3 3m0 0l3-3m-3 3v-7.5M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </button>
            Show Booking Details again...
          </div>

        </div>
      </div><!-- END: Passengers, date and Show Booking Details...  -->


      <!-- Booking Notes  -->
      <div class="mb-6  overflow-hidden rounded-lg bg-white border-[1px] border-gray-300 shadow select-none">
        <div class="px-4 py-5 ">

          <div id="clickBox" @click="toggleBookingMsg = !toggleBookingMsg" class="cursor-pointer  ">
            <svg class="w-6 h-6 inline relative -top-0.5 fill-orange-700" xmlns="http://www.w3.org/2000/svg" height="48"
              viewBox="0 -960 960 960">
              <path
                d="M453-280h60v-240h-60v240Zm26.982-314q14.018 0 23.518-9.2T513-626q0-14.45-9.482-24.225-9.483-9.775-23.5-9.775-14.018 0-23.518 9.775T447-626q0 13.6 9.482 22.8 9.483 9.2 23.5 9.2Zm.284 514q-82.734 0-155.5-31.5t-127.266-86q-54.5-54.5-86-127.341Q80-397.681 80-480.5q0-82.819 31.5-155.659Q143-709 197.5-763t127.341-85.5Q397.681-880 480.5-880q82.819 0 155.659 31.5Q709-817 763-763t85.5 127Q880-563 880-480.266q0 82.734-31.5 155.5T763-197.684q-54 54.316-127 86Q563-80 480.266-80Zm.234-60Q622-140 721-239.5t99-241Q820-622 721.188-721 622.375-820 480-820q-141 0-240.5 98.812Q140-622.375 140-480q0 141 99.5 240.5t241 99.5Zm-.5-340Z" />
            </svg>

            <p class="text-sm inline ml-1 text-gray-700">
              Click to add an optional Booking Message...
            </p>
          </div>

          <div v-if="toggleBookingMsg">

            <p class="mt-2 text-sm text-gray-700">
              If you have any questions, special wishes or have extra information regarding your Booking,
              please let us know here.
            </p>
            <div class="mt-2 px-0">
              <textarea id="assistanceMsg" name="assistanceMsg" rows="4"
                class="w-full rounded-md focus:ring-indigo-600 "></textarea>
            </div>

          </div>

        </div>
      </div><!-- END: Booking Notes -->



      <!-- Table Showing Flights w/ costs and Photos/Vids  -->
      <div class="mb-6 overflow-hidden sm:rounded-lg bg-white sm:border-[2px] sm:border-gray-400 sm:shadow">
        <div class="sm:px-4 py-5 ">
          <section aria-labelledby="summary-heading"
            class="bg-gray-100/75 px-4 pb-6 pt-4 sm:px-6 lg:col-start-2 lg:row-start-1   lg:pb-16">

            <h2 id="summary-heading" class="text-indigo-800 font-bold text-lg">
              Order Overview:
            </h2>

            <ul role="list" class="divide-y divide-gray-200 text-sm font-medium text-gray-900">

              <li class="flex items-start space-x-4 py-6">
                <img src="https://tailwindui.com/img/ecommerce-images/checkout-page-04-product-01.jpg"
                  alt="Moss green canvas compact backpack with double top zipper, zipper front pouch, and matching carry handle and backpack straps."
                  class="h-20 w-20 flex-none rounded-md object-cover object-center">
                <div class="flex-auto space-y-1">
                  <h3 class="text-base">
                    {{ totalPassengers }}x {{ flightName }} Paragliding Flight
                  </h3>
                  <p class="text-gray-500">TODO: Flight Description Text here.<br> {{ flightName }} @ {{
                    singleFlightPrice
                    }}.- CHF</p>
                </div>
                <p class="flex-none text-base font-medium">{{ totalPassengers * singleFlightPrice }}.- CHF</p>
              </li>

              <li v-if="hasPhotos" class="flex items-start space-x-4 py-6">
                <img src="https://tailwindui.com/img/ecommerce-images/checkout-page-04-product-01.jpg"
                  alt="Moss green canvas compact backpack with double top zipper, zipper front pouch, and matching carry handle and backpack straps."
                  class="h-20 w-20 flex-none rounded-md object-cover object-center">
                <div class="flex-auto space-y-1">
                  <h3 class="text-base">
                    {{ totalPassengers }}x Photo/Video Package
                  </h3>
                  <p class="text-gray-500">TODO: Photos Text here.<br> Package @ {{ photoVideoPackagePrice }}.- CHF</p>
                </div>
                <p class="flex-none text-base font-medium">{{ totalPassengers * photoVideoPackagePrice }}.- CHF</p>
              </li>

            </ul>

            <dl class="space-y-6 pt-6 text-sm font-medium text-gray-900 lg:block">
              <div class="flex items-center justify-between border-t border-gray-200 pt-6">
                <dt class="text-base text-indigo-800">Total</dt>
                <dd class="text-base text-indigo-800 drop-shadow-sm">
                  {{ orderTotalAmount() }}.- CHF
                </dd>
              </div>
            </dl>

          </section>

        </div>
      </div><!-- END: Table Showing Flights w/ costs and Photos/Vids  -->





      <!-- Stripe Checkout component  -->
      <div class="mb-6 overflow-hidden sm:rounded-lg bg-white s sm:border-[2px] sm:border-gray-400 sm:shadow">

        <h2 id="summary-heading" class="text-indigo-800 font-bold text-lg pt-4 pl-4 pb-2 shadow-sm">
          Card Details
          <span class="block text-sm font-light text-gray-700">A valid Card is required to complete your Booking.</span>
        </h2>

        <div id="stripe-card-element" class="px-4 py-5 text-gray-300 min-h-[300px]">
          loading...
        </div>
      </div><!-- END: Stripe Checkout component -->





      <!-- T&C's checkbox.  -->
      <div class="pl-6 pr-2 relative flex items-start">
        <div class="flex h-6 items-center">
          <input id="terms" @change="onTAndCsChecked" aria-describedby="comments-description" name="terms"
            type="checkbox"
            class="h-4 w-4 cursor-pointer rounded border-gray-700 text-orange-600 focus:ring-gray-300" />
        </div>
        <div class="ml-3 text-sm leading-6">
          <label for="terms" class="font-medium cursor-pointer text-gray-900">
            Terms &amp; Conditions
            <span id="terms-description" class="text-gray-700 font-normal block">
              To complete your Booking, click this checkbox to indicate that you have read and agree to the
              <a class="underline font-bold text-indigo-800" href="#todo"
                target="_blank">Terms&nbsp;&amp;&nbsp;Conditions</a>
              of Swiss Paraglide Zermatt's Customer Agreement.
            </span>
          </label>
        </div>
      </div> <!-- END: T&C's checkbox.  -->

      <!-- Book Flight Btn -->
      <div class="text-center mt-6 mb-6">
        <button type="button" @click="bookFlight()"
          class="inline-flex items-center gap-x-2 rounded-md bg-orange-700 px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm  focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 "
          :class="_isPageValid && stripeInputsCompleted ? 'hover:bg-indigo-500' : 'opacity-50'"
          :disabled="_isPageValid === false || stripeInputsCompleted === false">
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5"
            stroke="currentColor" class="w-6 h-6">
            <path stroke-linecap="round" stroke-linejoin="round"
              d="M12.75 15l3-3m0 0l-3-3m3 3h-7.5M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
          Book Flight
        </button>

        <p id="bookFlightMsg" v-if="tAndCsChecked && _isPageValid && stripeInputsCompleted"
          class="text-orange-700 text-sm py-4">
          Clicking
          "<span class="font-bold">Book Flight</span>"
          will capture your card details<br> &amp; complete your Booking.
        </p>

      </div> <!-- END: Book Flight Btn -->

      <!-- <p>{{ this.stripeInputsCompleted === true ? 'Stripe Good!' : 'Stripe xxx' }}</p> -->

      <div v-html="stripeDevMessages">

      </div>

    </div>

    <!-- hasConfirmedBooking: {{hasConfirmedBooking}} -- 
    storageHashChanged: {{ storageHashChanged }} -->

  </div>

  <div id="footer-spacer" class="h-14"></div>

</template>


<script>
import { loadStripe } from '@stripe/stripe-js'

import _api from "@components/api/_apiBase.js"

// Stores
import { appStore } from '@stores/appStore.js'
import { datesStore as dateStore } from '@stores/pageDateStore.js'
import { pageFlightStore as flightStore } from '@stores/pageFlightStore.js'
import { pageTimeSlotsStore as timeStore } from '@stores/pageTimeSlotsStore.js'
import { pagePassengersStore as passengersStore } from '@stores/pagePassengersStore.js'

// Parent component for all "Pages"
import _Page from './_Page.vue'

// Calendar Utils.
import { calendarUtils as calUtils } from '@components/booking/calendarUtils.js'

import { addDays, subDays, isAfter, isBefore, isEqual, parseISO, getDate, getMonth, getYear, format } from 'date-fns'

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

      hasPhotos: flightStore.getPhotosToggle() ? true : false,

      // -------- Stripe Payment Stuff --------
      // Store a "BookingHash" in LocalStorage. Use this to connect to our backend & Stripe.
      _bookingHash: localStorage._bookingHash ? localStorage._bookingHash : '',

      // Pass in Date Time formats as something that Carbon can parse easily.
      _flightDate: dateStore.getFlightDate() + ' 00:00:00',
      // Arrive/Depart Date Time strings. YYYY-MM-DD HH:mm:ss.ss
      _arriveDateTime: dateStore.getArriveDateTime(),
      _departDateTime: dateStore.getDepartDateTime(),

      _selectedFlightId: flightStore.getFlightChosen(),
      _hasPhotosBool: flightStore.getPhotosToggle() ? true : false,   // same as above, but cleaner to follow the naming here.


      // Time Slots.
      _timeSlotsList: timeStore.getTimeSlotsPassengersList(),

      // Passenger Details.
      _passengersList: passengersStore.getAllPassengersList(),

      // Stripe
      apiType: _api.getAPIType(),
      stripe: null,
      elements: null,
      _secret: '',
      // --
      stripeInputsCompleted: false,
      // -- Stripe Card messages.
      stripeDevMessages: '',
      stripeBookingMessages: '',

    }
  },

  async mounted() {
    // console.log("PAY - Mounted.")
    flightStore.initialize()
    if (this.storageHashChanged) {
      appStore.setBookingConfirmed('false')
    }

    // Creates or finds a Stripe User.
    // Creates a SetupIntent for the User.
    // Saves the Booking data to the DB (for future confirmation via Webhook).
    this._secret = await this.setupStripe()
    this.stripeDevMessages += `• Stripe Setup API complete -> Secret has been returned: ${this._secret} </br>`

    // Initialize Stripe


    // TODO: Need to get the Public Key from a env var.
    this.stripe = Stripe('pk_test_51Nv2ecBAgiPA9UQuIh20l4wMpRuJUsRbTXZPOWyk8KkaNFppi4cdvvotjYyC5NV0LBSD0W1RI1X3xuGo6nf1n6Jv00HSFqUI9L');


    const secret = this._secret
    this.elements = this.stripe.elements({
      clientSecret: secret,
      loader: "always",
    });

    // Create an instance of the card Element
    this.cardElement = this.elements.create('payment');

    // // Listen for the input completed event, so we can activate the Book Flight button.
    this.cardElement.on('change', this.onStripeElementsChange)

    // Add an instance of the card Element into the `card-element` <div>
    this.cardElement.mount('#stripe-card-element')
    this.stripeDevMessages += '• Stripe Card Element mounted. </br>'

  },


  methods: {

    async setupStripe() {

      // Customer ID is stored in LocalStorage, so we can re-use it if they reload the page.
      let _stripeCustId = localStorage.stripeCustId ? localStorage.stripeCustId : ''
      if (_stripeCustId === undefined) {
        this.stripeDevMessages += '• No Stripe Customer in LocalStorage (was Undefined). Will create a New Stripe Customer </br>'
        _stripeCustId = ''
      } else if (_stripeCustId === '') {
        this.stripeDevMessages += '• No Stripe Customer in LocalStorage. Will create a New Stripe Customer </br>'
      } else {
        this.stripeDevMessages += '• Found Stripe Customer in LocalStorage. Will use this Customer ID: ' + _stripeCustId + ' </br>'
      }

      // Don't want to call LIVE on the dev Sail.
      // Local, Staging or LIVE path here.
      let stripeTestMode = true
      let host = new URL(document.location).hostname
      let path = 'http://spzadmin.local:88/api/v1/stripe/setup'   // Local or Staging.
      if (host == 'localhost') {
        this.stripeDevMessages += '• On Local Dev. Using the Sail API path: ' + path + ' </br>'
      } else if (host == 'swisspara.netlify.app') {
        path = 'https://admin.swissparaglide.com/api/v1/stripe/setup'
        this.stripeDevMessages += '• On Netlify Staging. Using Live API path with Dev flag: ' + path + ' </br>'
      } else {
        // Live Stripe calls.
        stripeTestMode = false
        path = 'https://admin.swissparaglide.com/api/v1/stripe/setup'
        this.stripeDevMessages += '• Live API path -> Real Stripe Card and Customer setup: ' + path + ' </br>'
      }

      let content = {}

      try {
        const rawResponse = await fetch(path, {
          method: 'POST',
          headers: { 'Accept': 'application/json', "Content-Type": "application/json" },
          body: JSON.stringify({
            "stripeTestMode": stripeTestMode,
            "customerId": _stripeCustId,
            "name": this.contactPassenger.name,
            "email": this.contactPassenger.email,
            "phone": this.contactPassenger.phone
          })
        });
        content = await rawResponse.json()
        if (!rawResponse.ok) {
          throw new Error(`rawResponse status: ${rawResponse.status}`);
        }

      } catch (error) {
        console.error(error.message);
      }

      console.log("API /setup returned: ", content)

      // Don't save the client secret anywhere.
      const secret = content.client_secret

      // Save the Customer ID to the LocalStorage.
      // Pass this into Stripe setup API call, so we don't make a new Stripe
      // Customer on each load here.
      localStorage.stripeCustId = content.customer_id

      return secret

    },

    /**
     * Customer has clicked the "Book Flight" button.
     */
    async bookFlight() {

      this.stripeDevMessages += '-> Book Flight Btn pushed. </br>'

      const secret = this._secret
      const cardElement = this.cardElement
      const elements = this.elements

      // This was the missing jiju for making this work with Stripe.
      // Adding a Payment to the Stripe PaymentIntent.
      var { error: submitError } = await this.elements.submit();
      if (error) {
        // Handle error here
        console.error('this.elements.submit()', error);
        this.stripeDevMessages += '✓ Stripe Elements submit() FAILED. Retry??? </br>'
        // TODO: Remove page blocker...
        return
      }
      console.log('this.elements.submit() worked');
      this.stripeDevMessages += '✓ Stripe Elements submit() success. Payment Added to this Customer. </br>'
      

      // Confirm the Stripe SetupIntent here.
      // Stay on this page and show the User a success message (or error and try again)
      var { setupIntent, error } = await this.stripe.confirmSetup({
        clientSecret: secret,
        elements,
        redirect: 'if_required'
      });
      if (error) {
        // Handle error here
        console.error('Stripe confirmSetup returned an Error', error);
        this.stripeDevMessages += '✘ Stripe SetupIntent Error. Get user to try again... </br>'
        // TODO: Remove page blocker...
        return
      } 

      // We've Captured the Card. Tell the user.
      // The actual payment will be done after the flight.
      // The Booking Addition is controlled by the Stripe Webhook.
      console.log('SetupIntent succeeded:', setupIntent);
      this.stripeDevMessages += '✓ Stripe SetupIntent Success! </br>'


      // TODO: If success, then call the API to create a New Booking in our system.__VLS_componentsOption
      // -- Send customer emails
      // -- Send us New Booking email & SMS.



      // let content = {}
      // try {

      //   const rawResponse = await fetch('http://spzadmin.local:88/api/v1/stripe/setup', {
      //     method: 'POST',
      //     headers: {'Accept': 'application/json', "Content-Type": "application/json" },
      //     body: JSON.stringify({
      //       "bookingHash": this._bookingHash,
      //       "flightDate": this._flightDate,
      //       "arriveDate": this._arriveDateTime,
      //       "departDate": this._departDateTime,
      //       "selectedFlightId": this._selectedFlightId,
      //       "hasPhotosBool": this._hasPhotosBool,
      //       "timeSlotsList": this._timeSlotsList,
      //       "passengersList": this._passengersList,
      //     })
      //   });
      //   content = await rawResponse.json()
      //   if (!rawResponse.ok) {
      //     throw new Error(`rawResponse status: ${rawResponse.status}`);
      //   }

      // } catch (error) {
      //   console.error(error.message);
      // }



      console.log('Booking Completed!');
      this.stripeDevMessages += '✓ Booking Complete! Order shoulbe be in our db and Emails/SMS sent... </br>'
      

    },

    // Handle when the Stripe Card element is completed.
    onStripeElementsChange(ev) {
      console.log("Stripe Valid: ", ev.complete)
      if (ev.complete === true) {
        this.stripeInputsCompleted = true
      } else {
        this.stripeInputsCompleted = false
      }

    },

    orderTotalAmount() {
      return this.totalPassengers * (this.singleFlightPrice + (this.hasPhotos ? this.photoVideoPackagePrice : 0))
    },


    /**
     * This method must be overrided in each of these Page components.
     * A new attempt at sorting out the current messy navigation system.
     */
    valid() {
      // Overriden from the base '_Page' class.
      console.log('-> Payment.vue: valid()')

      // if (this.hasConfirmedBooking === false) return false
      // // Check if Stripe is happy...

      // // and T&Cs are checked
      // if (this.tAndCsChecked === false) return false

      return true

    },

    confirmBooking() {
      console.log("confirmBooking")
      appStore.setBookingConfirmed('true')
    },

    onTAndCsChecked(ev) {
      // console.log(ev.target.checked)
      this.tAndCsChecked = ev.target.checked
    },

    ucFirst(string) {
      if (string === undefined || string === null || string === '') return ''
      return string.charAt(0).toUpperCase() + string.slice(1)
    },

  },


  computed: {

    photoVideoPackagePrice() {
      return appStore.getVideoPrice() / 100
    },

    flightName() {
      const flObj = flightStore.getFlightObj()
      return this.ucFirst(flObj.name)
    },
    singleFlightPrice() {
      const price = flightStore.getFlightObj().price / 100
      return price
    },


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

    telephone() {
      return this.contactPassenger.phone
    },
    email() {
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
    flightAndPrice() {
      const flObj = flightStore.getFlightObj()
      return this.ucFirst(flObj.name) + ": " + (flObj.price / 100) + ".- CHF"
    },
    photos() {
      const photoFlag = flightStore.getPhotosToggle()
      if (photoFlag) return "✓ Photos/Videos Package"
      if (!photoFlag) return "✗ No Photos/Videos"
      // TODO: Put an actual green/red Toggle button here, to let the user
      //       change their minds easily.
    },


    getFlghtDayName() {
      const fltDate = new Date(Date.parse(this.flightDate))
      return format(fltDate, 'EEE')
      // // console.log("fltDate", fltDate)
      // const dayInt = fltDate.getDay()
      // return calUtils.getDayString(dayInt)
    },

    getFlghtDateFormatted() {
      const fltDate = new Date(Date.parse(this.flightDate))
      var month = format(fltDate, 'LLL')
      var day = format(fltDate, 'do')
      var year = format(fltDate, 'YYY')
      return `${month}. ${day}, ${year}`

      // //console.log("fltDate", fltDate)
      // const day = fltDate.getDate()
      // const dayInt = fltDate.getDay()
      // const dayName = format(fltDate, 'MMM')            //calUtils.getDayString(dayInt)
      // // const dayTh = calUtils.getLocalizedDayPostfix(dayInt)
      // const monthInt = fltDate.getMonth()
      // const monthName = calUtils.getMonthString(monthInt)
      // const year = fltDate.getFullYear()
      // // console.log("fltDate", dayInt, dayName, monthName)
      // return `${monthName} ${day}, ${year}`
    },



    /**
     * This computed value is requried by the base '_Page' class.
     * It is tightly coupled, but lets the base handle all event
     * work for all child Pages in the same manner.
     */
    // TODO: remove this - use valid() method instead.
    _isPageValid() {
      console.log("Payment._isPageValid() is deprecated")

      if (this.hasConfirmedBooking === false) return false

      // Check if Stripe is happy...

      // and T&Cs are checked
      if (this.tAndCsChecked === false) return false

      return true
    },

  }, // computed


}


</script>

<style>
#confirmFlightGrid>div {
  padding-left: 1rem;
  padding-right: 1rem;
  border-bottom: 1px solid rgba(0, 0, 0, 0.05);
}

#confirmContactGrid>div {
  border-bottom: 1px solid rgba(0, 0, 0, 0.05);
}

/* Gives the lower grid lines */
#confirmFlightGrid>div:nth-child(-n + 2),
#confirmContactGrid>div:nth-child(-n + 2) {
  border-top: 1px solid rgba(0, 0, 0, 0.03);
}

/* Row background color */
#confirmFlightGrid>div:nth-child(4n-2) {
  background-color: rgba(0, 0, 0, 0.03);
}

#confirmFlightGrid>div:nth-child(4n-3) {
  background-color: rgba(0, 0, 0, 0.03);
}

div.cpHeader {
  font-weight: 500;
  background-color: rgba(0, 0, 0, 0.05);
}

#confirmPassengersGrid>div {
  padding-top: 0.2em;
  padding-bottom: 0.2em;
  border-bottom: 1px solid rgba(0, 0, 0, 0.05);
}
</style>import type { log } from 'node_modules/astro/dist/core/logger/core';import type { log } from
'node_modules/astro/dist/core/logger/core'import { log } from 'astro/dist/core/logger/core'
import type { email } from '@vuelidate/validators'
