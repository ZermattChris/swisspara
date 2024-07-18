<template>

  <div 
    class="px-2 py-1.5 rounded-lg "
    :class="[ `timeSlot_${slideIndex}`, isSlideSelected? ' border-2 border-black/50 bg-black/10' : 'border-[1px] border-indigo-100' ]"
  >

    <!-- Header Box.  -->
    <div
      class="time_slot_header py-1 text-xl  rounded-md text-center font-black   border-black/30 border-2"
      :class=" [isSlideSelected ? ' ring-2 ring-black ' : '',  isFlightSlide ? 'bg-amber-500 ' : 'bg-black/70 text-white'  ] "
    >

      <span 
        :class="isSlideSelected ? 'text-3xl' : ''"
      > 
        {{ formatHeaderDay }}
      </span>

      <span 
          v-if="isFlightSlide"
          class="absolute  right-2 rotate-45"
          :class="isSlideSelected ? 'top-2' : 'top-5'"
        > 
          <svg 
            class="fill-white drop-shadow-md"
            xmlns="http://www.w3.org/2000/svg" height="48" width="48" viewBox="0 -960 960 960" 
          >
            <path d="M350-80v-42l80-60v-251L80-330v-58l350-206v-236q0-21 14.5-35.5T480-880q21 0 35.5 14.5T530-830v236l350 206v58L530-433v251l80 60v42l-130-37-130 37Z"/>
          </svg>


      </span>

      <span 
        class="font-normal inline-block w-full text-lg "
      >
        {{ formatHeaderDate }}
        <!-- <br/>({{ totalSlotPassengers }})
        Choose which time below. -->
      </span>
    </div><!-- END: Header Box.  -->


    <!-- Slot Box.  -->
    <ul role="list" class="space-y-1 py-1 ">
      <li 
        v-for="(pilots, timeHint, index) in dayObject" :key="pilots.id" 
        class="bg-white px-4 py-4 shadow rounded-md sm:px-6 relative"
        :class="[ (pilots > 0) ? 'cursor-pointer shadow-md' : '',   isSlideSelected ? 'z-[3]' : '' ]"

        @click="onSlotClick(ev, index, pilots)"
      >

        <!-- Pill showing Slot's Nr Passengers if greater than Zero  -->
        <span 
          v-if="(pilots > 0 && isFlightSlide && slotsCurrPassengerCount(timeHint) > 0 )" 
          class="absolute -right-6 top-2.5 z-50 "
        >
          <button :id="`nrPassPill_${slideIndex}_${index}`" 
            class="rounded-full font-black text-xl  bg-white shadow-md shadow-black/50   h-11 w-11    border-amber-500 border-4 "
            @click="onAddPassenger(selectedSlot, timeHint)"
          >
            {{ slotsCurrPassengerCount(timeHint) }}
          </button>
        </span>


        <!-- Pilots: -1 means the flight isn't available at that time.  -->
        <span v-if="(pilots == 0)" class="text-orange-700 italic">
          {{ timeHint }} :: Fully Booked
        </span>

        <!-- Flight Available. Show Time hint and Places Free.  -->
        <span 
          v-if="(pilots > 0)" 
        >
          
          <svg class="w-6 h-6 inline-block" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" >
            <path stroke-linecap="round" stroke-linejoin="round" d="M12 6v6h4.5m4.5 0a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>


          <span 
            v-if="(pilots > 0)" 
            :class="(slotsCurrPassengerCount(timeHint) > 0) ? '' : ''"
          >
            {{ timeHint }}
          </span>

          <button 
            class="rounded-full  px-4 h-8 ml-3  text-md  font-black bg-white  outline outline-offset-2  "
            :class="[
              (slotsCurrPassengerCount(timeHint) > 0) ? 'outline-amber-500' : 'outline-black/30', 
              (pilots - slotsCurrPassengerCount(timeHint) == 0) ? 'text-black/60' : '', 
            ]"
          >
             {{ pilots - slotsCurrPassengerCount(timeHint) }} places free 
          </button>


        </span>

        <!-- Flight Not Available for this slot.  -->
        <span 
          v-if="(pilots == -1)"
          class="italic text-black/60"
        >
          {{ timeHint }} :: Flight not available
        </span>



        <!-- Slot Details Box. -->
        <span 
          v-if="isSlideSelected && selectedSlot == index && (pilots > 0)"
          class="flex items-center justify-between w-full top-[57px] left-0 z-[10]  p-0 pt-2  "
        >
          <!-- Details Box {{ selectedSlot }} -->
          <button 
            :id="`minusBtn_${slideIndex}_${index}`" 
            class="rounded-full bg-amber-500 shadow-md shadow-black/50"
            :class="slotsCurrPassengerCount(timeHint) > 0 ? '' : 'cursor-default shadow-none opacity-50'"
            @click="onRemovePassenger(selectedSlot, timeHint)"
          >
            <svg 
              class="w-12 h-12"
              xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" 
            >
              <path fill-rule="evenodd" d="M12 2.25c-5.385 0-9.75 4.365-9.75 9.75s4.365 9.75 9.75 9.75 9.75-4.365 9.75-9.75S17.385 2.25 12 2.25zm3 10.5a.75.75 0 000-1.5H9a.75.75 0 000 1.5h6z" clip-rule="evenodd" />
            </svg>
          </button>
          {{ slotsCurrPassengerCount(timeHint) }} Passengers
          <button :id="`plusBtn_${slideIndex}_${index}`" 
            class="rounded-full bg-amber-500 shadow-md shadow-black/50"
            :class="slotsCurrPassengerCount(timeHint) < slotsMaxPassengerCount(timeHint) ? '' : 'cursor-default shadow-none opacity-50'"
            @click="onAddPassenger(selectedSlot, timeHint)"
          >
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" class="w-12 h-12">
              <path fill-rule="evenodd" d="M12 2.25c-5.385 0-9.75 4.365-9.75 9.75s4.365 9.75 9.75 9.75 9.75-4.365 9.75-9.75S17.385 2.25 12 2.25zM12.75 9a.75.75 0 00-1.5 0v2.25H9a.75.75 0 000 1.5h2.25V15a.75.75 0 001.5 0v-2.25H15a.75.75 0 000-1.5h-2.25V9z" clip-rule="evenodd" />
            </svg>
          </button>
        </span>


      </li>
    </ul> <!-- END: Slot Box.  -->

   

  </div>


