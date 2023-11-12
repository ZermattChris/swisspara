// Import a base lib that lets us simply switch depending on enviornments
// master, staging, local
import api from "./_apiBase.js"


export default {

    get() {

        if ( api.isLocalAPI() ) {
            const loadingDelay = 1000

            return new Promise((resolve) => {
                setTimeout(() => {
                resolve(
                    {
                        // date as key
                        "2023-10-30":{
                            "08:50":3,		// TimeSlot #1. Time label. Pilots available.
                            "11:00":2,
                            "13:30":0,
                            "15:15":-1
                        },
                        "2023-11-01":{
                            "08:00":3,
                            "09:45":1,
                            "12:00":0,
                            "14:00":-1
                        },
                        "2023-11-03":{
                            "08:00":2,
                            "09:45":2,
                            "11:00":2,
                            "12:00":-1,
                            "13:00":2,
                            "14:45":2,
                            "15:00":2,
                            "16:00":2,
                            "17:00":-1,
                            "18:00":2,
                            "19:45":2,
                            "20:00":2,
                            "21:00":-1
                        },
                        "2023-11-04":{
                            "08:00":0,
                            "09:45":-1,
                            "12:00":-1,
                            "14:00":1
                        },
                        "2023-11-05":{
                            "08:00":-1,
                            "09:45":4,
                            "12:00":-1,
                            "14:00":-1
                        }
                    }
                );
                }, loadingDelay);
            });
        }

        if ( api.isStagingAPI() ) {
            console.warn("TODO: build Staging API call for timeSlotsAPI")
            return 'TODO: Staging'
        }

        console.warn("TODO: build Live API call for timeSlotsAPI")
        return 'TODO: Live'


    },

}