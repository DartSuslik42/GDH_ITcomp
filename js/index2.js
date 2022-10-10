import { update_plot2 } from "/js/data.js"
import { API_Chart_Keys as API } from "/js/const.js"

window.addEventListener('load', (event) => {
    update_plot2()
});

const img = document.createElement('img')
const chart_div = document.getElementById('chart2_div')
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
        y: "",
        d: ""
    },
    Src: "",
}

export function updateData_plot2() {
    Params.Size.x = chart_div.clientWidth
    Params.Size.y = chart_div.clientHeight

    const size_str = `${API.ImgSize.x}=${Math.floor(Params.Size.x * Params.Scale)}&${API.ImgSize.y}=${Math.floor(Params.Size.y * Params.Scale)}`
    const period_str = `${API.Period.year}=${Params.Period.year}&${API.Period.quarter}=${Params.Period.quarter}`
    const axis_src_str = `${API.AxisSrc.y}=${Params.AxisSrc.y}&${API.AxisSrc.d}=${Params.AxisSrc.d}`
    const dpi_str = `${API.DPI}=${Params.DPI}`
    Params.Src = `https://greencert.car.cos.ru/abc?${size_str}&${period_str}&${axis_src_str}&${dpi_str}`

    img.width = Params.Size.x
    img.height = Params.Size.y
    img.src = Params.Src;
}