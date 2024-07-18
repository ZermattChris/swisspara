import { reactive, markRaw  } from 'vue'

import settingsAPI from "@components/api/settingsAPI.js"


export const appStore = reactive({

  // Load the App's basic settings from our server's API.
  // Max pilots, video cost, etc.
  _appSettings: await settingsAPI.get(),

	getVideoPrice() {
    return this._appSettings['video-cost'] ? this._appSettings['video-cost'] : -1
  },


	page: +localStorage.page || 1,

	// pageIndex: ComponentObject: {}
	// { 1: Object: {name: 'PagePassengers', ...}}
	pageItems: {},

  // Custom system to check if the LocalStorage has changed or not.
  // Let's us show the "Confirm Booking" UI on the Pay page correctly.
  // undefined | string (number)
  _savedStorageHash: localStorage._savedStorageHash, 
  _userHasConfirmedBooking: localStorage._confirmedBooking,
  hasStorageChanged() {
    const currLSHash = this._generateStorageHash() + ''     // make sure is string.
    console.log("currLSHash", currLSHash, "_savedStorageHash", this._savedStorageHash)
    if (currLSHash === this._savedStorageHash) {
      //console.log("-> LocalStorage has NOT changed.")
      return false
    } else {
      //console.log("-> LocalStorage CHANGED!")
      this._savedStorageHash = currLSHash
      localStorage._savedStorageHash = currLSHash
      return true
    }
  },
  _generateStorageHash() {
    const string = localStorage._cachePassengersList + 
                                localStorage._cacheTimeSlotsPassengerList +
                                localStorage.arriveDate +
                                localStorage.flightDate +
                                localStorage.departDate +
                                localStorage.selectedFlight +
                                localStorage.photosVideos
                                
    // console.log("APP - gen Hash LS string: ", string)
    let hash = 0;
    if (string.length == 0) return hash;
    for (let i = 0; i < string.length; i++) {
      const char = string.charCodeAt(i);
      hash = ((hash << 5) - hash) + char;
      hash = hash & hash;
    }
    return hash;
  },
	getBookingConfirmed() {
    if (this._userHasConfirmedBooking === undefined ) {    // init.
      this._userHasConfirmedBooking = 'false'
      localStorage._confirmedBooking = this._userHasConfirmedBooking
    }
    // As our internal var is a 'string', need to convert to a useful bool.
    if (this._userHasConfirmedBooking === 'true') return true
    return false
  },
	setBookingConfirmed(confirmedBoolStr) {
    console.log("confirmedBoolStr", confirmedBoolStr)
    this._userHasConfirmedBooking = confirmedBoolStr
    localStorage._confirmedBooking = this._userHasConfirmedBooking
  },





	/**
	 * Set up the list of Navigation Page names. Called from App mounted() hook.
	 * @param {Component} listOfPageNames 
	 */
	initNav(listOfPageNames) {
		let x = 1
		for (const aPage of listOfPageNames) {
			this.pageItems[x] = { 'component': markRaw(aPage) }
			x++
		}
		//console.log('pageItems', this.pageItems)
		this._savePage()

		// console.log('_appSettings', this._appSettings) 

	},


	/**
	 * This is where we need the logic that checks for valid pages
	 * before this page is displayed and returns the last valid page.
	 * For example: the current page number is 5 (payment), but the
	 * flight date has become stale, making page 1 invalid. We need to
	 * send the user back to page 1 to fix missing data.
	 * 
	 * @returns {String} pageName
	 */
	currentPageName() {
		const nrPageItems = this._nrOfPageItems()
		if ( nrPageItems == 0 ) return

		//console.log("this.pageItems", this.pageItems)

		//----------- Check for previous invalid pages -----------
		for (let x = 1; x <= nrPageItems; x++) {
			//console.log('page component:', this.pageItems[x].component.name, this.pageItems[x])
			//console.log("this.pageItems[x].", this.pageItems[x])
			const thisPageValid = this.pageItems[x].component.computed._isPageValid()
			//console.log("Page", x ,thisPageValid)
			if (thisPageValid === false) {
				//console.log("Page", x ,thisPageValid)

				// Only jump if this invalid page is less than current this.page.
				if( x < this.page ) {
					//console.log("=> Jumping to invalid page", x, this.pageItems[x].component)
					this.page = x			// update current Page var.
					this._savePage()		// update localStorage.
					break
				}

			}
		}
		//--------------------------------------------------------

		//console.log('this.page',this.page)
		return this.pageItems[this.page].component
	},





  // Are we on the first Page?
  isNavStart() {
    if (this.page <= 1) return true
    return false
  },
  // Are we on the last Page?
  isNavEnd() {
    if ( this.page >= this._nrOfPageItems() ) return true
    return false
  },


  // Move to the previous page 
  prev() {
    this._navigate(this.page -1)
    //return this.pageItems[this.page].name
  },

  // Move to the next page 
  next() {
    this._navigate(this.page +1)
    //return this.pageItems[this.page].name
  },

  // Navigate to a specific page.
  gotoPage(pageNr) {
    if (pageNr < 1 || pageNr > this._nrOfPageItems()) {
      console.error("Invalid page number: ", pageNr)
      return
    }
    // // Only allow Nav from pages that are valid.
    // if ( !this.pageValid(pageNr-1) ) {
    //   console.log( "appStore.gotoPage(pageNr) isn't valid " + pageNr-1 )
    //   return
    // }

    this._navigate(pageNr)
  },

  // Is this Page Nr valid?
  pageValid(pageNr) {
    if (pageNr < 1 || pageNr > this._nrOfPageItems()) {
      console.error("Invalid page number for appStore.pageValid(pageNr): ", pageNr)
      return false
    }
    var isPageValid = this.pageItems[pageNr].component.computed._isPageValid()
    return isPageValid
  },

  //---------------------

  resetLocalStorage() {
    localStorage.clear()
  },


	_savePage() {
		localStorage.page = this.page
	},

  // Internal. Call via prev() or next() to move to a different page.
  _navigate(targetPageInt) {
    this.page = targetPageInt
    this._savePage()
    // console.log("this.page: ", this.page)
  },

  _nrOfPageItems() {
    return Object.keys(appStore.pageItems).length
  }


});

