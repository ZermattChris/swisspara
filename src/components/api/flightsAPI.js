// Import a base lib that lets us simply switch depending on enviornments
// master, staging, local
import api from "./_apiBase.js"


export default {

  get(pISODate) {

    // fake local api.
    if (api.isLocalAPI()) {
      const path = "http://spzadmin.local:88/api/v1/flightoptions/" + pISODate
      console.log('Calling Local Server API: ', path)
      const promisedJSON = api.callAPI(path)
      return promisedJSON

      // const loadingDelay = 500
      // console.log("Calling Local dev API for Flights List.")
      // return new Promise((resolve) => {
      // 	setTimeout(() => {
      // 		resolve(
      // 			[
      // 				{
      // 						"id":1,
      // 						"name":"Classic (local)",
      // 						"price":"240"
      // 				},
      // 				{
      // 						"id":2,
      // 						"name":"Scenic (local)",
      // 						"price":"190"
      // 				},
      // 				{
      // 						"id":3,
      // 						"name":"Elite* (local)",
      // 						"price":"420"
      // 				}
      // 			]
      // 		);
      // 	}, loadingDelay);
      // });
    }

    // Staging API
    if (api.isStagingAPI()) {
      // Switch between v1 and staging.
      // TODO: Need a staging version of the Server.
      console.log("Calling Staging (is live now, needs to be added!) API for Flights List.")
      const promisedJSON = api.callAPI("https://admin.swissparaglide.com/api/v1/flightoptions/" + pISODate)
      return promisedJSON
    }

    // Live API
    // Change this to 'v1' once staging is working properly and all db data has been
    // cloned to match.
    console.log("Calling LIVE API for Flights List.")
    const promisedJSON = api.callAPI("https://admin.swissparaglide.com/api/v1/flightoptions/" + pISODate)
    return promisedJSON

  },

}