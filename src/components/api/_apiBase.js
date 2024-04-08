// Base lib that lets us simply switch depending on enviornments
// master, staging, local

// Just use a simple token to stop random access to our public API
// Note, this isn't any type of security. Only completed bookings
// on the Server can modify the backend system.
const token = '?token=97ccd8f4c7c2f9a265b8122226885043'

let useStagingAPI = false
let useLocalAPI = false

if (document.location) {
  let params = new URL(document.location).searchParams
	if ( params.has("api") ) {
		if (params.get("api") === 'staging') useStagingAPI = true
		if (params.get("api") === 'local') useLocalAPI = true
	}
}

console.log("Use local API:", useLocalAPI);
console.log("Use Staging API:", useStagingAPI);



export default {

	getAPIType() {
		if (useLocalAPI) return 'LOCAL'
		if (useStagingAPI) return 'STAGING'
		return 'LIVE'
	},

	isStagingAPI() {
		return useStagingAPI
	},

	isLocalAPI() {
		return useLocalAPI
	},

	async callAPI(pPath) {
    const response = await fetch(pPath + token)
    const json = await response.json()
    //console.log("calling callAPI:", pPath, json)
    return json
	},


}

