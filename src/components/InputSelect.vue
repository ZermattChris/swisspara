<template>
  <div>
    <label for="chooseFlight" class="block text-lg font-medium leading-6 text-gray-900">Flights:</label>
    <select 
			id="chooseFlight" name="chooseFlight" 
			class="mt-2 block w-full rounded-md border-0 py-1.5 pl-3 pr-10 text-gray-900 ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-indigo-600 sm:text-sm sm:leading-6"
		>
			<template 
				v-for="(item, index) in list">
				<option>{{ item }}</option>
			</template>

    </select>
  </div>
</template>

<script>


export default {
	name: 'PageFlight',

	props: {
		list: [Object],
	},
	
};

</script>


