<template>
    <div id="app" class="w-full min-h-[450px] outline">
        <component :is="currPage" />
    </div>

    {{ isFirstPage }}

    {{isLastPage}}

    <p>Current Page: {{ currentPage }} - Name: {{ currentPageName }}</p>

    <!-- Previous/Next Buttons -->
    <div class="flex justify-around mt-10 mb-10 max-w-xl mx-auto" >

        <button @click="prevPage" type="button" 
            class="inline-flex items-center gap-x-1.5 rounded-md bg-indigo-600 px-2.5 py-1.5 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
            :class="{ disabled: isFirstPage }"
        >
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" class="w-6 h-6">
                <path fill-rule="evenodd" d="M12 2.25c-5.385 0-9.75 4.365-9.75 9.75s4.365 9.75 9.75 9.75 9.75-4.365 9.75-9.75S17.385 2.25 12 2.25zm-4.28 9.22a.75.75 0 000 1.06l3 3a.75.75 0 101.06-1.06l-1.72-1.72h5.69a.75.75 0 000-1.5h-5.69l1.72-1.72a.75.75 0 00-1.06-1.06l-3 3z" clip-rule="evenodd" />
            </svg>
            Previous
        </button>


        <button @click="nextPage" type="button" 
            class="inline-flex items-center gap-x-1.5 rounded-md bg-indigo-600 px-2.5 py-1.5 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
            :class="{ disabled: isLastPage }"
        >
            Next 
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" class="w-6 h-6">
                <path fill-rule="evenodd" d="M12 2.25c-5.385 0-9.75 4.365-9.75 9.75s4.365 9.75 9.75 9.75 9.75-4.365 9.75-9.75S17.385 2.25 12 2.25zm4.28 10.28a.75.75 0 000-1.06l-3-3a.75.75 0 10-1.06 1.06l1.72 1.72H8.25a.75.75 0 000 1.5h5.69l-1.72 1.72a.75.75 0 101.06 1.06l3-3z" clip-rule="evenodd" />
            </svg>
        </button>    

    </div>

</template>


<script>

    import PageDate from '@components/booking/Date.vue'
    import PageFlight from '@components/booking/Flight.vue'
    import PageTime from '@components/booking/Time.vue'
    import PagePassengers from '@components/booking/Passengers.vue'
    import PagePay from '@components/booking/Payment.vue'

    import {pagesStore} from '@stores/vPagesStore.js'    

    export default {

        name: "app",
        components: {
            PageDate,
            PageFlight,
            PageTime,
            PagePassengers,
            PagePay
        },

        data() {
            return {
                currPage: "PageDate",
            };
        },

        mounted() {
            // Send our page list as strings to the store.
            pagesStore.initNav(['PageDate', 'PageFlight', 'PageTime', 'PagePassengers', 'PagePay'])
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
            }

        }, // computed

        methods: {

            prevPage() {
                if (this.isFirstPage) return
                pagesStore.prev()
            },

            nextPage() {
                if (this.isLastPage) return
                pagesStore.next()
            },


        }, // methods

        watch: {
            // whenever question changes, this function will run
            currentPageName(newPage, oldPage) {
                console.log("newPage, oldPage: ", newPage)
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