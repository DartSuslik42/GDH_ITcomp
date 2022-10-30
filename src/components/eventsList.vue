<template>
    <div class="d-flex flex-column">
      <b>Лента событий</b>
      <ul>
        <Event
          v-for="(event, idx) in filteredEvents"
          :key="idx"
          :event="event"
          @removeEvent="$emit('removeEvent', $event)"
        />
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
    }
  },
  components: { Event },
};
</script>