// Import a base lib that lets us simply switch depending on enviornments
// master, staging, local
import api from "./_apiBase.js"


export default {

    get() {

        // // Basic local mock data.
        // if ( api.isLocalAPI() ) {
        //     return [
        //         {
        //         "id":77,
        //         "name":"Classic High",
        //         "descriptionId": 100
        //         },
        //         {
        //         "id":32,
        //         "name":"Scenic",
        //         "descriptionId": 200
        //         },
        //         {
        //         "id":5,
        //         "name":"Elite*",
        //         "descriptionId": 300
        //         }
        //     ]
        // }


        if ( api.isLocalAPI() ) {
            const loadingDelay = 1000

            return new Promise((resolve) => {
                setTimeout(() => {
                    resolve(
                        [
                            {
                            "id":77,
                            "name":"Classic High",
                            "descriptionId": 100
                            },
                            {
                            "id":32,
                            "name":"Scenic",
                            "descriptionId": 200
                            },
                            {
                            "id":5,
                            "name":"Elite*",
                            "descriptionId": 300
                            }
                        ]
                    );
                }, loadingDelay);
            });
        }


        if ( api.isStagingAPI() ) {
            console.warn("TODO: build Staging API call for flightsAPI")
            return 'TODO: Staging'
        }

        console.warn("TODO: build Live API call for flightsAPI")
        return 'TODO: Live'

    },

}