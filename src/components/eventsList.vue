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
            .filter(item => item.period === this.$props.period)
        else return this.$props.events
      else return []
    }
  },
  components: { Event },
};
</script>