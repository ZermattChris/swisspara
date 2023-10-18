<template>
    <div id="app" class="w-full h-24 outline">
        <component :is="myComponent"></component>
    </div>
    <button @click="myComponent ='PageDate'">PageDate</button>
    <button @click="myComponent ='PageFlight'">PageFlight</button>
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