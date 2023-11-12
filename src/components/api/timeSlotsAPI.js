// Import a base lib that lets us simply switch depending on enviornments
// master, staging, local
import api from "./_apiBase.js"


export default {

    get() {

        if ( api.isLocalAPI() ) {
            const loadingDelay = 1000

            return new Promise((resolve) => {
                setTimeout(() => {
                resolve(
									_buildFlightList()
                );
                }, loadingDelay);
            });
        }

        if ( api.isStagingAPI() ) {
            console.warn("TODO: build Staging API call for timeSlotsAPI")
            return 'TODO: Staging'
        }

        console.warn("TODO: build Live API call for timeSlotsAPI")
        return 'TODO: Live'


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


		// const slotTime = ( currTime * 100 ) + ''

		slotObj[formattedTime] = nrPilots

		currTime += 2
	}

	//console.log( slotObj )
	return slotObj

}

// Use input dates to build a local flight list.
const _buildFlightList = () => {

	const arrDate = localStorage.arriveDate ? new Date( Date.parse(localStorage.arriveDate) ) : -1
	if (arrDate == -1) console.warn( "Missing localStorage.arriveDate" )
  const flDate = localStorage.flightDate ? new Date( Date.parse(localStorage.flightDate) ) : -1
	if (flDate == -1) console.warn( "Missing localStorage.flightDate" )
  const depDate = localStorage.departDate ? new Date( Date.parse(localStorage.departDate) ) : -1
	if (depDate == -1) console.warn( "Missing localStorage.departDate" )

	let daySlotsObj = {}
	
	// Need to add the Arrive Date to Depart Date and see how many days to build.
	// Probably want to limit the number of days +/- in case someone puts in 4 months.
	// const maxDaysBefore = 7
	// const maxDaysAfter = 14
	// let minDate = arrDate
	// let maxDate = depDate
	
	// if ( differenceInDays(arrDate, flDate) > maxDaysBefore ) {
	// 	console.log("Arrive date too far in past: ", differenceInDays(arrDate, flDate))
	// 	minDate = subDays(flDate, maxDaysBefore)
	// 	console.log("New target Min date: ", minDate)
	// }

	let nrFlightDays = differenceInDays( depDate, arrDate ) + 1
	// if (nrFlightDays === 0) nrFlightDays = 1		// Always show at least one day!
	console.log("nrFlightDays: ", nrFlightDays)
    
	for (let i = 0; i < nrFlightDays; i++) {
		//console.log("Flight Day: ", i)
		// Need to get this day's date string ISO '2023-11-24' to use as a key.
		const dayKey = simpleISO( addDays(arrDate, i) )
		daySlotsObj[dayKey] = _buildDaySlots()
	}


	console.log("daySlotsObj: ", daySlotsObj)
	return daySlotsObj

	// return {
	// 	// date as key
	// 	"2023-10-30":{
	// 			"08:50":3,		// TimeSlot #1. Time label. Pilots available.
	// 			"11:00":2,
	// 			"13:30":0,
	// 			"15:15":-1
	// 	},
	// 	"2023-11-01":{
	// 			"08:00":3,
	// 			"09:45":1,
	// 			"12:00":0,
	// 			"14:00":-1
	// 	},
	// 	"2023-11-03":{
	// 			"08:00":2,
	// 			"09:45":2,
	// 			"11:00":2,
	// 			"12:00":-1,
	// 			"13:00":2,
	// 			"14:45":2,
	// 			"15:00":2,
	// 			"16:00":2,
	// 			"17:00":-1,
	// 			"18:00":2,
	// 			"19:45":2,
	// 			"20:00":2,
	// 			"21:00":-1
	// 	},
	// 	"2023-11-04":{
	// 			"08:00":0,
	// 			"09:45":-1,
	// 			"12:00":-1,
	// 			"14:00":1
	// 	},
	// 	"2023-11-05":{
	// 			"08:00":-1,
	// 			"09:45":4,
	// 			"12:00":-1,
	// 			"14:00":-1
	// 	}
	// }

}
