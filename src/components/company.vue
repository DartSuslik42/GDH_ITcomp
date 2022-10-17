<template>
    <li :id="company.IID" @click.left="clickOrg">
        {{company.IID}}
        <span  @click.left="removeCompany" class="close">X</span>
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
        removeCompany(){
            this.$emit('removeCompany', this.$props.company)
        }
    }
}
</script>