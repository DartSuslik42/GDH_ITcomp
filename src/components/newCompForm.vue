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
                        <input type="text" name="IID" placeholder="Введите имя компании" v-model="currentCompany.IID">
                    </div>
                </div>
                <div class="row">
                    <div class="col">
                        <span>ОГРН</span>
                    </div>
                    <div class="col">
                        <input type="number" pattern="\d*" name="ogrn" v-model="currentCompany.ogrn">
                    </div>
                </div>
                
                <div class="row" v-for="(comp_field, idx) in Object.keys(companyData_perPeriod)" :key="idx">
                    <div class="col">
                        <span>{{comp_field_names[comp_field]}}</span>
                    </div>
                    <div class="col">
                        <input type="number" pattern="\d*" name="comp_field" placeholder="0" 
                            v-model="currentItem[comp_field]"
                        >
                    </div>
                </div>

                <div class="row">
                    <div class="col">
                        <button type="submit" class="btn btn-primary">
                            {{selectedCompany ? "Сохранить изменения":"Добавить компанию"}}
                        </button>
                    </div>
                </div> 
            </div>
        </form>
    </div>
</template>

<script>
import {dummyFormCompany} from "@/js/const.js"
export default{
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
            currentCompany: {...(this.selectedCompany || dummyFormCompany)},
            currentItem: this.emptyDataItem()
        }
    },  
    methods:{
        emptyDataItem() {
            return {
                year: this.$props.period.year,
                quarter: this.$props.period.quarter,
                income: "",
                income_lic: "",
                fot: "",
                taxesProfit: "",
                taxesVAT: "",
                taxesEmplSal: "",
                insurance: "",
                employee_num: "",
            }
        },
        addNewCompany(){
            if (!this.$props.period.year || !this.$props.period.quarter) {
                alert('Выберите квартал');
                return;
            } else {
                this.$data.currentItem.year = this.$props.period.year;
                this.$data.currentItem.quarter = this.$props.period.quarter;
            }
            for(const [key, value] of Object.entries(this.$data.currentCompany)){
                if(key === "ogrn"){
                    this.$data.currentCompany[key] = +value;
                }
            }
            for(const [key, value] of Object.entries(this.$data.currentItem)){
                this.$data.currentItem[key] = +value;
            }
            if(this.fildsValid()){
                const idx = this.$data.currentCompany.data.findIndex(
                    e => e.year == this.$props.period.year &&
                    e.quarter == this.$props.period.quarter);
                if (idx >= 0) {
                    this.$data.currentCompany.data.splice(idx, 1, this.$data.currentItem)
                } else {
                    this.$data.currentCompany.data.push(this.$data.currentItem)
                }
            if(this.selectedCompany){
                    this.$emit("updateCompany", this.$data.currentCompany);
                }else{
                    this.$emit("addCompany", this.$data.currentCompany);
                    this.$data.currentCompany = JSON.parse(JSON.stringify(dummyFormCompany));
                    this.$data.currentItem = this.emptyDataItem()
                }
            }else{
                alert("Введите имя компании")
            }
        },
        fildsValid(){
            for(const [key, value] of Object.entries(this.$data.currentCompany)){
                if (key === 'IID') {
                    if (typeof(value) !== "string" || value.length === 0) return false; 
                }
                if (key === 'ogrn') {
                    if (typeof(value) !== "number" || value < 0) return false; 
                }
            }
            for(const [_, value] of Object.entries(this.$data.currentItem)){
                if (typeof(value) !== "number" || value < 0) return false; 
            }
            return true;
        }
    },
    watch:{
        selectedCompany(val){
            const selectedItem = val?.data?.find(e => e?.year === this.$props.period?.year &&
                 e?.quarter === this.$props.period?.quarter) || this.emptyDataItem();
            this.$data.currentCompany = {...(val || dummyFormCompany)};
            this.$data.currentItem =  selectedItem || this.emptyDataItem();
        },
        period(p) {
            this.$data.currentItem = this.$data.currentCompany?.data?.find(e =>
                e?.year === p?.year && e?.quarter === p?.quarter) || this.emptyDataItem();
        }
    }
}
</script>
<style scoped>
form{
    margin-block-end:0;
}
</style>