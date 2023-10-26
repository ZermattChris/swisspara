<template>
	<div class="w-full px-4 py-4">
	  <div class="mx-auto w-full max-w-md">
		<RadioGroup v-model="selected">
		  <RadioGroupLabel class="sr-only">Server size</RadioGroupLabel>
		  <div class="space-y-4">
			<RadioGroupOption
			  as="template"
			  v-for="(plan, id) in list"
			  :key="plan.name"
			  :value="id"
			  v-slot="{ active, checked }"
			>
			  <div
				:class="[
				  active
					? 'ring-2 ring-indigo-600/100 border-black/10  ring-offset-2 ring-offset-white'
					: '',
				  checked ? ' bg-slate-100 ' : ' bg-white  text-black',
				]"
				class="ring-offset-2 r relative flex cursor-pointer rounded-lg px-4 py-4 shadow-md border-2 border-slate-300"
			  >
				<div class="flex w-full items-center justify-between">
				  <div class="flex items-center">
					<div class="text-xl">
					  <RadioGroupLabel
						as="span"
						:class="checked ? 'text-black' : 'text-gray-800'"
						class="font-medium"
					  >
						{{ plan.name }}
					  </RadioGroupLabel>
					  <RadioGroupDescription
						as="span"
						:class="checked ? 'text-sky-100' : 'text-gray-500'"
						class="inline"
					  >
						<!-- <span> {{ plan.ram }}/{{ plan.cpus }}</span>
						<span aria-hidden="true"> &middot; </span>
						<span>{{ plan.disk }}</span> -->
					  </RadioGroupDescription>
					</div>
				  </div>
				  <div v-show="checked" class="shrink-0 text-black">
					<svg class="h-6 w-6" viewBox="0 0 24 24" fill="none">
					  <circle
						cx="12"
						cy="12"
						r="12"
						fill="rgb(101 163 13)"
						fill-opacity="01"
					  />
					  <path
						d="M7 13l3 3 7-7"
						stroke="#fff"
						stroke-width="1.5"
						stroke-linecap="round"
						stroke-linejoin="round"
					  />
					</svg>
				  </div>
				</div>
			  </div>
			</RadioGroupOption>
		  </div>
		</RadioGroup>
	  </div>
	</div>
  </template>
  
  <script>
	import { RadioGroup, RadioGroupLabel, RadioGroupDescription, RadioGroupOption } from '@headlessui/vue'
	

	export default {
		name: 'FlightSelector',
		emits: ['change'],


		components: {    
			RadioGroup, RadioGroupLabel, RadioGroupDescription, RadioGroupOption,
		},
		props: {
			list: [Object],
		},

		data() {
			return {
				selected: 0
        

      		}
		},

	}

	// const plans = [
	// 	{
	// 	name: 'Startup',
	// 	ram: '12GB',
	// 	cpus: '6 CPUs',
	// 	disk: '160 GB SSD disk',
	// 	},
	// 	{
	// 	name: 'Business',
	// 	ram: '16GB',
	// 	cpus: '8 CPUs',
	// 	disk: '512 GB SSD disk',
	// 	},
	// 	{
	// 	name: 'Enterprise',
	// 	ram: '32GB',
	// 	cpus: '12 CPUs',
	// 	disk: '1024 GB SSD disk',
	// 	},
	// ]
	
	// const selected = ref(plans[0])

</script>

<style>


</style>