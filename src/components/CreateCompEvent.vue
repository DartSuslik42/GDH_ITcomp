<script setup>
  import {CompanyEventTypes} from '@/js/const.js'
</script>

<template>
  <div>
    <b-button v-b-modal.modal-1 class="btn btn-primary">Добавить новое событие</b-button>
    <b-modal id="modal-1" hide-footer @hidden="restoreData">
      <template #modal-header>
        <div class="w-100 d-flex flex-column">
          <div class="d-flex flex-row justify-content-between">
            <span class="h5">Новое событие</span>
            <b class="h6">{{period.year}} Q{{period.quarter}}</b>
          </div>
          <span class="h6">Компания: <b class="h5">{{selected.IID}}</b></span>
        </div>
      </template>
      <template #default>
        <div class="w-100 d-flex flex-column">
          <form action="#" @submit.stop.prevent="()=>{$bvModal.hide('modal-1'); addNewEvent()}">
            <div>
              <div class="form-group">
                <b-form-select v-model="type" class="form-control mb-3">
                  <b-form-select-option :value="null" disabled selected hidden>-- Выберите тип события --</b-form-select-option>
                  <b-form-select-option                       
                    v-for="([key, value],idx) in Object.entries(CompanyEventTypes)" 
                    :key="idx" 
                    :value="key"
                  >{{value}}</b-form-select-option>
                </b-form-select>
              </div>
              <div class="form-group" v-show="isGrantType">
                <InputNumber id="asdf" v-model="data" placeholder="Введитее сумму гранта"/>
              </div>
              <div class="form-group" v-show="showSubmitButton">
                <button type="submit" class="btn btn-primary">
                  <span class="h5">Создать cобытие</span>
                </button>
              </div>
            </div>
          </form>
        </div>
      </template>
    </b-modal>
  </div>
</template>
<script>
import InputNumber from '@/components/input_number.vue'
export default {
  name:"CreateCompEvent",
  components:{
    InputNumber
  },
  props: {
    period:{
      type: Object
    },
    selected:{
      type: Object
    }
  },
  data() {
    return {
      type:null,
      data:null,
    };
  },
  methods: {
    restoreData(){
      this.$data.type = null
      this.$data.data = null
    },
    addNewEvent() {
      if (!this.$props.period) {
        alert("Нельзя создать событие: Не выбран квартал");
        return;
      }
      if(Object.keys(CompanyEventTypes).indexOf(this.$data.type) < 0) {
        alert("Нельзя создать событие: Выбран некорректный тип события");
        return
      }
      
      this.$emit("addEvent", {
        type: this.$data.type,
        data: this.$data.data,
        period : this.$props.period,
        id: new Date().getTime()
      });
      
      // Default settings
      this.restoreData()
    },
  },
  computed:{
    isGrantType(){
      return this.$data.type === "grantincome"
    },
    showSubmitButton(){
      if(this.isGrantType) 
        if(this.$data.data)return true
        else return false
      else 
        if(this.$data.type) return true
        else return false
    }
  }
};
</script>