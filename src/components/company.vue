<template>
    <li :id="company.IID" @click.left="clickOrg">
        {{company.IID}}
        <span  @click.left="remove" class="close">x</span>
    </li>
</template>
<script>
export default{
    props:{
        company: Object
    },
    methods:{
        clickOrg(){
            this.$emit('select', this.$props.company)
        },
        remove(){
            this.$emit('remove', this.$props.company)
        }
    }
}
</script>