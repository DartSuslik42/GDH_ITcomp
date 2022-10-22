<template>
    <button type="submit" id="saveBtn" class="btn btn-primary"
     v-on:click="save">
     Сохранить в файл
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