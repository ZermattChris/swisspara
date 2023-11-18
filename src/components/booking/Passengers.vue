<template>


  <div id="flightDateBox"
		class=" mx-auto pb-4 pr-2 md:pb-6 pl-[3vw] w-full max-w-lg sm:w-3/4 md:w-4/5 lg:w-1/2  ">

		<h1 class="select-none pb-4 md:pb-8 text-4xl text-center font-black text-[color:var(--booking-hilite)] drop-shadow-md ">
      4. Passenger Details
    </h1>
    <p class="pb-4 ">
      We only ask for the passenger information that is required to help make your flight fun
      and enjoyable. 
      <span class="italic text-gray-500">We never share any information with 3rd parties.</span>
    </p>

    <Passenger
      v-for="(index) in passengerCount" :key="index" 
      :index="index"
      @changed="onFormChanged($event)"
    >
    </Passenger>


  <div id="bottom-footer-spacer" class="h-8 w-full">
	</div>

    <!-- <input type="text" :value="name" @input="setName" class="border-2 border-blue-50">

    <Slider 
      v-model="sliderValue" 
      :format="format"
      :step="10"
      class="mt-8"
    />

    -->

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
        passengerFormsValidList: {}     // internal tracking of each Passenger Form validity, so we can mark this page valid/invalid.
        // phoneNumber: ref(),
        // results: ref(),

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
       * 
       * @param {Custom Event} ev   // 'index':1, 'target':input#email..., 'value':'you@acme.com': 
       */
      onFormChanged (ev,) {
        // console.log("Form Index: ", ev.index)
        // console.log("Form state: ", ev)
        console.log("Form IsValid: ", ev.index, ev.formValid)
        // update our simple passenger form valid tracking object.
        this.passengerFormsValidList[ev.index] = ev.formValid
        //console.log("Simple internal passengerFormsValidList: ", this.passengerFormsValidList)

        
        // console.log("$event: ", ev.$event)
        // console.log("id: ", ev.target.id)
        // console.log("Valid: ", ev.target.validity.valid)
        // console.log("Value:", ev.target.value)
        // console.log("fullphone:", ev.fullphone)   // passing this as not a basic form input (needs country code too)
        // let idx = ev.index
        let updatedPassOjb = {}
        updatedPassOjb[ev.index] = {
          'valid': ev.formValid,
          'contactPhone': ev.fullphone,     // will be undefined unless contact passenger
          'contactEmail': ev.state.email,   // will be undefined unless contact passenger
          'passengerName': ev.state.passengerName, 

        }




        store.updateAPassenger(ev.index, updatedPassOjb)
      }
    },

    mounted() {
      //console.log("passengerCount", this.passengerCount)
    },

		created() {
			
		},

    computed: {

      /**
       * This computed value is requried by the base '_Page' class.
       * It is tightly coupled, but lets the base handle all event
       * work for all child Pages in the same manner.
       */
      _isPageValid() {
        // As we're doing all of the validation checks on Passenger data here,
        // we don't need to check with the Store. Just update Passenger on their
        // form input changes in 'onFormChanged(ev)' above.
        if (this.passengerCount < 1) return false

        // console.log("Simple internal passengerFormsValidList: ", this.passengerFormsValidList)
        // let maxPCount = 0
        // if ( Object.keys(this.passengerFormsValidList).length === 0 ) maxPCount = Object.keys(this.passengerFormsValidList).length

        // console.log("maxPCount: ", maxPCount)

        // for (const aFlyObj of this.passengerFormsValidList) {

        // }

        return true
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