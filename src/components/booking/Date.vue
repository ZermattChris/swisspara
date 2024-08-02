<template>

  <h1 class="pb-8 md:pb-12 text-4xl text-center font-black text-[color:var(--booking-hilite)] drop-shadow-md ">
    1. Flight Date
  </h1>

  <div id="flightDateBox"
    class="mx-auto pb-8 md:pb-12 pl-[3vw] sm:pl-0 w-full sm:w-3/4 md:w-4/5 lg:w-1/2 xl:w-2/5 2xl:w-[30em] ">
    <!-- (1) -->
    <!-- <span class="w-12 h-12  sm:w-14 sm:h-14
            text-3xl sm:text-4xl 
            pt-1 sm:pt-1.5 pl-1 
            font-black  drop-shadow-lg border-black border-2   inline-block   rounded-full bg-indigo-600 text-white">
            <span class="pl-2">1.</span>
        </span> -->

    <label for="flightDateInput" class="text-xl md:text-2xl inline pl-2 font-medium text-gray-900">
      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor"
        class="w-6 h-6 inline-block mb-1 text-indigo-600">
        <path stroke-linecap="round" stroke-linejoin="round"
          d="M6.75 3v2.25M17.25 3v2.25M3 18.75V7.5a2.25 2.25 0 012.25-2.25h13.5A2.25 2.25 0 0121 7.5v11.25m-18 0A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75m-18 0v-7.5A2.25 2.25 0 015.25 9h13.5A2.25 2.25 0 0121 11.25v7.5m-9-6h.008v.008H12v-.008zM12 15h.008v.008H12V15zm0 2.25h.008v.008H12v-.008zM9.75 15h.008v.008H9.75V15zm0 2.25h.008v.008H9.75v-.008zM7.5 15h.008v.008H7.5V15zm0 2.25h.008v.008H7.5v-.008zm6.75-4.5h.008v.008h-.008v-.008zm0 2.25h.008v.008h-.008V15zm0 2.25h.008v.008h-.008v-.008zm2.25-4.5h.008v.008H16.5v-.008zm0 2.25h.008v.008H16.5V15z" />
      </svg>
      Choose your Flight Date:
    </label>
    <div id="dateInputBox" class="mt-3 pl-0">

      <div v-show="flightDate" class="inline-block  rounded-md border-0 
          text-lg font-bold
          ml-2 py-2 px-2 
          w-72 sm:w-80
          overflow-clip
          text-center
          cursor-default
          read-only
          bg-gray-50
          text-gray-400
          ring-1 ring-inset ring-gray-300 placeholder:text-gray-400  focus:appearance-none focus:outline-none"
        :class="{ 'bg-lime-100 text-gray-900': flightDate }" style="-webkit-user-select:none; user-select:none;">
        {{ displayDate(flightDate) }}
      </div>
      <!-- This would make a good sep component.  -->
      <svg class="w-6 h-6 inline-block ml-2 mb-1 text-lime-600" :class="[!flightDate ? 'hidden' : '']"
        xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor">
        <path fill-rule="evenodd"
          d="M2.25 12c0-5.385 4.365-9.75 9.75-9.75s9.75 4.365 9.75 9.75-4.365 9.75-9.75 9.75S2.25 17.385 2.25 12zm13.36-1.814a.75.75 0 10-1.22-.872l-3.236 4.53L9.53 12.22a.75.75 0 00-1.06 1.06l2.25 2.25a.75.75 0 001.14-.094l3.75-5.25z"
          clip-rule="evenodd" />
      </svg>

    </div>

    <!-- This is the Main Flight Date picker that's always shown  -->
    <VueDatePicker v-if="showArriveDatePicker === false && showDepartDatePicker === false"
      class="inline-block relative -left-[5px] mt-4 mx-auto z-1  max-w-[350px] drop-shadow-md" v-model="flightCal"
      :model-value="flightDate" :highlight="highlightedDates()" :enable-time-picker="false"
      :month-change-on-scroll="false" :max-date="getMaxFutureDate()" prevent-min-max-navigation
      @update:model-value="onDateSelect" inline auto-apply :min-date="new Date()"
      :year-range="[new Date().getFullYear(), new Date().getFullYear() + 1]"></VueDatePicker>


  </div>



  <!-- Modal Calendar pop ups here.  -->
  <Transition name="fade">
    <div v-if="showArriveDatePicker || showDepartDatePicker" id="calendarModal"
      class="fixed inset-0 z-[97] w-screen bg-gray-500 bg-opacity-90 overflow-y-auto">
      <div class="flex flex-col place-content-center gap-4  p-4 text-center h-screen ">

        <!-- Arrive Calendar  -->
        <div v-if="showArriveDatePicker" @click="(e) => { e.stopPropagation() }"
          class="flex flex-col  place-self-center justify-center  bg-white px-4 pt-8 pb-4 rounded-md shadow-md">

          <div
            class="flex  place-self-center justify-center  w-[190px] text-xl italic text-black bg-lime-200 border-2 border-gray-600 mb-2 py-2 px-2 rounded-3xl drop-shadow-lg ">
            <svg class="w-6 h-6 inline-block mb-1 mr-1 " xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"
              fill="currentColor">
              <path fill-rule="evenodd"
                d="M3.97 3.97a.75.75 0 011.06 0l13.72 13.72V8.25a.75.75 0 011.5 0V19.5a.75.75 0 01-.75.75H8.25a.75.75 0 010-1.5h9.44L3.97 5.03a.75.75 0 010-1.06z"
                clip-rule="evenodd" />
            </svg>
            Arrival Date
          </div>

          <div v-if="!arriveDate" class="text-sm mt-2 mb-4 text-gray-800">
            Which day are you arriving in Zermatt?
          </div>
          <div v-if="arriveDate" class="text-sm mb-6 text-gray-800">
            You arrive on:
            {{ this.getFormattedArrivalDate() }}
          </div>

          <VueDatePicker id="arriveDatePicker" v-model="arriveCal" :model-value="arriveDate"
            :month-change-on-scroll="false" :markers="getFlightDateMakerObj()" :enable-time-picker="false" inline
            teleport-center auto-apply :min-date="getMinArriveDate()" :max-date="getMaxArriveDate()"
            prevent-min-max-navigation @update:model-value="onArriveDateSelect"
            class="dpMenuArrive  absolute z-[98] drop-shadow-xl ">
          </VueDatePicker>

          <div class="text-md mt-6 text-gray-800">
            Around what time are you arriving?
            <!-- Arrival Time Slider -->
            <SliderTime id="arriveSlider" v-model.number="arrivalTime" class="my-4 mx-0" min="7.5" max="20.5"
              step="0.5">
              <!-- Early Btn -->
              <template v-slot:preIcon>
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor"
                  class="h-6 w-6 py-0 pl-1 relative left-1">
                  <path
                    d="M12 22C6.47715 22 2 17.5228 2 12C2 6.47715 6.47715 2 12 2C17.5228 2 22 6.47715 22 12C22 17.5228 17.5228 22 12 22ZM12 20C16.4183 20 20 16.4183 20 12C20 7.58172 16.4183 4 12 4C7.58172 4 4 7.58172 4 12C4 16.4183 7.58172 20 12 20ZM13 12H17V14H11V7H13V12Z">
                  </path>
                </svg>
              </template>
              <!-- Late Btn -->
              <template v-slot:postIcon>
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor"
                  class="h-8 w-8 py-0 pl-1">
                  <path
                    d="M12 22C6.47715 22 2 17.5228 2 12C2 6.47715 6.47715 2 12 2C17.5228 2 22 6.47715 22 12C22 17.5228 17.5228 22 12 22ZM12 20C16.4183 20 20 16.4183 20 12C20 7.58172 16.4183 4 12 4C7.58172 4 4 7.58172 4 12C4 16.4183 7.58172 20 12 20ZM13 12H17V14H11V7H13V12Z">
                  </path>
                </svg>
              </template>
              <!-- Time display -->
              <template v-slot:message>
                <div class="text-sm"
                  :class="[arrivalTime < 8 || arrivalTime > 20 ? 'text-red-700 italic' : '', arrivalTime >= 8 && arrivalTime < 12 ? 'text-green-700' : '', arrivalTime >= 12 && arrivalTime < 18 ? 'text-orange-700' : '', arrivalTime >= 18 ? 'text-gray-700' : '']">
                  {{ (arrivalTime < 8 || arrivalTime > 20) ? "I don't know my arrival time" : getFormattedArrialTime() }}
                </div>
              </template>
            </SliderTime>
          </div>

          <div class="text-center mt-10 mb-6">
            <button type="button" @click="onContinueArriveDialog()"
              class="animate-pulse hover:animate-none rounded-full bg-lime-200 px-8 py-2.5 text-sm font-semibold text-gray-900 shadow-sm border-[1px] border-gray-400 ring-4 ring-offset-2 ring-orange-700 hover:bg-gray-100">
              Continue
            </button>
          </div>

        </div>


        <!-- Depart Calendar  -->
        <div v-if="showDepartDatePicker" @click="(e) => { e.stopPropagation() }"
          class="flex flex-col  place-self-center justify-center  bg-white px-4 pt-8 pb-4 rounded-md shadow-md">

          <div
            class="flex  place-self-center justify-center  w-[190px] text-xl italic text-black bg-orange-200 border-2 border-gray-600 mb-2 py-2 px-2 rounded-3xl drop-shadow-lg ">
            <svg class="w-6 h-6 inline-block mb-1 mr-1 " xmlns="http://www.w3.org/2000/svg" fill="none"
              viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" d="M4.5 19.5l15-15m0 0H8.25m11.25 0v11.25" />
            </svg>
            Depart Date
          </div>

          <div v-if="departDate" class="text-sm mt-2 mb-4 text-gray-800">
            You depart on:
            {{ this.getFormattedDepartDate() }}
          </div>
          <div v-else class="text-sm mt-2 mb-4 text-gray-800">
            Which day are you departing Zermatt?
          </div>

          <VueDatePicker v-if="showDepartDatePicker" id="departDatePicker" v-model="departCal" :model-value="departDate"
            :month-change-on-scroll="false" :markers="getFlightDateMakerObj()" :enable-time-picker="false" inline
            teleport-center auto-apply :min-date="getMinDepartDate()" :max-date="getMaxDepartDate()"
            prevent-min-max-navigation @update:model-value="onDepartDateSelect"
            class="dpMenuDepart  absolute z-[98] drop-shadow-xl">
          </VueDatePicker>

          <div class="text-sm mt-2 text-gray-800">
            About what time do you leave Zermatt?
            <!-- Arrival Time Slider -->
            <SliderTime id="departSlider" v-model.number="departTime" class="my-4 mx-0" min="7.5" max="20.5" step="0.5">
              <!-- Early Btn -->
              <template v-slot:preIcon>
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor"
                  class="h-6 w-6 py-0 pl-1">
                  <path
                    d="M12 22C6.47715 22 2 17.5228 2 12C2 6.47715 6.47715 2 12 2C17.5228 2 22 6.47715 22 12C22 17.5228 17.5228 22 12 22ZM12 20C16.4183 20 20 16.4183 20 12C20 7.58172 16.4183 4 12 4C7.58172 4 4 7.58172 4 12C4 16.4183 7.58172 20 12 20ZM13 12H17V14H11V7H13V12Z">
                  </path>
                </svg>
              </template>
              <!-- Late Btn -->
              <template v-slot:postIcon>
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor"
                  class="h-8 w-8 py-0 pl-1">
                  <path
                    d="M12 22C6.47715 22 2 17.5228 2 12C2 6.47715 6.47715 2 12 2C17.5228 2 22 6.47715 22 12C22 17.5228 17.5228 22 12 22ZM12 20C16.4183 20 20 16.4183 20 12C20 7.58172 16.4183 4 12 4C7.58172 4 4 7.58172 4 12C4 16.4183 7.58172 20 12 20ZM13 12H17V14H11V7H13V12Z">
                  </path>
                </svg>
              </template>
              <!-- Time display -->
              <template v-slot:message>
                <div class="text-sm"
                  :class="[departTime < 8 || departTime > 20 ? 'text-red-700 italic' : '', departTime >= 8 && departTime < 12 ? 'text-green-700' : '', departTime >= 12 && departTime < 18 ? 'text-orange-700' : '', departTime >= 18 ? 'text-gray-700' : '']">
                  {{ (departTime < 8 || departTime > 20) ? "I don't know my Departure time" : getFormattedDepartTime() }}
                </div>
              </template>
            </SliderTime>
          </div>

          <div class="text-center mt-10 mb-6">
            <button type="button" @click="onContinueDepartDialog()"
              class="animate-pulse hover:animate-none rounded-full bg-lime-200 px-8 py-2.5 text-sm font-semibold text-gray-900 shadow-sm border-[1px] border-gray-400 ring-4 ring-offset-2 ring-orange-700 hover:bg-gray-100">
              Continue
            </button>
          </div>

        </div>


      </div>
    </div>
  </Transition>

  <!-- Arrive Date input and Calendar.  -->
  <div id="arriveDateBox" v-if="flightDate"
    class="pb-8 md:pb-12 pl-12 md:pl-20 mx-auto  w-full sm:w-3/4 md:w-4/5 lg:w-1/2 xl:w-2/5 2xl:w-[30em]">

    <label for="arriveDateInput" class="italic text-lg md:text-xl inline pl-2 font-normal text-emerald-900">
      <svg class="w-6 h-6 inline-block mb-1 " xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"
        fill="currentColor">
        <path fill-rule="evenodd"
          d="M3.97 3.97a.75.75 0 011.06 0l13.72 13.72V8.25a.75.75 0 011.5 0V19.5a.75.75 0 01-.75.75H8.25a.75.75 0 010-1.5h9.44L3.97 5.03a.75.75 0 010-1.06z"
          clip-rule="evenodd" />
      </svg>

      <span class="font-bold ">
        Arriving in Zermatt:
      </span>

      <svg class="w-6 h-6 inline-block ml-2 mb-1 text-lime-600" :class="[!arriveDate ? 'hidden' : '']"
        xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor">
        <path fill-rule="evenodd"
          d="M2.25 12c0-5.385 4.365-9.75 9.75-9.75s9.75 4.365 9.75 9.75-4.365 9.75-9.75 9.75S2.25 17.385 2.25 12zm13.36-1.814a.75.75 0 10-1.22-.872l-3.236 4.53L9.53 12.22a.75.75 0 00-1.06 1.06l2.25 2.25a.75.75 0 001.14-.094l3.75-5.25z"
          clip-rule="evenodd" />
      </svg>
    </label>

    <div id="arriveDateInputBox" class="relative mt-3 pl-4">

      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor"
        class="absolute left-8 top-1   w-6 h-6 inline-block mb-1 text-emerald-900">
        <path stroke-linecap="round" stroke-linejoin="round"
          d="M6.75 3v2.25M17.25 3v2.25M3 18.75V7.5a2.25 2.25 0 012.25-2.25h13.5A2.25 2.25 0 0121 7.5v11.25m-18 0A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75m-18 0v-7.5A2.25 2.25 0 015.25 9h13.5A2.25 2.25 0 0121 11.25v7.5m-9-6h.008v.008H12v-.008zM12 15h.008v.008H12V15zm0 2.25h.008v.008H12v-.008zM9.75 15h.008v.008H9.75V15zm0 2.25h.008v.008H9.75v-.008zM7.5 15h.008v.008H7.5V15zm0 2.25h.008v.008H7.5v-.008zm6.75-4.5h.008v.008h-.008v-.008zm0 2.25h.008v.008h-.008V15zm0 2.25h.008v.008h-.008v-.008zm2.25-4.5h.008v.008H16.5v-.008zm0 2.25h.008v.008H16.5V15z" />
      </svg>

      <input type="input" name="arriveDateInput" id="arriveDateInput" :value="displayDate(arriveDate)" readonly
        @click="onArriveDateInputClick('arriveDateInput', $event)" placeholder="Please enter your Arrival Date..."
        :class="{ 'bg-indigo-50/50': arriveDate }"
        class="inline-block  rounded-md border-0 
          ml-2 py-2 pl-12 pr-2 
          w-72 sm:w-80
          overflow-clip
          cursor-pointer
        bg-gray-100
          text-gray-900 shadow-sm ring-1 ring-inset ring-gray-500 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-emerald-600 " />
    </div>

  </div>

  <!-- Depart Date input and Calendar.  -->
  <div id="departDateBox" v-if="arriveDate"
    class="mb-16 pb-8 md:pb-12 pl-12 md:pl-20 mx-auto  w-full sm:w-3/4 md:w-4/5 lg:w-1/2 xl:w-2/5 2xl:w-[30em]">

    <label for="departDateInput" class="italic text-lg md:text-xl inline pl-2 font-normal text-orange-700">
      <svg class="w-6 h-6 inline-block mb-1 " xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"
        stroke-width="1.5" stroke="currentColor">
        <path stroke-linecap="round" stroke-linejoin="round" d="M4.5 19.5l15-15m0 0H8.25m11.25 0v11.25" />
      </svg>


      <span class="font-bold ">
        Departing Zermatt:
      </span>

      <svg class="w-6 h-6 inline-block ml-2 mb-1 text-lime-600" :class="[!departDate ? 'hidden' : '']"
        xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor">
        <path fill-rule="evenodd"
          d="M2.25 12c0-5.385 4.365-9.75 9.75-9.75s9.75 4.365 9.75 9.75-4.365 9.75-9.75 9.75S2.25 17.385 2.25 12zm13.36-1.814a.75.75 0 10-1.22-.872l-3.236 4.53L9.53 12.22a.75.75 0 00-1.06 1.06l2.25 2.25a.75.75 0 001.14-.094l3.75-5.25z"
          clip-rule="evenodd" />
      </svg>
    </label>

    <div id="departDateInputBox" class="relative mt-3 pl-4">

      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor"
        class="absolute left-8 top-1   w-6 h-6 inline-block mb-1 text-orange-700">
        <path stroke-linecap="round" stroke-linejoin="round"
          d="M6.75 3v2.25M17.25 3v2.25M3 18.75V7.5a2.25 2.25 0 012.25-2.25h13.5A2.25 2.25 0 0121 7.5v11.25m-18 0A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75m-18 0v-7.5A2.25 2.25 0 015.25 9h13.5A2.25 2.25 0 0121 11.25v7.5m-9-6h.008v.008H12v-.008zM12 15h.008v.008H12V15zm0 2.25h.008v.008H12v-.008zM9.75 15h.008v.008H9.75V15zm0 2.25h.008v.008H9.75v-.008zM7.5 15h.008v.008H7.5V15zm0 2.25h.008v.008H7.5v-.008zm6.75-4.5h.008v.008h-.008v-.008zm0 2.25h.008v.008h-.008V15zm0 2.25h.008v.008h-.008v-.008zm2.25-4.5h.008v.008H16.5v-.008zm0 2.25h.008v.008H16.5V15z" />
      </svg>

      <input type="input" name="departDateInput" id="departDateInput" :value="displayDate(departDate)" readonly
        @click="onDepartDateInputClick('departDateInput', $event)" placeholder="Please enter your Departure date..."
        :class="{ 'bg-indigo-50/50': departDate }"
        class="inline-block  rounded-md border-0 
          ml-2 py-2 pl-12 pr-2 
          w-72 sm:w-80
          overflow-clip
          cursor-pointer
          bg-gray-100
          text-gray-900 shadow-sm ring-1 ring-inset ring-gray-500 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-orange-600 " />

    </div>

    <div v-if="!isNaN(getLengthStayInZermatt())" class="text-gray-700 text-sm  mt-4 pl-11">
      You are staying
      <span class="bg-yellow-200 text-orange-800 px-1 py-0.5 font-bold">
        {{ getLengthStayInZermatt() }}
      </span>
      {{ getLengthStayInZermatt() === 1 ? 'day' : 'days' }} in Zermatt.
    </div>

    <div class="flex text-sm  mt-8 -ml-2">
      <svg class="w-6 h-6 inline-block relative -top-0.5  text-justify-center-600" viewBox="0 0 24 24" fill="currentColor">
        <path
          d="M9.97308 18H14.0269C14.1589 16.7984 14.7721 15.8065 15.7676 14.7226C15.8797 14.6006 16.5988 13.8564 16.6841 13.7501C17.5318 12.6931 18 11.385 18 10C18 6.68629 15.3137 4 12 4C8.68629 4 6 6.68629 6 10C6 11.3843 6.46774 12.6917 7.31462 13.7484C7.40004 13.855 8.12081 14.6012 8.23154 14.7218C9.22766 15.8064 9.84103 16.7984 9.97308 18ZM14 20H10V21H14V20ZM5.75395 14.9992C4.65645 13.6297 4 11.8915 4 10C4 5.58172 7.58172 2 12 2C16.4183 2 20 5.58172 20 10C20 11.8925 19.3428 13.6315 18.2443 15.0014C17.624 15.7748 16 17 16 18.5V21C16 22.1046 15.1046 23 14 23H10C8.89543 23 8 22.1046 8 21V18.5C8 17 6.37458 15.7736 5.75395 14.9992ZM13 10.0048H15.5L11 16.0048V12.0048H8.5L13 6V10.0048Z">
        </path>
      </svg>
      <span class="pl-1 pr-2">
        TIP: It's easy to adjust your dates here if needed.
      </span>
    </div>


  </div>


  <div ref="bottomOfPage"></div>

