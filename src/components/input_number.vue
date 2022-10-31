<template>
    <b-form-input :size="$attrs.size" ref="input" type="text" :placeholder="$attrs.placeholder || '0'"
        @input.native="(e)=>{input(e); $emit('input', emit_num)}"
        @focusout="$emit('input', emit_num)"
        @keydown.enter.prevent="(event)=>{
            $emit('input', emit_num); 
            IterateThroughFormField(event.target, 'next')
        }"
        @keydown.ArrowDown.prevent="(event)=>{
            IterateThroughFormField(event.target, 'next')
        }"
        @keydown.ArrowUp.prevent="(event)=>{
            IterateThroughFormField(event.target, 'prev')
        }"
    ></b-form-input>
</template>
<script>
const spaceSymbol = ","
const REGEXP = new RegExp(spaceSymbol,'g')
export default{
    name:'InputNumber',
    props: {
        default:{
            type: Number,
            required: false,
            default:0
        },
        value:{
            type: [Number, String],
            validator(val){
                return !isNaN(+val)
            }
        }
    },
    data(){
        return{
            isFocused: false,
            real_num: this.$props.value,
        }
    },
    methods:{
        IterateThroughFormField(elem, dir){
            dir = ['next','prev'].indexOf(dir) > -1 ? dir : 'next'

            const currentIndex = Array.from(elem.form.elements).indexOf(elem);
            elem.form.elements.item(
                currentIndex < elem.form.elements.length - 1 ? currentIndex + (dir === 'next' ? 1 : -1) : 0
            ).focus();
        },
        numFormat(n){
            if (n === 0) return '0';
            var output = [];
            for (; n > 0; ) {
                const k = n % 1000
                n = Math.floor(n/1000)
                output.unshift(((n?'000':'') + k).slice(-3));
            }
            return output.join(spaceSymbol);
        },
        removeSpaces(val){
            return val.replace(REGEXP, '');
        },
        input(e){
            const input_val = e.target.value
            let cursorPos = this.$el.selectionStart
            const newVal = +this.removeSpaces(input_val)
            if(Number.isInteger(newVal)){
                this.$data.real_num = newVal
                this.updateInputValue()
                const delta = this.$el.value.length - input_val.length
                if(delta) cursorPos += delta
            }else{
                this.updateInputValue()
                cursorPos--
            }
            if(cursorPos < 0) cursorPos = 0
            this.$el.setSelectionRange(cursorPos,cursorPos)
        },
        updateInputValue(){
            if(this.$data.real_num === 0){
                this.$el.value = null
                return
            }
            this.$el.value = this.numFormat(this.$data.real_num)
        }
    },
    watch:{
        value(newVal){
            this.$data.real_num = newVal
            this.updateInputValue()
        },
    },
    computed:{
        emit_num(){
            return typeof this.$data.real_num === 'undefined' ? this.$props.default : this.$data.real_num
        }
    }
}
</script>
<style scoped>
input{
    text-align: right;
}
</style>