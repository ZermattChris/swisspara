<template>

  <div id="sizeBox"
    class="max-w-3xl mx-auto p-4 pt-6 min-h-[40em]"
    @click="onBackgroundClick"
  >

    <div>
      <span class="w-14 h-14  text-4xl font-black  drop-shadow-lg border-black border-2  pt-1.5 pl-1  inline-block   rounded-full bg-indigo-600 text-white">
        <span class="pl-2">1.</span>
      </span>

      <label for="flightDateInput" class="text-2xl inline pl-2 drop-shadow-lg font-medium text-gray-900">
        Pick your Flight Date:
      </label>
      <div class="mt-6">
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" 
          class="w-6 h-6 inline-block mb-1 "
        >
          <path stroke-linecap="round" stroke-linejoin="round" d="M6.75 3v2.25M17.25 3v2.25M3 18.75V7.5a2.25 2.25 0 012.25-2.25h13.5A2.25 2.25 0 0121 7.5v11.25m-18 0A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75m-18 0v-7.5A2.25 2.25 0 015.25 9h13.5A2.25 2.25 0 0121 11.25v7.5m-9-6h.008v.008H12v-.008zM12 15h.008v.008H12V15zm0 2.25h.008v.008H12v-.008zM9.75 15h.008v.008H9.75V15zm0 2.25h.008v.008H9.75v-.008zM7.5 15h.008v.008H7.5V15zm0 2.25h.008v.008H7.5v-.008zm6.75-4.5h.008v.008h-.008v-.008zm0 2.25h.008v.008h-.008V15zm0 2.25h.008v.008h-.008v-.008zm2.25-4.5h.008v.008H16.5v-.008zm0 2.25h.008v.008H16.5V15z" />
        </svg>
        <input type="input" name="flightDateInput" id="flightDateInput" 
          :value="displayDate"
          readonly 
          @click="onDateInputClick('flightDateInput', $event)"
          placeholder="Click to enter your flight date..."
          class="inline-block  rounded-md border-0 py-2 px-2 
          cursor-pointer
          read-only:bg-gray-100
          text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6" 
        />
      </div>
    </div>

    <VueDatePicker 
      id="flightDatePicker"
      v-show="showFlightDatePicker"
      v-model="cal"
      :enable-time-picker="false"
      inline 
      auto-apply
      :min-date="new Date()"
      :max-date="getMaxFutureDate()"
      prevent-min-max-navigation 
      @update:model-value="onDateSelect"
      class="px-2 pt-8 drop-shadow-lg"
    ></VueDatePicker>

  </div>

</template>




<script>
  // Parent component for all "Pages"
  import _Page from './_Page.vue'

  // Store
  import {flightDateStore} from '@stores/flightDateStore.js' 

  // Calendar Utils.
  import {calendarUtils as calUtils} from './calendarUtils.js'
  
  // Components
  import VueDatePicker from '@vuepic/vue-datepicker';
  import '@vuepic/vue-datepicker/dist/main.css'


  export default {
    name: 'PageDate',
    extends: _Page,   // Parent class handles the valid page event emitting back to the App Shell.
    
    components: {
      VueDatePicker
    },

    data() {
        return {
          cal: null,
          flightDate: flightDateStore.getFlightDate(),    // get from Store.
          showFlightDatePicker: false
        };
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

      displayDate() {
        if ( this.flightDate === null ) return ''
        // console.log(this.flightDate.toLocaleDateString())
        const YYYY = this.flightDate.getFullYear()
        const d = this.flightDate.getDay()   // (0-6) Sunday - Saturday
        const DD = this.flightDate.getDate() // (1-31)
        const mm = this.flightDate.getMonth()
        return (calUtils.getDayString(d) + ' - ' + calUtils.getMonthString(mm) + ' ' + DD + calUtils.getLocalizedDayPostfix(DD) + ', ' + YYYY)
      },


    }, // computed


    methods: {

      onDateSelect(modelData) {
        this.flightDate = modelData
        flightDateStore.setFlightDate(modelData)    // set in Store.
        this.showFlightDatePicker = false
      },

      onDateInputClick(el, ev) {
        // console.log('clicked', el, ev)
        // Flight Date Picker is initially shown, as soon as user clicks a date, it hides itself
        // and the Arrive & Depart Dates are displayed.
        this.showFlightDatePicker = true
        ev.stopPropagation()
      },

      onBackgroundClick() {
        // close Flight picker on outside click.
        this.showFlightDatePicker = false
      },

      // Only allow date picking to today + 9 months
      getMaxFutureDate() {
        const monthOffset = 9
        const today = new Date()
        return new Date(today.setMonth( today.getMonth() + monthOffset ));
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

</style>