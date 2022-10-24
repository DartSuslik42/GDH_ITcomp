<template>
    <ol id="table_point">
        <Company v-for="(company, idx) in companies" :key="idx" :company="company"
            @select="emitSelectedCompany" @removeCompany="emitRemovedCompany"
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
            selectedComp: this.selected || null
        };
    },
    methods:{
        emitSelectedCompany(e){
            this.$emit('select', e)
        },
        emitRemovedCompany(e) {
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