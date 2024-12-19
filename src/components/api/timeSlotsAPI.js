// Import a base lib that lets us simply switch depending on enviornments
// master, staging, local
import api from "./_apiBase.js"


export default {

  get(pFlightId, pISODate) {

    if (api.isLocalAPI()) {
      const path = "http://spzadmin.local:88/api/v1/flightsavailable/" + pFlightId + "/" + pISODate
      console.log('Calling Local Server API: ', path)
      const promisedJSON = api.callAPI(path)
      return promisedJSON
      // --- this was the original dynamic return JSON created below. Now using the real data from the Local dev server ---
      // const loadingDelay = 500
      // return new Promise((resolve) => {
      //   setTimeout(() => {
      //     resolve(
      //       _buildFlightList()
      //     )
      //   }, loadingDelay)
      // })
    }

    if (api.isStagingAPI()) {
      console.warn("TODO: build Staging API call for timeSlotsAPI")
      const promisedJSON = api.callAPI("https://admin.swissparaglide.com/api/v1/flightsavailable/" + pFlightId + "/" + pISODate)
      return promisedJSON
    }

    // Live API
    const path = "https://admin.swissparaglide.com/api/v1/flightsavailable/" + pFlightId + "/" + pISODate
    console.log('Calling Live Server API: ', path)
    const promisedJSON = api.callAPI(path)
    //console.log( "json: ", promisedJSON )
    return promisedJSON

  },

}


import { addDays, subDays, isAfter, isBefore, isEqual, parseISO, getDate, getMonth, getYear, differenceInDays } from 'date-fns'

// ========================= Helper functions   ===========================
const getRandomInt = (min, max) => {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min) + min); // The maximum is exclusive and the minimum is inclusive
}
/**
 * Convert a js Date object to match our internal '2023-11-22' date format.
 * @param {Date} dateObj 
 */
const simpleISO = (dateObj) => {
  //console.log("formatDateToSimpleISO -> dateObj:", dateObj)
  if (dateObj === '') return ''  // guard against manipulating an empty string (param must be a valid Date object)

  // Need to pad out day/month numbers with leading 0 if single digit. Yuck.
  let day = getDate(dateObj) + ''     // convert to string from number
  if (day.length === 1) day = '0' + day

  let month = (getMonth(dateObj) + 1) + ''   // Zero based months + convert to string from number
  if (month.length === 1) month = '0' + month

  const year = getYear(dateObj)

  const result = `${year}-${month}-${day}`
  //console.log("formatDateToSimpleISO -> result:", result)
  return result
}

// Use input dates to build a local flight list.
const _buildDaySlots = () => {

  const nrSlots = 6
  const maxPilots = 4
  let currTime = 8
  let slotObj = {}

  for (let i = 0; i < nrSlots; i++) {
    //console.log("Slot: ", i+1, 'Time: ', ( currTime * 100 ) + '' )

    const nrPilots = getRandomInt(-1, maxPilots)
    let formattedTime = ''

    // Do string padding for time label.
    if (currTime < 10) formattedTime = '0' + currTime + ':00'
    if (currTime >= 10) formattedTime = currTime + ':00'

    slotObj[formattedTime] = nrPilots

    currTime += 2
  }

  //console.log( slotObj )
  return slotObj

}

// Use input dates to build a local flight list.
const _buildFlightList = () => {

  const today = new Date().setHours(0, 0, 0, 0)
  let arrDate = localStorage.arriveDate ? new Date(Date.parse(localStorage.arriveDate)) : -1
  if (arrDate == -1) console.warn("Missing localStorage.arriveDate")
  const flDate = localStorage.flightDate ? new Date(Date.parse(localStorage.flightDate)) : -1
  if (flDate == -1) console.warn("Missing localStorage.flightDate")
  const depDate = localStorage.departDate ? new Date(Date.parse(localStorage.departDate)) : -1
  if (depDate == -1) console.warn("Missing localStorage.departDate")

  let daySlotsObj = {}

  // First possible flight date is today (not arrival date)
  //console.log("isBefore(arrDate, today): ", isBefore(arrDate, today))
  if (isBefore(arrDate, today)) arrDate = today

  let nrFlightDays = differenceInDays(depDate, arrDate) + 1
  // if (nrFlightDays === 0) nrFlightDays = 1		// Always show at least one day!
  //console.log("nrFlightDays: ", differenceInDays( arrDate, depDate ))

  for (let i = 0; i < nrFlightDays; i++) {
    //console.log("Flight Day: ", i)
    // Need to get this day's date string ISO '2023-11-24' to use as a key.
    const dayKey = simpleISO(addDays(arrDate, i))
    daySlotsObj[dayKey] = _buildDaySlots()
  }


  console.log("_timeSlotsList: ", daySlotsObj)
  return [daySlotsObj]	// wrapped in array to match the flights list format.


}



// [{ "2024-07-11": { "08:00": 3, "10:00": -1, "12:00": -1, "14:00": 1, "16:00": 3, "18:00": 1 }, "2024-07-12": { "08:00": 0, "10:00": 3, "12:00": 1, "14:00": 3, "16:00": 3, "18:00": -1 }, "2024-07-13": { "08:00": -1, "10:00": 3, "12:00": 0, "14:00": 0, "16:00": 2, "18:00": 0 } }]