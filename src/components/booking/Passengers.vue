<template>

  <div id="flightDateBox"
		class=" mx-auto pb-4 pr-2 md:pb-6 pl-[3vw] w-full max-w-lg sm:w-3/4 md:w-4/5 lg:w-1/2  ">

		<h1 class="select-none pb-4 md:pb-8 text-4xl text-center font-black text-[color:var(--booking-hilite)] drop-shadow-md ">
      4. Passenger Details
    </h1>
    <p class="pb-4 ">
      We only ask for the passenger information that is required to help make your flight fun,
      enjoyable &amp; safe.
      <span class="italic text-gray-500 block pt-1">We never share any information with 3rd parties.</span>
    </p>
    
    <Passenger
      v-for="(index) in passengerCount" :key="index" 
      :index="index"
      @change="onFormChanged($event)"
    >
    </Passenger>

    <div id="bottom-footer-spacer" class="h-14 w-full"></div>

	</div>

</template>

<script>

  import { ref, reactive } from 'vue'

  // Parent component for all "Pages"
  import _Page from './_Page.vue'

	import Passenger from "@components/Passenger.vue"

	// Store
	import {pagePassengersStore as store} from '@stores/pagePassengersStore.js' 
  import { countTotalPassengers, loadTimeSlotPassengersList } from '@stores/pageTimeSlotsStore'   // Grab passenger count.
  // console.log("countTotalPassengers", countTotalPassengers( loadTimeSlotPassengersList() ))


  // import Slider from '@vueform/slider'


  export default {
    name: 'PagePassengers',
    stepperName: 'Details',
	
    extends: _Page,   // Parent class handles the valid page event emitting back to the App Shell.
    emits: ['pagevalid'], // Parent class - needs to be here too... _Page.vue

    components: {
			Passenger,
		},

    setup () {
      // return { v$: useVuelidate() }
    },

		data() {
			return {
        passengerCount: countTotalPassengers( loadTimeSlotPassengersList() ),
        passengerFormsValidList: {},     // internal tracking of each Passenger Form validity, so we can mark this page valid/invalid.
        
        // name: '',
        // sliderValue: 20,
        // format: function (value) {
        //   return `€${value}`
        // }
      }
		},

    // validations () {
    //   return {
    //     name: { required }
    //   }
    // },

    methods: {

      /**
       * This method must be overrided in each of these Page components.
       * A new attempt at sorting out the current messy navigation system.
       */
       valid() {
        // Overriden from the base '_Page' class.
        // console.log('-> Passengers.vue: valid()')
        // TODO func in store to check if all passenger forms are valid or not.
        if (this.passengerCount < 1) return false

        let allPassFormsValid = true
        const passList = store.getAllPassengersList() 
        for (let x = 1; x <= this.passengerCount; x++) {
          // Need to guard against empty passenger forms (no data if not anything input yet by user...)
          // Example, forms are filled in and user goes back to previous Step and adds another pass.
          if ( passList[x] === undefined ) return false
          //console.log("x", x )
          //console.log("aPassForm", passList[x].valid )
          if (passList[x].valid === false) {
            allPassFormsValid = false
            break
          }

        }

        return allPassFormsValid

      },


      /**
       * 
       * @param {Custom Event} ev   // 'index':1, 'target':input#email..., 'value':'you@acme.com': 
       */
      onFormChanged (ev) {
        //console.log("Form Index: ", ev.index)
        // console.log("Form state: ", ev)
        //console.log("Form IsValid: ", ev.index, ev.formValid)
        // update our simple passenger form valid tracking object.
        this.passengerFormsValidList[ev.index] = ev.formValid

        const updatedPassOjb = {
          'valid': ev.formValid,
          'phone': ev.phone ? ev.phone.formatInternational : null,     // will be undefined unless contact passenger
          'email': ev.state ? ev.state.email : null,                   // will be undefined unless contact passenger
          'name': ev.state.name, 
          'sex': ev.state.sex,
          'age': ev.state.age + '',   // convert to string before saving to cache.
          'confidence': ev.state.confidence,
          'weightKg': ev.state.weightKg,
          'description': ev.state.description,
        }
        //console.log('Update obj', ev.index,  updatedPassOjb)


        store.updateAPassenger(ev.index, updatedPassOjb)

        // manually force page valid check
        // Leave this as is !!!!
    		//this.$emit( 'pagevalid', 'PagePassengers', this._isPageValid)        // sends event back to 'App' base class (not calling the deprecated _isPageValid() !!!)
      
    		this.$emit( 'pagevalid', 'PagePassengers', this.valid())  // New valid() method in each Page component.
        
      }
    },

    mounted() {
      //console.log("passengerCount", this.passengerCount)
      // TODO: if no Passengers, then do some resetting and return to Time Page.
      
    },

		created() {
			
		},

    computed: {

      /**
       * This computed value is requried by the base '_Page' class.
       * It is tightly coupled, but lets the base handle all event
       * work for all child Pages in the same manner.
       */
      // TODO: remove this - use valid() method instead.
      _isPageValid() {
        console.log("Passengers._isPageValid() is deprecated")

        // // TODO func in store to check if all passenger forms are valid or not.
        // if (this.passengerCount < 1) return false

        // let allPassFormsValid = true
        // const passList = store.getAllPassengersList() 
        // for (let x = 1; x <= this.passengerCount; x++) {
        //   // Need to guard against empty passenger forms (no data if not anything input yet by user...)
        //   // Example, forms are filled in and user goes back to previous Step and adds another pass.
        //   if ( passList[x] === undefined ) return false
        //   //console.log("x", x )
        //   //console.log("aPassForm", passList[x].valid )
        //   if (passList[x].valid === false) {
        //     allPassFormsValid = false
        //     break
        //   }

        // }

        // return allPassFormsValid
      },

    }, // computed


  }


</script>

<!-- <style>

  .vti__dropdown-item strong {
    font-weight: normal;
  }

</style>
<style src="@vueform/slider/themes/default.css"></style> -->