<template>

    <h1 class="pb-8 md:pb-12 text-4xl text-center font-black text-indigo-600 drop-shadow-md ">
        1. Get Started
    </h1>


    <div id="flightDateBox"
        class="mx-auto pb-8 md:pb-12 pl-[3vw] w-full sm:w-3/4 md:w-4/5 lg:w-1/2 xl:w-2/5 2xl:w-[30em] ">
        <!-- (1) -->
        <!-- <span class="w-12 h-12  sm:w-14 sm:h-14
            text-3xl sm:text-4xl 
            pt-1 sm:pt-1.5 pl-1 
            font-black  drop-shadow-lg border-black border-2   inline-block   rounded-full bg-indigo-600 text-white">
            <span class="pl-2">1.</span>
        </span> -->

      <label for="flightDateInput" class="text-xl md:text-2xl inline pl-2 font-medium text-gray-900">
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" 
          class="w-6 h-6 inline-block mb-1 text-indigo-600"
        >
          <path 
            stroke-linecap="round" stroke-linejoin="round" 
            d="M6.75 3v2.25M17.25 3v2.25M3 18.75V7.5a2.25 2.25 0 012.25-2.25h13.5A2.25 2.25 0 0121 7.5v11.25m-18 0A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75m-18 0v-7.5A2.25 2.25 0 015.25 9h13.5A2.25 2.25 0 0121 11.25v7.5m-9-6h.008v.008H12v-.008zM12 15h.008v.008H12V15zm0 2.25h.008v.008H12v-.008zM9.75 15h.008v.008H9.75V15zm0 2.25h.008v.008H9.75v-.008zM7.5 15h.008v.008H7.5V15zm0 2.25h.008v.008H7.5v-.008zm6.75-4.5h.008v.008h-.008v-.008zm0 2.25h.008v.008h-.008V15zm0 2.25h.008v.008h-.008v-.008zm2.25-4.5h.008v.008H16.5v-.008zm0 2.25h.008v.008H16.5V15z" 
          />
        </svg>
        Choose your Flight Date:
      </label>
      <div id="dateInputBox" class="mt-3 pl-0 md:pl-4">
       
        <input type="input" name="flightDateInput" id="flightDateInput" 
          :value="displayDate(flightDate)"
          readonly 
          @click="onDateInputClick('flightDateInput', $event)"
          placeholder="Click to enter your flight date..."
          class="inline-block  rounded-md border-0 
          ml-2 py-2 px-2 
          w-72 sm:w-80
          overflow-clip
          cursor-pointer
          read-only:bg-gray-100
          text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 " 
        />
        <!-- This would make a good sep component.  -->
        <svg 
            class="w-6 h-6 inline-block ml-2 mb-1 text-lime-600"
            :class="[!flightDate ? 'hidden' : '']"
            xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor">
            <path fill-rule="evenodd" d="M2.25 12c0-5.385 4.365-9.75 9.75-9.75s9.75 4.365 9.75 9.75-4.365 9.75-9.75 9.75S2.25 17.385 2.25 12zm13.36-1.814a.75.75 0 10-1.22-.872l-3.236 4.53L9.53 12.22a.75.75 0 00-1.06 1.06l2.25 2.25a.75.75 0 001.14-.094l3.75-5.25z" clip-rule="evenodd" />
        </svg>

      </div>
    </div>


	<Transition name="fade">
    <div 
        v-if="showFlightDatePicker || showArriveDatePicker || showDepartDatePicker"
        id="calendarModal"
        class="fixed inset-0 z-[97] w-screen bg-gray-500 bg-opacity-90 overflow-y-auto"
    >
        <div class="flex flex-col place-content-center gap-4    min-h-screen p-4 text-center ">
            
            <div 
                v-if="showFlightDatePicker"
                class="flex place-self-center justify-center  w-60 text-2xl text-black bg-white py-2 px-4 rounded-3xl font-bold drop-shadow-lg ">

				<svg 
					class="w-6 h-6 inline-block mt-1 mr-2 text-indigo-600"
					xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" 
					>
					<path 
						stroke-linecap="round" stroke-linejoin="round" 
						d="M6.75 3v2.25M17.25 3v2.25M3 18.75V7.5a2.25 2.25 0 012.25-2.25h13.5A2.25 2.25 0 0121 7.5v11.25m-18 0A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75m-18 0v-7.5A2.25 2.25 0 015.25 9h13.5A2.25 2.25 0 0121 11.25v7.5m-9-6h.008v.008H12v-.008zM12 15h.008v.008H12V15zm0 2.25h.008v.008H12v-.008zM9.75 15h.008v.008H9.75V15zm0 2.25h.008v.008H9.75v-.008zM7.5 15h.008v.008H7.5V15zm0 2.25h.008v.008H7.5v-.008zm6.75-4.5h.008v.008h-.008v-.008zm0 2.25h.008v.008h-.008V15zm0 2.25h.008v.008h-.008v-.008zm2.25-4.5h.008v.008H16.5v-.008zm0 2.25h.008v.008H16.5V15z" 
					/>
				</svg>
				Flight Date
            </div>

            <div 
                v-if="showArriveDatePicker"
                class="flex place-self-center justify-center  w-[190px] text-xl italic text-black bg-white py-2 px-2 rounded-3xl drop-shadow-lg ">
				<svg 
					class="w-6 h-6 inline-block mb-1 mr-1 text-indigo-600"
					xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" >
					<path fill-rule="evenodd" d="M3.97 3.97a.75.75 0 011.06 0l13.72 13.72V8.25a.75.75 0 011.5 0V19.5a.75.75 0 01-.75.75H8.25a.75.75 0 010-1.5h9.44L3.97 5.03a.75.75 0 010-1.06z" clip-rule="evenodd" />
				</svg>
				Arrival Date
            </div>

            <div 
                v-if="showDepartDatePicker"
                class="flex place-self-center justify-center  w-[190px] text-xl italic text-black bg-white py-2 px-4 rounded-3xl drop-shadow-lg ">
				<svg 
					class="w-6 h-6 inline-block mb-1 mr-1 text-indigo-600"
					xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" >
					<path stroke-linecap="round" stroke-linejoin="round" d="M4.5 19.5l15-15m0 0H8.25m11.25 0v11.25" />
				</svg>
				Depart Date
            </div>


            <!-- Flight Calendar  -->
				<VueDatePicker 
					v-if="showFlightDatePicker"
					id="flightDatePicker"
					v-model="flightCal"
					:model-value="flightDate"
					:enable-time-picker="false"
					inline
					teleport-center
					auto-apply
					:min-date="new Date()"
					:max-date="getMaxFutureDate()"
					prevent-min-max-navigation 
					@update:model-value="onDateSelect"
					class="absolute z-[98] drop-shadow-xl"
				></VueDatePicker>


            <!-- Arrive Calendar  -->
            <VueDatePicker 
                v-if="showArriveDatePicker"
                id="arriveDatePicker"
                v-model="arriveCal"
                :model-value="arriveDate"
				:markers="getFlightDateMakerObj()"
                :enable-time-picker="false"
                inline
                teleport-center
                auto-apply
                :min-date="getMinArriveDate()"
                :max-date="getMaxArriveDate()"
                prevent-min-max-navigation 
                @update:model-value="onArriveDateSelect"
                class="absolute z-[98] drop-shadow-xl"
            ></VueDatePicker>


            <!-- Depart Calendar  -->
            <VueDatePicker 
                v-if="showDepartDatePicker"
                id="departDatePicker"
                v-model="departCal"
                :model-value="departDate"
				:markers="getFlightDateMakerObj()"
                :enable-time-picker="false"
                inline
                teleport-center
                auto-apply
                :min-date="getMinDepartDate()"
                :max-date="getMaxDepartDate()"
                prevent-min-max-navigation 
                @update:model-value="onDepartDateSelect"
                class="absolute z-[98] drop-shadow-xl"
            ></VueDatePicker>



        </div>
    </div>
	</Transition>

    <!-- Arrive Date input and Calendar.  -->
    <div id="arriveDateBox"
        v-if="flightDate"
        class="pb-8 md:pb-12 pl-12 md:pl-20 mx-auto  w-full sm:w-3/4 md:w-4/5 lg:w-1/2 xl:w-2/5 2xl:w-[30em]">

        <label for="arriveDateInput" class="italic text-lg md:text-xl inline pl-2 font-normal text-gray-900">
			<svg 
				class="w-6 h-6 inline-block mb-1 text-indigo-600"
				xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" >
				<path fill-rule="evenodd" d="M3.97 3.97a.75.75 0 011.06 0l13.72 13.72V8.25a.75.75 0 011.5 0V19.5a.75.75 0 01-.75.75H8.25a.75.75 0 010-1.5h9.44L3.97 5.03a.75.75 0 010-1.06z" clip-rule="evenodd" />
			</svg>

			Arriving in Zermatt:

			<svg 
				class="w-6 h-6 inline-block ml-2 mb-1 text-lime-600"
				:class="[!arriveDate ? 'hidden' : '']"
				xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor">
				<path fill-rule="evenodd" d="M2.25 12c0-5.385 4.365-9.75 9.75-9.75s9.75 4.365 9.75 9.75-4.365 9.75-9.75 9.75S2.25 17.385 2.25 12zm13.36-1.814a.75.75 0 10-1.22-.872l-3.236 4.53L9.53 12.22a.75.75 0 00-1.06 1.06l2.25 2.25a.75.75 0 001.14-.094l3.75-5.25z" clip-rule="evenodd" />
			</svg>
      </label>
      <div id="arriveDateInputBox" class="mt-3 pl-0 md:pl-4">
       
        <input type="input" name="arriveDateInput" id="arriveDateInput" 
          :value="displayDate(arriveDate)"
          readonly 
          @click="onArriveDateInputClick('arriveDateInput', $event)"
          placeholder="Arriving in Zermatt..."
          class="inline-block  rounded-md border-0 
          ml-2 py-2 px-2 
          w-72 sm:w-80
          overflow-clip
          cursor-pointer
          read-only:bg-gray-100
          text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 " 
        />

      </div>
    </div>

    <!-- Depart Date input and Calendar.  -->
    <div id="departDateBox"
        v-if="arriveDate"
        class="pb-8 md:pb-12 pl-12 md:pl-20 mx-auto  w-full sm:w-3/4 md:w-4/5 lg:w-1/2 xl:w-2/5 2xl:w-[30em]">

        <label for="departDateInput" class="italic text-lg md:text-xl inline pl-2 font-normal text-gray-900">
        <svg 
            class="w-6 h-6 inline-block mb-1 text-indigo-600"
            xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" >
            <path stroke-linecap="round" stroke-linejoin="round" d="M4.5 19.5l15-15m0 0H8.25m11.25 0v11.25" />
        </svg>


        Departing Zermatt:

        <svg 
            class="w-6 h-6 inline-block ml-2 mb-1 text-lime-600"
            :class="[!departDate ? 'hidden' : '']"
            xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor">
            <path fill-rule="evenodd" d="M2.25 12c0-5.385 4.365-9.75 9.75-9.75s9.75 4.365 9.75 9.75-4.365 9.75-9.75 9.75S2.25 17.385 2.25 12zm13.36-1.814a.75.75 0 10-1.22-.872l-3.236 4.53L9.53 12.22a.75.75 0 00-1.06 1.06l2.25 2.25a.75.75 0 001.14-.094l3.75-5.25z" clip-rule="evenodd" />
        </svg>
      </label>
      <div id="departDateInputBox" class="mt-3 pl-0 md:pl-4">
       
        <input type="input" name="departDateInput" id="departDateInput" 
          :value="displayDate(departDate)"
          readonly 
          @click="onDepartDateInputClick('departDateInput', $event)"
          placeholder="Departing Zermatt..."
          class="inline-block  rounded-md border-0 
          ml-2 py-2 px-2 
          w-72 sm:w-80
          overflow-clip
          cursor-pointer
          read-only:bg-gray-100
          text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 " 
        />

      </div>
    </div>


