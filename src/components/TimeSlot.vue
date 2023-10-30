<template>

  <div 
    class="pb-0"
    :class="`timeSlot_${slideIndex}`"
  >

    <div id="xx" 
      class=""
    >
      Header box: {{slideIndex}} {{date}} 

      <span v-if="slideIndex === selectedSlide">This TimeSlot is selected</span>
    </div>


    <ul role="list" class="space-y-1">
      <li v-for="(pilots, timeHint) in dayObject" :key="pilots.id" class="overflow-hidden bg-white px-4 py-4 shadow sm:rounded-md sm:px-6">
        {{ timeHint }} :: Pilots: {{ pilots }} 
      </li>
    </ul>

   

  </div>


</template>

<script setup>
  import { ref, watch, onMounted, onUnmounted } from 'vue'

  // ----------- Props ------------
  defineProps({
    date: [String],
    dayObject: [Object],
    slideIndex: [Number],
    selectedSlide: [Number]
  })


  const isOpen = ref(false)
  
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
