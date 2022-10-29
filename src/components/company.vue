<template>
    <li :id="company.IID" @click.left="clickOrg" class="d-flex justify-content-between align-items-center">
        <span>{{company.IID}}</span>
        <b-icon icon="x-lg" variant="danger" @click.left="removeCompany"></b-icon>
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
        removeCompany(e){
            e.stopPropagation()
            this.$emit('removeCompany', this.$props.company)
        }
    }
}
</script>
<style scoped>
li{
    padding: 2px 5px 1px 5px;
}
</style>