import { reactive } from 'vue'


// ========================= Helper functions   ===========================
/**
 * Moved this outside of reactive, so it can be loaded when the store loads,
 * instead of relying on the initialize() to be called (needed for page valid)
 */
const loadPassengersList = () => {
	let pl = {}
	try {
		pl = localStorage._cachePassengersList ? JSON.parse(localStorage._cachePassengersList) : {}
	} catch (error) {
		// cache had invalid data stored.
		pl = {}	// reset.
	} 
    //console.log("pl", pl)
	return pl
}

export const pagePassengersStore = reactive({

    // Never overwrite this list/cache, as user might reduce the number of
    // passengers after adding all the Passenger Details, then change their
    // mind -- we want that initial data to still be available.
    _passengersList: loadPassengersList(),

    //---------------------

    // Get if this 'Page' is valid or not. Used to manage the Prev/Next
    // buttons and breadcrumbs.
    // -> Loop through the Passengers and check if the matching form Component
    //    is valid or not.
    isPageValid() {
        let result = true
        return result
    },

	getPassengersList() {
		return this._passengersList		
	},
    // Call this as the user blurs each form field, to make sure
    // that all data gets pushed to the _cache.
	updateAPassenger(index, passengerObj) {
		//return this._passengersList		
	},

    // ---- Set up this page's data ----.
    // async initialize() {

    // },


});



