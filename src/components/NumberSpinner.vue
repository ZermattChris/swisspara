<template>

	<div class="custom-number-input h-10 w-32">
		<div class="flex flex-row h-10 w-full rounded-lg relative bg-transparent mt-1">

			<button
        @click="increment(-1, $event)"
				class="plusButtn 
        bg-gradient-to-b from-gray-100 to-gray-300
        border-r-0 border-[1px] border-gray-400
        bg-gray-200 text-gray-800 
        hover:text-black hover:from-gray-200 hover:to-gray-400 
        h-full w-20 rounded-l-md cursor-pointer"
        :class="inputVal <= minVal ? 'opacity-40' : 'opacity-100' "
			>
				<span class="m-auto text-2xl font-thin">−</span>
			</button>

			<input 
				type="text" inputmode="numeric"
				class="z-[0] ring-[1px] ring-gray-400 ring-inset border-0 focus:outline-none text-center w-full 
          
          font-semibold text-md 
          hover:text-black focus:text-black  md:text-basecursor-default flex items-center text-gray-700  outline-none
          placeholder:font-light placeholder:italic placeholder:text-slate-400" 
				name="custom-input-number" 
				:value="inputVal"
        placeholder="Age"
        @input="onInput"
        @change="onChanged"
			/>

			<button 
        @click="increment(1, $event)"
				class="minusButton 
        bg-gradient-to-b from-gray-100 to-gray-300
        border-l-0 border-[1px] border-gray-400
        bg-gray-200 text-gray-800 
         hover:text-black hover:from-gray-200 hover:to-gray-400 
         h-full w-20 rounded-r-md cursor-pointer"
        :class="inputVal >= maxVal ? 'opacity-40' : 'opacity-100' "
			>
				<span class="m-auto text-2xl font-thin">+</span>
			</button>

		</div>
	</div>

</template>

	

<script setup>
	import { ref, reactive, toRaw, computed, onMounted, watch, onUpdated } from 'vue'

	// ----------- Props ------------
	const props = defineProps(['defVal'])
	// 	defaultValue: [String],
	// })

  // ----------- Events ------------
  const emit = defineEmits(['change'])


	const inputVal = ref()
  const minVal = 5
  const maxVal = 69

  console.log("-> setup: ", props.defVal)

  

	onMounted(() => {
    if (typeof props.defVal !== '') {
      inputVal.value = parseInt(props.defVal)
    }
  })

	function onInput(ev) {
    // Need to listen for this event and update the inputVal manually.
    // This event gets called on every keypress, so don't do any range
    // checks here -- onChanged() handles bad value resets.
    console.log('onInput')
    const enteredVal = parseInt(ev.target.value)
    inputVal.value = enteredVal
  }

	function onChanged(ev) {

    // Need to listen for this event and update the inputVal manually.
    // inputVal.value = val+
    console.log('onChanged')
    // if (ev.originalTarget === undefined) return

    const enteredVal = parseInt(ev.target.value)
    //console.log('onInput:', enteredVal)
    if (enteredVal < minVal) {
      // console.log('onInput under Min:', enteredVal)   // set an info field for user to know what's up.
      inputVal.value = minVal
      return
    }
    if (enteredVal >= maxVal) {
      // console.log('onInput over Max:', enteredVal)  // set an info field for user to know what's up.
      inputVal.value = maxVal
      return
    }

    // Need to trigger a 'change' event to send to parent.
    // emit('change', ev)
    inputVal.value = enteredVal
  }






	function increment(val, ev) {
    ev.preventDefault()

    let targetVal = -1

    // Initialize inputVal to minVal if not yet set by user or cache.
    if (inputVal.value === undefined) {
      inputVal.value = minVal
      return
    }

    targetVal = (inputVal.value + val)

    if (targetVal < minVal) {
      // console.log('!at minVal. no update.')
      return
    }
    if (targetVal > maxVal) {
      // console.log('!at maxVal. no update.')
      return
    }

    //console.log('increment')

    // Need to trigger a 'change' event to send to parent.
    emit('change', {target: {value: val} })

    inputVal.value += val


    // if (inputVal.value += val < minVal) {
    //   console.log('minVal')
    //   inputVal.value = minVal
    //   return
    // }


    // console.log('targetVal: ', targetVal)
  }
	
</script>


  
<!-- <style>
	input[type='number']::-webkit-inner-spin-button,
	input[type='number']::-webkit-outer-spin-button {
		-webkit-appearance: none;
		margin: 0;
	}

	.custom-number-input input:focus {
		outline: none !important;
	}

	.custom-number-input button:focus {
		outline: none !important;
	}
</style> -->
