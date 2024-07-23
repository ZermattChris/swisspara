<template>
	<div class="w-full px-4 py-4">
	  <div class="mx-auto w-full max-w-md">
		<RadioGroup v-model="currentId">
		  <div class="space-y-3">
			<RadioGroupOption
			  as="template"
			  v-for="(flight, id) in list"
			  :key="flight.name"
			  :value="flight.id"
			  v-slot="{ active, checked }"
			>
			  <div
				:class="[
				  active
					? 'ring-2 ring-indigo-600/100 border-black/10  ring-offset-2 ring-offset-white '
					: '',
				  checked? ' bg-slate-100  ' : ' bg-white  text-black  shadow-md',
				]"
				class="ring-offset-2 r relative flex cursor-pointer rounded-lg px-4 py-4 border-2 border-slate-300"
			  >
				<div class="flex w-full items-center justify-between">
				  <div class="flex items-center">
					<div class="text-xl">
					  <RadioGroupLabel
						as="span"
						:class="checked ? 'text-black' : 'text-gray-800'"
						class="font-medium"
					  >
					  {{ flight.id }}	{{ flight.name.charAt(0).toUpperCase() + flight.name.slice(1) }}
					  </RadioGroupLabel>
					  <RadioGroupDescription
              as="span"
              :class="checked ? 'text-sky-100' : 'text-gray-500'"
              class="inline"
					  >
					  </RadioGroupDescription>
					</div>
				  </div>
				  <div v-show="checked" class="shrink-0 text-black">
            <svg class="h-6 w-6" viewBox="0 0 24 24" fill="none">
              <circle cx="12" cy="12" r="12" fill="rgb(101 163 13)" fill-opacity="01" />
              <path d="M7 13l3 3 7-7" stroke="#fff" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
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
			flightId: Number
		},

		data() {
			return {
				currentId: this.flightId,
        

      		}
		},

		methods: {

			onChange(ev) {
			
				// const target = ev.target
				// const value = target.value
				// console.log('Internal', value)

				// // Save the selected id internally, so we can show a "checked" icon.
				// this.currentId = value

				// this.$emit( 'change', value )
			},

		}, // methods

		watch: {

			currentId(selectdIndex) {
				for (const obj of this.list) {
					if (obj.id == selectdIndex) {
						//console.log("Found it", obj.id, obj.name)
						this.$emit( 'change', selectdIndex )
					}
				}
			},

		}, // watch

	}

</script>

<style>


</style>