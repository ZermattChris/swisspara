import { reactive, markRaw, isProxy, toRaw, ref  } from 'vue'

const { MODE, PROD, DEV, SSR, BASE_URL, VITE_MY_VAR } = import.meta.env;
 //console.log(MODE, PROD, DEV, SSR, BASE_URL, VITE_MY_VAR)


// fetch('src/components/stores/_testData/PageFlightData.json')
// .then((response) => response.json())
// .then((json) => console.log(json));


export const pageFlightStore = reactive({

    selectedFlight: +localStorage.selectedFlight || -1,

    _flightsList: [{}],

    photosVideos: new Boolean(localStorage.photosVideos) || false,


    //---------------------

    // Get if this 'Page' is valid or not. Used to manage the Prev/Next
    // buttons and breadcrumbs.
    isPageValid() {
        let result = true

        // -> Flight Date checks.
        if ( this.selectedFlight < 1 ) result = false


        return result
    },


    // ---- Set up this page's data ----.
    /**
     * From Page mounted()
     * 1) Read latest data from server via API
     * 2) Read flight 'id' from localStorage 
     * 3) Check that there's a match (otherwise selectedFlight = -1 and page Invalid.)
     * 4) Set the value of the flight drop menu.
     */
    async initialize() {

        //let data = {}

        // if (DEV) {
        //     const response = await fetch('src/components/stores/_testData/PageFlightData.json')
        //     this._flightsList = await response.json()
        // } else {
            // Production. Call our API here.
            // const response = await fetch('src/components/stores/_testData/PageFlightData.json')
            this._flightsList = [
                {
                   "id":77,
                   "name":"Classic High",
                   "seperator":false,
                   "descriptionId": 100
                },
                {
                   "id":32,
                   "name":"Scenic",
                   "seperator":false,
                   "descriptionId": 200
                },
                {
                   "id":5,
                   "name":"Elite*",
                   "seperator":false,
                   "descriptionId": 300
                }
             ]
    },

        //this._flightsList = data
        //console.log('Read data',data)
        
    



    //---------- Getters / Setters -----------

    // ---- Flight List array for building drop menu ----.
    // getFlightList() {

    //     const temp = this._flightsList
    //     // const rawObject = {...this._flightsList};
    //     // const reqObject = JSON.parse(JSON.stringify(this._flightsList));

    //     console.log('TEMP: ', temp) 
    //     return this._flightsList
    // },


    // ---- Flight Date ----.
    getFlightChosen() {
        // Should return an object with all the selected infos.
        return this.selectedFlight
    },
    setFlightChosen(flistObj) {
        this.selectedFlight = flistObj 
        localStorage.selectedFlight = this.selectedFlight 
    },


    // ---- Photos & Videos toggle switch ----.
    getPhotosToggle() {
        return this.photosVideos
    },
    setPhotosToggle(photosBool) {
        this.photosVideos = photosBool 
        localStorage.photosVideos = this.photosVideos 
    },

    

});



