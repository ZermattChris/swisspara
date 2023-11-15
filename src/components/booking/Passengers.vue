<template>


  <div id="flightDateBox"
		class="mx-auto pb-4 md:pb-6 pl-[3vw] w-full max-w-lg sm:w-3/4 md:w-4/5 lg:w-1/2  ">

		<h1 class="select-none pb-4 md:pb-8 text-4xl text-center font-black text-[color:var(--booking-hilite)] drop-shadow-md ">
      4. Passenger Details
    </h1>
    <p>
      We only ask for the passenger information that we need to help make your flight fun
      and enjoyable. 
      <span class="italic">We never share any information with 3rd parties.</span>
    </p>

    <MazPhoneNumberInput
      class="pt-6"
      v-model="phoneNumber"
      show-code-on-list
      :preferred-countries="['FR', 'BE', 'DE', 'US', 'GB']"
      :ignored-countries="['AC']"
      @update="results = $event"
    />
    <code>
      {{ results }}
    </code>


	</div>

</template>

<script>

  import { ref  } from 'vue'

  // Parent component for all "Pages"
  import _Page from './_Page.vue'

  import MazPhoneNumberInput from 'maz-ui/components/MazPhoneNumberInput'
  import 'maz-ui/css/main.css'

  // import { VueTelInput } from 'vue3-tel-input'
  // import 'vue3-tel-input/dist/vue3-tel-input.css'

  export default {
    name: 'PagePassengers',
	
    extends: _Page,   // Parent class handles the valid page event emitting back to the App Shell.
    emits: ['pagevalid'], // Parent class - needs to be here too... _Page.vue

    components: {
			MazPhoneNumberInput,
		},

		data() {
			return {
        phoneNumber: ref(),
        results: ref(),
			};
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
        return false
      },

    }, // computed


  }


</script>

<style>

  .vti__dropdown-item strong {
    font-weight: normal;
  }

</style>