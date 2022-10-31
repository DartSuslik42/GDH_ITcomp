import { startYear } from "@/js/const.js"
const ls_id = 'APP_CONFIG'

export const dummy_state = {
    dataSource:undefined,
    isAccredited:undefined,
    AbcAxis:{
        y:undefined,
    },
    ScatterAxis:{
        x:undefined,
        y:undefined
    },
    period: {
        year:undefined,
        quarter:undefined
    },
}

// Вход: объект с полями, не содержащими массивы
// Выход: объект без полей === null || undefined
//        undefined, если все поля obj === null || undefined 
function clean_obj(obj){ 
    const c = Object
        .entries(obj)
        .map(([k,v])=>[k,v && typeof v === "object" ? clean_obj(v) : v])
        .reduce((a,[k,v]) => (v == null ? a : (a[k]=v, a)), {})
    return Object.keys(c).length ? c : undefined 
}
// Merge fields of obj2 into obj1 ( NO-ARRAY fields )
function MergeRecursive(obj1, obj2) {
    obj1 = {...obj1}    // защита от перезаписывания полей obj1
    // obj2 = {...obj2} // защита не нужна, т.к. в функции поля obj2 не меняются
    for (var p in obj2) {
        try {
            // Property in destination object set; update its value.
            if ( obj2[p].constructor==Object ) {
                obj1[p] = MergeRecursive(obj1[p], obj2[p]);
            } else {
                obj1[p] = obj2[p];
            }
        } catch(e) {
        // Property in destination object not set; create it and set its value.
        obj1[p] = obj2[p];
        }
    }
    return obj1;
}
export default {
    state:()=>({
        value : {
            dataSource: 1,
            isAccredited: false,
            AbcAxis:{
                y:'income',
            },
            ScatterAxis: {
                x:'income',
                y:'employee_num',
            },
            period: {
                year: startYear,
                quarter: 1,
            },
    }}),
    getters:{
        ScatterChartParams(state){
            return {
              AxisSrc:{
                x:state.value.ScatterAxis.x,
                y:state.value.ScatterAxis.y,
                z:state.value.AbcAxis.y,
                d:state.value.dataSource,
                a:state.value.isAccredited
              },
              Period:state.value.period,
            }
          },
          AbcChartParams(state){
            return {
              AxisSrc:{
                y:state.value.AbcAxis.y,
                d:state.value.dataSource
              },
              Period:state.value.period,
            }
          }
    },
    mutations:{
        set(state, new_options){
            // new_options оформляются по шаблону dummy_state.
            if(new_options && typeof(new_options) ==='object'){
                // оставляем только заполненные поля из шаблона dummy_state
                const new_clean_opt = clean_obj(new_options) // {...} || undefined - нет заполненных полей 
                if(typeof new_clean_opt === 'object'){
                    state.value = MergeRecursive(state.value, new_clean_opt)
                }
            }
        }
    },
    actions:{
        save({state}){
            localStorage[ls_id] = JSON.stringify(state.value)
        },
        load({commit}){
            const a = localStorage[ls_id]
            if(a && a !== 'undefined'){
                commit("set", JSON.parse(a))
            }
        }
    },
    namespaced:true,
}