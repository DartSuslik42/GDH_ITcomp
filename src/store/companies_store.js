const ls_id = 'COMPANY_LIST'

export default {
    state:()=>({
        value: (localStorage[ls_id] && localStorage[ls_id] !== 'undefined' ? JSON.parse(localStorage[ls_id]) : []),
    }),
    getters:{},
    mutations:{
        // remove(state, company_to_remove){
        //     // Удалить компанию из списка компаний
        //     this.$data.companies = this.$data.companies.filter(c => c.IID !== e.IID)
        //     this.storeCompaniesLocally()      
        //     if(this.$data.selectedCompany?.IID === e?.IID){
        //       this.setSelectedCompany(null)
        //     }
        // },
        set(state, newVal){
            if(!Array.isArray(newVal)) return
            state.value = newVal
            localStorage[ls_id] = JSON.stringify(newVal)
        },
    },
    actions:{},
    namespaced:true,
}