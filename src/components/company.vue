<template>
    <li :id="company.IID" @click.left="clickOrg">
        {{company.IID}}
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
        }
    }
}
</script>