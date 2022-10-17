<template>
    <div id="form_comp">
        <form action="#" @submit.prevent="addNewCompany">
            <div>
                <div class="row">
                    <div class="col">
                        <span>Название</span>
                    </div>
                    <div class="col">
                        <input type="text" name="IID" placeholder="Введите имя компании" v-model="dummy.IID">
                    </div>
                </div>
                <div class="row">
                    <div class="col">
                        <span>ОГРН</span>
                    </div>
                    <div class="col">
                        <input type="number" pattern="\d*" name="ogrn" v-model="dummy.ogrn">
                    </div>
                </div>
                <div class="row">
                    <div class="col">
                        <span>Доход</span>
                    </div>
                    <div class="col">
                        <input type="number" pattern="\d*" name="income" placeholder="0" v-model="dummy.income">
                    </div>
                </div>
                <div class="row">
                    <div class="col">
                    <span>Доход с лицензий</span>
                    </div>
                    <div class="col">
                    <input type="number" pattern="\d*" name="income_lic" placeholder="0" v-model="dummy.income_lic">
                    </div>
                </div>
                <div class="row">
                    <div class="col">
                    <span>Фонд оплаты труда</span>
                    </div>
                    <div class="col">
                    <input type="number" pattern="\d*" name="fot" placeholder="0" v-model="dummy.fot">
                    </div>
                </div>
                <div class="row">
                    <div class="col">
                    <span>Налог с прибыли</span>
                    </div>
                    <div class="col">
                    <input type="number" pattern="\d*" name="taxesProfit" placeholder="0" v-model="dummy.taxesProfit">
                    </div>
                </div>
                <div class="row">
                    <div class="col">
                    <span>НДС</span>
                    </div>
                    <div class="col">
                    <input type="number" pattern="\d*" name="taxesVAT" placeholder="0" v-model="dummy.taxesVAT">
                    </div>
                </div>
                <div class="row">
                    <div class="col">
                    <span>НДФЛ</span>
                    </div>
                    <div class="col">
                    <input type="number" pattern="\d*" name="taxesEmplSal" placeholder="0" v-model="dummy.taxesEmplSal">
                    </div>
                </div>
                <div class="row">
                    <div class="col">
                    <span>Страховые сборы</span>
                    </div>
                    <div class="col">
                    <input type="number" pattern="\d*" name="insurance" placeholder="0" v-model="dummy.insurance">
                    </div>
                </div>
                <div class="row">
                    <div class="col">
                        <span>Количество сотрудников</span>
                    </div>
                    <div class="col">
                        <input type="number" pattern="\d*" name="employee_num" placeholder="0" v-model="dummy.employee_num">
                    </div>
                </div>
                <div class="row">
                    <div class="col">
                        <button type="submit" class="btn btn-primary">
                            {{dummyCompany ? "Сохранить изменения":"Добавить компанию"}}
                        </button>
                    </div>
                </div> 
            </div>
        </form>
    </div>
</template>

<script>
import {dummyFormCompany as d} from "@/js/const.js"
export default{
    props:{
        dummyCompany:{
            type: Object,
            default: null
        }
    },
    data(){
        return{
            dummy: {...(this.dummyCompany ? this.dummyCompany : d)}
        }
    },  
    methods:{
        addNewCompany(){
            for(const [key, value] of Object.entries(this.$data.dummy)){
                if(key !== "IID"){
                    this.$data.dummy[key] = +value
                }
            }
            if(this.fildsValid()){
                if(this.dummyCompany){
                    this.$emit("updateCompany", this.$data.dummy)
                }else{
                    this.$emit("addCompany", this.$data.dummy)
                    this.$data.dummy = {...d}
                }
            }else{
                alert("Введите имя компании")
            }
        },
        fildsValid(){
            for(const [key, value] of Object.entries(this.$data.dummy)){
                if (key === 'IID'){
                    if (typeof(value) !== "string" || value.length === 0 ) return false
                }
                if (key !== 'IID') {
                    if(typeof(value) !== "number" || value < 0 ) return false
                }
                return true 
            }
        }
    },
    watch:{
        dummyCompany(val){
            this.$data.dummy = {...(val ? val : d)}
        }
    }
}
</script>
<style scoped>
form{
    margin-block-end:0;
}
</style>