<template>
    <div>
        <chart_img id="abc_img_from_api" 
            :size="img_style?.size || {x:0,y:0}" 
            :src="img_src" 
            :style="{
                top : img_style?.position.top + 'px',
                left : img_style?.position.left + 'px',
            }"
            :isloading="loading"
        />
        <div id="abc_chart_points_div" class="chart content"></div>      
    </div>
</template>
<script>
import chart_img from '@/components/chart_img.vue'
import { API_Chart_Keys as API, server, columns_plot1 as columns, options_trans as options, plot1_point_styling_p as plot1_psp} from '@/js/const.js'
export default{
    props:{
        params: Object
    },
    components:{
        chart_img
    },
    data(){
        return{
            img_src: undefined,
            chart_options: options,
            img_style: null,
            chart: null,
            loading: false
        }
    },
    methods:{
        update_img_style(){
            const boundingBox = this.$data.chart.getChartLayoutInterface().getChartAreaBoundingBox(); 
            this.$data.img_style = {
                position:{
                    top : boundingBox?.top,
                    left : boundingBox?.left
                },
                size:{
                    x: boundingBox?.width,
                    y: boundingBox?.height
                },
            }
        },
        update_chart_options_fromResponse(response){
            this.$data.chart_options.hAxis = {
                ...this.$data.chart_options.hAxis,
                ...{
                    maxValue: Math.floor(response.x.max / response.x.scale),
                    minValue: Math.floor(response.x.min / response.x.scale),
                    viewWindow:{
                        max: Math.floor(response.x.max / response.x.scale),
                        min: Math.floor(response.x.min / response.x.scale),
                    },
                    ticks: response.x.data.map((el)=>{return Math.floor(el / response.x.scale)}),
                    scaleType: response.x.type
                }
            }
            this.$data.chart_options.vAxis = {
                ...this.$data.chart_options.vAxis,
                ...{
                    maxValue: Math.floor(response.y.max / response.y.scale),
                    minValue: Math.floor(response.y.min / response.y.scale),
                    viewWindow:{
                        max: Math.floor(response.y.max / response.y.scale),
                        min: Math.floor(response.y.min / response.y.scale),
                    },
                    ticks: response.y.data.map((el)=>{return Math.floor(el / response.y.scale)}),
                    scaleType: response.y.type
                }
            }
        },
        update_svg_chart(){
            // Data update
            var data = new google.visualization.DataTable()
            data.addColumn({
                type: columns.x.type
            })
            data.addColumn({
                type: columns.y.type
            })
            data.addRows([])

            // Redraw chart
            const chart_points_div = this.$el.querySelector('#abc_chart_points_div')
            this.$data.chart = new google.visualization.ScatterChart(chart_points_div)
            this.$data.chart.draw(data, this.$data.chart_options)
        },
    },
    computed:{
        request_url(){
            if(!this.$data.img_style?.size?.x) return undefined
            if(!this.$data.img_style?.size?.y) return undefined

            return `${server}abc/json?` + 
            // Size
            `${API.ImgSize.x}=${this.$data.img_style.size.x}&${API.ImgSize.y}=${this.$data.img_style.size.y}` +
            // Period
            `&${API.Period.year}=${this.$props.params.Period.year}&${API.Period.quarter}=${this.$props.params.Period.quarter}` +
            // AxisType
            `&${API.AxisSrc.y}=${this.$props.params.AxisSrc.y}` +
            // DataSource
            `&${API.AxisSrc.d}=${this.$props.params.AxisSrc.d}`
        },
    },
    watch:{
        request_url(newVal){
            if(newVal){
                var xmlhttp = new XMLHttpRequest();
                xmlhttp.onreadystatechange = (() => {
                    if(xmlhttp.status == 200 && xmlhttp.readyState == 4){
                        const obj = JSON.parse(xmlhttp.responseText);
                        this.$data.img_src = obj.img
                        this.update_chart_options_fromResponse(obj)
                        this.update_svg_chart()
                        this.$data.loading = false;
                    }
                }).bind(this);
                xmlhttp.open("GET",newVal,true);
                xmlhttp.send();  
                this.$data.loading = true;
            }
        },
    },
    mounted(){
        google.charts.load('current', { packages: ['corechart'] })
        google.charts.setOnLoadCallback(()=>{
            this.update_svg_chart()
            this.update_img_style()
        })
    },
}
</script>
   
<style scoped>
    #abc_img_from_api{
        position: absolute;
        z-index: 10;
    }
</style>
