const ls_id = 'COMPANY_LIST'

export default {
    state:()=>({
        value: [],
    }),
    getters:{},
    mutations:{
        remove(state, remove_comp) {
            state.value = state.value.filter(c => c.IID !== remove_comp.IID)
        },
        add(state, add_comp){
            state.value.push(add_comp)
        },
        set(state, newVal){
            if(!Array.isArray(newVal)) return
            state.value = newVal
        },
        update(state, update_comp){
            const idx = state.value.indexOf(update_comp)
            state.value.splice(idx, 1, update_comp)
        }
    },
    actions:{
        save({state}){
            localStorage[ls_id] = JSON.stringify(state.value)
        },
        load({state}){
            const a = localStorage[ls_id]
            if(a && a !== 'undefined'){
                state.value = JSON.parse(a)
            }
        }
    },
    namespaced:true,
}