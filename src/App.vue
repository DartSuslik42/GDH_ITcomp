<template>
  <table>
    <tr>
      <td class="forms border-bt border-rt">
        <div id="cell_bl_content">
          <div id="org_list">
            <CompaniesList :companies="companies" 
            :selected="selectedCompany" 
            @removeCompany="removeCompany"
            @select="setSelectedCompany"/>
            <div>
              <div id="choose-file">
                <b-form-file v-model="selectedFile" :state="Boolean(selectedFile)"
                  placeholder="Выберите файл или поместите сюда..."
                  drop-placeholder="Поместите файл сюда..."
                ></b-form-file>
                <!-- <div> {{ selectedFile ? 'Выбран файл: ' + selectedFile.name : '' }}</div> -->
              </div>
              <div class="row">
                <div class="col-6">
                  <UploadButton @loadCompanies="loadCompanies" />
                </div>
                <div class="col-6">
                  <DownloadButton @storeCompanies="storeCompanies"/>
                </div>
              </div>
            </div>
          </div>
          <NewCompForm
            @updateCompany="updateSelectedCompanyData" 
            @addCompany="addNewCompany" 
            :selectedCompany="selectedCompany"
            :period="period"
          />
        
        </div>
      </td>
      <td class="charts border-bt">
        <div class="chart container">          
          <div class="d-flex flex-row w-100">
            <SelectAxisType class="select_y" v-model="ScatterAxis.y" @input="saveConfig"/>
            <select class="select_d mx-2" v-model="dataSource" v-on:change="saveConfig">
              <option value="1"> Версия 1 </option>
              <option value="2"> Версия 2 </option>
            </select>
            <span class="d-flex align-items-center">
              <input type="checkbox" class="mx-1" v-model="isAccredited" v-on:change="saveConfig">
              Аккредитованные
            </span>  
          </div>
          <ScatterChart class="chart diagram"
            :params="ScatterChartParams" 
            :companies='companies.map((el)=>{return{
              ...el,
            }})'
            :predict='predict'
            @select="setSelectedCompany"
          />
          <SelectAxisType class="select_x" v-model="ScatterAxis.x" @input="saveConfig"/>
        </div>
      </td>
    </tr>
    <tr>
      <td class="w-50 border-rt">
        <div class="d-flex flex-row justify-content-between">
          <TimeLine :period="period" @timeSelected="setPeriod" :grunts="arr_gruntSum_perPeriod"/>
          <div v-show="selectedCompany">
            <EventsList
              @removeEvent="removeEvent"
              :events="selectedCompany?.events" 
              :period="period"/>
            <CreateCompEvent v-show="period"
              @addEvent="addEvent"
              :period="period"
              :selected="selectedCompany"/>
          </div>
        </div>
        <img src="@/assets/gdh.png" alt="GDH" width="150px">
      </td>
      <td class="charts">
        <div id="chart2" class="chart container">

          <SelectAxisType class="select_y" v-model="AbcAxis.y"  @input="saveConfig"/>
          <AbcChart :params="AbcChartParams" class="chart diagram"/>
          <select class="select_x" disabled>
            <option selected>Число компаний</option>
          </select>

        </div>
      </td>
    </tr>
  </table>
</template>
<script>
import SelectAxisType from '@/components/SelectAxisType.vue'
import ScatterChart from '@/components/ScatterChart.vue'
import AbcChart from '@/components/AbcChart.vue'
import NewCompForm from './components/newCompForm.vue'
import DownloadButton from './components/downloadButton.vue'
import UploadButton from './components/uploadButton.vue'
import CompaniesList from './components/companiesList.vue'
import EventsList from './components/eventsList.vue'
import TimeLine from './components/TimeLine.vue'
import CreateCompEvent from '@/components/CreateCompEvent.vue'
import { mapGetters } from 'vuex'
import { startYear } from "@/js/const.js"

