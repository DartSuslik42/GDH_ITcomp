<template>
    <div>
        <chart_img id="img_from_api" 
            :size="img_style?.size || {x:0,y:0}" 
            :src="img_src" 
            :style="{
                top : img_style?.position.top + 'px',
                left : img_style?.position.left + 'px',
            }"
            :isloading="loading"
        />
        <div id="chart_points_div" class="chart content"></div>
    </div>
</template>

<script>
import chart_img from '@/components/chart_img.vue'
import { API_Chart_Keys as API, server, columns_plot1 as columns, options_trans as options, plot1_point_styling_p as point_style, Fields_Columns_Names as field_names} from '@/js/const.js'
export default{
    props:{
        params: Object,
        companies: Array,
        predict: Object,
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
            loading: false,
            request_url: undefined,
        }
    },
    methods:{
        update_request_url(){
            if(!this.$data.img_style?.size?.y || !this.$data.img_style?.size?.x) return undefined
            if(!this.$props.params.Period.quarter || !this.$props.params.Period.year) return undefined
            
            this.$data.request_url = `${server}scatter/json?` + 
            // Size
            `${API.ImgSize.x}=${this.$data.img_style.size.x}&${API.ImgSize.y}=${this.$data.img_style.size.y}` +
            // Period
            `&${API.Period.year}=${this.$props.params.Period.year}&${API.Period.quarter}=${this.$props.params.Period.quarter}` +
            // AxisType
            `&${API.AxisSrc.x}=${this.$props.params.AxisSrc.x}&${API.AxisSrc.y}=${this.$props.params.AxisSrc.y}&${API.AxisSrc.z}=${this.$props.params.AxisSrc.z}` +
            // DataSource
            `&${API.AxisSrc.d}=${this.$props.params.AxisSrc.d}` +
            // isAccredited
            `&${API.AxisSrc.a}=${this.$props.params.AxisSrc.a}`
        },
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
            this.$data.chart_options = {
                ...this.$data.chart_options,
                hAxis : {
                    ...this.$data.chart_options.hAxis,
                    ...{
                        maxValue: response.x.max,
                        minValue: response.x.min,
                        viewWindow:{
                            max: response.x.max,
                            min: response.x.min,
                        },
                        ticks: response.x.data,
                        scaleType: response.x.type
                    }
                },
                vAxis : {
                    ...this.$data.chart_options.vAxis,
                    ...{
                        maxValue: response.y.max,
                        minValue: response.y.min,
                        viewWindow:{
                            max: response.y.max,
                            min: response.y.min,
                        },
                        ticks: response.y.data,
                        scaleType: response.y.type
                    }
                }
            }
        },
        update_svg_chart(){
            if(!google?.visualization) return
            // ???????????????? DataTable 
            var data = new google.visualization.DataTable()
            const dataColumns = [
                {opt:{type: columns.x.type}}, // ???????????????? ???? X
                //?????????? ????????????????
                {opt:{type: columns.y.type}}, // ???????????????? ???? Y
                {opt:{type: 'string', role: 'style'}}, // ?????????? ??????????
                {opt:{type: 'string', role: 'tooltip', p: {'html': true}}}, // ToolTip ??????????
                //?????????? ?????????????????? ????????????????
                {opt:{type: columns.y.type}}, // ???????????????? ???? Y
                {opt:{type: 'string', role: 'style'}}, // ?????????? ??????????
                {opt:{type: 'string', role: 'tooltip', p: {'html': true}}}, // ToolTip ??????????
                {opt:{type: 'number',},useInPlot:false} // ???????????? ?????????? ?? ?????????????? ???????????????? this.$props.companies
            ]
            var CompanyId_ColumnIndex = 7   // ?????????????? ?? dataColums ?????????????? ???????????????? 

            dataColumns.forEach(el=>data.addColumn(el.opt))
            data.addRows(this.points)
        
            // ?????? ???????????????????? ?????????????? ???????????????????? ?????? ??????????????, ?????????? ?????????????? ???????? useInPlot===false
            const view = new google.visualization.DataView(data);
            view.setColumns(dataColumns.reduce((prev,el,idx)=>{
                if(el.useInPlot !== false) prev.push(idx)
                return prev
            },[]));

            // ?????????????? ??????????????????
            const chart_points_div = this.$el.querySelector('#chart_points_div')
            this.$data.chart = new google.visualization.ScatterChart(chart_points_div)

            // ?????????????????????? select-?????????? ?????? ?????????????? ???? ?????????? ????????????????
            google.visualization.events.addListener(this.$data.chart, "select", ()=>{
                const firstSelectItem = (this.$data.chart.getSelection())[0]
                const indexInCompaniesArr = data.getValue(firstSelectItem.row, CompanyId_ColumnIndex)
                this.$emit("select", this.$props.companies[indexInCompaniesArr]) 
            })
        
            this.$data.chart.draw(view, this.$data.chart_options)
        },
        getPointTooltipHTML(point){
           return (
            `<div style="padding:3px 7px 5px 7px;margin:0;width:max-content">
                <div><h6 style="margin:0"><b>${point?.IID || "Company Name"}</b></h6></div>
                <div><b>${field_names[this.$props.params.AxisSrc.x]}:</b><span>${+point[this.$props.params.AxisSrc.x]}</span></div>
                ${
                    this.$props.params.AxisSrc.x === this.$props.params.AxisSrc.y ? 
                    "" : 
                    `<div><b>${field_names[this.$props.params.AxisSrc.y]}:</b><span>${+point[this.$props.params.AxisSrc.y]}</span></div>`
                }
            </div>`
            )
        }
    },
    computed:{
        points(){
            return this.$props.companies
            .map(c => {
                const xs = c.data.find(e => e.period.year === this.$props.params.Period.year && e.period.quarter === this.$props.params.Period.quarter)       
                return {
                    IID:c.IID,
                    ...xs
                }
            })   
            .reduce((prev, el, idx) => {
                const isPredicted = el.IID === this.$props.predict?.IID
                if(isPredicted){
                    // ?????????? ?????????????? ?? ?????????? ???????????????? ?????? ?????????????????? ????????????????
                    prev.push([
                        +this.$props.predict[this.$props.params.AxisSrc.x],
                        null,
                        null,
                        null,
                        +this.$props.predict[this.$props.params.AxisSrc.y],
                        point_style['selected_predict'],
                        this.getPointTooltipHTML(this.$props.predict),
                        idx
                    ])
                    // ???????????? ?????????????? ?? ?????????? ?????????????????? ????????????????
                    prev.push([
                        +el[this.$props.params.AxisSrc.x],
                        null,
                        null,
                        null,
                        +el[this.$props.params.AxisSrc.y],
                        point_style['selected'], 
                        this.getPointTooltipHTML(el),
                        idx
                    ])
                }else{
                    prev.push([
                        +el[this.$props.params.AxisSrc.x],
                        +el[this.$props.params.AxisSrc.y],
                        point_style['not_selected'],
                        this.getPointTooltipHTML(el),
                        null,
                        null,
                        null,
                        idx
                    ])
                }
                return prev
            }, [])
        }
    },
    watch:{
        companies(){
            this.update_svg_chart()
        },
        predict(){
            this.update_svg_chart()
        },
        params(){
            this.update_request_url()
        },
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
                xmlhttp.open("GET", newVal, true);
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
            this.update_request_url()
        })
    },
    created(){
        window.addEventListener('resize',()=>{
            this.update_svg_chart()
            this.update_img_style()
        })
    }
}
</script>

<style scoped>
    #img_from_api{
        position: absolute;
        z-index: 10;
    }
</style>