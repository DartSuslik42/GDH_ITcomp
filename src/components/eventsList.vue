<template>
    <div class="d-flex flex-column">
      <span class="h6">
        <b>Лента событий </b>
        за {{period.year}} Q{{period.quarter}}
      </span>
      <ul>
        <Event
          v-for="(event, idx) in filteredEvents"
          :key="idx"
          :event="event"
          @removeEvent="$emit('removeEvent', $event)"
        />
        <div v-show="noEvents" class="h6 text-center">
          Событий нет
        </div>
      </ul>
    </div>
</template>
<script>
import Event from "./event.vue";
export default {
  props: {
    events: {
      type: Array,
    },
    period:{
      type: Object
    }
  },
  computed: {
    filteredEvents(){
      if(this.$props.events)
        if(this.$props.period)
          return this.$props.events
            .filter(item => item.period.year === this.$props.period.year && item.period.quarter === this.$props.period.quarter)
        else return this.$props.events
      else return []
    },
    noEvents(){
      return !this.filteredEvents.length
    }
  },
  components: { Event },
};
</script>