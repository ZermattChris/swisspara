<template>

    <!-- Dynamic Vue 'Page' components being swapped out  -->
    <!-- Listen to current page's validity events.  -->
    <div id="app" 
        class="absolute top-[4em] w-full min-h-[450px] overflow-hidden"
    >
        <div id="sizeBox"
            class="
            w-full max-[320px]:w-11/12
            mx-auto 
            px-0 sm:px-0
            py-6 sm:py-16"
            @click="onBackgroundClick"
        >

            <component :is="currentPageName"
                @pagevalid="onPageValidEvent"
            ></component>

        </div>
    </div>


    <!-- Previous/Next Buttons -->
    <div class="fixed bottom-0 right-0 left-0
            border-[1px] border-gray-300
            pt-3 pb-4 md:pb-20
            mx-auto 
            bg-gray-100" >

        <div class="max-w-xl flex justify-around m-auto">
            <button @click="prevPage" type="button" 
                id="prevBtn"
                class="
                    text-sm lg:text-lg
                    min-w-[8em] inline-flex items-center justify-center gap-x-1.5 rounded-md bg-indigo-600 px-2.5 py-1.5  font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                :class="{ invisible: isFirstPage }"
            >
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" class="w-6 h-6">
                    <path fill-rule="evenodd" d="M12 2.25c-5.385 0-9.75 4.365-9.75 9.75s4.365 9.75 9.75 9.75 9.75-4.365 9.75-9.75S17.385 2.25 12 2.25zm-4.28 9.22a.75.75 0 000 1.06l3 3a.75.75 0 101.06-1.06l-1.72-1.72h5.69a.75.75 0 000-1.5h-5.69l1.72-1.72a.75.75 0 00-1.06-1.06l-3 3z" clip-rule="evenodd" />
                </svg>
                Previous
            </button>

            <span></span> 
            
            <span id="reset" 
                v-if="showDevInfos"
                class="select-none absolute" 
                @dblclick="onResetLocalStorage"
            >

                {{ getAPIType }} <br/>

                {{ isPageValid ? 'Page: valid': 'Page: invalid' }}
                
            </span>


            <button @click="nextPage" type="button" 
                id="nextBtn"
                class="
                    text-sm lg:text-lg min-w-[8em] inline-flex items-center justify-center gap-x-1.5 rounded-md bg-indigo-600 px-2.5 py-1.5 font-semibold text-white shadow-sm  outline outline-2 outline-offset-2 outline-indigo-600"
                :class="[nextBtnHidden, nextBtnDisabledClass, { 'hover:bg-indigo-500': nextBtnDisabledProp }]"
                :disabled="nextBtnDisabledProp"
            >
                Next 
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" class="w-6 h-6">
                    <path fill-rule="evenodd" d="M12 2.25c-5.385 0-9.75 4.365-9.75 9.75s4.365 9.75 9.75 9.75 9.75-4.365 9.75-9.75S17.385 2.25 12 2.25zm4.28 10.28a.75.75 0 000-1.06l-3-3a.75.75 0 10-1.06 1.06l1.72 1.72H8.25a.75.75 0 000 1.5h5.69l-1.72 1.72a.75.75 0 101.06 1.06l3-3z" clip-rule="evenodd" />
                </svg>
            </button>    


            <!-- <footer id="footbar" 
                class="absolute -bottom-2 w-screen h-8 "
            >
                <p class="pt-1 text-center text-[0.75em] text-gray-400">© <span id="year">2023</span> Swiss Paraglide Zermatt. All rights reserved.</p>
            </footer> -->

        </div>
        
    </div>

    <!-- <div class="fixed bottom-3 right-0 left-0 rounded overflow-auto p-6">
        <div class="flex justify-center">
            <div class="animate-bounce bg-white dark:bg-slate-800 p-2 w-8 h-8 ring-1 ring-slate-900/5 dark:ring-slate-200/20 shadow rounded-full flex items-center justify-center">
                <svg class="w-6 h-6 text-violet-500" fill="none" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" viewBox="0 0 24 24" stroke="currentColor">
                <path d="M19 14l-7 7m0 0l-7-7m7 7V3"></path>
                </svg>
            </div>
        </div>
    </div> -->

