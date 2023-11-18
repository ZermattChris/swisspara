<template>

	<!-- Passenger Outline box.  -->
	<div	
		class="mr-2 my-2 border-2 border-orange-200 rounded-md"
	>

		<!-- Have the wrapping form collect all of the input changes and send them to the parent Passenger.vue -->
		<form
			:id="`passengerForm_${index}`" 
			@change="$emit('changed', {'index':index, 'formValid':isPassengerPanelValid, 'target':$event.target, 'value':$event.target.value, '$event':$event, 'fullphone':phoneNumber})"
		>


			<!-- START Header box. Holds the Passenger's name and a 'Valid' icon.  -->
			<header
				class="flex justify-between px-4 py-4 border-b-[2px] rounded-t border-black/10   bg-gradient-to-r to-violet-50 from-black/5 "
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
					clas="grow font-thin"
					v-if="index === 1"
					:class="index === 1 ? 'pl-2' : '' ">
					<span class="font-bold">{{ contactName }}</span>
					(Contact Passenger)
				</div>

				<div 
					clas="grow"
					v-if="index > 1"
					:class="index === 1 ? 'pl-2' : '' ">
					Passenger #{{ index }}
				</div>

				<svg 
					v-if="isPassengerPanelValid"
					class="flex-none w-6 h-6 fill-lime-500  "
					xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" 
				>
					<path fill-rule="evenodd" d="M2.25 12c0-5.385 4.365-9.75 9.75-9.75s9.75 4.365 9.75 9.75-4.365 9.75-9.75 9.75S2.25 17.385 2.25 12zm13.36-1.814a.75.75 0 10-1.22-.872l-3.236 4.53L9.53 12.22a.75.75 0 00-1.06 1.06l2.25 2.25a.75.75 0 001.14-.094l3.75-5.25z" clip-rule="evenodd" />
				</svg>
				<svg 
					v-if="!isPassengerPanelValid"
					class="flex-none  w-6 h-6  fill-red-700  "
					xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor"
				>
					<path fill-rule="evenodd" d="M12 2.25c-5.385 0-9.75 4.365-9.75 9.75s4.365 9.75 9.75 9.75 9.75-4.365 9.75-9.75S17.385 2.25 12 2.25zm-1.72 6.97a.75.75 0 10-1.06 1.06L10.94 12l-1.72 1.72a.75.75 0 101.06 1.06L12 13.06l1.72 1.72a.75.75 0 101.06-1.06L13.06 12l1.72-1.72a.75.75 0 10-1.06-1.06L12 10.94l-1.72-1.72z" clip-rule="evenodd" />
				</svg>



			</header> 
			<!-- END Header box. -->


			<!-- ******************* Contact Person form inputs. ******************* -->
			<div id="contactInputs"
				class="pt-4"
				v-if="index === 1"
			>
				<!-- Phone Number. -->
				<div class="relative">
					<!-- <label for="contactPhone" class="mt-2 px-2 block text-sm font-medium leading-6 text-gray-900">Phone</label> -->
					<MazPhoneNumberInput
						id="contactPhone"
						class=" px-2"
						v-model="phoneNumber"
						show-code-on-list
						noValidationSuccess
						:preferred-countries="['CH', 'US', 'GB', 'KR', 'FR', 'NL', 'DE', 'SG']"
						:ignored-countries="['AC']"
						size="md"
						countrySelectorWidth="6rem"
						@update="onPhoneUpdated"
						@focusout="onPhoneUpdated"
					/>
					<div v-if="phoneNumberValid === false && phoneNumber !== undefined"
						class="pointer-events-none absolute inset-y-0 right-2 top-0.5 flex items-center pr-3 z-10">
						<ExclamationCircleIcon class="h-5 w-5 text-red-700" aria-hidden="true" />
					</div>
				</div>

				<!-- Contact Email.  -->
				<div class="px-2 pt-2">
					<!-- <label for="email" class="mt-2 block text-sm font-medium leading-6 text-gray-900">Email</label> -->
					<div class="relative mt-1 rounded-md shadow-sm">
						<div class="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3 ">
							<EnvelopeIcon class="w-6 text-gray-400" aria-hidden="true" />
						</div>
						<input 
							v-model="state.email" 
							type="email" name="email" id="email" 
							class="block w-full rounded-md border-0 py-2.5 pl-11 
								ring-1 ring-inset  placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 
								sm:text-sm sm:leading-6" 
							:class="(v$.email.$invalid && v$.email.$dirty) ? 'text-red-700  ring-red-700' : 'text-gray-900  ring-gray-300' "
							placeholder="you@example.com" 
							@focusout="v$.email.$touch"
						/>
						<div v-if="v$.email.$invalid && v$.email.$dirty"
							class="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-3">
							<ExclamationCircleIcon class="h-5 w-5 text-red-700" aria-hidden="true" />
						</div>
					</div>

				</div>

				<!-- Get your phone and email right!  -->
				<p 
					id="contact-warning"
					class="mt-2 px-4 italic text-sm text-gray-500"
				>
					<span class="font-medium text-red-700 not-italic">Important!</span> 
					Please make sure that your Phone Number &amp; Email are correct &ndash; and that you can access them when traveling.
				</p>

			</div>  <!-- ******************* END: Contact inputs. ******************* -->


			<!-- ******************* Passenger form inputs. ******************* -->
			<div id="contactInputs"
				v-if="index >= 1"
			>
			name 

			</div>  <!-- ******************* END: Passenger inputs. ******************* -->


			<div id="footer-spacer" class="h-6"></div>
		</form>
		<!-- </form> -->

	</div>

