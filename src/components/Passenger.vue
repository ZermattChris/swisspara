<template>

	<!-- Passenger Outline box.  -->
	<div	
		class="mr-2 my-2 border-2 border-orange-200 rounded-md"
	>
	
		<!-- Have the wrapping form collect all of the input changes and send them to the parent Passenger.vue -->
		<form
			:id="`passengerForm_${index}`" 
			@change="$emit('change', {'index':index, 'formValid':isPassengerPanelValid, 'target':$event.target, 'value':$event.target.value, '$event':$event, 'phone':phoneNumber, 'state':state})"
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
					<span class="font-bold">{{ state.name }}</span>
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




			<!-- ******************* START: Contact Person form inputs. ******************* -->
			<div :id="`contactInputs_${index}`"
				class="pt-4"
				v-if="index === 1"
			>
			<p 
					:id="`contact-warning_${index}`"
					class="mt-0 mb-4 px-4 text-sm text-gray-700"
				>
					Please make sure that your Phone Number &amp; Email are correct &ndash; and that you have 
          <span class="underline">access</span> to them when traveling.
				</p>

				<!-- Phone Number. -->
				<div class="relative">
					<!-- <label for="contactPhone" class="mt-2 px-2 block text-sm font-medium leading-6 text-gray-900">Phone</label> -->
					<MazPhoneNumberInput
						:id="`contactPhone_${index}`"
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
							type="email" name="email" :id="`email_${index}`" 
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
					:id="`contact-warning_${index}`"
					class="mt-2 px-4 italic text-sm text-gray-500"
				>
					<span class="font-medium text-red-700 not-italic">Important!</span> 
					Please make sure that your Phone Number &amp; Email are correct &ndash; and that you can access them when traveling.
				</p>

        <div class="px-4 mt-4 inset-0 flex items-center" aria-hidden="true">
          <div class="w-full border-t border-gray-300" ></div>
        </div>

			</div>  <!-- ******************* END: Contact inputs. ******************* -->




			<!-- ******************* START: Passenger form inputs. ******************* -->
			<div :id="`passengerInputs_${index}`">
				
				<!-- Passenger's Name  -->
				<div class="px-2 pt-2">
					<label v-if="index === 1" :for="`contactName_${index}`" class="mt-2 block text-sm font-medium leading-6 text-gray-900">First &amp; Last Name</label>
					<label v-if="index > 1" :for="`contactName_${index}`" class="mt-2 block text-sm font-medium leading-6 text-gray-900">Name</label>
					<div class="relative mt-1 rounded-md shadow-sm">
						<div v-if="index === 1"  class="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3 ">
							<UserPlusIcon class="w-6 text-gray-400" aria-hidden="true" />
						</div>
						<div v-if="index > 1"  class="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3 ">
							<UserIcon class="w-6 text-gray-400" aria-hidden="true" />
						</div>
						<input 
							v-model="state.name" 
							type="text" :name="`contactName_${index}`" :id="`contactName_${index}`" 
							class="block w-full rounded-md border-0 py-2.5 pl-11 
								ring-1 ring-inset  placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 
								sm:text-sm sm:leading-6" 
							:class="(v$.name.$invalid && v$.name.$dirty) ? 'text-red-700  ring-red-700' : 'text-gray-900  ring-gray-300' "
							:placeholder=" index === 1 ? 'Contact First, Last Name' : 'Name'    " 
							@focusout="v$.name.$touch"
						/>
						<div v-if="v$.name.$invalid && v$.name.$dirty"
							class="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-3">
							<ExclamationCircleIcon class="h-5 w-5 text-red-700" aria-hidden="true" />
						</div>
					</div>
					<!-- We need the Passenger Name!  -->
					<p v-if="index === 1 && (v$.name.$invalid && v$.name.$dirty)"
						:id="`contact-warning_${index}`"
						class="mt-2 px-4 italic text-sm text-red-700"
					>-
						Contact Passenger's First &amp; Last Names are required.
					</p>
					<p v-if="index > 1 && (v$.name.$invalid && v$.name.$dirty)"
						:id="`contact-warning_${index}`"
						class="mt-2 px-4 italic text-sm text-red-700"
					>
						Passenger Name is required.
					</p>

				</div>


				<!-- Horizontal grouping for Sex & Age inputs. -->
				<div class="flex justify-around pt-4">

					<!-- Sex Radio Group. -->
					<fieldset class="mt-2">
						
						<div class="flex flex-center mb-1">
              <input 
                :id="`M_Check_${index}`" 
                :name="`Sex_Check_${index}`" 
                type="radio" 
                v-model="state.sex"
                value="male"
                @focusout="sexTouched = true"
                :checked="state.sex === 'male'"
                class="h-5 w-5  border-2 border-gray-400 text-indigo-600 focus:ring-gray-300"
              />
              <label :for="`M_Check_${index}`" 
                class="ml-2 block font-medium leading-6 "
                :class="( sexTouched === false || v$.sex.$invalid === false ) ? 'text-gray-900' : 'text-red-700' "
              >
                Male
              </label>
            </div>
							
            <div class="flex flex-center">
              <input 
                :id="`FCheck_${index}`" 
                :name="`Sex_Check_${index}`" 
                type="radio" 
                v-model="state.sex"
                value="female"
                @focusout="sexTouched = true"
                :checked="state.sex === 'female'"
                class="h-5 w-5 border-2 border-gray-400 text-indigo-600 focus:ring-gray-300"
              />
              <label :for="`FCheck_${index}`" 
                class="ml-2 block font-medium leading-6 text-gray-900"
                :class="( sexTouched === false || v$.sex.$invalid === false ) ? 'text-gray-900' : 'text-red-700' "
              >
                Female
              </label>
            </div>
            <!-- {{ v$.sex.$invalid === true }} {{ sexTouched }} {{ state.sex === '' }} -->
					</fieldset>

					<!-- <NumberSpinner
            class="mt-2"
            :defVal="state.age"
            min="5"
            max="69"
            @change="onAgeChanged"
          /> -->

          <!-- Only show all the missing/bad field inputs when the user sends focus to another
          Passenger form, or tries to click the next button. -->

          <!-- Age input.  -->
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
                :class="ageInt !== null && ageInt <= minVal ? 'opacity-40' : 'opacity-100' "
              >
                <span class="m-auto text-2xl font-thin">−</span>
              </button>

              <input 
                :id="`Age_${index}`" 
                type="text" inputmode="numeric"
                class="z-[0]  ring-gray-400 ring-inset border-0 focus:outline-none text-center w-full 
                  font-semibold text-md 
                  hover:text-black focus:text-black  md:text-basecursor-default flex items-center text-gray-700  outline-none
                  placeholder:font-light placeholder:italic placeholder:text-slate-400" 
                :class="v$.age.$invalid && ageTouched === true ? 'ring-red-400  ring-[2px]' : 'ring-gray-400 ring-[1px]' "
                name="custom-input-number" 
                autocomplete="off"
                :value="ageInt"
                @focusout="ageTouched = true"
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
                :class="ageInt >= maxVal ? 'opacity-40' : 'opacity-100' "
              >
                <span class="m-auto text-2xl font-thin">+</span>
              </button>
            </div>
            <p v-if="v$.age.$invalid && ageTouched === true"
              :id="`age-error-warning_${index}`"
              class="mt-2 px-0 absolute italic text-sm text-red-400"
            >
              Your Age is required.
            </p>
            <p v-if="(ageInt <= minVal) && v$.age.$invalid === false"
              :id="`age-min-warning_${index}`"
              class="mt-2 px-0 absolute italic text-sm text-gray-700"
            >
              5 years is the minimum age.
            </p>
            <p v-if="ageInt >= maxVal"
              :id="`age-max-warning_${index}`"
              class="mt-2 px-0 absolute italic text-sm text-gray-700"
            >
              69 years is the maximum age.
            </p>

            <!-- {{ ageInt }} {{ state.age }} -->
          </div>

				</div>



			</div>  <!-- ******************* END: Passenger inputs. ******************* -->


			<div id="footer-spacer" class="h-6"></div>

		</form>

	</div>