export default {
  name: 'root',
  components: {
    SelectAxisType,
    ScatterChart,
    AbcChart,
    NewCompForm,
    DownloadButton,
    UploadButton,
    CompaniesList,
    EventsList,
    TimeLine,
    CreateCompEvent
},
  data(){
    return {
      selectedCompany: null,
      selectedFile: null,

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
    }
  },
  methods:{
    // В идеале вынести этот функционал в соответствующий модуль. 
    // А тут получать через this.$store.config.value
    setPeriod(p) {
      this.$data.period = p;
      this.saveConfig()
    },
    removeCompany(e) {
      this.$store.commit('companies/remove', e)
      this.$store.dispatch('companies/save')  
      if(this.$data.selectedCompany?.IID === e?.IID){
        this.setSelectedCompany(null)
      }
    },
    loadCompanies() {
      if(this.$data.selectedFile) {
        const reader = new FileReader(); // без аргументов
        reader.readAsText(this.$data.selectedFile);
        reader.onload = () => {
          try {
            const json = reader.result;
            const parsed = JSON.parse(json);
            this.$store.commit("companies/set", parsed)
            this.$store.dispatch("companies/save")
          } catch {
            alert("Некорректный файл " + this.$data.selectedFile.name)
          }
        };
        reader.onerror = function() {
          console.log(reader.error);
        };
      }
    },
    getSumGrunts(company, period_from, period_to){
      return company.events
      .filter(el=>{
        return (el.type === "grantincome")
        && (el.period.year >= period_from.year && el.period.year <= period_to.year) 
        && (el.period.quarter >= period_from.quarter && el.period.quarter <= period_to.quarter)
      })
      .reduce((prev,el)=>{return prev + el.data},0)
    },
    storeCompanies() {
      const fileName = this.$data.selectedFile ?
        this.$data.selectedFile.name : '_companies';
      if (this.companies){
        const tempLink = document.createElement("a");
        if ('download' in tempLink) {
          const json = JSON.stringify(this.companies);
          const taBlob = new Blob([json], {type: 'application/json'});
          tempLink.setAttribute('href', URL.createObjectURL(taBlob));
          tempLink.setAttribute('download', fileName);
          tempLink.click();
          URL.revokeObjectURL(tempLink.href);      
        } else throw 'Сохранение в файл не поддерживается для этого браузера';
      }
    },
    updateSelectedCompanyData(val){
      this.$store.commit('companies/update', val)
      this.$store.dispatch('companies/save')
      this.setSelectedCompany(null)
    },
    setSelectedCompany(val){
      // При попытке установить выбранную(выделенную) компанию повторно выделение снимается
      const isAlreadySelected = this.$data.selectedCompany?.IID === val?.IID
      this.$data.selectedCompany = isAlreadySelected ? null : val
    },
    addNewCompany(val){
      this.$store.commit('companies/add', val)
      this.$store.dispatch('companies/save')
    },
    addEvent(e) {
      if (!this.$data.selectedCompany.events){
        this.$data.selectedCompany.events = [];
      }
      this.$data.selectedCompany.events.push(e)
      this.$store.commit('companies/update', this.$data.selectedCompany)
      this.$store.dispatch('companies/save')
    },
    removeEvent(e) {
      this.$data.selectedCompany.events = this.$data.selectedCompany.events.filter(c => c.id !== e.id)
    },
    saveConfig(){
      // Сохраняет текущий config в localStore
      this.$store.commit('config/set', {
        dataSource: this.dataSource,
        isAccredited: this.isAccredited,
        AbcAxis: this.AbcAxis,
        ScatterAxis: this.ScatterAxis,
        period: this.period,
        dataSource: this.dataSource,
      })
      this.$store.dispatch('config/save')
    },
    loadConfig() {
      this.$store.dispatch('config/load')
      // Это не полная связность Vuex и model.data! В идеале полностью убрать this.$data.config
      // а все значения брать из this.$store.config.value
      const config = this.$store.state.config.value
      if (config.dataSource != undefined) this.$data.dataSource = config.dataSource;
      if (config.isAccredited != undefined) this.$data.isAccredited = config.isAccredited;
      if (config?.abcAxis?.y != undefined) this.$data.AbcAxis = config.abcAxis;
      if (config?.scatterAxis?.x != undefined && config?.scatterAxis?.y != undefined ) this.$data.ScatterAxis = config.scatterAxis;
      if (config.period != undefined) this.$data.period = config.period;
    }
  },
  computed:{
    predict(){
      const x = this.$data.selectedCompany?.data.find(e => e.period.year === this.$data.period.year && e.period.quarter === this.$data.period.quarter);
      if(!x) return null
      return {
        ...x,
        IID : this.$data.selectedCompany?.IID,
        ogrn : this.$data.selectedCompany?.ogrn,
        income : x.income + this.getSumGrunts(this.$data.selectedCompany, {year:startYear,quarter:1},this.$data.period)
      }
    },
    companies(){
      return this.$store.state.companies.value
    },
    ...mapGetters({
      ScatterChartParams: 'config/ScatterChartParams',
      AbcChartParams: 'config/AbcChartParams'
    }),
    arr_gruntSum_perPeriod(){
      if(!this.$data.selectedCompany?.events?.length)return new Array()
      return this.$data.selectedCompany.events
        .filter((e)=>{return e.type === 'grantincome'})
        .reduce((prev,el)=>{
          const idx = prev.findIndex((e)=>{
            return (
              e.period.year === el.period.year
              && e.period.quarter === el.period.quarter
          )})
          
          if(idx >= 0){
            prev[idx].data += el.data
          }else{
            prev.push(el)
          }
          
          return prev
        },[])
    }
  },
  mounted() {
    this.$store.dispatch("companies/load")
    this.loadConfig();
  }  
}
</script>
<style scoped>
</style>