</template>




<script>
// Parent component for all "Pages"
import _Page from './_Page.vue'
import { ref, toRaw } from 'vue'

// Store
import { datesStore } from '@stores/pageDateStore.js'

// Calendar Utils.
import { calendarUtils as calUtils } from './calendarUtils.js'
import { parseISO, addDays, format, isBefore } from 'date-fns';

// Components
import VueDatePicker from '@vuepic/vue-datepicker'
import '@vuepic/vue-datepicker/dist/main.css'
import SliderTime from '@components/SliderTime.vue'


export default {
  name: 'PageDate',
  stepperName: 'Dates',

  extends: _Page,   // Parent class handles the valid page event emitting back to the App Shell.
  emits: ['pagevalid'], // Parent class - needs to be here too... _Page.vue

  components: {
    VueDatePicker,
    SliderTime
  },


  data() {
    return {


      // Flight Date
      flightDate: datesStore.getFlightDate(),    // get from Store.
      flightCal: null,
      // showFlightDatePicker: true,

      // Arrive Date
      arriveDate: datesStore.getArriveDate(),    // get from Store.
      arriveCal: null,
      arrivalTime: datesStore.getArriveTime(),    // get from Store.
      showArriveDatePicker: false,

      // Depart Date
      departDate: datesStore.getDepartDate(),    // get from Store.
      departCal: null,
      departTime: datesStore.getDepartTime(),     // get from Store.
      showDepartDatePicker: false,

      daysInZermatt: 0,
    };
  },

  updated() {
    console.log("Page-Date Updated: ", this.valid() ? 'valid page' : 'Not valid page')
  },

  mounted() {
    console.log("Page-Date Mounted: ", this.valid() ? 'valid page' : 'Not valid page')
  },
  // unmounted() {
  //   //console.log("-> Date component unmounted")
  //   window.removeEventListener('click', this.onBackgroundClick)
  // },

  computed: {



    //   var tmp = ref(hiliteArray)
    //   console.log('-> hiliteArray: ', tmp)
    //   return tmp

    //   // return ref([
    //   //   addDays(new Date(), 1),
    //   //   addDays(new Date(), 2),
    //   //   addDays(new Date(), 3),
    //   // ])
    // },

// TODO: remove this - use valid() method instead.
    /**
     * This computed value is requried by the base '_Page' class.
     * It is tightly coupled, but lets the base handle all event
     * work for all child Pages in the same manner.
     */
    _isPageValid() {
      console.log("Date._isPageValid() is deprecated")
      return datesStore.isPageValid()
    },


  }, // computed


  methods: {

    /**
     * This method must be overrided in each of these Page components.
     * A new attempt at sorting out the current messy navigation system.
     */
    valid() {
      // Overriden from the base '_Page' class.
      // console.log('-> Date.vue: valid()')

      let result = true

      // -> Flight Date checks.
      if (this.flightDate === '') result = false

      // date-fns update
      if (isBefore(new Date(this.flightDate), new Date(new Date().toDateString()))) {  // toDateString() kills time and Timezone.
        result = false
      }

      // Arrive Date checks.
      if (this.arriveDate === '') result = false

      // Depart Date checks.
      if (this.departDate === '') result = false

      return result

    },



    getFormattedArrivalDate() {
      if (this.arriveDate === null) return
      return format(new Date(this.arriveDate), 'EEEE, MMMM do,	yyyy')
    },
    getFormattedDepartDate() {
      if (this.arriveDate === null) return
      return format(new Date(this.departDate), 'EEEE, MMMM do,	yyyy')
    },

    // Displays selected Time and hint below the Arrive / Depart Time sliders.
    getFormattedArrialTime() {
      return this._formatTime(this.arrivalTime)
    },

    getFormattedDepartTime() {
      return this._formatTime(this.departTime)
    },

    _formatTime(compareTime) {
      var formattedTime = compareTime
      var morningAfternoon = ""

      compareTime = compareTime
      if (compareTime == 12) {
        morningAfternoon = " (Noon)"
      } else if (compareTime < 12) {
        morningAfternoon = " (Morning)"
      } else if (compareTime < 18) {
        morningAfternoon = " (Afternoon)"
      } else {
        morningAfternoon = " (Evening)"
      }

      if (Number.isInteger(compareTime)) {
        if (compareTime < 10) formattedTime = '0' + compareTime
        return formattedTime + ':00' + morningAfternoon
      }

      formattedTime = Math.floor(compareTime)
      if (compareTime < 10) formattedTime = '0' + formattedTime
      return formattedTime + ':30' + morningAfternoon
    },



    getLengthStayInZermatt() {
      var arrTime = new Date(datesStore.getArriveDate())
      var depTime = new Date(datesStore.getDepartDate())
      return ((depTime - arrTime) / 86_400_000) + 1
    },

    highlightedDates() {
      var arrTime = new Date(datesStore.getArriveDate())
      var depTime = new Date(datesStore.getDepartDate())
      var days = ((depTime - arrTime) / 86_400_000) + 1
      var hiliteArray = []
      for (let i = 0; i < days; i++) {
        // console.log('-> i: ', i)
        hiliteArray.push(addDays(arrTime, i))
      }
      return hiliteArray
    },

    scrollToElement() {
      setTimeout(() => {
        this.$refs.bottomOfPage?.scrollIntoView({ behavior: 'smooth' });
      }, "100")
    },

    onDateSelect(modelData) {
      //console.log("modelData", modelData)
      this.flightDate = modelData
      datesStore.setFlightDate(modelData)    // set in Store.
      // Reset Arrive & Depart.
      this.arriveDate = ''
      datesStore.setArriveDate('')
      this.departDateDate = ''
      datesStore.setDepartDate('')
      // Hide Calendar.
      // this.showFlightDatePicker = false

      // Automatically show the 'Arrival Date' pop up calendar.
      setTimeout(() => {
        this.showArriveDatePicker = true
      }, "50")

    },

    // onDateInputClick(el, ev) {
    //   // this.showFlightDatePicker = true
    //   ev.stopPropagation()
    // },

    onContinueArriveDialog() {
      this.showArriveDatePicker = false

      // Save the Arrival Time
      datesStore.setArriveTime(this.arrivalTime)    // set in Store.

      // IF there is no Depart Date, or it's now invaild, then show the 'Depart Date' pop up calendar.
      if (!this.departDate || this.departDate === '') {
        setTimeout(() => {
          this.showDepartDatePicker = true
        }, "50");
      }
    },

    onContinueDepartDialog() {
      this.showDepartDatePicker = false
      // Save the Arrival Time
      datesStore.setDepartTime(this.departTime)    // set in Store.
    },

    onArriveDateSelect(modelData) {
      //console.log('modelData:', modelData)
      this.arriveDate = modelData
      datesStore.setArriveDate(modelData)    // set in Store.
    },
    onArriveDateInputClick(el, ev) {
      // console.log('clicked', el, ev)
      // Arrive Date
      this.showArriveDatePicker = true
      ev.stopPropagation()
    },

    onDepartDateSelect(modelData) {
      this.departDate = modelData
      datesStore.setDepartDate(modelData)    // set in Store.
      //this.showDepartDatePicker = false

      this.scrollToElement()

    },
    onDepartDateInputClick(el, ev) {
      // console.log('clicked', el, ev)
      // Depart Date
      this.showDepartDatePicker = true
      ev.stopPropagation()

    },


    displayDate(whichDateStr) {
      if (whichDateStr === null || whichDateStr === '') return ''
      //console.log('-> displayDate(): ', whichDateStr)
      const myDate = new Date(whichDateStr)
      const YYYY = myDate.getFullYear()
      const d = myDate.getDay()   // (0-6) Sunday - Saturday
      const DD = myDate.getDate() // (1-31)
      const mm = myDate.getMonth()
      return (calUtils.getDayString(d) + ' - ' + calUtils.getMonthString(mm) + ' ' + DD + calUtils.getLocalizedDayPostfix(DD) + ', ' + YYYY)
    },


    onBackgroundClick: function (event) {
      // close Calendar pickers on outside click.
      // this.showFlightDatePicker = false
      // this.showArriveDatePicker = false
      // this.showDepartDatePicker = false
    },

    // Only allow date picking to today + 9 months
    getMaxFutureDate() {
      const monthOffset = 9
      const today = new Date()
      return new Date(today.setMonth(today.getMonth() + monthOffset))
    },

    // Arrive Date must be <= flightDate
    getMinArriveDate() {
      const noOfDays = -7        // 2 weeks in the past.
      let minDate = new Date(Date.parse(this.flightDate))
      //console.log('-> minDate(): ', this.flightDate)
      minDate.setTime(minDate.getTime() + (noOfDays * (1000 * 60 * 60 * 24)));
      return minDate.toDateString()
    },
    getMaxArriveDate() {
      return new Date(this.flightDate).toDateString()
    },


    // Depart Date must be >= today
    getMinDepartDate() {
      // console.log('-> minDepartDate(): ', new Date(this.flightDate).toDateString())
      return new Date(this.flightDate).toDateString()
    },
    getMaxDepartDate() {
      const daysOffset = 14
      const flightDate = new Date(this.flightDate)
      // console.log('-> flightDate(): ', flightDate)
      flightDate.setDate(flightDate.getDate() + daysOffset)
      //console.log('-> after: ', flightDate)
      return flightDate.toDateString()
    },


    getFlightDateMakerObj() {
      const markers = [{
        date: new Date(this.flightDate),
        type: 'line',
        color: 'green',
        tooltip: [
          { text: 'Your Flight', color: 'green' },
        ],
      }]
      return markers
    },

  } // methods.



}
</script>


