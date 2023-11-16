<template>


  <div id="flightDateBox"
		class=" mx-auto pb-4 pr-2 md:pb-6 pl-[3vw] w-full max-w-lg sm:w-3/4 md:w-4/5 lg:w-1/2  ">

		<h1 class="select-none pb-4 md:pb-8 text-4xl text-center font-black text-[color:var(--booking-hilite)] drop-shadow-md ">
      4. Passenger Details
    </h1>
    <p class="pb-4">
      We only ask for the passenger information that we need to help make your flight fun
      and enjoyable. 
      <span class="italic">We never share any information with 3rd parties.</span>
    </p>

    <Passenger
      v-for="(index) in passengerCount" :key="index" 
      :index="index"
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

    <MazPhoneNumberInput
      class="pt-6"
      v-model="phoneNumber"
      show-code-on-list
      :preferred-countries="['CH', 'US', 'GB', 'KR', 'FR', 'NL', 'DE', 'SG']"
      :ignored-countries="['AC']"
      @update="results = $event"
    />
    <code>
      {{ results }}
    </code> -->

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

  // import MazPhoneNumberInput from 'maz-ui/components/MazPhoneNumberInput'
  // import 'maz-ui/css/main.css'

  // import { useVuelidate } from '@vuelidate/core'
  // import { required, email } from '@vuelidate/validators'

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
      // setName ($event) {
      //   // do some silly transformation
      //   this.name = $event.target.value.toUpperCase()
      //   this.v$.name.$touch()
      // }
    },

    mounted() {
      
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
        if (this.passengerCount < 1) return false
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