import { update_plot1 } from "/js/data.js"
import { API_Chart_Keys as API, server } from "/js/const.js"

// window.addEventListener('load', (event) => {
//     update_plot1()
// });

const img = document.createElement('img')
const chart_div = document.getElementById('chart_div')
chart_div.appendChild(img);

export const Params = {
    Size: {
        x: "",
        y: "",
    },
    Period: {
        year: "",
        quarter: ""
    },
    DPI: "",
    Scale: 1,
    AxisSrc: {
        x: "",
        y: "",
        z: "",
        d: ""
    },
    Src: "",
}
/*
export function updateData_plot1() {
    Params.Size.x = chart_div.clientWidth
    Params.Size.y = chart_div.clientHeight

    const size_str = `${API.ImgSize.x}=${Math.floor(Params.Size.x * Params.Scale)}&${API.ImgSize.y}=${Math.floor(Params.Size.y * Params.Scale)}`
    const period_str = `${API.Period.year}=${Params.Period.year}&${API.Period.quarter}=${Params.Period.quarter}`
    const axis_src_str = `${API.AxisSrc.x}=${Params.AxisSrc.x}&${API.AxisSrc.y}=${Params.AxisSrc.y}&${API.AxisSrc.z}=${Params.AxisSrc.z}&${API.AxisSrc.d}=${Params.AxisSrc.d}`
    const dpi_str = `${API.DPI}=${Params.DPI}`
    Params.Src = `${server}scatter?${size_str}&${period_str}&${axis_src_str}&${dpi_str}`

    img.width = Params.Size.x
    img.height = Params.Size.y
    img.src = Params.Src;
}
*/
export function updateData_plot1() {
    var xmlhttp = new XMLHttpRequest();
    xmlhttp.onreadystatechange = function(){
      if(xmlhttp.status == 200 && xmlhttp.readyState == 4){
        const obj = JSON.parse(xmlhttp.responseText);
        img.width = Params.Size.x
        img.height = Params.Size.y
        img.src = obj.img;
      }
    };
    const url = getChartUrl()
    xmlhttp.open("GET",url,true);
    xmlhttp.send();    
}

function getChartUrl() {
    Params.Size.x = chart_div.clientWidth
    Params.Size.y = chart_div.clientHeight
    const size_str = `${API.ImgSize.x}=${Math.floor(Params.Size.x * Params.Scale)}&${API.ImgSize.y}=${Math.floor(Params.Size.y * Params.Scale)}`
    const period_str = `${API.Period.year}=${Params.Period.year}&${API.Period.quarter}=${Params.Period.quarter}`
    const axis_src_str = `${API.AxisSrc.x}=${Params.AxisSrc.x}&${API.AxisSrc.y}=${Params.AxisSrc.y}&${API.AxisSrc.z}=${Params.AxisSrc.z}&${API.AxisSrc.d}=${Params.AxisSrc.d}`
    return `${server}scatter/json?${size_str}&${period_str}&${axis_src_str}`;
}