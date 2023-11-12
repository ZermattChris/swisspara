import { reactive, markRaw, isProxy, toRaw, ref  } from 'vue'

import flightAPI from "@components/api/flightsAPI.js"

const { MODE, PROD, DEV, SSR, BASE_URL, VITE_MY_VAR } = import.meta.env;
 //console.log(MODE, PROD, DEV, SSR, BASE_URL, VITE_MY_VAR)





export const pageFlightStore = reactive({

    selectedFlight: +localStorage.selectedFlight || -1,

    _flightsList: [{}],

    loading: true,

    // Tricky convert string 'true|false' to boolean in js.
    photosVideos: (localStorage.photosVideos === "true") || false,


    //---------------------

    // Get if this 'Page' is valid or not. Used to manage the Prev/Next
    // buttons and breadcrumbs.
    isPageValid() {
        let result = true

        // -> Flight Date checks.
        if ( this.selectedFlight < 1 ) result = false


        return result
    },


    // ---- Set up this page's data ----.
    async initialize() {

        // Grabs a list of flights available for the selected Flight Date.
        this._flightsList = await flightAPI.get()
        this.loading = false

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



