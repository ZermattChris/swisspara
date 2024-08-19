import { reactive, toValue, toRaw } from 'vue'

import timeSlotsAPI from "@components/api/timeSlotsAPI.js"



// ========================= Helper functions   ===========================
/**
 * Moved this outside of reactive, so it can be loaded when the store loads,
 * instead of relying on the initialize() to be called (needed for page valid)
 */
export const countTotalPassengers = (tSLPL) => {
	let passengerCount = 0
	for (const timeHint in tSLPL) {
		passengerCount += tSLPL[timeHint]
	}
	// this._totalPassengers = passengerCount

	return passengerCount
}

export const loadTimeSlotPassengersList = () => {
	let tSLPL = {}
	try {
		tSLPL = localStorage._cacheTimeSlotsPassengerList ? JSON.parse(localStorage._cacheTimeSlotsPassengerList) : {}
	} catch (error) {
		// cache had bad data stored.
		tSLPL = {}	// reset.
	} 
	return tSLPL
}






export const pageTimeSlotsStore = reactive({


  flightDate: localStorage.flightDate || '',
  selectedFlight: +localStorage.selectedFlight || '!Bad Flight ID',

	_timeSlotsList: [{}],							// List of API returned dates/slots to display to user.
	_timeSlotsPassengersList: loadTimeSlotPassengersList(),		// The passengers added to the current Flight Date by the user.

	_totalPassengers: countTotalPassengers( loadTimeSlotPassengersList() ),

	loading: false,



  /**
   * This is the call that checks if the User's selected TimeSlots are still available.
   * 
   * Called in the Time -> mounted() lifecycle hook.
   * Called before completing the Payment process.
   * 
   * @param {'2024-06-12'} flightDate 
   * @returns boolean
   */
  async arePassengersTimeSlotsStillAvailable(flightDate) {

    let passList = toRaw(this.getTimeSlotsPassengersList())
    const keys = Object.keys(passList)

    await this.callAPI()       // refresh the TimeSlots data from the server.


    let cachedSlotList = localStorage._cacheTimeSlotsList ? JSON.parse(localStorage._cacheTimeSlotsList) : {}
    let flightDateSlotsList = cachedSlotList[0][flightDate]

    let flightDateSlotsListKeys = Object.keys(flightDateSlotsList)
    //console.log("flightDateSlotsList (from Server API call): ", flightDateSlotsList)


    // This gives us access to the number of passengers selected by the user in each time slot for the flight Date.
    let nrPilotsStillValid = true
    let x = 0
    for (const index in keys) {
      let key = keys[index]
      let slotNr = parseInt(index) + 1    // why is index a string???
      let serverPilotsAtSlot = flightDateSlotsListKeys[index]
      let usersBookedPilots = passList[key]
      let serverAvailablePilots = flightDateSlotsList[serverPilotsAtSlot][0]
      //console.log(`Slot: ${slotNr}`, keys[index], " Booked Pilots: ", usersBookedPilots, " Server Pilots: ", serverAvailablePilots)

      if (usersBookedPilots > 0) {  // User has booked passengers at this slot.
        if (usersBookedPilots > serverAvailablePilots) {
            console.log("-> User's booked Pilots at Slot: ", passList[key], " Server Pilots: ", serverAvailablePilots)
            nrPilotsStillValid = false
            break
        }

      }
    }
    return nrPilotsStillValid
  },





	// ---- Set up this page's data ----.
	initialize() {

    this.flightDate = localStorage.flightDate || ''
    this.selectedFlight = +localStorage.selectedFlight || '!! Bad Flight ID !!',
		
		this.loadTimeSlotList()
		loadTimeSlotPassengersList()

  },

	// Count all of the passengers in the current Flight Date.
	getTotalPassengers() {
		this._totalPassengers = countTotalPassengers( loadTimeSlotPassengersList() )
    return this._totalPassengers
	},

	setTotalPassengers(nrPassInt) {
		this._totalPassengers = toValue(nrPassInt)       // for some reason the event is giving a '_value' that needs converting here.
	},


	setTimeSlotsPassengersList(passengersList) {
		//console.log("nrPassInt: ", toValue(passengersList))
		this._timeSlotsPassengersList = passengersList
		localStorage._cacheTimeSlotsPassengerList = JSON.stringify(toRaw(this._timeSlotsPassengersList))
	},

	getTimeSlotsPassengersList() {
		return this._timeSlotsPassengersList		// unwrap back out of array, as this is what the Time component expects.
	},





	loadTimeSlotList() {
		// If the cache already exists, then use that.
		// Otherwise do an API call for fresh data (FD changed, etc.)
		try {
			this._timeSlotsList = localStorage._cacheTimeSlotsList ? JSON.parse(localStorage._cacheTimeSlotsList) : [{}]
		} catch (error) {
			// cache had bad data stored, so do API call.
			console.log("Bad cache data _cacheTimeSlotsList -> doing new API call.")
			this.callAPI()
			return
		} 

		//console.log(this._timeSlotsList[0])

		const unwrappedObj = toRaw(this._timeSlotsList[0])
		if ( Object.keys(unwrappedObj).length === 0 ) {
			console.log("this._timeSlotsList is empty -> grabbing data from API call.")
			this.callAPI()
			return
		}

		//console.log("Using data from cache.")
		//console.log("TimeStore -> this._timeSlotsList: ", unwrappedObj )
		
	},

	// ---- Grab Flight List data from API call. ----.
	async callAPI() {
		this.loading = true
		// Grabs a list of flights available for the selected Flight Date.
		this._timeSlotsList = [await timeSlotsAPI.get(this.selectedFlight, this.flightDate)]
		localStorage._cacheTimeSlotsList = JSON.stringify(toRaw(this._timeSlotsList))   // Save to cache.
    //console.log("Server Slot Data updated in Cache from API call.")
		this.loading = false
	},






	//---------------------

	// Get if this 'Page' is valid or not. Used to manage the Prev/Next
	// buttons and breadcrumbs.
	isPageValid() {
		let result = false

		//console.log("this._totalPassengers : ", this._totalPassengers )

		if (this._totalPassengers > 0) {
			//console.log("this._totalPassengers true: ", this._totalPassengers )
			result = true
		}

		return result
	},


	getTimeSlotsList() {
    this.loadTimeSlotList()
		loadTimeSlotPassengersList()
		return this._timeSlotsList[0]		// unwrap back out of array, as this is what the Time component expects.
	},

});



