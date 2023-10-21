import { reactive } from 'vue'



export const flightDateStore = reactive({

  flightDate: localStorage.flightDate ? new Date( Date.parse(localStorage.flightDate) ) : null,
  arriveDate: localStorage.arriveDate ? new Date( Date.parse(localStorage.arriveDate) ) : null,
  departDate: localStorage.departDate ? new Date( Date.parse(localStorage.departDate) ) : null,
  
  

  //---------------------

  // Get if this 'Page' is valid or not. Used to manage the Prev/Next
  // buttons and breadcrumbs.
  isPageValid() {
    // - if flightDate is after today(), then reset to null.
    let result = true
    if ( this.flightDate === null ) result = false
    if ( this.flightDate < new Date() ) result = false
    return result
  },

  //---------- Getters / Setters -----------

  // Flight Date.
  getFlightDate() {
    // if ( this.flightDate < new Date() ) this.flightDate = this.setFlightDate('')  // reset flight date if old.
    return this.flightDate
  },
  setFlightDate(flDate) {
    this.flightDate = flDate
    localStorage.flightDate = this.flightDate
  },

  // Arrival Date.
  getArriveDate() {
    return this.arriveDate
  },
  setArriveDate(flDate) {
    this.arriveDate = flDate
    localStorage.arriveDate = this.arriveDate
  },

  // Departure Date.
  getDepartDate() {
    return this.departDate
  },
  setDepartDate(flDate) {
    this.departDate = flDate
    localStorage.departDate = this.departDate
  },

});

