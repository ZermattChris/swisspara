<template>

  <div
    class="flex "
    
  >

    <button 
      type="button" 
      @click="adjust(-step)"
      class="mr-4 rounded-full rounded-r-none w-14 min-w-[52px]
       bg-gray-100 pr-2 pl-3 py-2.5 text-sm font-semibold
      text-gray-900 shadow ring-1 ring-inset ring-gray-300"
      :class=" (modelValue <= min) ? 'opacity-50 cursor-default' : 'hover:bg-gray-50  hover:ring-indigo-600 ' "
    >
      <slot name="preIcon"></slot>
    </button>




     <!-- START: Vertical Flex box.  -->
    <div
      class="flex grow flex-col relative  "
    >
      <input type="range" 
        :id="id"
        :min="min" :max="max" :step="step"
        :value="modelValue"
        @input="$emit('update:modelValue', $event.target.value)"
        class="h-7 pt-1 z-2 relative
          w-full bg-transparent cursor-pointer appearance-none disabled:opacity-50 
          disabled:pointer-events-none focus:outline-none
          [&::-webkit-slider-thumb]:w-3.5
          [&::-webkit-slider-thumb]:h-3.5
          [&::-webkit-slider-thumb]:-mt-0.5
          [&::-webkit-slider-thumb]:appearance-none
          [&::-webkit-slider-thumb]:bg-white
          [&::-webkit-slider-thumb]:shadow-[0_0_0_6px_rgba(0,0,0,1)]
          [&::-webkit-slider-thumb]:rounded-full
          [&::-webkit-slider-thumb]:transition-all
          [&::-webkit-slider-thumb]:duration-150
          [&::-webkit-slider-thumb]:ease-in-out
          [&::-webkit-slider-thumb]:dark:bg-slate-700

          [&::-moz-range-thumb]:w-5
          [&::-moz-range-thumb]:h-5
          [&::-moz-range-thumb]:appearance-none
          [&::-moz-range-thumb]:bg-lime-300
          [&::-moz-range-thumb]:border-4
          [&::-moz-range-thumb]:border-black
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
          [&::-moz-range-track]:bg-gray-200
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
      text-gray-900 shadow ring-1 ring-inset ring-gray-300 "
      :class=" (modelValue >= max) ? 'opacity-50 cursor-default' : 'hover:bg-gray-50  hover:ring-indigo-600 ' "
    >
      <slot name="postIcon"></slot>
    </button>
  </div>


</template>


<script setup>

  import { ref, computed, onMounted } from 'vue'
  
  // ----------- Props ------------
  const props = defineProps({
    id: [String],   // Unique id name for this slider.
    // Is -1 if Slider hasn't been 'touched'
    modelValue: [Number],
    min: [String],
    max: [String],
    step: [String],
  })

  // ----------- Events ------------
  const emit = defineEmits(['update:modelValue'])

 
	function adjust(step) {
    let targetVal = Number(props.modelValue) + step
    // console.log('targetVal : ', targetVal)
    if (targetVal < (props.min - step) ) {    // this accounts for inital -1 value.
      targetVal = props.min 
      
    } else if (targetVal > props.max  ) {
      targetVal = props.max 
      
    } else  {
      targetVal = Number(props.modelValue) + step
    }
    emit('update:modelValue', targetVal)
  }



</script>