</template>




<script>
	// Parent component for all "Pages"
	import _Page from './_Page.vue'

	// Store
	import {flightDateStore} from '@stores/flightDateStore.js' 

	// Calendar Utils.
	import {calendarUtils as calUtils} from './calendarUtils.js'
	// import addDays from 'date-fns/addDays';

	// Components
	import VueDatePicker from '@vuepic/vue-datepicker';
	import '@vuepic/vue-datepicker/dist/main.css'


	export default {
		name: 'PageDate',
		
		extends: _Page,   // Parent class handles the valid page event emitting back to the App Shell.
		emits: ['pagevalid'], // Parent class - needs to be here too... _Page.vue

		components: {
			VueDatePicker
		},

		data() {
			return {
				// Flight Date
				flightDate: flightDateStore.getFlightDate(),    // get from Store.
				flightCal: null,
				showFlightDatePicker: false,

				// Arrive Date
				arriveDate: flightDateStore.getArriveDate(),    // get from Store.
				arriveCal: null,
				showArriveDatePicker: false,

				// Depart Date
				departDate: flightDateStore.getDepartDate(),    // get from Store.
				departCal: null,
				showDepartDatePicker: false,
			};
		},


		mounted() {
			//console.log("Date component mounted")
			window.addEventListener('click', this.onBackgroundClick)
		},
		unmounted() {
			//console.log("-> Date component unmounted")
			window.removeEventListener('click', this.onBackgroundClick)
			
		},

		computed: {

			/**
			 * This computed value is requried by the base '_Page' class.
			 * It is tightly coupled, but lets the base handle all event
			 * work for all child Pages in the same manner.
			 */
			_isPageValid() {
				return flightDateStore.isPageValid()
			},


		}, // computed


		methods: {

			onDateSelect(modelData) {
				this.flightDate = modelData
				flightDateStore.setFlightDate(modelData)    // set in Store.
				// Reset Arrive & Depart.
				this.arriveDate = ''
				flightDateStore.setArriveDate('')
				this.departDateDate = ''
				flightDateStore.setDepartDate('')
				// Hide Calendar.
				this.showFlightDatePicker = false
				
				// Automatically show the 'Arrival Date' pop up calendar.
				setTimeout(() => {
					this.showArriveDatePicker = true
				}, "150");


			},

			onDateInputClick(el, ev) {
				// console.log('clicked', el, ev)
				// Flight Date Picker is initially shown, as soon as user clicks a date, it hides itself
				// and the Arrive & Depart Dates are displayed.
				this.showFlightDatePicker = true
				ev.stopPropagation()
			},


			onArriveDateSelect(modelData) {
				this.arriveDate = modelData
				flightDateStore.setArriveDate(modelData)    // set in Store.
				this.showArriveDatePicker = false

				// Automatically show the 'Arrival Date' pop up calendar.
				setTimeout(() => {
					this.showDepartDatePicker = true
				}, "150");

			},
			onArriveDateInputClick(el, ev) {
				// console.log('clicked', el, ev)
				// Arrive Date
				this.showArriveDatePicker = true
				ev.stopPropagation()
			},

			onDepartDateSelect(modelData) {
				this.departDate = modelData
				flightDateStore.setDepartDate(modelData)    // set in Store.
				this.showDepartDatePicker = false
			},
			onDepartDateInputClick(el, ev) {
				// console.log('clicked', el, ev)
				// Depart Date
				this.showDepartDatePicker = true
				ev.stopPropagation()
			},


			displayDate( whichDateStr ) {
				if ( whichDateStr === null || whichDateStr === '' ) return ''
				//console.log('-> displayDate(): ', whichDateStr)
				const myDate = new Date( whichDateStr )
				const YYYY = myDate.getFullYear()
				const d = myDate.getDay()   // (0-6) Sunday - Saturday
				const DD = myDate.getDate() // (1-31)
				const mm = myDate.getMonth()
				return (calUtils.getDayString(d) + ' - ' + calUtils.getMonthString(mm) + ' ' + DD + calUtils.getLocalizedDayPostfix(DD) + ', ' + YYYY)
			},


			onBackgroundClick: function (event) {
				// close Calendar pickers on outside click.
				this.showFlightDatePicker = false
				this.showArriveDatePicker = false
				this.showDepartDatePicker = false
			},

			// Only allow date picking to today + 9 months
			getMaxFutureDate() {
				const monthOffset = 9
				const today = new Date()
				return new Date(today.setMonth( today.getMonth() + monthOffset ))
			},

			// Arrive Date must be <= flightDate
			getMinArriveDate() {
				const noOfDays = -7        // 2 weeks in the past.
				let minDate = new Date( Date.parse(this.flightDate) )
				//console.log('-> minDate(): ', this.flightDate)
				minDate.setTime(minDate.getTime() + (noOfDays * (1000 * 60 * 60 * 24)));
				return minDate.toDateString()
			},
			getMaxArriveDate() {
				return new Date(this.flightDate).toDateString()
			},


			// Depart Date must be >= today
			getMinDepartDate() {
				// console.log('-> minDepartDate(): ', new Date(this.flightDate).toDateString())
				return new Date(this.flightDate).toDateString()
			},
			getMaxDepartDate() {
				const daysOffset = 14
				const flightDate = new Date(this.flightDate)
				// console.log('-> flightDate(): ', flightDate)
				flightDate.setDate( flightDate.getDate() + daysOffset )
				console.log('-> after: ', flightDate)
				return flightDate.toDateString()
			},


			getFlightDateMakerObj() {
				const markers = [{
					date: new Date(this.flightDate),
					type: 'line',
					color: 'green',
					tooltip: [
						{ text:'Your Flight', color:'green' },
					],
				}]
				return markers
			},

		} // methods.


    
	}
