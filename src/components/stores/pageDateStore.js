import { reactive } from 'vue'

import { addDays, subDays, isAfter, isBefore, isEqual, getDate, getMonth, getYear } from 'date-fns'



// ========================= Helper functions   ===========================
/**
 * Convert a js Date object to match our internal '2023-11-22' date format.
 * @param {Date} dateObj 
 */
const formatDateToSimpleISO = function toSimpleISO(dateObj) {
  //console.log("formatDateToSimpleISO -> dateObj:", dateObj)
  const day = getDate(dateObj)
  const month = getMonth(dateObj) + 1   // Zero based months, for some reason
  const year = getYear(dateObj)
  const result = `${year}-${month}-${day}`
  //console.log("formatDateToSimpleISO -> result:", result)
  return result
}



export const flightDateStore = reactive({

  // Read in data from localStorage.   Format saved date string, create a new Date Obj and then format it with our helper to '2023-11-22'  ||  empty string ''
  flightDate: localStorage.flightDate ? new Date( Date.parse(localStorage.flightDate) ).toDateString() : '',


  arriveDate: localStorage.arriveDate ? new Date( Date.parse(localStorage.arriveDate) ).toDateString() : '',
  departDate: localStorage.departDate ? new Date( Date.parse(localStorage.departDate) ).toDateString() : '',
  
  //   flightDate: localStorage.flightDate ? this.formatDateToSimpleISO( 'bla' ) : '',
// new Date( Date.parse(localStorage.flightDate) )

  test: formatDateToSimpleISO( new Date( Date.parse(localStorage.flightDate) ) ),

  //---------------------

  // Get if this 'Page' is valid or not. Used to manage the Prev/Next
  // buttons and breadcrumbs.
  isPageValid() {
    let result = true

    // -> Flight Date checks.
    if ( this.flightDate === '' ) result = false

    // date-fns update
    if ( isBefore( new Date(this.getFlightDate()), new Date(new Date().toDateString()) ) ) {  // toDateString() kills time and Timezone.
      result = false
    }

    // Arrive Date checks.
    if ( this.arriveDate === '' ) result = false

    // Depart Date checks.
    if ( this.departDate === '' ) result = false

    return result
  },

  //---------- Getters / Setters -----------

  // ---- Flight Date ----.
  getFlightDate() {
    if ( isBefore( new Date(this.flightDate), new Date(new Date().toDateString()) ) ) {
      //console.log("Stale Flight Date in getFlightDate:", this.flightDate)
      this.setFlightDate('') 
    }
    console.log("this.flightDate",this.flightDate)
    return this.flightDate
  },
  setFlightDate(flDate) {
    this.flightDate = flDate
    // Strip out timezone and hours:mins:secs
    localStorage.flightDate = new Date(this.flightDate).toDateString()
  },

  // ---- Arrival Date ----.
  getArriveDate() {
    if ( isAfter( new Date(this.arriveDate), new Date(this.flightDate) ) ) {
      //console.log("Stale Arrive Date in getArriveDate:", this.arriveDate)
      this.setArriveDate('') 
    }
    return this.arriveDate
  },
  setArriveDate(arrDate) {
    if ( arrDate === '') return   // stops saving "Invalid Date" to local storage.
    this.arriveDate = arrDate

    // Strip out timezone and hours:mins:secs
    localStorage.arriveDate = new Date(this.arriveDate).toDateString()
  },




  // Departure Date.
  getDepartDate() {
    // const today = new Date().toDateString()

    // date-fns update
    if ( isBefore( new Date(this.departDate), new Date(new Date().toDateString()) ) ) {  // toDateString() kills time and Timezone.
      //console.log("Stale Depart Date in getDepartDate:", this.departDate)
      this.setDepartDate('') 
    }
    return this.departDate
  },
  setDepartDate(dpDate) {
    if ( dpDate === '') return   // stops saving "Invalid Date" to local storage.
    this.departDate = dpDate
    // Strip out timezone and hours:mins:secs
    localStorage.departDate = new Date(this.departDate).toDateString()
  },


})


