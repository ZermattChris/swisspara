<template>
  <div>
    <label for="inputSelect" class="block text-lg font-medium leading-6 text-gray-900">{{label}}:</label>
    <select 
			id="inputSelect" name="inputSelect" 
			@change="onChange"
			class="mt-2 block w-full rounded-md border-0 py-1.5 pl-3 pr-10 text-gray-900 ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-indigo-600 sm:text-sm sm:leading-6"
		>
			<template 
				v-for="(item, id) in list">

				<option 
					v-if="item.seperator == true"
					v-bind:value="item.id"
					disabled
					class=""
				>
					------- {{ item.name }} -------
				</option>

				<option 
					v-if="item.seperator == false"
					v-bind:value="item.id"
				>
					{{ item.name }}
				</option>


			</template>

    </select>
  </div>



</template>

<script>


	export default {
		name: 'PageFlight',
		emits: ['change'],

		props: {
			label: { type: String, default: 'Label as Prop' },
			list: [Object],
		},
		components: {    
			
		},


		data() {
			return {
				currentId: -1,
			}
		},



		methods: {

			onChange(ev) {
			
				const target = ev.target
				const value = target.value
				console.log('Internal', value)

				// Save the selected id internally, so we can show a "checked" icon.
				this.currentId = value

				this.$emit( 'change', value )
			},

		} // methods
		
	};

</script>


