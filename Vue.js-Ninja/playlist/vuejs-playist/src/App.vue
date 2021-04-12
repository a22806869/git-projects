<template>
<div>
  
</div>
</template>

<script>
import formOne from'./components/formOne.vue'
import formTwo from'./components/formTwo.vue'



  export default{
  components:{
    'form-helper':formHelper
  },
  data() {
    return {
      title:'I am a dynamic slot title'
    }
  },
  methods: {
      }
    }
  
</script>
<style>

</style>
