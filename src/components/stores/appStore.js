import { reactive, markRaw  } from 'vue'



export const appStore = reactive({



	page: +localStorage.page || 1,

	// pageIndex: ComponentObject: {}
	// { 1: Object: {name: 'PagePassengers', ...}}
	pageItems: {},

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

		//----------- Check for previous invalid pages -----------
		for (let x = 1; x <= nrPageItems; x++) {
			//console.log('page component:', this.pageItems[x].component.name, this.pageItems[x])
			const thisPageValid = this.pageItems[x].component.computed._isPageValid()
			//console.log("Page", x ,thisPageValid)
			if (thisPageValid === false) {
				//console.log("Page", x ,thisPageValid)

				// Only jump if this invalid page is less than current this.page.
				if( x < this.page ) {
					//console.log("=> Jumping to invalid page", x ,thisPageValid)
					this.page = x			// update current Page var.
					this._savePage()		// update localStorage.
					break
				}

			}
		}
		//--------------------------------------------------------

		//console.log('page component: ', this.pageItems[test].component.name)
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

