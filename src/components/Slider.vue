<template>

  <div
    class="flex"
  >

    <button 
      type="button" 
      @click="adjust(-step)"
      class="mr-4
      rounded-md bg-white px-3.5 py-2.5 text-sm font-semibold
      text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50"
    >
      Start
    </button>

    <input type="range" 
      id="basic-range-slider-usage"

      v-model="_val"
      :min="min" :max="max" :step="step"
      @change="$emit('change', _val)"
      class="w-full bg-transparent cursor-pointer appearance-none disabled:opacity-50 
        disabled:pointer-events-none focus:outline-none
        [&::-webkit-slider-thumb]:w-2.5
        [&::-webkit-slider-thumb]:h-2.5
        [&::-webkit-slider-thumb]:-mt-0.5
        [&::-webkit-slider-thumb]:appearance-none
        [&::-webkit-slider-thumb]:bg-white
        [&::-webkit-slider-thumb]:shadow-[0_0_0_4px_rgba(37,99,235,1)]
        [&::-webkit-slider-thumb]:rounded-full
        [&::-webkit-slider-thumb]:transition-all
        [&::-webkit-slider-thumb]:duration-150
        [&::-webkit-slider-thumb]:ease-in-out
        [&::-webkit-slider-thumb]:dark:bg-slate-700

        [&::-moz-range-thumb]:w-4
        [&::-moz-range-thumb]:h-4
        [&::-moz-range-thumb]:appearance-none
        [&::-moz-range-thumb]:bg-white
        [&::-moz-range-thumb]:border-4
        [&::-moz-range-thumb]:border-indigo-600
        [&::-moz-range-thumb]:rounded-full
        [&::-moz-range-thumb]:transition-all
        [&::-moz-range-thumb]:duration-150
        [&::-moz-range-thumb]:ease-in-out

        [&::-webkit-slider-runnable-track]:w-full
        [&::-webkit-slider-runnable-track]:h-2
        [&::-webkit-slider-runnable-track]:bg-gray-100
        [&::-webkit-slider-runnable-track]:rounded-full
        [&::-webkit-slider-runnable-track]:dark:bg-gray-700

        [&::-moz-range-track]:w-full
        [&::-moz-range-track]:h-2
        [&::-moz-range-track]:bg-gray-100
        [&::-moz-range-track]:rounded-full" 
    >

    <button 
      type="button" 
      @click="adjust(step)"
      class="ml-4
      rounded-md bg-white px-3.5 py-2.5 text-sm font-semibold
      text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50"
    >
      End
    </button>
  </div>

</template>


<script setup>
  import { ref } from 'vue'
  
  // ----------- Props ------------
  const props = defineProps({
    // Is -1 if Slider hasn't been 'touched'
    startValue: {
      type: [Number],
      default: 0
    },
    min: [Number],
    max: [Number],
    step: [Number],
  })

  // ----------- Events ------------
  const emit = defineEmits(['change'])

  const _val = ref(props.startValue)


  const touched = ref(false)

  




	function adjust(step) {
    // Dagnabbit js - stop with all the Number String twaddle!
    // The html 5 slider input is casting the _val back to String... Why???
    //console.log('Slider Btn adjust: ', step)
    // console.log('Slider Btn adjust: ', Number(_val.value), typeof Number(_val.value))
    _val.value = Number(_val.value) + step
    emit('change', _val.value)
  }

			


</script>