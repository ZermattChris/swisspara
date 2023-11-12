import { reactive } from 'vue'

import timeSlotsAPI from "@components/api/timeSlotsAPI.js"

export const pageTimeSlotsStore = reactive({

    _timeSlotList: {},

    loading: true,

    //---------------------

    // Get if this 'Page' is valid or not. Used to manage the Prev/Next
    // buttons and breadcrumbs.
    isPageValid() {
        let result = true
        return result
    },


    // ---- Set up this page's data ----.
    async initialize() {

        // Grabs a list of flights available for the selected Flight Date.
        this._timeSlotList = await timeSlotsAPI.get()
        this.loading = false
    },

    getTimeSlotsList() {
        //await this.loading === false
        return this._timeSlotList
    },

});



