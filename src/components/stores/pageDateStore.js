import { reactive } from 'vue'

import { addDays, subDays, isAfter, isBefore, isEqual, parseISO, getDate, getMonth, getYear } from 'date-fns'



// ========================= Helper functions   ===========================
/**
 * Convert a js Date object to match our internal '2023-11-22' date format.
 * @param {Date} dateObj 
 */
const formatDateToSimpleISO = function toSimpleISO(dateObj) {
  console.log("formatDateToSimpleISO -> dateObj:", dateObj)
  if (dateObj === '') return ''  // guard against manipulating an empty string (param must be a valid Date object)

  // Need to pad out day/month numbers with leading 0 if single digit. Yuck.
  let day = getDate(dateObj) + ''     // convert to string from number
  if (day.length === 1) day = '0' + day

  let month = (getMonth(dateObj) + 1) + ''   // Zero based months + convert to string from number
  if (month.length === 1) month = '0' + month

  const year = getYear(dateObj)

  const result = `${year}-${month}-${day}`
  //console.log("formatDateToSimpleISO -> result:", result)
  return result
}

// Trying to sort the undefined NaN issue when reading in flight date from localstorage.
const _readFlightDateFromLocalStorage = () => {
  const rawInput = localStorage.flightDate
  // console.log("<- this.flightDate.length", rawInput.length )

  // The input string needs to be exactly 10 chars long to match out date format.
  // otherwise just return an empty string (resetting the input to empty).
  if (rawInput.length != 10) {
    console.log("<- this.flightDate NOT matching length.", rawInput.length )
    return ''
  }

  // // Looking for the Undefined error.
  // if (rawInput === undefined) {
  //   console.log("<- Found undefined in getFlightDate()")
  //   return ''
  // }
  // // Looking for the NaN error.
  // if (Number.isNaN(rawInput)) {
  //   console.log("<- Found NaN in getFlightDate()")
  //   return ''
  // }

  return localStorage.flightDate ? formatDateToSimpleISO( new Date( Date.parse(rawInput) ) ) : ''

}



export const flightDateStore = reactive({

  // Read in data from localStorage.   Format saved date string, create a new Date Obj and then format it with our helper to '2023-11-22'  ||  empty string ''
  flightDate: _readFlightDateFromLocalStorage(),
  //flightDate: localStorage.flightDate ? formatDateToSimpleISO( new Date( Date.parse(localStorage.flightDate) ) ) : '',
  arriveDate: localStorage.arriveDate ? formatDateToSimpleISO( new Date( Date.parse(localStorage.arriveDate) ) ) : '',
  departDate: localStorage.departDate ? formatDateToSimpleISO( new Date( Date.parse(localStorage.departDate) ) ) : '',
  

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
    //console.log("this.flightDate", this.flightDate)
    if ( isBefore( new Date(this.flightDate), new Date(new Date().toDateString()) ) ) {
      console.warn("Stale Flight Date in getFlightDate:", this.flightDate)
      this.setFlightDate('') 
    }
    return this.flightDate
  },
  // Recieving a js Date() object here.
  setFlightDate(flDate) {
    this.flightDate = formatDateToSimpleISO(flDate)
    // Strip out timezone and hours:mins:secs
    console.log("this.flightDate", this.flightDate)
    localStorage.flightDate = this.flightDate
  },

  // ---- Arrival Date ----.
  getArriveDate() {
    if ( isAfter( new Date(this.arriveDate), new Date(this.flightDate) ) ) {
      //console.log("Stale Arrive Date in getArriveDate:", this.arriveDate)
      this.setArriveDate('') 
    }
    return this.arriveDate
  },
  // Recieving a js Date() object here.
  setArriveDate(arrDate) {
    if ( arrDate === '') return   // stops saving "Invalid Date" to local storage.
    this.arriveDate = formatDateToSimpleISO(arrDate)

    // Strip out timezone and hours:mins:secs
    localStorage.arriveDate = this.arriveDate
  },//




  // Departure Date.
  getDepartDate() {
    // date-fns update
    if ( isBefore( new Date(this.departDate), new Date(new Date().toDateString()) ) ) {  // toDateString() kills time and Timezone.
      //console.log("Stale Depart Date in getDepartDate:", this.departDate)
      this.setDepartDate('') 
    }
    return this.departDate
  },
  // Recieving a js Date() object here.
  setDepartDate(dpDate) {
    if ( dpDate === '') return   // stops saving "Invalid Date" to local storage.
    this.departDate = formatDateToSimpleISO(dpDate)
    // Strip out timezone and hours:mins:secs
    localStorage.departDate = this.departDate
  },


})


