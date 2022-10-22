<template>
    <button type="button" id="loadBtn" class="btn btn-primary"
        v-on:click="load" v-b-tooltip.hover.righttop="'Загрузить из файла'">
        Загрузить
    </button>
</template>

<script>
export default{
    methods:{
        load(){
            this.$emit('loadCompanies')
        }
    },
    mounted() {
        this.$emit('loadCompanies')
    }

}
</script>