<script setup>
import {CompanyEventTypes} from '@/js/const.js'
</script>
<template>
    <li class="d-flex justify-content-between align-items-center">
        <span>{{event.period.year}} Q{{event.period.quarter}} {{CompanyEventTypes[event.type]}}</span>
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