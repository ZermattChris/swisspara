<template>

  <div 
    class="pb-0 px-1 pt-1"
    :class="`timeSlot_${slideIndex}`"
  >

    <div
      class="time_slot_header py-1 shadow bg-white border-black/30 border-2 rounded-md text-center font-black"
      :class="   isSlideSelected ? 'text-lg ring-2 ring-black ring-inset' : ''   "
    >
      {{date}}  ({{ isFlightSlide }})
      <!-- {{isSlideSelected ? 'true' : 'false'}}   border-[calc(var(--booking-hilite))]/100  -->

      <span 
        v-if="isSlideSelected"
        class="font-thin italic text-sm"
      >
        <br/>Choose which time below.
      </span>
    </div>


    <ul role="list" class="space-y-1 py-1">
      <li 
        v-for="(pilots, timeHint, index) in dayObject" :key="pilots.id" 
        class=" bg-white px-4 py-4 shadow sm:rounded-md sm:px-6"
        :class=" (pilots != -1) ? 'flight_available' : ''"

        @click="onSlotClick(ev, index, pilots)"
      >
        <!-- Pilots: -1 means the flight isn't available at that time.  -->
        <span v-if="(pilots != -1)">
          {{ timeHint }} :: Pilots: {{ pilots }} 
        </span>
        <span 
          v-if="(pilots == -1)"
          class="italic text-black/40"
        >
          {{ timeHint }} :: Flight not available
        </span>

      </li>
    </ul>

   

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


  const isOpen = ref(false)

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
		isOpen,
    onMounted,
    onUnmounted,
    onSlotClick,
  })


</script>

<style scoped>

  .headerSelected {
    background-color: var(--booking-hilite);
    color: white;
  }


</style>
