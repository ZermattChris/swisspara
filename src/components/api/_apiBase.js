// Base lib that lets us simply switch depending on enviornments
// master, staging, local

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

}

