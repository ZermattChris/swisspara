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


    <!-- test  -->
    <button type="button" @click="resetVueApp()"
      class="inline-flex items-center gap-x-2 rounded-md bg-orange-700 px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm  focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 ">
      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor"
        class="w-6 h-6">
        <path stroke-linecap="round" stroke-linejoin="round"
          d="M12.75 15l3-3m0 0l-3-3m3 3h-7.5M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
      </svg>
      resetVueApp - works
    </button>




  </div>

</template>


<script>

import { reactive, toValue, toRaw } from 'vue'

// Parent component for all "Pages"
import _Page from './_Page.vue'


export default {
  name: 'Thanks',

  extends: _Page,   // Parent class handles the valid page event emitting back to the App Shell.

  emits: ['resetApp'],

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

    // Temp. for testing.
    resetVueApp() {
      // This does the same as double-clicking on the Dev reset field between the
      // Previous and Next buttons. Event is handled by App.vue 
      this.$emit('resetApp')
    },


    /**
     * This method must be overrided in each of these Page components.
     * This Thanks page doesn't use it, but it must be here.
     */
    valid() {
      // Overriden from the base '_Page' class.
      return true
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