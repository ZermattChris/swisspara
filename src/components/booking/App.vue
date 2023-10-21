<template>

    <!-- Dynamic Vue 'Page' components being swapped out  -->
    <!-- Listen to current page's validity events.  -->
    <div id="app" class="absolute top-[5em] w-full min-h-[450px] overflow-hidden">
        <component :is="currPage" @pagevalid="onPageValid" />
    </div>


    <!-- Previous/Next Buttons -->
    <div class="fixed bottom-0 right-0 left-0  z-40  flex justify-around pt-3 pb-10 max-w-xl mx-auto bg-white" >

        <button @click="prevPage" type="button" 
            class="min-w-[8em] inline-flex items-center justify-center gap-x-1.5 rounded-md bg-indigo-600 px-2.5 py-1.5 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
            :class="{ disabled: isFirstPage }"
        >
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" class="w-6 h-6">
                <path fill-rule="evenodd" d="M12 2.25c-5.385 0-9.75 4.365-9.75 9.75s4.365 9.75 9.75 9.75 9.75-4.365 9.75-9.75S17.385 2.25 12 2.25zm-4.28 9.22a.75.75 0 000 1.06l3 3a.75.75 0 101.06-1.06l-1.72-1.72h5.69a.75.75 0 000-1.5h-5.69l1.72-1.72a.75.75 0 00-1.06-1.06l-3 3z" clip-rule="evenodd" />
            </svg>
            Previous
        </button>


        <button @click="nextPage" type="button" 
            class="min-w-[8em] inline-flex items-center justify-center gap-x-1.5 rounded-md bg-indigo-600 px-2.5 py-1.5 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
            :class="{ disabled: isLastPage }"
        >
            Next 
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" class="w-6 h-6">
                <path fill-rule="evenodd" d="M12 2.25c-5.385 0-9.75 4.365-9.75 9.75s4.365 9.75 9.75 9.75 9.75-4.365 9.75-9.75S17.385 2.25 12 2.25zm4.28 10.28a.75.75 0 000-1.06l-3-3a.75.75 0 10-1.06 1.06l1.72 1.72H8.25a.75.75 0 000 1.5h5.69l-1.72 1.72a.75.75 0 101.06 1.06l3-3z" clip-rule="evenodd" />
            </svg>
        </button>    


        <footer id="footbar" 
            class="absolute -bottom-2 w-screen h-8 "
        >
            <p class="pt-1 text-center text-[0.7em] text-gray-400">© <span id="year">2023</span> Swiss Paraglide Zermatt. All rights reserved.</p>
        </footer>

        
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


    // Pages.
    import PageDate from '@components/booking/Date.vue'
    import PageFlight from '@components/booking/Flight.vue'
    import PageTime from '@components/booking/Time.vue'
    import PagePassengers from '@components/booking/Passengers.vue'
    import PagePay from '@components/booking/Payment.vue'

    // Store
    import {pagesStore} from '@stores/pageStore.js' 
    

    export default {

        name: "app",
        components: {
            PageDate,
            PageFlight,
            PageTime,
            PagePassengers,
            PagePay,
        },

        data() {
            return {
                currPage: "PageDate",
            };
        },

        mounted() {
            // Send our page list as strings to the store.
            // Need to add 'label' and 'icon' to use in Breadcrumbs.
            pagesStore.initNav([
                'PageDate', 
                'PageFlight', 
                'PageTime', 
                'PagePassengers', 
                'PagePay'
            ])
        },



        computed: {

            currentPage() {
                return pagesStore.page
            },
            currentPageName() {
                return pagesStore.currentPageName()
            },

            isFirstPage() {
                return pagesStore.isNavStart()
            },
            isLastPage() {
                return pagesStore.isNavEnd()
            },

        }, // computed




        methods: {

            onPageValid(pageName, isValid) {
                console.log("pageName:", pageName, "isValid:", isValid)
            },

            prevPage() {
                if (this.isFirstPage) return
                pagesStore.prev()
            },

            nextPage() {
                if (this.isLastPage) return
                pagesStore.next()
            },

            goToPage( pageName, ev ) {
                // Need checks if in list and available to click on (completed)
                // - If the current page is 'invalid/not-completed', find closest
                //   Previous page to go to.
                // TODO
                // -> Needs to update in the store first.
                ev.preventDefault()
                this.currPage = pageName
            },


        }, // methods

        watch: {
            // whenever question changes, this function will run
            currentPageName(newPage, oldPage) {
                //console.log("newPage: ", newPage)
                this.currPage = newPage
            }
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