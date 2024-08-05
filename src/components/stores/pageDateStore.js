import { reactive } from 'vue'
import { appStore } from '@stores/appStore.js'

import { addDays, subDays, isAfter, isBefore, isEqual, parseISO, getDate, getMonth, getYear } from 'date-fns'



// ========================= Helper functions   ===========================
/**
 * Convert a js Date object to match our internal '2023-11-22' date format.
 * @param {Date} dateObj 
 */
const formatDateToSimpleISO = (dateObj) => {
  //console.log("formatDateToSimpleISO -> dateObj:", dateObj)
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
  if (rawInput === undefined) return ''
  // console.log("<- this.flightDate.length", rawInput.length )

  // The input string needs to be exactly 10 chars long to match out date format.
  // otherwise just return an empty string (resetting the input to empty).
  if (rawInput.length != 10) {
    //console.log("<- this.flightDate NOT matching length.", rawInput.length )
    return ''
  }

  return localStorage.flightDate ? formatDateToSimpleISO( new Date( Date.parse(rawInput) ) ) : ''

}



export const datesStore = reactive({

  // Read in data from localStorage.   Format saved date string, create a new Date Obj and then format it with our helper to '2023-11-22'  ||  empty string ''
  flightDate: _readFlightDateFromLocalStorage(),
  //flightDate: localStorage.flightDate ? formatDateToSimpleISO( new Date( Date.parse(localStorage.flightDate) ) ) : '',
  arriveDate: localStorage.arriveDate ? formatDateToSimpleISO( new Date( Date.parse(localStorage.arriveDate) ) ) : '',
  departDate: localStorage.departDate ? formatDateToSimpleISO( new Date( Date.parse(localStorage.departDate) ) ) : '',
  
  arriveTime: localStorage.arriveTime ? +localStorage.arriveTime : 7.5,   // defaults to 07:30 -> "don't know our arrival time"
  departTime: localStorage.departTime ? +localStorage.departTime : 20.5,  // defaults to 20:30 -> "don't know our depart time"

  //---------------------

  // TODO: changing this for a less wonky solution, that calls a method in
  //       each Page component to check if it's valid or not.

  // Get if this 'Page' is valid or not. Used to manage the Prev/Next
  // buttons and breadcrumbs.
  isPageValid() {
    console.log("Deprecated -> isPageValid() in pageDateStore.js")
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
    // Guard against a missing or empty flightDate in localsStorage.
    return this.flightDate
  },
  // Recieving a js Date() object here.
  setFlightDate(flDate) {
    const newFD = formatDateToSimpleISO(flDate)
    if ( newFD == this.flightDate ) return  // nothing's changed.
      
    this.bustFlightsCache() // Bust flightsList cache if date has changed.
    this.flightDate = newFD
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
    const newAD = formatDateToSimpleISO(arrDate)
    if ( newAD == this.arriveDate ) return  // nothing's changed.

    this.bustFlightsCache() // Bust flightsList cache if date has changed.
    this.arriveDate = newAD
    localStorage.arriveDate = this.arriveDate
  },
  // Arrive DateTime -- put the arrival Date '2024-09-23' and the time 18.5 (18:30) together.
  getArriveDateTime() {
    // if the time is in the format of 14.5, then reformat it to 14:30
    var formattedTime = ''
    const pieces = this.arriveTime.toString().split('.')
    if (pieces.length == 2) {
      formattedTime = pieces[0] + ':30'
    } else {
      formattedTime = this.arr
    }

    var result = this.arriveDate + ' ' + formattedTime
    return result
  },




  // ---- Arrival Time ----.
  getArriveTime() {
    return this.arriveTime
  },
  setArriveTime(arrTime) {
    this.arriveTime = arrTime
    localStorage.arriveTime = this.arriveTime
  },

  // ---- Depart Time ----.
  getDepartTime() {
    return this.departTime
  },
  setDepartTime(depTime) {
    this.departTime = depTime
    localStorage.departTime = this.departTime
  },


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

    const newDP = formatDateToSimpleISO(dpDate)
    if ( newDP == this.departDate ) return  // nothing's changed.

    this.bustFlightsCache() // Bust flightsList cache if date has changed.
    this.departDate = newDP
    localStorage.departDate = this.departDate
  },

  // Depart DateTime -- put the depart Date '2024-09-23' and the time 18.5 (18:30) together.
  getDepartDateTime() {
    // if the time is in the format of 14.5, then reformat it to 14:30
    var formattedTime = ''
    const pieces = this.departTime.toString().split('.')
    if (pieces.length == 2) {
      formattedTime = pieces[0] + ':30'
    } else {
      formattedTime = this.departTime
    }

    var result = this.departDate + ' ' + formattedTime
    return result
  },

  // Flights Cache buster.
  // Delete the cache in localStorage, causing the API call to run again
  // when needing the Flights List.
  bustFlightsCache() {
    localStorage._cacheFlightsList = ''
    localStorage.selectedFlight = -1
    localStorage._cacheTimeSlotsPassengerList = ''
  },

})


