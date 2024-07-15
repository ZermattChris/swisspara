<template>


  <ul class="relative flex flex-row  gap-x-2   mx-auto">


    <!-- Item -->
    <li class="shrink basis-0 flex-1 group">
      <div class="min-w-7 min-h-7 w-full inline-flex items-center text-xs align-middle">
        <span class="size-7 flex justify-center items-center flex-shrink-0 bg-gray-100 font-medium text-gray-800 rounded-full dark:bg-neutral-700 dark:text-white">
          1
        </span>
        <div class="ms-2 w-full h-px flex-1 bg-gray-200 group-last:hidden dark:bg-neutral-700"></div>
      </div>
      <div class="mt-3">
        <span class="block text-sm font-medium text-gray-800 dark:text-white">
          Dates
        </span>
      </div>
    </li>
    <!-- End Item -->

    <!-- Item -->
    <li class="shrink basis-0 flex-1 group">
      <div class="min-w-7 min-h-7 w-full inline-flex items-center text-xs align-middle">
        <span class="size-7 flex justify-center items-center flex-shrink-0 bg-gray-100 font-medium text-gray-800 rounded-full dark:bg-neutral-700 dark:text-white">
          2
        </span>
        <div class="ms-2 w-full h-px flex-1 bg-gray-200 group-last:hidden dark:bg-neutral-700"></div>
      </div>
      <div class="mt-3">
        <span class="block text-sm font-medium text-gray-800 dark:text-white">
          Flight
        </span>
      </div>
    </li>
    <!-- End Item -->

    <!-- Item -->
    <li class="shrink basis-0 flex-1 group">
      <div class="min-w-7 min-h-7 w-full inline-flex items-center text-xs align-middle">
        <span class="size-7 flex justify-center items-center flex-shrink-0 bg-gray-100 font-medium text-gray-800 rounded-full dark:bg-neutral-700 dark:text-white">
          3
        </span>
        <div class="ms-2 w-full h-px flex-1 bg-gray-200 group-last:hidden dark:bg-neutral-700"></div>
      </div>
      <div class="mt-3">
        <span class="block text-sm font-medium text-gray-800 dark:text-white">
          Time
        </span>
      </div>
    </li>
    <!-- End Item -->

    <!-- Item -->
    <li class="shrink basis-0 flex-1 group">
      <div class="min-w-7 min-h-7 w-full inline-flex items-center text-xs align-middle">
        <span class="size-7 flex justify-center items-center flex-shrink-0 bg-gray-100 font-medium text-gray-800 rounded-full dark:bg-neutral-700 dark:text-white">
          3
        </span>
        <div class="ms-2 w-full h-px flex-1 bg-gray-200 group-last:hidden dark:bg-neutral-700"></div>
      </div>
      <div class="mt-3">
        <span class="block text-sm font-medium text-gray-800 dark:text-white">
          Details
        </span>
      </div>
    </li>
    <!-- End Item -->

    <!-- Item -->
    <li class="shrink basis-0 flex-1 group">
      <div class="min-w-7 min-h-7 w-full inline-flex items-center text-xs align-middle">
        <span class="size-7 flex justify-center items-center flex-shrink-0 bg-gray-100 font-medium text-gray-800 rounded-full dark:bg-neutral-700 dark:text-white">
          3
        </span>
        <div class="ms-2 w-full h-px flex-1 bg-gray-200 group-last:hidden dark:bg-neutral-700"></div>
      </div>
      <div class="mt-3">
        <span class="block text-sm font-medium text-gray-800 dark:text-white">
          Pay
        </span>
      </div>
    </li>
    <!-- End Item -->

  </ul>


</template>


<script setup>

  import { ref, computed, onMounted } from 'vue'
  
  // ----------- Props ------------
  // const props = defineProps({
  //   id: [String],   // Unique id name for this slider.
  //   // Is -1 if Slider hasn't been 'touched'
  //   modelValue: [Number],
  //   min: [Number],
  //   max: [Number],
  //   step: [Number],
  // })

  // ----------- Events ------------
  //const emit = defineEmits(['update:modelValue'])

 
	// function adjust(step) {
  //   let targetVal = Number(props.modelValue) + step
  //   // console.log('targetVal : ', targetVal)
  //   if (targetVal < (props.min - step) ) {    // this accounts for inital -1 value.
  //     targetVal = props.min 
      
  //   } else if (targetVal > props.max  ) {
  //     targetVal = props.max 
      
  //   } else  {
  //     targetVal = Number(props.modelValue) + step
  //   }
  //   emit('update:modelValue', targetVal)
  // }



</script>