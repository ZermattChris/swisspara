// Import a base lib that lets us simply switch depending on enviornments
// master, staging, local
import api from "./_apiBase.js"


NOT using this code...

export default {

	get() {

    // Local API.
		if ( api.isLocalAPI() ) {
      console.log("Pay Stripe Secret is calling local API")
      const promisedJSON = api.callAPI("http://spzadmin.local:88/api/v1/api/v1/stripe/setup?XDEBUG_SESSION_START=VSCODE")
      return promisedJSON
		}

    // Staging API
		if ( api.isStagingAPI() ) {
        // TODO: Need a staging version of the Server.
        console.log("Staging API not yet implemented -> TODO: Pay API is just calling live.")
        const promisedJSON = api.callAPI("http://spzadmin.local:88/api/v1/api/v1/stripe/setup?XDEBUG_SESSION_START=VSCODE")
				return promisedJSON
		}

    // Live API
    const promisedJSON = api.callAPI("https://admin.swissparaglide.com/api/v1/stripe/setup?XDEBUG_SESSION_START=VSCODE")
    return promisedJSON

	},

}