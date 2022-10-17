<template>
  <table>
    <tr>
      <td class="charts border-bt border-rt">
        <div id="chart" class="chart container">
          
          <div id="select_yd">
            <SelectAxisType class="select_y" v-model="ScatterAxis.y" @input="saveScatterAxis"/>
            <select class="select_d" v-model="dataSource" v-on:change="saveDataSource">
              <option value="1"> Версия 1 </option>
              <option value="2"> Версия 2 </option>
            </select>
            <input type="checkbox" id="accredited" v-model="isAccredited" v-on:change="saveIsAccredited"> Аккредитованные
          </div>
          <ScatterChart class="chart diagram"
            :params="ScatterChartParams" 
            :companies="companies"
            :selected="selectedCompany" 
            @select="setSelectedCompany"
          />
          <SelectAxisType class="select_x" v-model="ScatterAxis.x" @input="saveScatterAxis"/>

        </div>
      </td>
      <td class="charts border-bt">
        <div id="chart2" class="chart container">

          <SelectAxisType class="select_y" v-model="AbcAxis.y"  @input="saveAbcAxis"/>
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
            @updateCompany="updateSelectedCompany" 
            @addCompany="addNewCompany" 
            :dummyCompany="selectedCompany"
          />
        
        </div>
      </td>
      <td style="width:50%">
        <EventsList :events="events" @timeSelected="setPeriod"
            @addEvent="addEvent"  
            @removeEvent="removeEvent" />
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
      companies: [],
      events: [],
      selectedCompany: null,
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
        year: 2019,
        quarter: 1
      },
    }
  },
  methods:{
    setPeriod(p) {
      this.$data.period = p;
      console.log(p)
    },
    addEvent(e) {
      if (!this.$data.events) {
        this.$data.events = [];
      }
      this.$data.events.push(e)
    },
    removeEvent(e) {
      this.$data.events = this.$data.events.filter(c => c.id !== e.id)
    },
    removeCompany(e) {
      this.$data.companies = this.$data.companies.filter(c => c.IID !== e.IID)
    },
    loadCompanies() {
      const json = localStorage['COMPANY_LIST'];
      this.$data.companies = json ? JSON.parse(json) : []
    },
    storeCompanies() {
      localStorage['COMPANY_LIST'] = JSON.stringify(this.$data.companies);
    },
    updateSelectedCompany(val){
      val.events = this.$data.events;
      const idx = this.$data.companies.indexOf(this.$data.selectedCompany)
      this.$data.companies.splice(idx, 1, val) // https://v2.vuejs.org/v2/guide/reactivity.html#For-Arrays
      this.setSelectedCompany(null)
      this.storeCompanies()
    },
    setSelectedCompany(val){
      this.$data.selectedCompany = val;
      this.events = val.events;
    },
    addNewCompany(val){
      this.$data.companies.push(val)
      this.storeCompanies()
    },
    readConfig() {
      const json = localStorage['APP_CONFIG'];
      console.log('readConfig', json)
      return json && json !== "undefined" ? JSON.parse(json) : {};
    },
    saveDataSource() {
      console.log('saveDataSource', this.$data.dataSource)
      const config = this.readConfig();
      config.dataSource = this.$data.dataSource;
      localStorage['APP_CONFIG'] = JSON.stringify(config);
    },
    saveIsAccredited() {
      console.log('saveIsAccredited', this.$data.isAccredited)
      const config = this.readConfig();
      config.isAccredited = this.$data.isAccredited;
      localStorage['APP_CONFIG'] = JSON.stringify(config);
    },
    saveAbcAxis() {
      console.log('saveAbcAxis', this.$data.AbcAxis)
      const config = this.readConfig();
      config.abcAxis = this.$data.AbcAxis;
      localStorage['APP_CONFIG'] = JSON.stringify(config);
    },
    saveScatterAxis() {
      console.log('saveScatterAxis', this.$data.ScatterAxis)
      const config = this.readConfig();
      config.scatterAxis = this.$data.ScatterAxis;
      localStorage['APP_CONFIG'] = JSON.stringify(config);
    },
    savePeriod() {
      console.log('savePeriod', this.$data.period)
      const config = this.readConfig();
      config.period = this.$data.period;
      localStorage['APP_CONFIG'] = JSON.stringify(config);
    },
    loadConfig() {
      const json = localStorage['APP_CONFIG'];
      if (json && json !== "undefined") {
        const config = JSON.parse(json);
        console.log('loadConfig', config)
        this.$data.dataSource = config.dataSource;
        this.$data.isAccredited = config.isAccredited;
        this.$data.AbcAxis = config.abcAxis;
        this.$data.ScatterAxis = config.scatterAxis;
        if (config.period) this.$data.period = config.period;
      }
    }
  },
  computed:{
    ScatterChartParams: function(){
      return {
        AxisSrc:{
          x:this.$data.ScatterAxis.x,
          y:this.$data.ScatterAxis.y,
          z:this.$data.AbcAxis.y,
          d:this.$data.dataSource,
          a:this.$data.isAccredited
        },
        Period:this.$data.period,
      }
    },
    AbcChartParams: function(){
      return {
        AxisSrc:{
          y:this.$data.AbcAxis.y,
          d:this.$data.dataSource
        },
        Period:this.$data.period,
      }
    }
  },
  mounted() {
      this.loadConfig();
  }
  
}
</script>

<style>
</style>
