import { reactive } from 'vue'



export const pagesStore = reactive({

  page: +localStorage.page || 1,
  pageItems: {},

  // Set up the list of Navigation Page names. Called from App.
  initNav(listOfPageNames) {

    let x = 1
    for (const aPage of listOfPageNames) {
        this.pageItems[x] = { 'name': aPage }
        x++
    }

    this._savePage()
    //console.log('pageItems', this.pageItems[1]);

  },


  //---------------------

  // grab the current Page's string name. 
  currentPageName() {
    if ( this._nrOfPageItems() == 0 ) return
    return this.pageItems[this.page].name
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
    this._navigate(-1)
    //return this.pageItems[this.page].name
  },

  // Move to the next page 
  next() {
    this._navigate(1)
    //return this.pageItems[this.page].name
  },



  //---------------------

  resetLocalStorage() {
    localStorage.clear()
  },


  _savePage(pageInt) {
    localStorage.page = this.page
  },

  // Internal. Call via prev() or next() to move to a different page.
  _navigate(directionInt) {
    this.page = this.page + directionInt
    this._savePage()
    // console.log("this.page: ", this.page)
  },

  _nrOfPageItems() {
    return Object.keys(pagesStore.pageItems).length
  }


});