<!-- Add "scoped" attribute to limit CSS to this component only -->
<style>
:root {
  /*General*/
  --dp-font-family: -apple-system, blinkmacsystemfont, "Segoe UI", roboto, oxygen, ubuntu, cantarell, "Open Sans",
    "Helvetica Neue", sans-serif;
  --dp-border-radius: 4px;
  /*Configurable border-radius*/
  --dp-cell-border-radius: 4px;
  /*Specific border radius for the calendar cell*/
  --dp-common-transition: all 0.1s ease-in;
  /*Generic transition applied on buttons and calendar cells*/

  /*Sizing*/
  --dp-button-height: 35px;
  /*Size for buttons in overlays*/
  --dp-month-year-row-height: 35px;
  /*Height of the month-year select row*/
  --dp-month-year-row-button-size: 35px;
  /*Specific height for the next/previous buttons*/
  --dp-button-icon-height: 20px;
  /*Icon sizing in buttons*/
  --dp-cell-size: 35px;
  /*Width and height of calendar cell*/
  --dp-cell-padding: 5px;
  /*Padding in the cell*/
  --dp-common-padding: 10px;
  /*Common padding used*/
  --dp-input-icon-padding: 35px;
  /*Padding on the left side of the input if icon is present*/
  --dp-input-padding: 6px 30px 6px 12px;
  /*Padding in the input*/
  --dp-menu-min-width: 350px;
  /*Adjust the min width of the menu*/
  --dp-action-buttons-padding: 2px 5px;
  /*Adjust padding for the action buttons in action row*/
  --dp-row-margin: 5px 0;
  /*Adjust the spacing between rows in the calendar*/
  --dp-calendar-header-cell-padding: 0.5rem;
  /*Adjust padding in calendar header cells*/
  --dp-two-calendars-spacing: 10px;
  /*Space between multiple calendars*/
  --dp-overlay-col-padding: 3px;
  /*Padding in the overlay column*/
  --dp-time-inc-dec-button-size: 32px;
  /*Sizing for arrow buttons in the time picker*/
  --dp-menu-padding: 6px 8px;
  /*Menu padding*/

  /*Font sizes*/
  --dp-font-size: 1rem;
  /*Default font-size*/
  --dp-preview-font-size: 0.8rem;
  /*Font size of the date preview in the action row*/
  --dp-time-font-size: 0.8rem;
  /*Font size in the time picker*/

  /*Transitions*/
  --dp-animation-duration: 0.1s;
  /*Transition duration*/
  --dp-menu-appear-transition-timing: cubic-bezier(.4, 0, 1, 1);
  /*Timing on menu appear animation*/
  --dp-transition-timing: ease-out;
  /*Timing on slide animations*/

}


