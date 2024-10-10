<template>

  <!-- Dynamic Vue 'Page' components being swapped out  -->
  <!-- Listen to current page's validity events.  -->
  <div id="app" class="absolute top-[80px] w-full min-h-[450px] overflow-hidden">

    <Stepper :pages="pages" class="mt-6 mb-6"></Stepper>

    <div id="sizeBox" class="w-full max-[320px]:w-11/12
        mx-auto 
        px-0 sm:px-0
        pt-4 pb-6 sm:py-6 md:py-8" @click="onBackgroundClick">

      <component :is="currentPageName" @pagevalid="onPageValidEvent">
      </component>

    </div>
  </div>



  <!-- <a @click="gotoPage(1)" href="#">Page 1</a>
  <a @click="gotoPage(2)" href="#">Page 2</a>
  <a @click="gotoPage(3)" href="#">Page 3</a>
  <a @click="gotoPage(4)" href="#">Page 4</a>
  <a @click="gotoPage(5)" href="#">Page 5</a> -->

  <!-- Previous/Next Buttons -->
  <div class="fixed bottom-0 right-0 left-0
      border-[1px] border-gray-300
      pt-3 pb-1
      mx-auto 
      bg-gray-100">

    <div class="max-w-xl flex justify-around m-auto">
      <button @click="prevPage" type="button" id="prevBtn"
        class="
                    text-sm lg:text-lg
                    min-w-[8em] inline-flex items-center justify-center gap-x-1.5 rounded-md bg-indigo-600 px-2.5 py-1.5  font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
        :class="{ invisible: isFirstPage }">
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" class="w-6 h-6">
          <path fill-rule="evenodd"
            d="M12 2.25c-5.385 0-9.75 4.365-9.75 9.75s4.365 9.75 9.75 9.75 9.75-4.365 9.75-9.75S17.385 2.25 12 2.25zm-4.28 9.22a.75.75 0 000 1.06l3 3a.75.75 0 101.06-1.06l-1.72-1.72h5.69a.75.75 0 000-1.5h-5.69l1.72-1.72a.75.75 0 00-1.06-1.06l-3 3z"
            clip-rule="evenodd" />
        </svg>
        Previous
      </button>

      <span></span>

      <span id="reset" v-if="showDevInfos" class="select-none absolute text-sm" @dblclick="onResetLocalStorage">

        {{ getAPIType }} <br />

        {{ isPageValid ? 'Page: valid' : 'Page: invalid' }}

      </span>


      <button @click="nextPage" type="button" id="nextBtn"
        class="text-sm lg:text-lg min-w-[8em] inline-flex items-center justify-center gap-x-1.5 rounded-md bg-indigo-600 px-2.5 py-1.5 font-semibold text-white shadow-sm  outline outline-2 outline-offset-2 outline-indigo-600"
        :class="[nextBtnHidden, nextBtnDisabledClass, { 'hover:bg-indigo-500': nextBtnDisabledProp }]"
        :disabled="nextBtnDisabledProp">
        Next
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" class="w-6 h-6">
          <path fill-rule="evenodd"
            d="M12 2.25c-5.385 0-9.75 4.365-9.75 9.75s4.365 9.75 9.75 9.75 9.75-4.365 9.75-9.75S17.385 2.25 12 2.25zm4.28 10.28a.75.75 0 000-1.06l-3-3a.75.75 0 10-1.06 1.06l1.72 1.72H8.25a.75.75 0 000 1.5h5.69l-1.72 1.72a.75.75 0 101.06 1.06l3-3z"
            clip-rule="evenodd" />
        </svg>
      </button>

      <!-- <footer id="footbar" 
                class="absolute -bottom-2 w-screen h-8 "
            >
                <p class="pt-1 text-center text-[0.75em] text-gray-400">© <span id="year">2023</span> Swiss Paraglide Zermatt. All rights reserved.</p>
            </footer> -->

    </div>

    <p class="mt-2 block text-center text-xs text-gray-500" aria-hidden="true">
      &copy; {{ currentYear }} by Swiss Paraglide Zermatt. All rights reserved.
    </p>


  </div>

  <!-- <div class="fixed bottom-3 right-0 left-0 rounded overflow-auto p-6">
        <div class="flex justify-center">
            <div class="animate-bounce bg-white dark:bg-slate-800 p-2 w-8 h-8 ring-1 ring-slate-900/5 dark:ring-slate-200/20 shadow rounded-full flex items-center justify-center">
                <svg class="w-6 h-6 text-violet-500" fill="none" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" viewBox="0 0 24 24" stroke="currentColor">
                <path d="M19 14l-7 7m0 0l-7-7m7 7V3"></path>
                </svg>
            </div>
        </div>
    </div> -->

</template>


<script>


import { shallowRef, ref, computed, toRaw, nextTick } from 'vue'
import { isAfter, isBefore } from 'date-fns'


import api from '@components/api/_apiBase.js'
import settingsAPI from "@components/api/settingsAPI.js"

// Pages.
import PageDate from '@components/booking/Date.vue'
import PageFlight from '@components/booking/Flight.vue'
import PageTime from '@components/booking/Time.vue'
import PagePassengers from '@components/booking/Passengers.vue'
import PagePay from '@components/booking/Payment.vue'


import Stepper from '@components/Stepper.vue'

// import PagePaySuccess from '@components/booking/Success.vue'
// import PagePayFailed from '@components/booking/Failed.vue'

// Store
import { appStore } from '@stores/appStore.js'
import { datesStore } from '@stores/pageDateStore.js'


