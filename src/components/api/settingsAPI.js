// Import a base lib that lets us simply switch depending on enviornments
// master, staging, local
import api from "./_apiBase.js"


export default {

	get() {

    // fake local api.
		if ( api.isLocalAPI() ) {


      const path = "http://spzadmin.local:88/api/v1/settings"
      console.log('Calling Local Server API: ', path)
      const promisedJSON = api.callAPI(path)

			// const loadingDelay = 500
			// return new Promise((resolve) => {
			// 	setTimeout(() => {
			// 		resolve(
			// 			[
			// 				{
			// 						"max-pilots":10,
			// 						"book-future-months":12,
			// 						"video-cost":40
			// 				}
			// 			]
			// 		);
			// 	}, loadingDelay);
			// });
		}

    // Staging API
		if ( api.isStagingAPI() ) {
        // TODO: Need a staging version of the Server.
        console.log("Staging API not yet implemented -> TODO: staging environment on our Bookings server. Just calling 'Live' for now...")
        const promisedJSON = api.callAPI("https://admin.swissparaglide.com/api/v1/settings")
				return promisedJSON
		}

    // Live API
    // Change this to 'v1' once staging is working properly and all db data has been
    // cloned to match.
    const promisedJSON = api.callAPI("https://admin.swissparaglide.com/api/v1/settings")
    return promisedJSON

	},

}

// {"max-pilots":10,"book-days-from-today":0,"book-future-months":12,"video-cost":"40.00"}