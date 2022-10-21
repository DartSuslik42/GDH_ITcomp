<template>
  <div>
    <img
        :src="src"
        :height="size.y"
        :width="size.x"
    />
    <b-spinner 
      small
      class="spinner"
      v-show="isloading"
    />
</div>
</template>

<script>
const empty_img = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR42mNkYAAAAAYAAjCB0C8AAAAASUVORK5CYII="
export default {
  props: {
    isloading:{
      type: Boolean,
      default: true,
    },
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
    src: {
      type: String,
      validator(value){
        return typeof(value)=== 'string' && value.length
      },
      default: empty_img
    }
  }
}
</script>
<style scoped>
div{
  position: relative;
}
.spinner{
  position: absolute;
  bottom: 5px;
  right: 5px;
}
</style>