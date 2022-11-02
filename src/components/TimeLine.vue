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
          <div v-for="quarter in 4" :key="quarter" @click="selectPeriod({year:year,quarter:quarter})" class="d-flex justify-content-start w-100">
              <div class="d-flex p-1" v-bind:class="{ highl: year === period.year && quarter === period.quarter}"
                @click.stop="selectPeriod({year:year,quarter:quarter})"
              >Q{{quarter}}</div>
              <div class="d-flex p-1">
                <span>{{getGrunt_byPeriod({year:year,quarter:quarter})?.data | numFormat}}</span>
              </div>
          </div>
        </div>
      </div>
    </div>
</template>
<script>
import {NUMBER_DIG_SEPARATOR as spaceSymbol} from "@/js/const.js"
export default {
  /* TODO: РЕФАКТОРИТЬ! весь код связанный с grunts.
    Проблемы:
      - При обновлении props.period ведётся пересчёт значений для всех ячеек grunts
      - Компонент выполняет 2 функции одновременно(not SimpleComponent)
      - Из-за grunts в коде много заимствованного кода (not DRY)
  */

  name: 'TimeLine',
  props: {
    period:{
      type: Object
    },
    grunts:{
      type: Array
    }
  },
  methods: {
    selectPeriod(newPeriod){
        this.$emit('timeSelected', newPeriod)
    },
    getGrunt_byPeriod(per){
      if(!this.$props.grunts?.length) return new Object()
      const a = this.$props.grunts.find((el)=>{
        return el.period.year === per.year && el.period.quarter === per.quarter
      })
      return a
    }
  },
  filters:{
    numFormat(n){
        if (n === 0 || !n) return '';
        var output = [];
        for (; n > 0; ) {
            const k = n % 1000
            n = Math.floor(n/1000)
            output.unshift(((n?'000':'') + k).slice(-3));
        }
        return '+'+output.join(spaceSymbol)+'р';
    },
  }
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
    width: 12rem;
}
/* Hide scrollbar for Chrome, Safari and Opera */
#timeline-vue::-webkit-scrollbar {
  display: none;
}
</style>