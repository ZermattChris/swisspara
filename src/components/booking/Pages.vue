<template>
    <div id="app" class="w-full h-24 outline">
        <component :is="myComponent"></component>
    </div>
    <button @click="myComponent ='PageDate'">Page Date</button>
    <button @click="myComponent ='PageFlight'">Page Flight</button>

    <!-- Previous Button -->
    <a href="#" @click="myComponent ='PageDate'"
        class="flex items-center justify-center px-3 h-8 mr-3 text-sm font-medium text-gray-500 bg-white border border-gray-300 rounded-lg hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white">
        <svg class="w-3.5 h-3.5 mr-2" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none"
            viewBox="0 0 14 10">
            <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
            d="M13 5H1m0 0 4 4M1 5l4-4" />
        </svg>
        Page Date
    </a>
    <a href="#" @click="myComponent ='PageFlight'"
        class="flex items-center justify-center px-3 h-8 text-sm font-medium text-gray-500 bg-white border border-gray-300 rounded-lg hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white">
        Page Flight
        <svg class="w-3.5 h-3.5 ml-2" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none"
            viewBox="0 0 14 10">
            <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                d="M1 5h12m0 0L9 1m4 4L9 9" />
        </svg>
    </a>

</template>

<script>
    import PageDate from '@components/booking/Date.vue'
    import PageFlight from '@components/booking/Flight.vue'
    export default {
        name: "app",
        components: {
            PageDate,
            PageFlight,
        },
        data() {
            return {
                myComponent: "PageDate",
            };
        },
    };
</script>

<style scoped>
    #App {
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
    }
</style>