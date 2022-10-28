<template>
    <input type="number" pattern="\d*" :placeholder="placeholder" 
        :value=value @input="input"
    >
</template>
<script>
export default{
    name:'InputNumber',
    props: {
        placeholder:{
            type: [String, Number],
            default: 0
        },
        value:{
            type: [Number, String],
            validator(val){
                return !isNaN(+val)
            }
        }
    },
    methods:{
        input(e){
            this.$emit('input', +e.target.value)
        }
    }
}
</script>