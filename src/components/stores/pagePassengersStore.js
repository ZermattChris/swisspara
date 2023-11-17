import { reactive } from 'vue'


// ========================= Helper functions   ===========================
/**
 * Moved this outside of reactive, so it can be loaded when the store loads,
 * instead of relying on the initialize() to be called (needed for page valid)
 */
const loadPassengersList = () => {
	let pl = {}
	try {
		pl = localStorage._cachePassengersDataList ? JSON.parse(localStorage._cachePassengersDataList) : {}
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
    _passengersDataList: loadPassengersList(),

    //---------------------

    // Get if this 'Page' is valid or not. Used to manage the Prev/Next
    // buttons and breadcrumbs.
    // -> Loop through the Passengers and check if the matching form Component
    //    is valid or not.
    isPageValid() {
        let result = true
        return result
    },


    // ---- Set up this page's data ----.
    async initialize() {


        
    },


});



