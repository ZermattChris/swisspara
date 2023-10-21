import { reactive } from 'vue'



export const flightDateStore = reactive({

  flightDate: localStorage.flightDate ? new Date( Date.parse(localStorage.flightDate) ).toDateString() : '',
  arriveDate: localStorage.arriveDate ? new Date( Date.parse(localStorage.arriveDate) ).toDateString() : '',
  departDate: localStorage.departDate ? new Date( Date.parse(localStorage.departDate) ).toDateString() : '',
  
  

  //---------------------

  // Get if this 'Page' is valid or not. Used to manage the Prev/Next
  // buttons and breadcrumbs.
  isPageValid() {
    const today = new Date().toDateString()

    console.log("today:", today)
    let result = true
    if ( this.flightDate === '' ) result = false
    if ( new Date(this.getFlightDate()) < new Date(today) ) {
      //console.log("Stale Flight Date in PageValid:", this.flightDate)
      result = false
    }
    return result
  },

  //---------- Getters / Setters -----------

  // Flight Date.
  getFlightDate() {
    // delete Flight Date if the date is old (stale data)
    const today = new Date().toDateString()
    if ( new Date(this.flightDate) < new Date(today)  ) {
      console.log("Stale Flight Date in getFlightDate:", this.flightDate)
      this.setFlightDate('') 
    }
    return this.flightDate
  },
  setFlightDate(flDate) {
    this.flightDate = flDate

    // Strip out timezone and hours:mins:secs
    localStorage.flightDate = new Date(this.flightDate).toDateString()
  },

  // Arrival Date.
  getArriveDate() {
    return this.arriveDate
  },
  setArriveDate(flDate) {
    this.arriveDate = flDate

    // Strip out timezone and hours:mins:secs
    localStorage.arriveDate = new Date(this.arriveDate).toDateString()
  },

  // Departure Date.
  getDepartDate() {
    return this.departDate
  },
  setDepartDate(flDate) {
    this.departDate = flDate
    // Strip out timezone and hours:mins:secs
    localStorage.departDate = new Date(this.departDate).toDateString()
  },

})

