<template>
    <ol id="table_point">
        <Company v-for="(company, idx) in companies" :key="idx" :company="company"
            @select="updSelectedComp" @removeCompany="removeCompany"
            :class="{active: company.IID === selectedComp?.IID}"
        />
    </ol>
</template>
<script>
import Company from "./company.vue";
export default{
    props: {
        companies: Array,
        selected: {
            type: Object,
            required: false,
            default: null
        }
    },
    data() {
        return {
            selectedComp: this.selected ? this.selected : null
        };
    },
    methods:{
        updSelectedComp(val){
            if(val.IID === this.$data.selectedComp?.IID){
                this.$data.selectedComp = null
            }else{
                this.$data.selectedComp = val
            }
            this.$emit('select', this.$data.selectedComp)
        },
        removeCompany(e) {
            this.$emit('removeCompany', e)
        }
    },
    watch:{
        selected(val){
            this.$data.selectedComp = val
        }
    },
    components: { Company }
}
</script>