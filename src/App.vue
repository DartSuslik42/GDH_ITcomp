<template>
  <table>
    <tr>
      <td class="charts border-bt border-rt">
        <div id="chart" class="chart container">
          
          <div id="select_yd">
            <SelectAxisType class="select_y" v-model="ScatterAxis.y"/>
            <select class="select_d" v-model="dataSource">
              <option value="1"> Версия 1 </option>
              <option value="2"> Версия 2 </option>
            </select>
            <input type="checkbox" id="accredited" v-model="isAccredited"> Аккредитованные
          </div>
          <ScatterChart class="chart diagram"
            :params="ScatterChartParams" 
            :companies="companies"
            :selected="selectedCompany" 
            @select="setSelectedCompany"
          />
          <SelectAxisType class="select_x" v-model="ScatterAxis.x"/>

        </div>
      </td>
      <td class="charts border-bt">
        <div id="chart2" class="chart container">

          <SelectAxisType class="select_y" v-model="AbcAxis.y"/>
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
              @remove="remove"
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
        <div id="q4">
          <div class="yq">
            <div class="year" v-for="year in [2019,2020,2021,2022]">
              {{ year }}
            </div>
          </div>
          <div class="yq">
            <div class="quarter" v-for="quarter in 16">
              Q{{(quarter-1)%4+1 }}
            </div>
          </div>
          <div class="yq">
            <div class="quarter" v-for="k in 16">
              <input type="text" />
            </div>
          </div>
          <div class="events">  
            <h4>Лента событий</h4>
          </div>
        </div>
      </td>
    </tr>
  </table>
</template>

<script>
// import { select_x_F, select_y_F, select2_y_F, saveData, select_d_F, readData } from "./js/data.js"
// document.querySelector("#form_comp form").onsubmit = saveData
// document.querySelector("#chart .select_x").onchange = select_x_F
// document.querySelector("#chart .select_y").onchange = select_y_F
// document.querySelector("#chart2 .select_y").onchange = select2_y_F
// document.querySelector("#select_yd .select_d").onchange = select_d_F
// document.querySelector("#loadBtn").onclick = readData
import SelectAxisType from '@/components/SelectAxisType.vue'
import ScatterChart from '@/components/ScatterChart.vue'
import AbcChart from '@/components/AbcChart.vue'
import NewCompForm from './components/newCompForm.vue'
import DownloadButton from './components/downloadButton.vue'
import UploadButton from './components/uploadButton.vue'
import CompaniesList from './components/companiesList.vue'

export default {
  name: 'root',
  components: {
    SelectAxisType,
    ScatterChart,
    AbcChart,
    NewCompForm,
    DownloadButton,
    UploadButton,
    CompaniesList
},
  data(){
    return {
      companies: [],
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
        year: '',
        quarter: ''
      },
    }
  },
  methods:{
    remove(e) {
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
      const idx = this.$data.companies.indexOf(this.$data.selectedCompany)
      this.$data.companies.splice(idx, 1, val) // https://v2.vuejs.org/v2/guide/reactivity.html#For-Arrays
      this.setSelectedCompany(null)
      this.storeCompanies()
    },
    setSelectedCompany(val){
      this.$data.selectedCompany = val
    },
    addNewCompany(val){
      this.$data.companies.push(val)
      this.storeCompanies()
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
}
</script>

<style>
</style>