export default {

  name: "app",
  components: {
    PageDate,
    PageFlight,
    PageTime,
    PagePassengers,
    PagePay,
    Stepper

    // PagePaySuccess,     // Not included in the initNav() below, as not part of Prev | Next navigation
    // PagePayFailed,      // Not included in the initNav() below, as not part of Prev | Next navigation
  },


  data() {
    return {
      // currPage: appStore.currentPageName(),
      isPageValid: false,              // Page is 'valid | completed' called from each Page's custom event.
      currentYear: '',
      pages: [
        shallowRef(PageDate),
        shallowRef(PageFlight),
        shallowRef(PageTime),
        shallowRef(PagePassengers),
        shallowRef(PagePay),
      ],
    };
  },

  mounted() {

    //console.log("currentPageName: ", this.currentPageName)

    // Send our page list as strings to the store.
    // Need to add 'label' and 'icon' to use in Breadcrumbs.
    appStore.initNav(this.pages)

    this.currentYear = new Date().getFullYear() + ''

    this.allPagesDataCheck()

  },

  beforeUpdate() {

    //this.allPagesDataCheck()

  },


  afterUpdate() {
    // App-wide data check (and reset if req.)
    this.allPagesDataCheck()


    // TODO
    // var pageName = toRaw(this.currentPageName)
    // if (pageName !== undefined) {
    //   pageName = pageName.name
    // }
    //console.log("APP : beforeUpdate() -> Page: ", pageName, '. Thinking this is where we do a global check for data consistency.')

  },


  computed: {


    // shows a bit of dev info between the Prev | Next buttons.
    showDevInfos() {
      if (document.location) {
        let host = new URL(document.location).hostname
        if (host == 'swissparaglide.com') return false
      }
      return true
    },

    getAPIType() {
      return 'API: ' + api.getAPIType()    // LIVE, STAGING or LOCAL
    },

    currentPageName() {
      //console.log("currentPageName: ", appStore.currentPageName())
      return appStore.currentPageName()
    },

    /**
     * Used to control the 'disabled' .class of the Next button.
     */
    nextBtnHidden() {
      if (this.isLastPage) return 'invisible'
    },
    nextBtnDisabledClass() {
      if (!this.isPageValid) return 'disabled:opacity-50'
      return ''
    },
    nextBtnDisabledProp() {
      if (!this.isPageValid) return true
    },

    isFirstPage() {
      return appStore.isNavStart()
    },
    isLastPage() {
      return appStore.isNavEnd()
    },

  }, // computed




  methods: {

    // ===================== Global Data Checks =====================
    allPagesDataCheck() {

      // Flight Date
      this.isDatePageDataValid()

      // Flight 
      //this.isFlightPageDataValid()

      // Time Slot
      //this.isTimePageDataValid()

    },

    /**
     * A set of methods to check if each page has valid data (cached too)
     * Page 1. Date.
     */
    isDatePageDataValid() {
      var goodData = true

      // Flight Date is in the past.
      var fd = datesStore.getFlightDate()
      if (fd === undefined || fd === null || fd === '') {
        goodData = false
      }
      if (isBefore(new Date(fd), new Date(new Date().toDateString()))) {
        goodData = false
      }

      // Reset cache and goto Step 1 if bad data.
      if (goodData === false) {
        appStore.badCacheDataReset("App global data check failed -> App.isDatePageDataValid() is false :: Page Date.")
        datesStore.setFlightDate('')
        datesStore.setArriveDate('')
        datesStore.setArriveTime(7.5)
        datesStore.setDepartDate('')
        datesStore.setDepartTime(20.5)
        return
      }

      console.log("APP Check -> Date Page has valid data")
    },


    // /**
    //  * Page 2. Flight.
    //  */
    // isFlightPageDataValid() {
    //   // Think this is being handled just fine at the moment.
    // },

    // /**
    //  * Page 3. Time.
    //  */
    //  isTimePageDataValid() {

    //   // Also think is okay.
      
    // },

    // ===================== END :: Global Data Checks =====================



    gotoPage(pageNr) {
      // -- This is my new Nav method --
      appStore.gotoPage(pageNr)
      this.allPagesDataCheck()
    },

    // swipeHandler() {
    //   console.log("Swiped!")

    // },

    /**
     * This handles the custom event that is fired from each Page (via the _Page base class)
     * Here is where we manage enabling/disabling the Prev|Next buttons (Breadcrumbs...)
     * NOTE: Have changed this to use the valid() method in each Page component.
     * @param {String} pageName 
     * @param {Bool} isValid 
     */
    onPageValidEvent(pageName, isValid) {
      // nextTick(() => {
      //   this.$forceUpdate()
      // })
      
      // console.log("APP PageName:", pageName + '.', " isValid:", isValid)
      this.isPageValid = isValid

      // set focus to Next Button
      if (isValid) {
        document.getElementById("nextBtn").focus()
      }

    },

    prevPage() {
      if (this.isFirstPage) return
      appStore.prev()
      // set focus to Next Button
      document.getElementById("prevBtn").focus()
    },

    nextPage() {
      if (this.isLastPage || this.nextBtnDisabled) return
      appStore.next()
    },

    // Test method -- resets all localstorage data.
    onResetLocalStorage() {
      console.warn("-> RESET LocalStorage")
      appStore.resetLocalStorage()
      location.reload()
      let span = document.getElementById('reset');
      span.appendChild(document.createTextNode(" - Reset"));
    }

  }, // methods

  watch: {
    isPageValid(old, nVal) {
      // Trying to get the "Next" button to display properly when the Passenger form is valid (uhg!)
      //console.log("isPageValid watch changed: ", old, nVal)
    }
  }, // watch

}

</script>

<style>
/* Disables the Prev/Next buttons */
.disabled {
  opacity: 0.5;
  cursor: default;
}

.disabled:hover {
  background-color: rgb(88, 80, 236);
}
</style>
