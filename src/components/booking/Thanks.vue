<template>

  <div id="flightDateBox" class="mx-auto pb-1 md:pb-6 pl-[3vw] sm:pl-0 w-full max-w-lg sm:w-3/4 md:w-4/5 lg:w-1/2  ">

    <h1
      class="select-none pb-4 tracking-tighter md:pb-8 text-4xl text-center font-black text-[color:var(--booking-hilite)] drop-shadow-md ">
      Thank You!
    </h1>

    <h4 class="mt-2 mb-6 text-xl text-center text-indigo-900 ">
      Thanks for booking with us. 
    </h4>

    <p class="">
      An Email has been sent to the following address with all the details.
    </p>

    <p>
      {{ "Email component for resend." }}
    </p>

    <p class="">
      Please check your Email Inbox (and Spam folder) for the confirmation. Please 
      note that it can sometimes take a few minutes for Emails to arrive. If you made a 
      mistake entering your email address or the email doesn't arrive, click the resend 
      button above.
    </p>

    <p class="">
      See you soon! ~ The Swiss Paraglide Team
    </p>

  </div>

</template>


<script>

import { reactive, toValue, toRaw } from 'vue'

export default {
  name: 'Thanks',

  components: {
    
  },

  data() {
    return {
      xxx: 0,
    }
  },

  created() {
    
  },

  unmounted() {
    
    console.log('Thanks Page unmounted()')

  },

  // updated() {
  // 	console.log('updated PAGE Time')
  // },


  computed: {


    uu() {
      
    },

  }, // computed

  methods: {

    flightName() {
      var fObj = flightsStore.getFlightObj()
      return this.capitalizeFirstLetter(fObj.name)
    },

  }, // methods.


  watch: {
    // // Update when the current Page name changes.
    // 'myValid.value'(newValid) {
    //     console.log("-> newValid: ", newValid)
    //     // this.currPage = newPage
    // }
  }, // watch

}


</script>

<style scoped>
/* .is-active:after {
		background: linear-gradient(0deg,#87de1d,#b4e900);
	} */
</style>