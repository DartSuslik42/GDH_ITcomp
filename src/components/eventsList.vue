<template>
  <div id="q4">
    <div class="year-quarter" title="Снять выбор года и квартала" @click="selectYear('')" style="min-width: 1.5rem"></div>
    <div class="year-quarter" title="Выбор года">
      <div class="year" v-bind:class="{ highl: year === dummy.year}"
      v-for="year in [2019, 2020, 2021, 2022]" :key="year" @click="selectYear(year)">
        {{ year }}
      </div>
    </div>
    <div class="year-quarter" title="Выбор года и квартала">
      <div class="quarter" v-bind:class="{ highl: quarter === dummy.quarter}" 
      v-for="quarter in 16" :key="quarter" @click="selectQuarter(quarter)">
        Q{{ ((quarter - 1) % 4) + 1 }}
      </div>
    </div>
    <div class="year-quarter">
      <div class="quarter" v-for="n in 16" :key="n" style="border: none">
        <input type="number" pattern="\d*" class="timeline" v-model="numbers[n]" />
      </div>
    </div>
    <div class="events">
      <b>Лента событий</b>
      <div>
        <div id="form_event">
          <form action="#" @submit.prevent="addNewEvent">
            <div class="row">
              <div class="col">
                <select v-model="dummy.id">
                  <option>создание компании</option>
                  <option>закрытие компании</option>
                  <option>получение аккредитации компании </option>
                  <option>лишение аккредитации компании </option>
                  <option>получение дохода от грантов и субсидий</option>
                </select>
              </div>
              <button type="submit" class="btn btn-primary">
                {{ dummyEvent ? "Сохранить изменения" : "Добавить событие" }}
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
import { dummyFormEvent as d } from "@/js/const.js";
export default {
  props: {
    events: Array,
    numbers: Array,
    dummyEvent: {
      type: Object,
      default: null,
    },
  },
  data() {
    return {
      dummy: { ...(this.dummyEvent ? this.dummyEvent : d) },
    };
  },
  methods: {
    addNewEvent() {
      if (this.dummyEvent) {
        this.$emit("updateEvent", this.$data.dummy);
      } else {
        if (!this.$data.dummy.year && !this.$data.dummy.quarter) {
          alert("Выберите квартал года");
          return;
        }
        this.$emit("addEvent", this.$data.dummy);
        this.$data.dummy = { ...this.$data.dummy }; // need clone
      }
    },
    removeEvent(e) {
      this.$emit("removeEvent", e);
    },
    selectYear(year) {
        this.dummy.quarter = '';
        this.dummy.year = year; 
        this.$emit("timeSelected", {year: this.dummy.year, quarter: this.dummy.quarter}); 
    },
    selectQuarter(quarter) {
        this.dummy.quarter = quarter;
        this.dummy.year = Math.floor(2019 + (quarter-1) / 4); 
        this.$emit("timeSelected", {year: this.dummy.year, quarter: ((this.dummy.quarter - 1) % 4) + 1}); 
    }
  },
  computed: {
    filteredEvents() {
      if (this.dummy.quarter) { 
        return this.events.filter(item => item.quarter === this.dummy.quarter)
      }
      if (this.dummy.year) { 
        return this.events.filter(item => item.year === this.dummy.year)
      }
      return this.events
    }
  },
  watch: {
    dummyEvent(val) {
      this.$data.dummy = { ...(val ? val : d) };
    },
  },
  components: { Event },
};
</script>