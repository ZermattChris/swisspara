<script>
    export default {
        name: '_Page',

        emits: ['pagevalid'],

        mounted() {
            //console.log('mounted _Page')
            this.emitPageValidity()
        },
        updated() {
            // console.log('updated pageValid:', flightDateStore.isPageValid())
            this.emitPageValidity()
            //console.log('updated _Page')
        },
        methods: {

            emitPageValidity() {
                //console.log("emitPageValidity: ", this.$.type.name)
                const pageName = this.$.type.name //'PageDate'
                const isPageValid = this._isPageValid
                this.$emit( 'pagevalid', pageName, isPageValid )
            },

        },

    }
</script>