</template>




<script setup>
	import { ref, reactive, computed, onMounted, watch } from 'vue'

	import {pagePassengersStore as store} from '@stores/pagePassengersStore.js' 

	// Vuelidate.
	import { useVuelidate } from '@vuelidate/core'
	import { required, email, minLength } from '@vuelidate/validators'

	// Components.
  import MazPhoneNumberInput from 'maz-ui/components/MazPhoneNumberInput'
  import 'maz-ui/css/main.css'
	import NumberSpinner from '@components/NumberSpinner.vue'

	// Tailwind UI
	import { EnvelopeIcon, ExclamationCircleIcon, UserIcon, UserPlusIcon } from '@heroicons/vue/20/solid'


	// ----------- Props ------------
	const props = defineProps({
		index: [Number],
	}) 

  // ----------- Events ------------
  const emit = defineEmits(['change'])


	const phoneNumber = ref()
	const phoneNumberValid = ref(false)

	const sexTouched = ref(false)   // Sounds wrong, but keep track if user has touched sex.
	const ageTouched = ref(false)


  /**-------------------------------------------------------------------------
   * Age input controls.
   */
  const ageInt = ref(null)     // Doing this seperately as we want to keep the inital input as an empty string.
  const minVal = 5
  const maxVal = 69

  function onInput(ev) {
    // Need to listen for this event and update the ageInt manually.
    // This event gets called on every keypress, so don't do any range
    // checks here -- onChanged() handles bad value resets.
    console.log('onInput',ev.target.value)
    //onChanged(ev)
    // const enteredVal = parseInt(ev.target.value)
    // ageInt.value = enteredVal
  }

	function onChanged(ev) {
    // Need to listen for this event and update the ageInt manually.
    // console.log('onChanged',ev.target.value,  isNaN(ev.target.value))

    const evVal = ev.target.value
    if ( evVal.trim() == '' || isNaN(evVal) ) {
      // Bad data entered, best would be to set back to empty.
      console.log('Not a number, reset.', ev.target.value)
      ageInt.value = null
      state.age = ''
      // Pesky Age input is not updating, need to do it manually. Uhg.
      const ageInputField = document.getElementById("Age_" + props.index)
      ageInputField.value = ''
      return
    }

    const enteredVal = parseInt(ev.target.value)
    //console.log('onInput:', enteredVal)
    if (enteredVal < minVal) {
      //console.log('onInput under Min:', enteredVal)   // set an info field for user to know what's up.
      ageInt.value  = minVal
      state.age = ageInt.value    // update the state here. 
      return
    }
    if (enteredVal >= maxVal) {
      // console.log('onInput over Max:', enteredVal)  // set an info field for user to know what's up.
      ageInt.value  = maxVal
      state.age = ageInt.value    // update the state here. 
      return
    }
    // Need to trigger a 'change' event to send to parent.
    // emit('change', ev)
    ageInt.value  = enteredVal
    state.age = ageInt.value    // update the state here. 
  }


	function increment(val, ev) {
    ev.preventDefault()
    let targetVal = -1
    // Initialize ageInt to minVal if not yet set by user or cache.
    if (ageInt.value === null) {
      ageInt.value  = minVal
      state.age = ageInt.value    // update the state here. 
      return
    }
    targetVal = (ageInt.value  + val)
    if (targetVal < minVal) {
      // console.log('!at minVal. no update.')
      return
    }
    if (targetVal > maxVal) {
      // console.log('!at maxVal. no update.')
      return
    }
    ageInt.value  += val
    state.age = ageInt.value    // update the state here. 
  }






  /**-------------------------------------------------------------------------
   * Set up data from the cache.
   * Set up Validations for pesky forms.
   */
	onMounted(() => {

		// load data from cache/store.
		const cache = store.getAllPassengersList()[props.index]
		console.log("Passenger cache", cache)		// works! Gives an empty cache if bad data.
		
		// Load into our form fields, careful for undefined, etc.
		if ( cache !== undefined ) {
			if (cache.phone !== undefined) phoneNumber.value = cache.phone		// handle differently as funky phone input.
			if (cache.name !== undefined) state.name = cache.name
			if (cache.email !== undefined) state.email = cache.email
			if (cache.sex !== undefined) state.sex = cache.sex
			if (cache.age!== undefined) {
        state.age = cache.age
        if (state.age !== '') {
          console.log("state.age not empty", state.age)
          ageInt.value = Number(state.age)
        } else {
          console.log("state.age empty", state.age)
        }
      }

		}
	})


	const state = reactive({
		name: '',
		email: '',
		age: '',
    sex: '',
    age: '',
	})
	const validations = {
		name: { required, minLength:minLength(1)  },	// Matches state.name
		email: { required, email },
		age: { required, email },
		sex: { required },
		age: { required },
		
	}
	const v$ = useVuelidate(validations, state)
	


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
		// Passenger Name
		if ( v$.value.name.$invalid === true ) return false

		// Passenger Sex
		if ( v$.value.sex.$invalid === true ) return false

		// Passenger Age
		if ( v$.value.age.$invalid === true ) return false

		return true

	})

  // HEAD'S UP!!! The change event is only called if isPassengerPanelValid changes. Hmmm...
	watch(isPassengerPanelValid, ( newValue, oldValue ) => {


		// Make sure we force the form to register a 'change' event
    //console.log('Form Valid change', newValue, oldValue)
		const t = "passengerForm_" + props.index
		const myForm = document.getElementById(t)
		if (myForm !== null && myForm !== undefined) {
			// console.log(myForm)
			myForm.dispatchEvent(new Event("change"))
		}

  })

  // My phone input isn't part of the general form handling. If user changes the
  // Country Code, I need to force an update.
  watch(phoneNumber, ( newValue, oldValue ) => {
    if ( newValue !== oldValue) {
      //console.log("phoneNumber changed. Update form", newValue)
      const t = "passengerForm_" + props.index
      const myForm = document.getElementById(t)
			myForm.dispatchEvent(new Event("change"))
    }
  })


  // function onAgeChanged(ev) {
  //   console.log('onAgeChanged: ', ev.target.value)
  //   // state.age = ev.target.value
  //   // console.log('v$.value.age.$invalid', v$.value.age.$invalid )
  // }

	function isContactInfoValid() {

		// problems with country code and/or phone nr being undefined.
		// FIXED -> Stopped the onPhoneUpdated() event from resetting to undefined,
		//          which was causing all of the hair-pulling here.
		
		// phoneNumberValid.value === undefined, means the phone is invalid.
		if (phoneNumberValid.value === undefined && phoneNumber.value === undefined) {
			//console.log('- phone and phoneValid are both undefined. -> Form valid: false. ' )
			return false
		}
		if (phoneNumberValid.value !== undefined && phoneNumberValid.value === false ) {
			//console.log('- phoneValid is FALSE. -> Form valid: false')
			return false
		}

		if (props.index === 1 && v$.value.email.$invalid === true) {
			//console.log('- Email is invalid')
			return false
		}

    // TODO. Sex.



    // Age
		// if (v$.value.age.$invalid === true) {
			
		// 	return false
		// }

		
		return true

	}

</script>


<style>

	/* Hide the Country drop button.  */
	div.m-input-wrapper-right {
		display: none !important;
	}


	button.m-phone-number-input__country-flag {
		left: 22px !important
	}
	div.m-input-wrapper-input #MazSelect-5 { 
		padding-left: 2.6rem !important;
	}

</style>