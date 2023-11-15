import { reactive, markRaw, isProxy, toRaw, ref  } from 'vue'

import flightAPI from "@components/api/flightsAPI.js"

const { MODE, PROD, DEV, SSR, BASE_URL, VITE_MY_VAR } = import.meta.env;
 //console.log(MODE, PROD, DEV, SSR, BASE_URL, VITE_MY_VAR)





export const pageFlightStore = reactive({

    selectedFlight: +localStorage.selectedFlight || -1,

    _flightsList: [{}],

    loading: false,

    // Tricky convert string 'true|false' to boolean in js.
    photosVideos: (localStorage.photosVideos === "true") || false,


    // ---- Set up this page's data ----.
    initialize() {

        // If the cache already exists, then use that.
        // Otherwise do an API call for fresh data (FD changed, etc.)
        try {
            this._flightsList = localStorage._cacheFlightsList ? JSON.parse(localStorage._cacheFlightsList) : [{}]
        } catch (error) {
            // cache had bad data stored, so do API call.
            console.log("Bad cache data, doing new API call.")
            this.callAPI()
            return
        }
        
        const unwrappedObj = toRaw(this._flightsList[0])
        if ( Object.keys(unwrappedObj).length === 0 ) {
            console.log("this._flightsList is empty -> grabbing data from API call.")
            this.callAPI()
            return
        }

        // 
        console.log("Using data from cache.")
        //console.log( this._flightsList )

    },

    // ---- Grab Flight List data from API call. ----.
    async callAPI() {
        this.loading = true
        // Grabs a list of flights available for the selected Flight Date.
        this._flightsList = await flightAPI.get()
        localStorage._cacheFlightsList = JSON.stringify(toRaw(this._flightsList))   // Save to cache.
        this.loading = false
    },


    //---------------------

    // Get if this 'Page' is valid or not. Used to manage the Prev/Next
    // buttons and breadcrumbs.
    isPageValid() {
        let result = true

        // -> Flight Date checks.
        if ( this.selectedFlight < 1 ) result = false


        return result
    },



    // ---- Flight Date ----.
    getFlightChosen() {
        // Returns the id of the selected flight.
        return this.selectedFlight
    },
    setFlightChosen(flistObj) {
        this.selectedFlight = flistObj 
        localStorage.selectedFlight = this.selectedFlight 
    },

    getFlightObj() {
        let foundFlObj = {}
        // Return the flight object for the given flight id.
        for (const aFlyObj of this._flightsList) {
            if (aFlyObj.id === this.getFlightChosen() ) {
                //console.log("FOUND aFlyObj:", aFlyObj)
                foundFlObj = aFlyObj
            }
        }
        return foundFlObj
    },


    // ---- Photos & Videos toggle switch ----.
    getPhotosToggle() {
        return this.photosVideos
    },
    setPhotosToggle(photosBool) {
        this.photosVideos = photosBool 
        localStorage.photosVideos = this.photosVideos 
    },

    

});