</template>




<script setup>
	import { ref, reactive, computed, onMounted, watch } from 'vue'

	// Vuelidate.
	import { useVuelidate } from '@vuelidate/core'
	import { required, email } from '@vuelidate/validators'

	// Components.
  import MazPhoneNumberInput from 'maz-ui/components/MazPhoneNumberInput'
  import 'maz-ui/css/main.css'

	// Tailwind UI
	import { EnvelopeIcon, ExclamationCircleIcon } from '@heroicons/vue/20/solid'


	// ----------- Props ------------
	const props = defineProps({
		index: [Number],
	})

  // ----------- Events ------------
  const emit = defineEmits(['changed'])

	onMounted(() => {

	})


	// const passengerValid = ref(true)
	const phoneNumber = ref()
	const phoneNumberValid = ref(false)
	// const phoneResults = ref()

	const contactName = ref('Chris B.')

	const state = reactive({
	// 	name: '',
		email: ''
	})
	const rules = {
		// name: { required },			// Matches state.name
		email: { required, email }	// Matches state.contact.email
		
	}

	const v$ = useVuelidate(rules, state)
	


	function onPhoneUpdated(ev) {
    //console.log('Phone Valid: ', ev.isValid, phoneNumber.value)
		if ( ev.isValid === undefined ) return 		// stop from setting to undefined
		phoneNumberValid.value = ev.isValid
  }


			
	const isPassengerPanelValid = computed(() => {

		// Contact Passenger Phone + Email valid.
		if (props.index === 1 ) {
			if (isContactInfoValid() === false) return false
		}

		return true

	})

	watch(isPassengerPanelValid, ( newValue, oldValue ) => {
    console.log('Form Valid changed', newValue, oldValue)
  })


	function isContactInfoValid() {

		// problems with country code and/or phone nr being undefined.
		// FIXED -> Stopped the onPhoneUpdated() event from resetting to undefined,
		//          which was causing all of the hair-pulling here.
		
		// console.log('phoneNumber:', phoneNumber.value )
		// console.log('phoneNumberValid:', phoneNumberValid.value )
		// can be undefined, true or false.


		// phoneNumberValid.value === undefined, means the phone is invalid.
		if (phoneNumberValid.value === undefined && phoneNumber.value === undefined) {
			console.log('- phone and phoneValid are both undefined. -> Form valid: false. ' )
			return false
		}
		if (phoneNumberValid.value !== undefined && phoneNumberValid.value === false ) {
			console.log('- phoneValid is FALSE. -> Form valid: false')
			return false
		}

		if (props.index === 1 && v$.value.email.$invalid === true) {
			console.log('- Email is invalid')
			return false
		}
		
		return true

	}

</script>


<style>

	/* Hide the Country drop button.  */
	div.m-input-wrapper-right {
		display: none !important;
	}


	button.m-phone-number-input__country-flag {
		left: 20px !important
	}


</style>