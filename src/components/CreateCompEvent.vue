<script setup>
  import {CompanyEventTypes} from '@/js/const.js'
</script>

<template>
    <form action="#" @submit.prevent="addNewEvent">
        <div>
            <select v-model="comp_event.type">
                <option ref="default_option" value="undefined" disabled hidden>Выберите тип</option>
                <option 
                    v-for="([key, value],idx) in Object.entries(CompanyEventTypes)" 
                    :key="idx" 
                    :value="key"
                >{{value}}</option>
            </select>
        <button type="submit" class="btn btn-primary">
            Добавить событие
        </button>
        </div>
    </form>
</template>
<script>
import { dummyFormEvent} from "@/js/const.js";
export default {
  name:"CreateCompEvent",
  props: {
    period:{
      type: Object
    }
  },
  data() {
    return {
      comp_event: {...dummyFormEvent},
    };
  },
  methods: {
    addNewEvent() {
      if (!this.$props.period) {
        alert("Выберите квартал года");
        return;
      }
      if(Object.keys(CompanyEventTypes).indexOf(this.$data.comp_event.type) < 0) return
      
      this.$data.comp_event.period = this.$props.period
      this.$emit("addEvent", this.$data.comp_event);
      
      // Default settings
      this.$data.comp_event = {...dummyFormEvent}
      this.$refs.default_option.value="undefined"
    },
  },
};
</script>