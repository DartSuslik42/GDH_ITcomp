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
            :dummyCompany="selectedCompany"
          />
        
        </div>
      </td>
      <td style="width:50%">
        <EventsList :events="events" @timeSelected="setPeriod"
            @addEvent="addEvent" :numbers="numbers"
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
      numbers: new Array(16).fill(''),
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
      selectedFile: null,
    }
  },
  methods:{
    setPeriod(p = {year: '', quarter: ''}) {
      this.$data.period = p;
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
      // Удалить компанию из списка компаний
      this.$data.companies = this.$data.companies.filter(c => c.IID !== e.IID)
      
      if(this.$data.selectedCompany?.IID === e?.IID){
        this.setSelectedCompany(null)
      }
    },
    loadCompanies() {
      if(!this.$data.selectedFile) {
        const json = localStorage['COMPANY_LIST'];
        this.$data.companies = json ? JSON.parse(json) : []
      } else {
        const reader = new FileReader(); // без аргументов
        reader.readAsText(this.$data.selectedFile);
        reader.onload = () => {
          try {
            const json = reader.result;
            const parsed = JSON.parse(json);
            localStorage['COMPANY_LIST'] = json;
            this.$data.companies = parsed;
          } catch {
            alert("Некорректный файл " + this.$data.selectedFile.name)
          }
        };
        reader.onerror = function() {
          console.log(reader.error);
        };  
      }  
    },
    storeCompaniesLocally() {
      localStorage['COMPANY_LIST'] = JSON.stringify(this.$data.companies);
    },
    storeCompanies() {
      const fileName = this.$data.selectedFile ?
        this.$data.selectedFile.name : '_companies';
      if (this.$data.companies) {
        const tempLink = document.createElement("a");
        if ('download' in tempLink) {
          const json = JSON.stringify(this.$data.companies);
          const taBlob = new Blob([json], {type: 'application/json'});
          tempLink.setAttribute('href', URL.createObjectURL(taBlob));
          tempLink.setAttribute('download', fileName);
          tempLink.click();
          URL.revokeObjectURL(tempLink.href);      
        } else throw 'Сохранение в файл не поддерживается для этого браузера';
      }
    },
    getNumbers() {
      const children = this.$el.querySelectorAll('.timeline');
      const xs = [];
      children.forEach(e=>{
        xs.push(e.value)
      })
      return xs;
    },
    updateSelectedCompanyData(val){
      const idx = this.$data.companies.indexOf(this.$data.selectedCompany)
      this.$data.companies.splice(idx, 1, val) // https://v2.vuejs.org/v2/guide/reactivity.html#For-Arrays
      this.setSelectedCompany(null)
    },
    setSelectedCompany(val){
      // При попытке установить выбранную(выделенную) компанию повторно выделение снимается
      const isAlreadySelected = this.$data.selectedCompany?.IID === val?.IID
      this.$data.selectedCompany = isAlreadySelected ? null : val
    },
    addNewCompany(val){
      this.$data.companies.push(val)
    },
    readConfig() {
      const json = localStorage['APP_CONFIG'];
      return json ? JSON.parse(json) : {};
    },
    saveDataSource() {
      const config = this.readConfig();
      config.dataSource = this.$data.dataSource;
      localStorage['APP_CONFIG'] = JSON.stringify(config);
    },
    saveIsAccredited() {
      const config = this.readConfig();
      config.isAccredited = this.$data.isAccredited;
      localStorage['APP_CONFIG'] = JSON.stringify(config);
    },
    saveAbcAxis() {
      const config = this.readConfig();
      config.abcAxis = this.$data.AbcAxis;
      localStorage['APP_CONFIG'] = JSON.stringify(config);
    },
    saveScatterAxis() {
      const config = this.readConfig();
      config.scatterAxis = this.$data.ScatterAxis;
      localStorage['APP_CONFIG'] = JSON.stringify(config);
    },
    savePeriod() {
      const config = this.readConfig();
      config.period = this.$data.period;
      localStorage['APP_CONFIG'] = JSON.stringify(config);
    },
    loadConfig() {
      const json = localStorage['APP_CONFIG'];
      if (json) {
        const config = JSON.parse(json);
        if (config.dataSource != undefined) this.$data.dataSource = config.dataSource;
        if (config.isAccredited != undefined) this.$data.isAccredited = config.isAccredited;
        if (config.abcAxis && config.abcAxis.y != undefined) this.$data.AbcAxis = config.abcAxis;
        if (config.scatterAxis && config.scatterAxis.x != undefined && config.scatterAxis.y != undefined ) this.$data.ScatterAxis = config.scatterAxis;
        if (config.period != undefined) this.$data.period = config.period;
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
  created() { 
    // beforeDestroy и destroy хуки vue не работают при закрытии страницы, а это работает
    window.addEventListener("beforeunload", this.storeCompaniesLocally);
  },
  mounted() {
      this.loadConfig();
  }  
}
</script>

<style>
</style>
