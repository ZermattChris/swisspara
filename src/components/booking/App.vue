<template>




<!-- <nav class="flex border-b border-t border-gray-200 bg-white" aria-label="Breadcrumb">
    <ol role="list" class="mx-auto flex w-full max-w-screen-md space-x-4 px-4 sm:px-6 lg:px-8"> -->
      <!-- <li class="flex">
        <div class="flex items-center">
          <a href="#" class="text-gray-400 hover:text-gray-500">
            <svg xmlns="http://www.w3.org/2000/svg" aria-hidden="true" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6">
                <path stroke-linecap="round" stroke-linejoin="round" d="M2.25 12l8.954-8.955c.44-.439 1.152-.439 1.591 0L21.75 12M4.5 9.75v10.125c0 .621.504 1.125 1.125 1.125H9.75v-4.875c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21h4.125c.621 0 1.125-.504 1.125-1.125V9.75M8.25 21h8.25" />
            </svg>
            <span class="sr-only">Home</span>
          </a>
        </div>
      </li> -->
      <!-- <li v-for="crumb in breadcrumbsList" :key="crumb.name" class="flex">
        <div class="flex items-center">
          <svg class="h-full w-6 flex-shrink-0 text-gray-200" viewBox="0 0 24 44" preserveAspectRatio="none" fill="currentColor" aria-hidden="true">
            <path d="M.293 0l22 22-22 22h1.414l22-22-22-22H.293z" />
          </svg>
          <a :href="crumb.name" @click="goToPage(crumb.name, $event)" class="ml-4 text-sm font-medium text-gray-500 hover:text-gray-700" :aria-current="crumb.current ? 'page' : undefined">{{ crumb.name }}</a>
        </div>
      </li>
    </ol>
  </nav> -->


    <!-- Dynamic Vue 'Page' components being swapped out  -->
    <div id="app" class="w-full min-h-[450px] overflow-hidden">
        <component :is="currPage" />
    </div>

    <!-- {{ isFirstPage }}

    {{isLastPage}}

    <p>Current Page: {{ currentPage }} - Name: {{ currentPageName }}</p> -->

    <!-- Previous/Next Buttons -->
    <div class="flex justify-around mt-10 mb-10 max-w-xl mx-auto" >

        <button @click="prevPage" type="button" 
            class="min-w-[9em] inline-flex items-center justify-center gap-x-1.5 rounded-md bg-indigo-600 px-2.5 py-1.5 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
            :class="{ disabled: isFirstPage }"
        >
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" class="w-6 h-6">
                <path fill-rule="evenodd" d="M12 2.25c-5.385 0-9.75 4.365-9.75 9.75s4.365 9.75 9.75 9.75 9.75-4.365 9.75-9.75S17.385 2.25 12 2.25zm-4.28 9.22a.75.75 0 000 1.06l3 3a.75.75 0 101.06-1.06l-1.72-1.72h5.69a.75.75 0 000-1.5h-5.69l1.72-1.72a.75.75 0 00-1.06-1.06l-3 3z" clip-rule="evenodd" />
            </svg>
            Previous
        </button>


        <button @click="nextPage" type="button" 
            class="min-w-[9em] inline-flex items-center justify-center gap-x-1.5 rounded-md bg-indigo-600 px-2.5 py-1.5 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
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


    // Pages.
    import PageDate from '@components/booking/Date.vue'
    import PageFlight from '@components/booking/Flight.vue'
    import PageTime from '@components/booking/Time.vue'
    import PagePassengers from '@components/booking/Passengers.vue'
    import PagePay from '@components/booking/Payment.vue'

    // Store
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


            breadcrumbsList() {

                let breadPagesList = []

                for (let index of Object.keys(pagesStore.pageItems)) {
                    const aPage = pagesStore.pageItems[index]
                    //console.log(aPage)
                    breadPagesList.push(
                        { name: aPage.name, current: false, completed: false }
                    )
                }

                return breadPagesList

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