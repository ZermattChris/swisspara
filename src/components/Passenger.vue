<template>

	<!-- Passenger Outline box.  -->
	<div	
		class="mr-2 my-2 border-2 border-orange-200 rounded-md"
	>

		<!-- START Header box. Holds the Passenger's name and a 'Valid' icon.  -->
		<header
			class="flex justify-between px-4 py-4 border-b-[2px] rounded-t border-black/10   bg-gradient-to-r to-violet-50 from-black/5 "
			:class="index === 1 ? 'font-bold' : '' "
		>
			<!-- Contact person envelope icon. -->
			<svg 
				v-if="index === 1"
				class="w-6 h-6  flex-none"
				xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" 
			>
				<path stroke-linecap="round" stroke-linejoin="round" d="M21.75 6.75v10.5a2.25 2.25 0 01-2.25 2.25h-15a2.25 2.25 0 01-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25m19.5 0v.243a2.25 2.25 0 01-1.07 1.916l-7.5 4.615a2.25 2.25 0 01-2.36 0L3.32 8.91a2.25 2.25 0 01-1.07-1.916V6.75" />
			</svg>

			<div 
				clas="grow"
				:class="index === 1 ? 'pl-2' : '' ">
				Name (Contact Passenger)
			</div>

			<svg 
				v-if="passengerValid"
				class="flex-none w-6 h-6 fill-lime-500  "
				xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" 
			>
				<path fill-rule="evenodd" d="M2.25 12c0-5.385 4.365-9.75 9.75-9.75s9.75 4.365 9.75 9.75-4.365 9.75-9.75 9.75S2.25 17.385 2.25 12zm13.36-1.814a.75.75 0 10-1.22-.872l-3.236 4.53L9.53 12.22a.75.75 0 00-1.06 1.06l2.25 2.25a.75.75 0 001.14-.094l3.75-5.25z" clip-rule="evenodd" />
			</svg>
			<svg 
				v-if="!passengerValid"
				class="flex-none  w-6 h-6  fill-red-700  "
				xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor"
			>
				<path fill-rule="evenodd" d="M12 2.25c-5.385 0-9.75 4.365-9.75 9.75s4.365 9.75 9.75 9.75 9.75-4.365 9.75-9.75S17.385 2.25 12 2.25zm-1.72 6.97a.75.75 0 10-1.06 1.06L10.94 12l-1.72 1.72a.75.75 0 101.06 1.06L12 13.06l1.72 1.72a.75.75 0 101.06-1.06L13.06 12l1.72-1.72a.75.75 0 10-1.06-1.06L12 10.94l-1.72-1.72z" clip-rule="evenodd" />
			</svg>



		</header> 
		<!-- END Header box. -->


		<!-- Contact Person form inputs.  -->
		<div id="`contactInputs_${index}`"
			v-if="index === 1"
		>
			<MazPhoneNumberInput
				class="pt-6 px-2"
				v-model="phoneNumber"
				show-code-on-list
				:preferred-countries="['CH', 'US', 'GB', 'KR', 'FR', 'NL', 'DE', 'SG']"
				:ignored-countries="['AC']"
				size="md"
				countrySelectorWidth="6rem"
				@update="results = $event"
			/>
			<code>
				{{ phoneResults }}
			</code>


		</div>  <!-- END: Contact inputs. -->

		<div id="footer-spacer" class="h-10"></div>



	</div>

</template>




<script setup>
	import { ref } from 'vue'

  import MazPhoneNumberInput from 'maz-ui/components/MazPhoneNumberInput'
  import 'maz-ui/css/main.css'

	const passengerValid = ref(true)
	const phoneNumber = ref()
	const phoneResults = ref()


	// ----------- Props ------------
	const props = defineProps({
		index: [Number],
	})

	defineExpose({
		
	})
			
	// onMounted(() => {

	// })
			
	// function sssss() {
		
	// }

	// const xxxx = computed(() => {
		
	// })

</script>


<style>

	/* Hide the Country drop button.  */
	div.m-input-wrapper-right {
		display: none !important;
	}


	button.m-phone-number-input__country-flag {
		left: 20px !important;
	}


</style>