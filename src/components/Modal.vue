<template>
    <!-- <div class="fixed inset-0 flex items-center justify-center">
      <button
        type="button"
        @click="openModal"
        class="rounded-md bg-black/20 px-4 py-2 text-sm font-medium text-white hover:bg-black/30 focus:outline-none focus-visible:ring-2 focus-visible:ring-white/75"
      >
        Open dialog
      </button>
    </div> -->
    <TransitionRoot appear :show="isOpen" as="template">
      <Dialog as="div" @close="closeModal" class="relative z-10">
        <TransitionChild
          as="template"
          enter="duration-300 ease-out"
          enter-from="opacity-0"
          enter-to="opacity-100"
          leave="duration-200 ease-in"
          leave-from="opacity-100"
          leave-to="opacity-0"
        >
          <div class="fixed inset-0 bg-black/25" />
        </TransitionChild>
  
        <div class="fixed inset-0 overflow-y-auto">
          <div
            class=" flex min-h-full items-center justify-center p-4 text-center"
          >
            <TransitionChild
              as="template"
              enter="duration-300 ease-out"
              enter-from="opacity-0 scale-95"
              enter-to="opacity-100 scale-100"
              leave="duration-200 ease-in"
              leave-from="opacity-100 scale-100"
              leave-to="opacity-0 scale-95"
            >
              <DialogPanel
                class="w-full max-w-md transform overflow-hidden 
                  mb-0
                  rounded-2xl bg-white p-6 text-left align-middle shadow-xl transition-all"
              >
                <DialogTitle
                  as="h3"
                  class="text-lg font-medium leading-6 text-gray-900"
                >
                  <slot name="title"></slot>
                </DialogTitle>

                <div class="mt-2">
                  <p class="text-sm text-gray-500">
                    <slot></slot>
                  </p>
                </div>
  
                <div class="mt-4 flex justify-end">
                  <button
                    id="closeDialogBtn"
                    type="button"
                    class="inline-flex justify-center rounded-md border border-transparent bg-blue-100 px-4 py-2 text-sm font-medium text-blue-900 hover:bg-blue-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2"
                    @click="closeModal"
                  >
                    <slot name="button"></slot>
                  </button>
                </div>
              </DialogPanel>
            </TransitionChild>
          </div>
        </div>
      </Dialog>
    </TransitionRoot>
  </template>

<script setup>
  import { ref, watch, onMounted, onUnmounted } from 'vue'
  import { TransitionRoot, TransitionChild, Dialog, DialogPanel, DialogTitle, } from '@headlessui/vue'

  // ----------- Props ------------
  defineProps({

  })


  const isOpen = ref(false)
  
  function openModal(myEvent) {
    isOpen.value = true
  }

  function closeModal(ev) {
    if (typeof ev.target === 'undefined') return
    if (ev.target.id !== 'closeDialogBtn') return   // Give the 'close' button an id.
    isOpen.value = false
  }

  onMounted(() => {
    // block esc key from closing dialog.
    document.addEventListener('keydown', makeDialogModal)
  })

  onUnmounted(() => {
    // block esc key from closing dialog.
    document.removeEventListener('keydown', makeDialogModal)
  })

  function makeDialogModal(e) {

    // Block esc key
    if (e.key === 'Escape' || e.keyCode === 27) { // e.keyCode === 27 used for legacy
      //console.log('Escape key pressed')
      e.stopPropagation()
      return
    }

    // Close on Enter or Return keys
    if (e.key === 'Enter') { 
      //console.log('ENTER key pressed')
    }

  }

  defineExpose({
    openModal,
    closeModal
  })


</script>
