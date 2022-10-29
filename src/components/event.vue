<template>
    <li :id="event.id" class="d-flex justify-content-between align-items-center">
        <span>{{event.year}} Q{{((event.quarter - 1) % 4) + 1}} {{event.id}}</span>
        <b-icon icon="x-lg" variant="danger" @click.left="removeEvent"></b-icon>
    </li>
</template>
<script>
export default{
    props:{
        event: Object
    },
    methods:{
        removeEvent(){
            this.$emit('removeEvent', this.$props.event)
        }
    }
}
</script>
<style scoped>
</style>