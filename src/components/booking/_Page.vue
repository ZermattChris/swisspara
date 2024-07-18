<script>
    export default {
        name: '_Page',

        emits: ['pagevalid'],

        
        mounted() {
            //console.log('mounted _Page')
            this.emitPageValidity()
        },
        updated() {
            this.emitPageValidity()
            //console.log('updated _Page')
        },
        methods: {

            emitPageValidity() {
                // console.log("emitPageValidity: ", this.$.type.name)
                const pageName = this.$.type.name //'PageDate'
                // const isPageValid = this._isPageValid
                const isPageValid = this.valid()
                this.$emit( 'pagevalid', pageName, isPageValid )        // sends event back to 'App'
            },

            valid() {
                console.log("valid -> must be overriden by each Page component ")
            },

        },

    }
</script>