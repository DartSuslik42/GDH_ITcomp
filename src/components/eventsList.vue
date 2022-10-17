<template>
  <div id="q4">
    <div class="yq">
      <div class="year" v-bind:class="{ highl: year === dummy.year}"
      v-for="year in [2019, 2020, 2021, 2022]" :key="year"
      >
        {{ year }}
      </div>
    </div>
    <div class="yq">
      <div class="quarter" v-bind:class="{ highl: quarter === dummy.quarter}" 
      v-for="quarter in 16" :key="quarter" @click="highlight(quarter)">
        Q{{ ((quarter - 1) % 4) + 1 }}
      </div>
    </div>
    <div class="yq">
      <div class="quarter" v-for="quarter in 16" :key="quarter">
        <input type="text" />
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
            v-for="(event, idx) in events"
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
    dummyEvent: {
      type: Object,
      default: null,
    },
  },
  data() {
    return {
    //   selected: { year: 2019, quarter: 1 },
      dummy: { ...(this.dummyEvent ? this.dummyEvent : d) },
    };
  },
  methods: {
    addNewEvent(e) {
      if (this.dummyEvent) {
        this.$emit("updateEvent", this.$data.dummy);
      } else {
        this.$emit("addEvent", this.$data.dummy);
        this.$data.dummy = { ...this.$data.dummy };
      }
    },
    removeEvent(e) {
      this.$emit("removeEvent", e);
    },
    highlight(quarter) {
        this.dummy.quarter = quarter;
        this.dummy.year = Math.floor(2019 + (quarter-1) / 4); 
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