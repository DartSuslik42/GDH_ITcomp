<template>
    <div>
        <div id="chart_div" ref="chart_div" class="chart content lower">
            <chart_img :size="size" :src="img_src"/>
        </div>
        <div id="chart_points_div" class="chart content"></div>
    </div>
</template>

<script>
import chart_img from '@/components/chart_img.vue'
import { API_Chart_Keys as API, server } from '@/js/const.js'
export default{
    props:{
        params: Object
    },
    components:{
        chart_img
    },
    data(){
        return{
            scale: 1,
            size:{
                x : null,
                y : null
            },
            img_src: "",
        }
    },
    computed:{
        request_url(){
            return `${server}scatter/json?` + 
            // Size
            `${API.ImgSize.x}=${this.$data.size.x}&${API.ImgSize.y}=${this.$data.size.y}` +
            // Period
            `&${API.Period.year}=${this.$props.params.Period.year}&${API.Period.quarter}=${this.$props.params.Period.quarter}` +
            // AxisType
            `&${API.AxisSrc.x}=${this.$props.params.AxisSrc.x}&${API.AxisSrc.y}=${this.$props.params.AxisSrc.y}&${API.AxisSrc.z}=${this.$props.params.AxisSrc.z}` +
            // DataSource
            `&${API.AxisSrc.d}=${this.$props.params.AxisSrc.d}`
        },
    },
    watch:{
        request_url(newVal){
            var xmlhttp = new XMLHttpRequest();
            xmlhttp.onreadystatechange = (function(){
                if(xmlhttp.status == 200 && xmlhttp.readyState == 4){
                    const obj = JSON.parse(xmlhttp.responseText);
                    this.$data.img_src = obj.img
                }
            }).bind(this);
            xmlhttp.open("GET",newVal,true);
            xmlhttp.send();   
        },
    },
    mounted(){
        this.$data.size = {
            x: this.$refs.chart_div?.clientWidth,
            y: this.$refs.chart_div?.clientHeight
        }
    },
}
</script>