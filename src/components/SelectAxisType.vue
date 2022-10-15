<template>
    <select class="select_y" :value="value" @change="$emit('input', $event.target.value)">
        <option v-for="(el,idx) in Fields_Columns" :value="el">
          {{Fields_Columns_Names[el]}}
        </option>
    </select>
</template>
<script>
import {Fields_Columns, Fields_Columns_Names} from "@/js/const.js"
export default {
  props: {
    value: String
  },
  data(){
    return{
      Fields_Columns,
      Fields_Columns_Names
    }
  }
}
</script>
