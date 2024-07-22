<template>

  {{ currentPage }}


  <nav aria-label="Progress" class="mx-auto flex justify-center">
    <ol role="list" class="flex items-center  mx-auto">

      <li v-for="(aPage, index) in pages" id="stepper_{{index}}" class="relative pr-10 sm:pr-20">

        <!-- Current Step -->
        <div v-if="currentPage == index +1">
          <div class="absolute inset-0 flex items-center" aria-hidden="true">
            <div class="h-0.5 w-full bg-gray-200"></div>
          </div>
          <div
            class="relative flex h-8 w-8 items-center justify-center rounded-full border-2 border-indigo-600 bg-white  drop-shadow"
            aria-current="step">
            <span class="h-2.5 w-2.5 rounded-full bg-indigo-600" aria-hidden="true"></span>
            <span class="absolute text-sm top-8 select-none drop-shadow-sm">
              {{ aPage.value.stepperName }} {{ currentPage }} {{ index+1 }}
            </span>
          </div>
        </div>
        <!-- END: Current Step -->




      </li>


      <!-- Current Step -->
      <!-- <li class="relative pr-10 sm:pr-20">
        <div class="absolute inset-0 flex items-center" aria-hidden="true">
          <div class="h-0.5 w-full bg-gray-200"></div>
        </div>
        <div
          class="relative flex h-8 w-8 items-center justify-center rounded-full border-2 border-indigo-600 bg-white  drop-shadow"
          aria-current="step">
          <span class="h-2.5 w-2.5 rounded-full bg-indigo-600" aria-hidden="true"></span>
          <span class="absolute text-sm top-8 select-none drop-shadow-sm">Dates</span>
        </div>
      </li> -->

      <!-- Completed Step -->
      <!-- <li class="relative pr-10 sm:pr-20">
      <div class="absolute inset-0 flex items-center" aria-hidden="true">
        <div class="h-0.5 w-full bg-indigo-600"></div>
      </div>
      <a href="#" class="relative flex h-8 w-8 items-center justify-center rounded-full bg-indigo-600 hover:bg-indigo-900">
        <svg class="h-5 w-5 text-white" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
          <path fill-rule="evenodd" d="M16.704 4.153a.75.75 0 01.143 1.052l-8 10.5a.75.75 0 01-1.127.075l-4.5-4.5a.75.75 0 011.06-1.06l3.894 3.893 7.48-9.817a.75.75 0 011.05-.143z" clip-rule="evenodd" />
        </svg>
        <span class="absolute text-sm top-8">Dates</span>
      </a>
    </li> -->

      <!-- Upcoming Step -->
      <!-- <li class="relative pr-10 sm:pr-20">
        <div class="absolute inset-0 flex items-center" aria-hidden="true">
          <div class="h-0.5 w-full bg-gray-200"></div>
        </div>
        <div
          class="group relative flex h-8 w-8 items-center justify-center rounded-full border-2 border-gray-300 bg-white ">
          <span class="h-2.5 w-2.5 rounded-full bg-transparent " aria-hidden="true"></span>
          <span class="absolute text-sm top-8 text-gray-400">Flight</span>
        </div>
      </li> -->

      <!-- Upcoming Step -->
      <!-- <li class="relative pr-10 sm:pr-20">
      <div class="absolute inset-0 flex items-center" aria-hidden="true">
        <div class="h-0.5 w-full bg-gray-200"></div>
      </div>
      <a href="#" class="group relative flex h-8 w-8 items-center justify-center rounded-full border-2 border-gray-300 bg-white hover:border-gray-400">
        <span class="h-2.5 w-2.5 rounded-full bg-transparent group-hover:bg-gray-300" aria-hidden="true"></span>
        <span class="absolute text-sm top-8">Time</span>
      </a>
    </li> -->

      <!-- Upcoming Step -->
      <!-- <li class="relative pr-10 sm:pr-20">
      <div class="absolute inset-0 flex items-center" aria-hidden="true">
        <div class="h-0.5 w-full bg-gray-200"></div>
      </div>
      <a href="#" class="group relative flex h-8 w-8 items-center justify-center rounded-full border-2 border-gray-300 bg-white hover:border-gray-400">
        <span class="h-2.5 w-2.5 rounded-full bg-transparent group-hover:bg-gray-300" aria-hidden="true"></span>
        <span class="absolute text-sm top-8">Details</span>
      </a>
    </li> -->

      <!-- Upcoming Step -->
      <!-- <li class="relative">
      <div class="absolute inset-0 flex items-center" aria-hidden="true">
        <div class="h-0.5 w-full bg-gray-200"></div>
      </div>
      <a href="#" class="group relative flex h-8 w-8 items-center justify-center rounded-full border-2 border-gray-300 bg-white hover:border-gray-400">
        <span class="h-2.5 w-2.5 rounded-full bg-transparent group-hover:bg-gray-300" aria-hidden="true"></span>
        <span class="absolute text-sm top-8">Pay</span>
      </a>
    </li> -->


    </ol>
  </nav>

</template>


<script>

import { ref, computed, onMounted } from 'vue'
import { appStore } from '@stores/appStore.js'

export default {

  name: "stepper",
  components: {},

  // ----------- Data ------------
  data() {
    return {
      _currentPage: appStore.page,
    };
  },

  // ----------- Props ------------
  props: {
    pages: 'Array'
  },

  // ----------- Lifecycle ------------
  mounted() {

    console.log("Pages prop to Stepper: ", this.pages)

  },


  computed: {


    // shows a bit of dev info between the Prev | Next buttons.
    currentPage() {
      return appStore.page
    },

  }


}

</script>