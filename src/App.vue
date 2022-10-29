<template>
  <table>
    <tr>
      <td class="charts border-bt border-rt">
        <div id="chart" class="chart container">
          
          <div id="select_yd">
            <SelectAxisType class="select_y" v-model="ScatterAxis.y" @input="saveConfig"/>
            <select class="select_d" v-model="dataSource" v-on:change="saveConfig">
              <option value="1"> Версия 1 </option>
              <option value="2"> Версия 2 </option>
            </select>
            <input type="checkbox" id="accredited" v-model="isAccredited" v-on:change="saveConfig"> Аккредитованные
          </div>
          <ScatterChart class="chart diagram"
            :params="ScatterChartParams" 
            :period="period"
            :companies='companies.map((el)=>{return{
              ...el,
              predict: {
                "IID": el.IID,
                "ogrn":0,
                "income":formData()?.income + period.grunt || 0,
                "income_lic":0,
                "fot":0,
                "taxesProfit":0,
                "taxesVAT":0,
                "taxesEmplSal":0,
                "insurance":0,
                "employee_num":formData()?.employee_num,
              }
            }})'
            :selected='{
              ...selectedCompany,
              predict: {
                "IID": selectedCompany?.IID,
                "ogrn":0,
                "income":formData()?.income + period.grunt,
                "income_lic":0,
                "fot":0,
                "taxesProfit":0,
                "taxesVAT":0,
                "taxesEmplSal":0,
                "insurance":0,
                "employee_num":formData()?.employee_num,
              }
            }'
            @select="setSelectedCompany"
          />
          <SelectAxisType class="select_x" v-model="ScatterAxis.x" @input="saveConfig"/>

        </div>
      </td>
      <td class="charts border-bt">
        <div id="chart2" class="chart container">

          <SelectAxisType class="select_y" v-model="AbcAxis.y"  @input="saveConfig"/>
          <AbcChart :params="AbcChartParams" class="chart diagram"/>
          <select class="select_x" disabled>
            <option selected>Число компаний</option>
          </select>

        </div>
      </td>
    </tr>
    <tr>
      <td id="cell_bl" class="forms border-bt border-rt">
        <div id="cell_bl_content">
          <div id="org_list">
            <div>
              <b>Организации в анализе</b>
              <CompaniesList :companies="companies" 
              :selected="selectedCompany" 
              @removeCompany="removeCompany"
              @select="setSelectedCompany"/>
            </div>
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
              <img id="logo" src="@/assets/gdh.png" alt="GDH" width="150px">
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
      <td style="width:50%">
        <EventsList 
          @addEvent="addEvent" 
          @removeEvent="removeEvent"
          @timeSelected="setPeriod" 
          :selectedCompany="selectedCompany" 
          :period="period"/>
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
import { mapGetters } from 'vuex'

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
    EventsList
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
        year: '',
        quarter: '',
        grunt: 0
      },
    }
  },
  methods:{
    formData() {
      const x = this.$data.selectedCompany?.data?.find(
        e => e?.year === this.$data.period?.year && e?.quarter === this.$data.period?.quarter);
      return x;  
    },
    // В идеале вынести этот функционал в соответствующий модуль. 
    // А тут получать через this.$store.config.value
    setPeriod(p = {year: '', quarter: ''}) {
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
      if (!this.$data.selectedCompany.events) {
        this.$data.selectedCompany.events = [];
      }
      this.$data.selectedCompany.events.push({...e})
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
    companies(){
      return this.$store.state.companies.value
    },
    ...mapGetters({
      ScatterChartParams: 'config/ScatterChartParams',
      AbcChartParams: 'config/AbcChartParams'
    })
  },
  mounted() {
    this.$store.dispatch("companies/load")
    this.loadConfig();
  }  
}
</script>

<style>
</style>
