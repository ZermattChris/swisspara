import { reactive, markRaw  } from 'vue'



export const selectFlightStore = reactive({

    selectedFlight: +localStorage.selectedFlight || '',

        //---------------------

    // Get if this 'Page' is valid or not. Used to manage the Prev/Next
    // buttons and breadcrumbs.
    isPageValid() {
        let result = true

        // -> Flight Date checks.
        if ( this.flightDate === '' ) result = false


        return result
    },
    //---------- Getters / Setters -----------

    // ---- Flight Date ----.
    getFlightChosen() {
        // Should return an object with all the selected infos.
        return this.selectedFlight
    },
    setFlightChosen(flistObj) {
        this.selectedFlight = flistObj 
    },



});