/* Custom Calendar tweaks */

/* Changing the colors and font weights of each day in calendar   rgb(167 243 208) */

.dp__today:after {
    content: 'TODAY';
    position: absolute;
    bottom: -0.9em;
    font-size: 0.7em;
    color: var(--dp-primary-color);
    background-color: white;
    padding-right: 3px;
    padding-left: 3px;
}

/**
* Looking to show the start date hilite colour to match the Arriving in Zermatt scheme.
*/

.dp__cell_highlight~.dp__cell_highlight {
  background-color: #f7fee7;
  border-bottom: 2px solid rgb(39, 117, 3);
}



.dp__active_date {
  color: white;
  background-color: rgba(76, 187, 23, 1);
  border: 1px solid rgb(34, 99, 4);
  border-radius: 5px;
  box-shadow: 0 0 7px rgba(0, 0, 0, 0.5);
  text-shadow: 0 0 4px rgb(34, 99, 4);
}

.dpMenuArrive {
  border: 1px solid rgba(76, 187, 23, 1);
  border-radius: 5px;
}

.dpMenuDepart {
  border: 1px solid rgba(231, 98, 0, 1);
  border-radius: 5px;
}

.dp__cell_inner {
  font-weight: bold;
}

.dp__cell_offset {
  font-weight: normal;
  color: rgba(0, 0, 0, 0.5);
}


/* Center the calendar display  */
.dp__flex_display {
  justify-content: center;
}


.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.2s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
</style>@src/components/Stepper.vue