</template>


<script>

    import api from '@components/api/_apiBase.js'

    // Pages.
    import PageDate from '@components/booking/Date.vue'
    import PageFlight from '@components/booking/Flight.vue'
    import PageTime from '@components/booking/Time.vue'
    import PagePassengers from '@components/booking/Passengers.vue'
    import PagePay from '@components/booking/Payment.vue'

    // import PagePaySuccess from '@components/booking/Success.vue'
    // import PagePayFailed from '@components/booking/Failed.vue'

    // Store
    import {appStore} from '@stores/appStore.js' 
    

    export default {

        name: "app",
        components: {
            PageDate,
            PageFlight,
            PageTime,
            PagePassengers,
            PagePay,

            // PagePaySuccess,     // Not included in the initNav() below, as not part of Prev | Next navigation
            // PagePayFailed,      // Not included in the initNav() below, as not part of Prev | Next navigation
        },

        data() {
            return {
                // currPage: appStore.currentPageName(),
                isPageValid: false,              // Page is 'valid | completed' called from each Page's custom event.
            };
        },

        mounted() {
            // Send our page list as strings to the store.
            // Need to add 'label' and 'icon' to use in Breadcrumbs.
            appStore.initNav([
                PageDate, 
                PageFlight, 
                PageTime, 
                PagePassengers, 
                PagePay,
            ])

        },



        computed: {

            // shows a bit of dev info between the Prev | Next buttons.
            showDevInfos() {
                if (document.location) {
                    let host = new URL(document.location).hostname
                    if ( host == 'swissparaglide.com' ) return false
                }
                return true
            },

            getAPIType() {
                return 'API: ' + api.getAPIType()    // LIVE, STAGING or LOCAL
            },

            currentPageName() {
                return appStore.currentPageName()
            },

            /**
             * Used to control the 'disabled' .class of the Next button.
             */
            nextBtnHidden() {
                if ( this.isLastPage ) return 'invisible' 
            },
            nextBtnDisabledClass() {
                if ( !this.isPageValid ) return 'disabled:opacity-50'
            },
            nextBtnDisabledProp() {
                if ( !this.isPageValid ) return true
            },

            isFirstPage() {
                return appStore.isNavStart()
            },
            isLastPage() {
                return appStore.isNavEnd()
            },

        }, // computed




        methods: {

            swipeHandler() {
                console.log("Swiped!")
				
            },

            /**
             * This handles the custom event that is fired from each Page (via the _Page base class)
             * Here is where we manage enabling/disabling the Prev|Next buttons (Breadcrumbs...)
             * @param {String} pageName 
             * @param {Bool} isValid 
             */
            onPageValidEvent(pageName, isValid) {
                // console.log("APP PageName:", pageName + '.', " isValid:", isValid)
                this.isPageValid = isValid

                // set focus to Next Button
                if (isValid) {
				    document.getElementById("nextBtn").focus()
                }
				
            },

            prevPage() {
                if (this.isFirstPage) return
                appStore.prev()
                // set focus to Next Button
                document.getElementById("prevBtn").focus()
				
            },

            nextPage() {
                if (this.isLastPage || this.nextBtnDisabled) return
                appStore.next()
            },


            // Test method.
            onResetLocalStorage() {
                console.warn("-> RESET LocalStorage")
                appStore.resetLocalStorage()
                location.reload() 
                let span = document.getElementById('reset');
                span.appendChild( document.createTextNode(" - Reset") );
            }

        }, // methods

        watch: {
            // // Update when the current Page name changes.
            // currentPageName(newPage) {
            //     //console.log("newPage: ", newPage)
            //     this.currPage = newPage
            // }
        }, // watch

    }

</script>

<style>

    /* Disables the Prev/Next buttons */
    .disabled {
        opacity: 0.5;
        cursor: default;
    }
        .disabled:hover {
            background-color: rgb(88, 80, 236);
        }

</style>