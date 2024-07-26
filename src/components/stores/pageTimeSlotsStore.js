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

	// ---- Set up this page's data ----.
	initialize() {

    this.flightDate = localStorage.flightDate || ''
    this.selectedFlight = +localStorage.selectedFlight || '!! Bad Flight ID !!',
		
		this.loadTimeSlotList()
		loadTimeSlotPassengersList()

    // TODO: Future check if the selected flight is still available. Keepin it simple for now.
    // // Check if the current flight is available in this._flightsList, if not, 
    // // then delete the selected flight and let user choose again.
    // if (this.selectedFlight > 0) {
    //   let found = false
    //   var list = toRaw(this._timeSlotsPassengersList)
    //   const keys = Object.keys(list)
    //   let x = 0
    //   for (const index in keys) {
    //     console.log("index", index, keys[index])
        
    //     //stopped here... Need to search for selected TimeSlots and see if still valid or not (could be messy)

    //   }


    //   // if (!found) {
    //   //   console.log("Time Slot no longer available -> ????")
    //   //   localStorage.removeItem("_cacheTimeSlotsPassengerList")
		//   //   loadTimeSlotPassengersList()
    //   // } else {
    //   //   console.log("Selected Time Slot still available!")
    //   // }
    // }

	},

	// Count all of the passengers in the current Flight Date.
	getTotalPassengers() {
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
		console.log( unwrappedObj )
		
	},

	// ---- Grab Flight List data from API call. ----.
	async callAPI() {
		this.loading = true
		// Grabs a list of flights available for the selected Flight Date.
		this._timeSlotsList = [await timeSlotsAPI.get(this.selectedFlight, this.flightDate)]
		localStorage._cacheTimeSlotsList = JSON.stringify(toRaw(this._timeSlotsList))   // Save to cache.
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
		return this._timeSlotsList[0]		// unwrap back out of array, as this is what the Time component expects.
	},

});



