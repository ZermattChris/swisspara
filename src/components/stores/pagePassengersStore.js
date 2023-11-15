import { reactive } from 'vue'

export const pagePassengersStore = reactive({


    //---------------------

    // Get if this 'Page' is valid or not. Used to manage the Prev/Next
    // buttons and breadcrumbs.
    isPageValid() {
        let result = true
        return result
    },


    // ---- Set up this page's data ----.
    async initialize() {

        
    },


});



