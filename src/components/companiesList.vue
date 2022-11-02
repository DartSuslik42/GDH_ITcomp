<template>
    <div>
        <div>
            <img id="logo" src="@/assets/gdh.png" alt="GDH" width="150px">
        </div>
        <div class="p-2">
            <b>Организации в анализе</b>
        </div>
        <ol id="table_point">
            <Company v-for="(company, idx) in companies" :key="idx" :company="company"
                @select="emitSelectedCompany" @removeCompany="emitRemovedCompany"
                :class="{active: company.IID === selectedComp?.IID}"
            />
        </ol>
    </div>
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
<style scoped>
ol{
    list-style-type: none;    
    padding-left: 5px;
}
div{
    padding:1px 3px
}
</style>