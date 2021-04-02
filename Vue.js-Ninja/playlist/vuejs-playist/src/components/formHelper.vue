<template>
    <div>
        <h1>Please fill out our form...</h1>
        <form >
            <div id="form-header">
                <slot name="form-header"></slot>
            </div>
            <div id="form-fields">
                <slot name="form-fields"></slot>
            </div>
            <div id="form-controls">
                <slot name="form-controls"></slot>
            </div>
            <div id="uesful-links">
                <ul>
                    <li><a href="#">link1</a></li>
                    <li><a href="#">link2</a></li>
                    <li><a href="#">link3</a></li>
                    <li><a href="#">link4</a></li>
                </ul>
            </div>
        </form>
    </div>
</template>

<script>
  
  export default{
    components:{

    },
    data() {
    return {
        
    }
    },
    
    methods: {  
       
        } 
    }
</script>

<style scoped>
h1{
    color:red;
    text-align:center;
}

#form-header div{
    padding:20px;
    background:gray;
}

#form-fields{
    padding:20px;
    background:gray;
    margin:20px 0;
}

#uesful-links{
    padding:20px;
    background:gray;
    margin:20px 0;
}

#form-controls{
    padding:20px;
    background:gray;
    margin:20px 0;
}
</style>