</template>

<script setup>
  import { ref, reactive, computed, watch, onMounted, onUnmounted, toRaw, onUpdated } from 'vue'
  
	import {datesStore as datesStore} from '@stores/pageDateStore.js' 
	import {pageTimeSlotsStore as timeSlotStore} from '@stores/pageTimeSlotsStore.js' 

	// Calendar Utils.
	import {calendarUtils as calUtils} from '@components/booking/calendarUtils.js'


  // ----------- Props ------------
  const props = defineProps({
    date: [String],
    dayObject: [Object],
    slideIndex: [Number],
    selectedSlide: [Number],
    flightDate: [String]
  })

  // ----------- Events ------------
  const emit = defineEmits(['passengersUpdated', 'pagevalid'])

  const selectedSlot = ref(-1)

  let nrPassengersList = reactive({})   // Keeps track of how many passengers have been added to each timeslot.

  
  onMounted(() => {

    // Create a 'copy' of the dayObject and use it to track how many passengers
    // have been added to a given time slot. Zero out the original 'pilots' as 
    // they're now holding nr of Passengers.
    // --> Use the cached data if available for the FD, otherwise create a dayObject copy to 
    //     start off with (and save it)
    
    if (isFlightSlide.value) {
      if ( Object.keys(timeSlotStore.getTimeSlotsPassengersList()).length === 0 ) {
        //console.log("No cached passengers in Slot list")
        Object.assign(nrPassengersList, props.dayObject)    // copy incoming dayObject.
        clearAllPassengers()
        timeSlotStore.setTimeSlotsPassengersList(nrPassengersList)    // save to cache.
      } else {
        nrPassengersList = timeSlotStore.getTimeSlotsPassengersList()
        //console.log("-> Cached passengers in Slot list", nrPassengersList)
      }
    } else {
      //console.log("NOT Flight Slide. Just copying dayObj to passengers list...")
      Object.assign(nrPassengersList, props.dayObject)    // copy incoming dayObject.
      clearAllPassengers()
    }

  })



  function clearAllPassengers() {
    for (const slotTime in nrPassengersList) {
      nrPassengersList[slotTime] = 0
    }
    //console.log("CLEARED nrPassengersList", nrPassengersList)
  }



  onUpdated( () => {
    // Had lots of issues figuring out that events do NOT bubble upwards
    // past the immediate Parent of the object calling the event.
    // Used manual event upwards passing to sort this, as it kept the 
    // Page validation mechanism cleaner than injecting some sort of
    // 'flag' into the appStore. Ugly, but works (wish there was a bubble=true option)
    emit( 'pagevalid', 'TimeSlot', timeSlotStore.isPageValid() )        // sends event back to 'App'
  })


  function onAddPassenger(slotNr, timeHint) {
    // console.log("onAddPassenger. timeHint:", timeHint )
    const availPassengers = slotsMaxPassengerCount(timeHint)
    const slotsPassengers = nrPassengersList[timeHint]
    // // Guard against adding too many passengers.
    if ( (slotsPassengers + 1) <= availPassengers ) {
      nrPassengersList[timeHint] = slotsPassengers + 1
      emit( 'passengersUpdated', totalSlotPassengers )    // let Time know Passenger total has changed.
      // Make this the current Flight Date (FD)
      datesStore.setFlightDate( new Date( Date.parse(props.date) ) )
      timeSlotStore.setTimeSlotsPassengersList(nrPassengersList)    // save to cache.
    }

  }

  function onRemovePassenger(slotNr, timeHint) {
    // console.log("onRemovePassenger. timeHint:", timeHint )
    const slotsPassengers = nrPassengersList[timeHint]
    // // Guard against adding too many passengers.
    if ( (slotsPassengers - 1) >= 0 ) {
      nrPassengersList[timeHint] = slotsPassengers - 1
      emit( 'passengersUpdated', totalSlotPassengers )    // let Time know Passenger total has changed.
      timeSlotStore.setTimeSlotsPassengersList(nrPassengersList)    // save to cache.
    }
  }


  function slotsCurrPassengerCount(timeHint) {
    return nrPassengersList[timeHint]
  }
  function slotsMaxPassengerCount(timeHint) {
    return props.dayObject[timeHint]
  }


  const totalSlotPassengers = computed(() => {
    let total = 0
    for (const slotTime in nrPassengersList) {
      total += nrPassengersList[slotTime]
    }
		// console.log("nrPassengersList: ", nrPassengersList)
    return total
  })
  // Let the Time parent know that the total number of passengers has changed.
  // watch(totalSlotPassengers, function(newPassengersTotal) {
  //     // console.log('Watching totalSlotPassengers:', newPassengersTotal )
  //     emit( 'passengersUpdated', newPassengersTotal )
  // })


  const formatHeaderDay = computed(() => {
    const headerDate = new Date( Date.parse(props.date) )
    //console.log("headerDate", headerDate)
    const dayInt = headerDate.getDay()
    return calUtils.getDayString(dayInt)
  })

  const formatHeaderDate = computed(() => {
    const headerDate = new Date( Date.parse(props.date) )
    //console.log("headerDate", headerDate)
    const day = headerDate.getDate()
    const dayInt = headerDate.getDay()
    const dayName = calUtils.getDayString(dayInt)
    // const dayTh = calUtils.getLocalizedDayPostfix(dayInt)
    const monthInt = headerDate.getMonth()
    const monthName = calUtils.getMonthString(monthInt)
    const year = headerDate.getFullYear()
    // console.log("headerDate", dayInt, dayName, monthName)
    return `${monthName} ${day}, ${year}`
  })

  const isSlideSelected = computed(() => {
    //console.log(props.flightDate)
    return props.slideIndex === props.selectedSlide
  })
  
  const isFlightSlide = computed(() => {
    //console.log("isFlightSlide", props.flightDate)
    return props.date === datesStore.getFlightDate()
  })
  // Let other slides know that we're in charge now (so they can clear their passengers lists)
  watch(isFlightSlide, function(isFlSlide) {
    if (isFlSlide === false) {
      //console.log('Watching isFlightSlide:', datesStore.getFlightDate() )
      clearAllPassengers()
      selectedSlot.value = -1   // collapses any open add/remove passenger drawers if not FD
    }
  })



  function onSlotClick(ev, slotNr, slotPilots) {
    //console.log("onSlotClick", ev)
    // 1) Check if slot has pilots
    if (slotPilots == -1) return
    selectedSlot.value = slotNr
    //console.log("onSlotClick slotNr: pilots: ", slotNr, slotPilots)

    // Need to enable | disable the add | remove buttons, depending on how 
    // many passengers are selected/available.


  }


	

  defineExpose({
    onMounted,
    onUnmounted,
    onSlotClick,
    selectedSlot,
  })


</script>

<style scoped>

  .headerSelected {
    background-color: var(--booking-hilite);
    color: white;
  }


</style>
