<template>

  <div 
    class="pb-0 px-1 pt-1"
    :class="`timeSlot_${slideIndex}`"
  >

    <!-- Header Box.  -->
    <div
      class="time_slot_header py-1 shadow bg-white border-black/30 border-2 rounded-md text-center font-black"
      :class="   isSlideSelected ? 'text-lg ring-2 ring-black ring-inset' : ''   "
    >
      {{date}} 
        <span 
          v-if="isFlightSlide"
          class="italic text-black/40"
        > 
          FlightDate
        </span>
      <!-- {{isSlideSelected ? 'true' : 'false'}}    -->

      <span 
        v-if="isSlideSelected"
        class="font-thin italic text-sm"
      >
        <br/>Choose which time below.
      </span>
    </div><!-- END: Header Box.  -->


    <!-- Slot Box.  -->
    <ul role="list" class="space-y-1 py-1">
      <li 
        v-for="(pilots, timeHint, index) in dayObject" :key="pilots.id" 
        class=" bg-none px-4 py-4 shadow rounded-md sm:px-6 relative"
        :class="[ (pilots > 0) ? 'cursor-pointer' : '',   isSlideSelected ? 'z-[3]' : '' ]"

        @click="onSlotClick(ev, index, pilots)"
      >
        <!-- Pilots: -1 means the flight isn't available at that time.  -->
        <span v-if="(pilots == 0)" class="text-orange-700">
          {{ timeHint }} :: Fully Booked
        </span>
        <span v-if="(pilots > 0)">
          {{ timeHint }} :: {{ pilots }} places free
        </span>
        <span 
          v-if="(pilots == -1)"
          class="italic text-black/40"
        >
          {{ timeHint }} :: Flight not available
        </span>

        <!-- Slot Details Box. -->
        <span 
          v-if="isSlideSelected && selectedSlot == index && (pilots > 0)"
          class="w-full top-[57px] left-0 z-[10]  p-0 block "
        >
          <!-- Details Box {{ selectedSlot }} -->
          <button class="rounded-full bg-amber-500">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" class="w-12 h-12">
              <path fill-rule="evenodd" d="M12 2.25c-5.385 0-9.75 4.365-9.75 9.75s4.365 9.75 9.75 9.75 9.75-4.365 9.75-9.75S17.385 2.25 12 2.25zm3 10.5a.75.75 0 000-1.5H9a.75.75 0 000 1.5h6z" clip-rule="evenodd" />
            </svg>
          </button>
          <button class="text-2xl rounded-full bg-amber-500">
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
  import { ref, computed, watch, onMounted, onUnmounted } from 'vue'

  // ----------- Props ------------
  const props = defineProps({
    date: [String],
    dayObject: [Object],
    slideIndex: [Number],
    selectedSlide: [Number],
    flightDate: [String]
  })


  const selectedSlot = ref(-1)

  // const isSlotSelected = computed(() => {
  //   //console.log(props.flightDate)
  //   return (props.slideIndex) === props.selectedSlide
  // })

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
    console.log("onSlotClick slotNr: pilots: ", slotNr, slotPilots)
    // 2) Open "Add Passengers" drawer

  }


  // onMounted(() => {
  //   console.log('onMounted', props.slideIndex, isSlideSelected.value)
  // })

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
