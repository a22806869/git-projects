new Vue({
    el: '#vue-app',
    data: {
        output: 'empty now'
    },
    methods: {
        readRefs: function () {
            console.log(this.$refs.test.innerText);
            this.output = this.$refs.input.value
        }
    }
})