</script>


<!-- Add "scoped" attribute to limit CSS to this component only -->
<style>
  :root {
    /*General*/
    --dp-font-family: -apple-system, blinkmacsystemfont, "Segoe UI", roboto, oxygen, ubuntu, cantarell, "Open Sans",
    "Helvetica Neue", sans-serif;
    --dp-border-radius: 4px; /*Configurable border-radius*/
    --dp-cell-border-radius: 4px; /*Specific border radius for the calendar cell*/
    --dp-common-transition: all 0.1s ease-in; /*Generic transition applied on buttons and calendar cells*/

    /*Sizing*/
    --dp-button-height: 35px; /*Size for buttons in overlays*/
    --dp-month-year-row-height: 35px; /*Height of the month-year select row*/
    --dp-month-year-row-button-size: 35px; /*Specific height for the next/previous buttons*/
    --dp-button-icon-height: 20px; /*Icon sizing in buttons*/
    --dp-cell-size: 35px; /*Width and height of calendar cell*/
    --dp-cell-padding: 5px; /*Padding in the cell*/
    --dp-common-padding: 10px; /*Common padding used*/
    --dp-input-icon-padding: 35px; /*Padding on the left side of the input if icon is present*/
    --dp-input-padding: 6px 30px 6px 12px; /*Padding in the input*/
    --dp-menu-min-width: 350px; /*Adjust the min width of the menu*/
    --dp-action-buttons-padding: 2px 5px; /*Adjust padding for the action buttons in action row*/
    --dp-row-margin:  5px 0; /*Adjust the spacing between rows in the calendar*/
    --dp-calendar-header-cell-padding:  0.5rem; /*Adjust padding in calendar header cells*/
    --dp-two-calendars-spacing:  10px; /*Space between multiple calendars*/
    --dp-overlay-col-padding:  3px; /*Padding in the overlay column*/
    --dp-time-inc-dec-button-size:  32px; /*Sizing for arrow buttons in the time picker*/
    --dp-menu-padding: 6px 8px; /*Menu padding*/
    
    /*Font sizes*/
    --dp-font-size: 1rem; /*Default font-size*/
    --dp-preview-font-size: 0.8rem; /*Font size of the date preview in the action row*/
    --dp-time-font-size: 0.8rem; /*Font size in the time picker*/
    
    /*Transitions*/
    --dp-animation-duration: 0.1s; /*Transition duration*/
    --dp-menu-appear-transition-timing: cubic-bezier(.4, 0, 1, 1); /*Timing on menu appear animation*/
    --dp-transition-timing: ease-out; /*Timing on slide animations*/

  } 


  /* Custom Calendar tweaks */

  /* Changing the colors and font weights of each day in calendar */
  .dp__cell_inner {
    font-weight: bold;
  }
  .dp__cell_offset {
    font-weight: normal;
    color: rgba(0,0,0, 0.5);
  }


    /* Center the calendar display  */
  .dp__flex_display {
    justify-content: center;
  }


	.fade-enter-active,
	.fade-leave-active {
		transition: opacity 0.2s ease;
	}

	.fade-enter-from,
	.fade-leave-to {
		opacity: 0;
	}

</style>