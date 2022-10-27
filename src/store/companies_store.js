const ls_id = 'COMPANY_LIST'

export default {
    state:()=>({
        value: (localStorage[ls_id] && localStorage[ls_id] !== 'undefined' ? JSON.parse(localStorage[ls_id]) : []),
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
        }
    },
    namespaced:true,
}