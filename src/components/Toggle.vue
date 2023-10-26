<template>
    <SwitchGroup>
        <div class="flex items-center">
            <div class="py-16 ml-8">
                <Switch
                    v-model="toggled"
                    :class="toggled ? 'bg-lime-600' : 'bg-black/20'"
                    class="relative inline-flex h-[38px] w-[76px] shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75
                    outline outline-2 outline-offset-2 outline-black/20
                    "
                >
                    <span class="sr-only">Use setting</span>
                    <span
                        aria-hidden="true"
                        :class="toggled ? 'translate-x-9' : 'translate-x-0'"
                        class="pointer-events-none inline-block h-[34px] w-[34px] transform rounded-full bg-white shadow-lg ring-0 transition duration-200 ease-in-out"
                    ></span>
                </Switch>
            </div>
            <SwitchLabel class="ml-4">{{ label }}</SwitchLabel>
        </div>
    </SwitchGroup>

  </template>
  
  <script>

    import { Switch, SwitchGroup, SwitchLabel } from '@headlessui/vue'


    export default {
        name: 'PhotosToggle',
		emits: ['change'],

        components: {    
            Switch, SwitchGroup, SwitchLabel
        },
        
		props: {
			label: { type: String, default: 'Label as Prop' },
            enabled:  { type: Boolean, default: false }
		},

		data() {
			return {

                toggled: this.enabled
        
            };
		},
        
        watch: {

            toggled(val) {
                //console.log("change: ", val)
                this.$emit( 'change', val )
            },

        }, // watch

    };

  </script>
  