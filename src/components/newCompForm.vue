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
                <div class="row">
                    <div class="col">
                        <span>Доход</span>
                    </div>
                    <div class="col">
                        <input type="number" pattern="\d*" name="income" placeholder="0" v-model="currentItem.income">
                    </div>
                </div>
                <div class="row">
                    <div class="col">
                    <span>Доход с лицензий</span>
                    </div>
                    <div class="col">
                    <input type="number" pattern="\d*" name="income_lic" placeholder="0" v-model="currentItem.income_lic">
                    </div>
                </div>
                <div class="row">
                    <div class="col">
                    <span>Фонд оплаты труда</span>
                    </div>
                    <div class="col">
                    <input type="number" pattern="\d*" name="fot" placeholder="0" v-model="currentItem.fot">
                    </div>
                </div>
                <div class="row">
                    <div class="col">
                    <span>Налог с прибыли</span>
                    </div>
                    <div class="col">
                    <input type="number" pattern="\d*" name="taxesProfit" placeholder="0" v-model="currentItem.taxesProfit">
                    </div>
                </div>
                <div class="row">
                    <div class="col">
                    <span>НДС</span>
                    </div>
                    <div class="col">
                    <input type="number" pattern="\d*" name="taxesVAT" placeholder="0" v-model="currentItem.taxesVAT">
                    </div>
                </div>
                <div class="row">
                    <div class="col">
                    <span>НДФЛ</span>
                    </div>
                    <div class="col">
                    <input type="number" pattern="\d*" name="taxesEmplSal" placeholder="0" v-model="currentItem.taxesEmplSal">
                    </div>
                </div>
                <div class="row">
                    <div class="col">
                    <span>Страховые сборы</span>
                    </div>
                    <div class="col">
                    <input type="number" pattern="\d*" name="insurance" placeholder="0" v-model="currentItem.insurance">
                    </div>
                </div>
                <div class="row">
                    <div class="col">
                        <span>Количество сотрудников</span>
                    </div>
                    <div class="col">
                        <input type="number" pattern="\d*" name="employee_num" placeholder="0" v-model="currentItem.employee_num">
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
import {dummyFormCompany, сompanyDataItem} from "@/js/const.js"
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
            currentItem: {...сompanyDataItem}
        }
    },  
    methods:{
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
                this.$data.currentCompany.data.splice(idx, 1, this.$data.currentItem)
            console.log('idx', idx)                    
            this.$data.currentCompany.data.forEach(d => console.log(
                    d?.income, d?.income_lic, 
                    d?.fot, d?.taxesProfit, d?.taxesVAT, 
                    d?.taxesEmplSal, d?.insurance, d?.employee_num))

            if(this.selectedCompany){
                    this.$emit("updateCompany", this.$data.currentCompany);
                }else{
                    this.$emit("addCompany", this.$data.currentCompany);
                    this.$data.currentCompany = {...dummyFormCompany};
                    this.$data.currentItem = {...сompanyDataItem};
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
            const selectedItems = val?.data?.filter(e => e?.year === this.$props.period?.year &&
                 e?.quarter === this.$props.period?.quarter);
            const selectedItem = selectedItems && selectedItems.length ? selectedItems[0] : сompanyDataItem;
            this.$data.currentCompany = {...(val || dummyFormCompany)};
            this.$data.currentItem =  {...(selectedItem)};
            console.log('watch FM selectedCompany', val?.IID,val?.ogrn, val?.grunts)
            console.log(this.$props.period?.year, this.$props.period?.quarter)
            val?.data.forEach(d => console.log( d?.income, d?.income_lic, 
                    d?.fot, d?.taxesProfit, d?.taxesVAT, 
                    d?.taxesEmplSal, d?.insurance, d?.employee_num))

        },
        period(p) {
            this.$data.currentItem = this.$data.currentCompany?.data?.find(e =>
                e?.year === p?.year && e?.quarter === p?.quarter) || сompanyDataItem;
            // const selectedItem = selectedItems && selectedItems.length ? selectedItems[0] : сompanyDataItem;
            // this.$data.currentItem =  {...(selectedItem)};
            console.log('watch FM p', p.year, p.quarter,
            this.$data.currentCompany.IID,
                this.$data.currentCompany.ogrn, this.$data.currentCompany.grunts)
            console.log(this.$props.period?.year, this.$props.period?.quarter, 
            this.$data.currentItem.income, 
            this.$data.currentItem.income_lic, 
            this.$data.currentItem.fot, 
            this.$data.currentItem.taxesProfit, 
            this.$data.currentItem.taxesVAT, 
            this.$data.currentItem.taxesEmplSal, 
            this.$data.currentItem.insurance, 
            this.$data.currentItem.employee_num)
        }
    }
}
</script>
<style scoped>
form{
    margin-block-end:0;
}
</style>