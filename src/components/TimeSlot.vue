<template>

  <div 
    class="px-2 py-1.5 rounded-lg "
    :class="[ `timeSlot_${slideIndex}`, isSlideSelected? ' border-2 border-black/50 bg-black/5' : '' ]"
  >

    <!-- Header Box.  -->
    <div
      class="time_slot_header py-1 shadow bg-white border-black/30 border-2 rounded-md text-center font-black"
      :class="   isSlideSelected ? 'text-lg ring-2 ring-black ring-inset' : ''   "
    >
      {{date}} 
        <span 
          v-if="isFlightSlide"
          class="italic text-orange-700"
        > 
          FD 
        </span>
      <!-- {{isSlideSelected ? 'true' : 'false'}}    -->

      <span 
        v-if="isSlideSelected"
        class="font-thin italic text-sm"
      >
        ({{ totalSlotPassengers }})
        <br/>Choose which time below.
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
          v-if="(pilots > 0 && isSlideSelected && slotsCurrPassengerCount(timeHint) > 0 )" 
          class="absolute -right-6 top-1 z-50 "
        >
          <button id="plusBtn" 
            class="rounded-full font-black text-xl  bg-amber-500  shadow-black/50   h-12 w-12    outline outline-offset-2 outline-amber-500 "
            @click="onAddPilot(selectedSlot, timeHint)"
          >
            {{ slotsCurrPassengerCount(timeHint) }}
          </button>
        </span>


        <!-- Pilots: -1 means the flight isn't available at that time.  -->
        <span v-if="(pilots == 0)" class="text-orange-700 italic">
          {{ timeHint }} :: Fully Booked
        </span>
        <span 
          v-if="(pilots > 0)" 
          :class="(slotsCurrPassengerCount(timeHint) > 0) ? 'font-black' : ''"
        >
          
          <svg class="w-6 h-6 inline-block" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" >
            <path stroke-linecap="round" stroke-linejoin="round" d="M12 6v6h4.5m4.5 0a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>

          {{ timeHint }}

          <button id="plusBtn" 
            class="rounded-full  px-4 h-8 ml-3 font-black text-md  bg-white  outline outline-offset-2 outline-amber-500 "
          >
             {{ pilots - slotsCurrPassengerCount(timeHint) }} places free 
          </button>


        </span>
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
          <button id="minusBtn" 
            class="rounded-full bg-amber-500 shadow-md shadow-black/50"
            @click="onRemovePilot(selectedSlot, timeHint)"
          >
            <svg 
              class="w-12 h-12"
              xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" 
            >
              <path fill-rule="evenodd" d="M12 2.25c-5.385 0-9.75 4.365-9.75 9.75s4.365 9.75 9.75 9.75 9.75-4.365 9.75-9.75S17.385 2.25 12 2.25zm3 10.5a.75.75 0 000-1.5H9a.75.75 0 000 1.5h6z" clip-rule="evenodd" />
            </svg>
          </button>
          {{ slotsCurrPassengerCount(timeHint) }} Passengers
          <button id="plusBtn" 
            class="rounded-full bg-amber-500 shadow-md shadow-black/50"
            @click="onAddPilot(selectedSlot, timeHint)"
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
  import { ref, reactive, computed, watch, onMounted, onUnmounted, toRaw } from 'vue'

  // ----------- Props ------------
  const props = defineProps({
    date: [String],
    dayObject: [Object],
    slideIndex: [Number],
    selectedSlide: [Number],
    flightDate: [String]
  })


  const selectedSlot = ref(-1)

  const nrPassengersList = reactive({})   // Keeps track of how many passengers have been added to each timeslot.


  function onAddPilot(slotNr, timeHint) {
    // console.log("onAddPilot. timeHint:", timeHint )

    const availPassengers = slotsMaxPassengerCount(timeHint)
    //console.log("nrPassengers:", availPassengers )
    const slotsPassengers = nrPassengersList[timeHint]
    //console.log("slotsPassengers:", slotsPassengers )

    // // Guard against adding too many passengers.
    if ( (slotsPassengers + 1) <= availPassengers ) {
      nrPassengersList[timeHint] = slotsPassengers + 1
    }
    //console.log("Slot's Passengers", timeHint, nrPassengersList[timeHint] )

  }

  function onRemovePilot(slotNr, timeHint) {
    // console.log("onRemovePilot. timeHint:", timeHint )

    // const availPassengers = slotsMaxPassengerCount(timeHint)
    const slotsPassengers = nrPassengersList[timeHint]
    //console.log("slotsPassengers:", slotsPassengers )

    // // Guard against adding too many passengers.
    if ( (slotsPassengers - 1) >= 0 ) {
      nrPassengersList[timeHint] = slotsPassengers - 1
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
    return total
  })



  const isSlideSelected = computed(() => {
    //console.log(props.flightDate)
    return (props.slideIndex) === props.selectedSlide
  })
  
  const isFlightSlide = computed(() => {
    //console.log("isFlightSlide", props.date === props.flightDate)
    return props.date === props.flightDate
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



  function clearAllPassengers() {
    for (const slotTime in nrPassengersList) {
      nrPassengersList[slotTime] = 0
    }
    // console.log("nrPassengersList", nrPassengersList)
  }

  onMounted(() => {

    // Create a 'copy' of the dayObject and use it to track how many passengers
    // have been added to a given time slot. Zero out the original 'pilots' as 
    // they're now holding nr of Passengers.
    Object.assign(nrPassengersList, props.dayObject)
    clearAllPassengers()

  })

  // onUnmounted(() => {
  //   console.log('onUnmounted', props.slideIndex, isSlideSelected.value)
  // })

  // function makeDialogModal(e) {

  // }

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