<template>

  <div 
    class="pb-0 px-1 pt-1"
    :class="`timeSlot_${slideIndex}`"
  >

    <div
      class="time_slot_header py-1 shadow bg-white border-black/30 border-2 rounded-md text-center font-black"
      :class="   isSlideSelected ? 'headerSelected text-lg ring-2 ring-white ring-inset' : ''   "
    >
      {{date}}  {{ isFlightSlide }}
      <!-- {{isSlideSelected ? 'true' : 'false'}}   border-[calc(var(--booking-hilite))]/100  -->

      <span 
        v-if="isSlideSelected"
        class="font-thin italic"
      >
        <br/>Choose which time below.
      </span>
    </div>


    <ul role="list" class="space-y-1 py-1">
      <li v-for="(pilots, timeHint) in dayObject" :key="pilots.id" class=" bg-white px-4 py-4 shadow sm:rounded-md sm:px-6">
        {{ timeHint }} :: Pilots: {{ pilots }} 
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
    return props.slideIndex === props.selectedSlide
  })
  
  const isFlightSlide = computed(() => {
    console.log(props.date, props.flightDate)
    return props.date === props.flightDate
  })

  // function openModal(myEvent) {
  //   isOpen.value = true
  // }


  // onMounted(() => {
  //   // block esc key from closing dialog.
  //   document.addEventListener('keydown', makeDialogModal)
  // })

  // onUnmounted(() => {
  //   // block esc key from closing dialog.
  //   document.removeEventListener('keydown', makeDialogModal)
  // })

  // function makeDialogModal(e) {

  // }

  defineExpose({
		isOpen
  })


</script>

<style scoped>

  .headerSelected {
    background-color: var(--booking-hilite);
    color: white;
  }


</style>
