import { reactive, toValue } from 'vue'

import timeSlotsAPI from "@components/api/timeSlotsAPI.js"

export const pageTimeSlotsStore = reactive({

	_timeSlotList: {},

	_totalPassengers: +localStorage.totalPassengers || 0,
	// {"selectedDate":"2023-11-22","slotsList":[{"timeString":"08:00","passengers":3},{"timeString":"09:45","passengers":0},{"timeString":"12:00","passengers":0}]}

	loading: true,

	//---------------------

	// Get if this 'Page' is valid or not. Used to manage the Prev/Next
	// buttons and breadcrumbs.
	isPageValid() {
		let result = false

		//console.log("this._totalPassengers : ", this._totalPassengers )

		if (this._totalPassengers > 0) {
			// console.log("this._totalPassengers true: ", this._totalPassengers )
			result = true
		}

		return result
	},


	// ---- Set up this page's data ----.
	async initialize() {
		// Grabs a list of flights available for the selected Flight Date.
		this._timeSlotList = await timeSlotsAPI.get()
		this.loading = false
	},


	getTotalPassengers() {
			return this._totalPassengers
	},
	setTotalPassengers(nrPassInt) {
		//console.log("nrPassInt: ", toValue(nrPassInt))
		this._totalPassengers = toValue(nrPassInt)              // for some reason the event is giving a '_value' that needs converting here.
		localStorage.totalPassengers = this._totalPassengers 
	},

	getTimeSlotsList() {
		return this._timeSlotList
	},

});



