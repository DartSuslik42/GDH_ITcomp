import Vue from 'vue'
import Vuex from 'vuex'

import companies from "./companies_store.js"
import config from "./chartOptions_store.js"

Vue.use(Vuex)

export default new Vuex.Store({
  // Данные. НЕ МЕНЯТЬ в компонентах. Использовать для получения чистых значений из state.
  // Использовать, как computed-свойства

  // Vuex > aaaa
  // Vue  > computed: { aaaa(){ return this.$store.state.aaaa} }
  state: {
  },
  // Computed-поля. Кэшируются. Не использовать для получения чистых значений из state
  // Фильтрация, поиск...

  // Vuex > без параметра > get_doubled_aaaa : (state, getters) => {return 2 * state.aaaa} 
  // Vuex > с параметром > get_inc_aaaa : (state, getters) => (val) => {return state.aaaa + val} 
  // Vue > computed:{ d(){ return this.$store.getters.get_doubled_aaaa } }
  // Vue > computed:{ d_plus_4(){ return this.$store.getters.get_inc_aaaa(4) } }

  getters:{
  },
  // Функции изменения state = set/add/remove и прч. методы. Асинхронность и Сайд-эффекты ЗАПРЕЩЕНЫ!
  // ВАЖНО! Для соблюдения реактивности:  
  //    новые поля в ОБЪЕКТЫ из state добовлять только так: 
  //      1) state.obj = {...state.obj, ...new_fields }
  //      2) Vue.set(state.obj, 'new_field', new_field_value)
  //      Смотри -> https://v2.vuejs.org/v2/guide/reactivity.html#For-Objects
  //    новые элементы в МАССИВЫ из state добавлять только так:
  //      1) state.arr.splice(idx, 1, newVal)  <=>  state.arr[idx] = newVal
  //      2) Vue.set(state.arr, idx, newValue)  <=>  state.arr[idx] = newVal
  //      Смотри -> https://v2.vuejs.org/v2/guide/reactivity.html#For-Arrays

  // Vuex > inc_aaaa(state, params){state.aaaa += params.inc_val}
  // Vue > this.$store.commit('inc_aaaa', params)
  // Vue > this.$store.commit({ type : "inc_aaaa", params: params})
  mutations: {
  },
  // Функции с сайд-эффектом: в результате работы некоторого функционала меняют state с помощью mutations
  // Асинхронные ф-ции, работа с API... 

  // context  <=>  {state, dispatch, getters, commit}

  // Vuex > increment(context, params){ context.commit('increment') }
  // Vue > store.dispatch('increment', params)
  actions: {
  },
  modules: {
    companies,
    config
  },
})
