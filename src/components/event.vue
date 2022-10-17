<template>
    <li :id="event.id">
        {{event.year}} Q{{((event.quarter - 1) % 4) + 1}} {{event.id}}
        <span  @click.left="removeEvent" class="close">X</span>
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