// Import a base lib that lets us simply switch depending on enviornments
// master, staging, local
import api from "./_apiBase.js"


export default {

	get() {

		if ( api.isLocalAPI() ) {
			const loadingDelay = 500

			return new Promise((resolve) => {
				setTimeout(() => {
					resolve(
						[
							{
									"id":77,
									"name":"Classic High",
									"price":"240",
									"descriptionId": 100
							},
							{
									"id":32,
									"name":"Scenic",
									"price":"190",
									"descriptionId": 200
							},
							{
									"id":5,
									"name":"Elite*",
									"price":"420",
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