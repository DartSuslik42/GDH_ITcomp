<template>
    <button type="submit" id="saveBtn" class="btn btn-primary"
     v-on:click="save" v-b-tooltip.hover.righttop="'Сохранить в файл'">
     Сохранить
    </button>
</template>

<script>
export default{
    methods:{
        save(){
            this.$emit('storeCompanies')
        }
    }
}
</script>