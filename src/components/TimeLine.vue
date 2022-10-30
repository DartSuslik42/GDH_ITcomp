<script setup>
import {startYear} from '@/js/const.js'
const years = [startYear, startYear + 1, startYear + 2, startYear + 3]
</script>
<template>
    <div id='timeline-vue' class="d-flex h-100 flex-column">
      <div class="d-flex flex-row content" v-for="year in years" :key="year">
        <div class="d-flex flex-column p-1" title="Выбор года" v-bind:class="{ highl: year === period.year}"
            @click="selectPeriod({year:year,quarter:1})"
        >{{year}}</div>
        <div class="d-flex flex-column align-items-center" title="Выбор квартала">
            <div class="content p-1" v-bind:class="{ highl: year === period.year && quarter === period.quarter}"
                v-for="quarter in 4" :key="quarter" @click="selectPeriod({year:year,quarter:quarter})"
            >Q{{quarter}}</div>
        </div>
      </div>
    </div>
</template>
<script>
export default {
  name: 'TimeLine',
  props: {
    period:{
      type: Object
    }
  },
  methods: {
    selectPeriod(newPeriod){
        this.$emit('timeSelected', newPeriod)
    }
  },
};
</script>
<style scoped>
.year-block{
    flex-wrap: wrap;
    flex-grow: 1; 
    flex: 1 1 auto;
}
.content {
  flex: 1 1 auto;
}
#timeline-vue{
    overflow-y: scroll;
    -ms-overflow-style: none;  /* IE and Edge */
    scrollbar-width: none;  /* Firefox */
}
/* Hide scrollbar for Chrome, Safari and Opera */
#timeline-vue::-webkit-scrollbar {
  display: none;
}
</style>