<template>
    <input ref="input" type="text" :placeholder="placeholder"
        @input="input"
        @focusout="$emit('input', real_num)"
        @keydown.enter="$emit('input', real_num)"
    >
</template>
<script>
const spaceSymbol = ","
const REGEXP = new RegExp(spaceSymbol,'g')
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
    data(){
        return{
            isFocused: false,
            real_num: this.$props.value,
        }
    },
    methods:{
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
            let cursorPos = e.target.selectionStart
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
            e.target.setSelectionRange(cursorPos,cursorPos)
        },
        updateInputValue(){
            this.$el.value = this.numFormat(this.$data.real_num)
        }
    },
    watch:{
        value(newVal){
            this.$data.real_num = newVal
            this.updateInputValue()
        },
    }
}
</script>