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
          </div>
          <ScatterChart :params="ScatterChartParams" class="chart diagram"/>
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
              <ol id="table_point">
              </ol>
            </div>
            <img id="logo" src="gdh.png" alt="GDH" width="150px">
          </div>
          <NewCompForm>
            <div class="row">
              <div class="col-6">
                <button type="submit" id="saveBtn" title="Сохранить локально" class="btn btn-primary">
                    Сохранить
                </button>
              </div>
              <div class="col-6">
                <button type="button" id="loadBtn" title="Загрузить сохранённое" class="btn btn-primary">
                    Загрузить
                </button>
              </div>
            </div>
          </NewCompForm>
        </div>
      </td>
      <td class="contaner">
        <div class="row">
          <div class="col ml-4">
            <div class="mb-1">
              <input type="date" id="start" name="date-start" value="2022-01-01">
              <input type="date" id="end" name="date-end" value="2022-09-30">
            </div>
            <div class="row">
              <div class="col">
                <input type="text" placeholder="ООО Лютик">
              </div>
              <div class="col">
                <input type="text" placeholder="123456789012">
              </div>
            </div>
            <div class="row">
              <div class="col">
                <input type="text" placeholder="окт 2022">
              </div>
              <div class="col">
                <input type="text" placeholder="22 000 000">
              </div>
            </div>
            <div class="row">
              <div class="col">
                <input type="text" placeholder="март 2022">
              </div>
              <div class="col">
                <input type="text" placeholder="22 000 000">
              </div>
            </div>
            <div class="row">
              <div class="col">
                <input type="text" placeholder="март 2022">
              </div>
              <div class="col">
                <input type="text" placeholder="22 000 000">
              </div>
            </div>
          </div>
          <div class="col">
            <ul class="list-group">
              <li class="list-group-item">
                <h6 style="color:steelblue">Лента событий</h6>
              </li>
              <li class="list-group-item">Аккредитовано Минцифрой</li>
              <li class="list-group-item">Принято решение о субсидии</li>
              <li class="list-group-item active">Первый транш</li>
              <li class="list-group-item">Отчет по первому этапу</li>
            </ul>
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
export default {
  name: 'root',
  components: {
    SelectAxisType,
    ScatterChart,
    AbcChart,
    NewCompForm
},
  data(){
    return {
      dataSource: 1,
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
      companies: [
        
      ],
    }
  },
  computed:{
    ScatterChartParams: function(){
      return {
        AxisSrc:{
          x:this.$data.ScatterAxis.x,
          y:this.$data.ScatterAxis.y,
          z:this.$data.AbcAxis.y,
          d:this.$data.dataSource
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
