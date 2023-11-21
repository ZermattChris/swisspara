<template>

  <div
    class="flex outline outline-2 outline-red-300"
  >

    <button 
      type="button" 
      @click="adjust(-step)"
      class="mr-4 rounded-full rounded-r-none w-14 min-w-[52px]
       bg-gray-100 pr-2 pl-3 py-2.5 text-sm font-semibold
      text-gray-900 shadow ring-1 ring-inset ring-gray-300 hover:bg-gray-50"
    >
      <slot name="preIcon"></slot>
    </button>




     <!-- START: Vertical Flex box.  -->
    <div
      class="flex grow flex-col relative  "
    >
      <input type="range" 
        :value="_val"
        :min="min" :max="max" :step="step"
        @click="onClick"
        @change="$emit('change', _val)"
        class="h-7 pt-6 z-2 relative
          w-full bg-transparent cursor-pointer appearance-none disabled:opacity-50 
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

      <div class="absolute top-10 text-center w-full ">
        <slot name="message">

        </slot>
      </div>

    </div> <!-- END: Vertical Flex box.  -->

    <button 
      type="button" 
      @click="adjust(step)"
      class="ml-4 rounded-full rounded-l-none w-14
      bg-gray-100 pl-2 pr-3 py-2.5 text-sm font-semibold
      text-gray-900 shadow ring-1 ring-inset ring-gray-300 hover:bg-gray-50"
    >
      <slot name="postIcon"></slot>
    </button>
  </div>


</template>


<script setup>

  import { ref, computed } from 'vue'
  
  // ----------- Props ------------
  const props = defineProps({
    // Is -1 if Slider hasn't been 'touched'
    startValue: {
      type: [Number]
    },
    min: [Number],
    max: [Number],
    step: [Number],
  })

  // ----------- Events ------------
  const emit = defineEmits(['change'])

  const _val = ref(props.startValue)


  const touched = ref(false)

	function onClick(ev) {
    const sliderClickVal = ev.target.value
    // console.log('onClick: ', sliderClickVal)
    _val.value = Number(sliderClickVal)
    touched.value = true
    emit('change', _val.value)
  }

	function adjust(step) {
    // Dagnabbit js - stop with all the Number String twaddle!
    // The html 5 slider input is casting the _val back to String... Why???
    //console.log('Slider Btn adjust: ', step)
    // console.log('Slider Btn adjust: ', Number(_val.value), typeof Number(_val.value))
    const targetVal = Number(_val.value) + step
    // console.log('targetVal : ', targetVal)
    touched.value = true
    if (targetVal < props.min ) {
      _val.value = props.min 
      
    } else if (targetVal > props.max  ) {
      _val.value = props.max 
      
    } else  {
      _val.value = Number(_val.value) + step
    }

    emit('change', _val.value)
  }

			


</script>