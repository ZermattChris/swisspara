// Import a base lib that lets us simply switch depending on enviornments
// master, staging, local
import api from "./_apiBase.js"


export default {

	get() {

    // fake local api.
		if ( api.isLocalAPI() ) {
			const loadingDelay = 500
			return new Promise((resolve) => {
				setTimeout(() => {
					resolve(
						[
							{
									"id":77,
									"name":"Classic High local",
									"price":"240"
							},
							{
									"id":32,
									"name":"Scenic",
									"price":"190"
							},
							{
									"id":5,
									"name":"Elite*",
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
        const json = api.callAPI("https://api.swissparaglide.com/staging/flights/2023-07-26")
				return json
		}

    // Live API
    // Change this to 'v1' once staging is working properly and all db data has been
    // cloned to match.
    const json = api.callAPI("https://api.swissparaglide.com/staging/flights/2023-07-26")
    return json

	},

}