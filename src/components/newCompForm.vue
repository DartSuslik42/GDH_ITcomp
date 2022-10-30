<script setup>
    import {companyData_perPeriod, Fields_Columns_Names as comp_field_names} from "@/js/const.js"
</script>

<template>
    <div id="form_comp">
        <form action="#" @submit.prevent="addNewCompany">
            <div>
                <div class="row">
                    <div class="col">
                        <span>Название</span>
                    </div>
                    <div class="col">
                        <input type="text" name="IID" placeholder="Введите название" v-model="currentCompany.IID"
                        @keydown.enter.prevent="(event)=>{
                            IterateThroughFormField(event.target, 'next')
                        }"
                        @keydown.ArrowDown.prevent="(event)=>{
                            IterateThroughFormField(event.target, 'next')
                        }">
                    </div>
                </div>
                <div class="row">
                    <div class="col">
                        <span>ОГРН</span>
                    </div>
                    <div class="col">
                        <input type="number" pattern="\d*" placeholder="Введите ОГРН" name="ogrn" v-model="currentCompany.ogrn"
                        @keydown.enter.prevent="(event)=>{
                            IterateThroughFormField(event.target, 'next')
                        }"
                        @keydown.ArrowDown.prevent="(event)=>{
                            IterateThroughFormField(event.target, 'next')
                        }"
                        @keydown.ArrowUp.prevent="(event)=>{
                            IterateThroughFormField(event.target, 'prev')
                        }">
                    </div>
                </div>
                
                <div class="row" v-for="(comp_field, idx) in Object.keys(companyData_perPeriod)" :key="idx">
                    <div class="col">
                        <span>{{comp_field_names[comp_field]}}</span>
                    </div>
                    <div class="col">
                        <InputNumber v-model="currentItem[comp_field]"/>
                    </div>
                </div>

                <div class="row">
                    <div class="col">
                        <button type="submit" class="btn btn-primary"
                        @keydown.ArrowUp.prevent="(event)=>{
                            IterateThroughFormField(event.target, 'prev')
                        }">
                            {{hasSelectedCompany ? "Сохранить изменения":"Добавить компанию"}}
                        </button>
                    </div>
                </div> 
            </div>
        </form>
    </div>
</template>

<script>
import {dummyFormCompany} from "@/js/const.js"
import InputNumber from '@/components/input_number.vue'
export default{
    components:{
        InputNumber
    },
    props:{
        selectedCompany:{
            type: Object,
            default: null
        },
        period:{
            type: Object,
            default: null
        }
    },
    data(){
        return{
            currentCompany: this.selectedCompany || this.getDummyFormCompany(),
            currentItem: this.emptyDataItem()
        }
    },  
    methods:{
        getDummyFormCompany(){
            const ret = {...dummyFormCompany}
            ret.data = new Array()
            ret.events= new Array()
            return ret
        },
        IterateThroughFormField(elem, dir){
            dir = ['next','prev'].indexOf(dir) > -1 ? dir : 'next'

            const currentIndex = Array.from(elem.form.elements).indexOf(elem);
            elem.form.elements.item(
                currentIndex < elem.form.elements.length ? currentIndex + (dir === 'next' ? 1 : -1) : 0
            ).focus();
        },
        emptyDataItem() {
            return {
                ...companyData_perPeriod,
                taxes: undefined,
            }
        },
        addNewCompany(){
            // Period setup
            if (!this.$props.period.year || !this.$props.period.quarter) {
                alert('Квартал не выбран');
                return;
            }

            this.$data.currentItem.taxes = (
                this.$data.currentItem.taxesProfit +
                this.$data.currentItem.taxesVAT +
                this.$data.currentItem.taxesEmplSal +
                this.$data.currentItem.insurance
            )
            // Setup&Emit update event
            if(this.fildsValid()){
                const idx = this.$data.currentCompany.data.findIndex(
                    e => e.period.year == this.$props.period.year &&
                    e.period.quarter == this.$props.period.quarter);

                this.$data.currentItem.period = this.$props.period
                if (idx >= 0) this.$data.currentCompany.data.splice(idx, 1, this.$data.currentItem)
                else this.$data.currentCompany.data.push(this.$data.currentItem)
                if(this.hasSelectedCompany){
                    this.$emit("updateCompany", this.$data.currentCompany);
                }else{
                    this.$emit("addCompany", this.$data.currentCompany);
                    this.$data.currentCompany = this.getDummyFormCompany();
                    this.$data.currentItem = this.emptyDataItem()
                }
            }
        },
        fildsValid(){
            const isValid_IID = typeof(this.$data.currentCompany.IID) === "string" && this.$data.currentCompany.IID.length > 0
            if(!isValid_IID) {
                alert("Введите имя компании")
                return false
            }
            const isValid_ogrn = typeof(this.$data.currentCompany.ogrn) === "string" && this.$data.currentCompany.ogrn.length > 0
            if(!isValid_ogrn){
                alert("Введите ОГРН компании") 
                return false
            }
            
            for(const [_, value] of Object.entries(this.$data.currentItem)){
                if (typeof(value) !== "number" || value < 0) return false; 
            }
            return true;
        }
    },
    computed:{
        hasSelectedCompany(){
            return !!this.$props.selectedCompany
        }
    },
    watch:{
        selectedCompany(val){
            if(!val){
                this.$data.currentItem = this.emptyDataItem();
                this.$data.currentCompany = this.getDummyFormCompany();
                return
            }
            const selectedItem = val.data.find(e => e.period.year === this.$props.period.year && e.period.quarter === this.$props.period.quarter)
            this.$data.currentItem = selectedItem || this.emptyDataItem();
            this.$data.currentCompany = val
        },
        period(newVal, oldVal) {
            if(oldVal){
                // TODO: Сохранить this.$data.currentItem в this.$data.currentCompany.data за период oldVal
            }
            this.$data.currentItem = this.$data.currentCompany.data
                .find(e => e.period.year === this.$props.period.year && e.period.quarter === this.$props.period.quarter) 
                || this.emptyDataItem();
        }
    }
}
</script>
<style scoped>
form{
    margin-block-end:0;
}
/* HIDE ARROWS : Chrome, Safari, Edge, Opera */
input::-webkit-outer-spin-button,
input::-webkit-inner-spin-button {
  -webkit-appearance: none;
  margin: 0;
}
/* HIDE ARROWS : Firefox */
input[type=number] {
  -moz-appearance: textfield;
}
</style>