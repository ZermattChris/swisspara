// Base lib that lets us simply switch depending on enviornments
// master, staging, local

// Just use a simple token to stop random access to our public API
// Note, this isn't any type of security. Only completed bookings
// on the Server can modify the backend system.
const token = '?token=97ccd8f4c7c2f9a265b8122226885043'  // doesnt do anything...

import Toastify from 'toastify-js';
import "toastify-js/src/toastify.css";

let useStagingAPI = false
let useLocalAPI = false

chooseAPIServer()

// This is a simple way to switch between the different API servers.
function chooseAPIServer() {
  if (document.location) {

    // Use Url param to force a specific backend server.
    let params = new URL(document.location).searchParams
    if (params.has("api")) {
      if (params.get("api") === 'staging') useStagingAPI = true
      if (params.get("api") === 'local') useLocalAPI = true
      return
    }
  
    // Use the hostname to select the Local Dev (Sail), Staging (doesn't exist at the moment) or Live Server.
    if (document.location.hostname === 'swissparaglide.com') {
      useLocalAPI = false
      useStagingAPI = false
      return
    }
  
    if (document.location.hostname === 'netlify.app') {
      useLocalAPI = false
      useStagingAPI = true
      return
    }
    
  }

  // Otherwise running local dev server
  useLocalAPI = true
  
}

//console.log("Use local API:", useLocalAPI);
//console.log("Use Staging API:", useStagingAPI);



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

    let json = {}
    try {
      const response = await fetch(pPath + token, {
        headers: {
          "Content-Type": "application/json"
        }
      });
      json = await response.json()
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      // ...
    } catch (error) {
      const errorPathMsg = 'Error calling ' + this.getAPIType() + ' API :: ' + pPath
      var errMsg = ''
      if (error.message.includes('Failed to fetch')) {
        errMsg = 'Server not found or network error'
      } else {
        errMsg = 'Error: ' + error.message
      }

      Toastify({
        text: errMsg + '\n\n' + errorPathMsg,
        duration: 6000,
        close: true,
        gravity: "bottom", // `top` or `bottom`
        position: "center", // `left`, `center` or `right`
        stopOnFocus: true, // Prevents dismissing of toast on hover
        style: {
          background: "rgba(255,255,255, 0.97)",
          color: "black"
        }, 
      }).showToast();


    }
    return json // Promise!!!

  },


}

