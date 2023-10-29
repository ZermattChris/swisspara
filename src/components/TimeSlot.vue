<template>

  <div class="pb-2">

    <slot>




    </slot> 

  </div>


</template>

<script setup>
  import { ref, watch, onMounted, onUnmounted } from 'vue'

  // ----------- Props ------------
  defineProps({

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
