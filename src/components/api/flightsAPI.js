// Import a base lib that lets us simply switch depending on enviornments
// master, staging, local
import api from "./_apiBase.js"


export default {

	get(pISODate) {

    // fake local api.
		if ( api.isLocalAPI() ) {
			const loadingDelay = 500
			return new Promise((resolve) => {
				setTimeout(() => {
					resolve(
						[
							{
									"id":1,
									"name":"Classic (local)",
									"price":"240"
							},
							{
									"id":2,
									"name":"Scenic (local)",
									"price":"190"
							},
							{
									"id":3,
									"name":"Elite* (local)",
									"price":"420"
							}
						]
					);
				}, loadingDelay);
			});
		}

    // Staging API
		if ( api.isStagingAPI() ) {
        // Switch between v1 and staging.
        // TODO: Need a staging version of the Server.
        const promisedJSON = api.callAPI("https://admin.swissparaglide.com/api/v1/flightoptions/" + pISODate)
				return promisedJSON
		}

    // Live API
    // Change this to 'v1' once staging is working properly and all db data has been
    // cloned to match.
    const promisedJSON = api.callAPI("https://admin.swissparaglide.com/api/v1/flightoptions/" + pISODate)
    return promisedJSON

	},

}