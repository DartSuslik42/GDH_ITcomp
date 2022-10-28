<template>
  <div id="q4">
    <div class="year-quarter" title="Снять выбор года и квартала" @click="selectYear('')" style="min-width: 1.5rem"></div>
    <div class="year-quarter" title="Выбор года">
      <div class="year" v-bind:class="{ highl: year === current.year}"
      v-for="year in years" :key="year" @click="selectYear(year)"
      >
        {{ year }}
      </div>
    </div>
    <div class="year-quarter" title="Выбор года и квартала">
      <div class="quarter" v-bind:class="{ highl: quarter === current.quarter}" 
      v-for="quarter in 16" :key="quarter" @click="selectQuarter(quarter)">
        Q{{ ((quarter - 1) % 4) + 1 }}
      </div>
    </div>
    <div class="year-quarter">
      <div class="quarter" v-for="n in 16" :key="n" style="border: none">
        <input type="number" pattern="\d*" class="timeline" v-model="grunts[n-1]" />
      </div>
    </div>
    <div class="events">
      <b>Лента событий</b>
      <div>
        <div id="form_event">
          <form action="#" @submit.prevent="addNewEvent">
            <div class="row">
              <div class="col">
                <select v-model="current.id">
                  <option>создание компании</option>
                  <option>закрытие компании</option>
                  <option>получение аккредитации компании </option>
                  <option>лишение аккредитации компании </option>
                  <option>получение дохода от грантов и субсидий</option>
                </select>
              </div>
              <button type="submit" class="btn btn-primary">
                Добавить событие
              </button>
            </div>
          </form>
        </div>

        <ul id="events">
          <Event
            v-for="(event, idx) in filteredEvents"
            :key="idx"
            :event="event"
            @removeEvent="removeEvent"
          />
        </ul>
      </div>
    </div>
  </div>
</template>
<script>
import Event from "./event.vue";
import { dummyFormEvent, dummyFormCompany, сompanyDataItem, startYear } from "@/js/const.js";
export default {
  props: {
    selectedCompany: {
      type: Object,
      default: null,
    },
  },
  data() {
    return {
      grunts: this.emptyGrunts(),
      current: dummyFormEvent,
      years: [startYear, startYear + 1, startYear + 2, startYear + 3]
    };
  },
  methods: {
    emptyGrunts() {
      return new Array(16).fill('');
    },
    addNewEvent(e) {
      if (!this.$data.current.year && !this.$data.current.quarter) {
        alert("Выберите квартал года");
        return;
      }
      if (!this.$props.selectedCompany) {
        alert("Выберите компанию");
        return;
      }
      this.$emit("addEvent", {...this.$data.current}); 
    },
    removeEvent(e) {
      this.$emit("removeEvent", e); 
    },
    sumGrunts() {
      let sum = 0;
      if (this.current.quarter > 0) {
        for (let i = this.current.quarter - 1; i < this.$data.grunts.length; i++) {
          sum += + this.$data.grunts[i];
        }
      }
      return sum;
    },
    selectYear(year) {
      this.selectQuarter((year - startYear) * 4 + 1);
    },
    selectQuarter(quarter) {
      this.current.quarter = quarter;
      this.current.year = Math.floor(startYear + (quarter-1) / 4); 
      this.$emit("timeSelected", {
        year: this.current.year, 
        quarter: ((this.current.quarter - 1) % 4) + 1,
        grunt: this.sumGrunts()
      }); 
    }
  },
  computed: {
    filteredEvents() {
      if (this.current.quarter) { 
        return this.$props.selectedCompany?.events.filter(item => item.quarter === this.current.quarter)
      }
      if (this.current.year) { 
        return this.$props.selectedCompany?.events.filter(item => item.year === this.current.year)
      }
      return this.$props.selectedCompany?.events
    }
  },
  watch: {
    selectedCompany(val){
      this.$data.grunts = val ? val.grunts : this.emptyGrunts();
    }
  },
  components: { Event },
};
</script>