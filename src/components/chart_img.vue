<template>
    <img
        :src=src
        :height="size.y"
        :width="size.x"
    />
</template>

<script>
export default {
  props: {
    size: {
      type: Object,
      validator (value) {
        if (typeof (value) !== 'object') return false
        if (typeof (value.x) !== 'number') return false
        if (typeof (value.y) !== 'number') return false
        if (value.x < 0 || value.y < 0) return false
        return true
      }
    },
    src: String
  }
}
</script>
