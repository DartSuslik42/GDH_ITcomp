import all_table_points from "/data/pointsFromTable.json" assert { type: "json" }

import {updateData_plot1, Params as data_p1} from "/js/index.js"
import {updateData_plot2, Params as data_p2} from "/js/index2.js"
import {updateData_plot1_points as upd_p1_p} from "/js/index_points.js"
import {plot1_point_styling_p as plot1_psp} from "/js/const.js"

let select_x_Val = "income"
let select_y_Val = "employee_num"
let select2_y_Val = "income"

const Period = {
    year : "",
    quarter : ""
}

const table_points = {
    selected : [all_table_points[0],all_table_points[1],all_table_points[2]],
    all : all_table_points,
    addPoint : function(p){
        this.all.push(p)
        update_table()
    }
}
export function update_table(){
    const table = document.getElementById("table_point")
    table.innerHTML = ""
    if(Array.isArray(table_points.all)){
        table_points.all.forEach((el)=>{
            const child = document.createElement("li")
            child.innerHTML = `${el.IID}`
            table.appendChild(child)
        })
    }
}
function getData_plot1(){
    data_p1.AxisSrc.x = select_x_Val
    data_p1.AxisSrc.y = select_y_Val
    data_p1.AxisSrc.z = select2_y_Val
    data_p1.Period.year = Period.year
    data_p1.Period.quarter = Period.quarter
}
function getData_plot2(){
    data_p2.AxisSrc.y = select2_y_Val
    data_p2.Period.year = Period.year
    data_p2.Period.quarter = Period.quarter
}
function get_p1_p(){
    const ret = table_points.all
        .map((el)=>{
            const is_selected = table_points.selected.find((sel)=>{
                return sel.IID === el.IID 
            }) ? true : false
            
            return {
                    x: +el[select_x_Val],
                    y: +el[select_y_Val],
                    z: +el[select2_y_Val],
                    is_selected: is_selected,
            }
        })
        .map((el)=>{
            if(el.is_selected){
                return [el.x, el.y, plot1_psp["selected"]]
            }else {
                return [el.x, el.y, plot1_psp["not_selected"]]
            }
        })
    return ret
}
export function update_plot1_points(){
    const data = get_p1_p()
    upd_p1_p(data)
}

export function update_plot1(){
    getData_plot1()
    updateData_plot1()
}
export function update_plot2(){
    getData_plot2()
    updateData_plot2()
    update_plot1()
}
export function select_x_F(e){
    select_x_Val = e.target.value
    update_plot1()
}
export function select_y_F(e){
    select_y_Val = e.target.value
    update_plot1()
}
export function select2_y_F(e){
    select2_y_Val = e.target.value
    update_plot2()
}
export function save_F(e){
    e.preventDefault()

    const form = e.target
    const a = new FormData(form)
    
    const _ = [...form.querySelectorAll("input")].forEach(el=>{
        el.value = ""
    })

    const obj = {}
    for (const [key, value] of a) {
        const v = +value
        if(key !== "IID"){
            if(Number.isNaN(v)){
                obj[key] = 0
            }else{
                obj[key] = +value
            }
        }else{
            if(!Number.isNaN(v)){
                obj[key] = Math.round(Math.random()*1e9)
            }else{
                obj[key] = value
            }
        }
    }

    console.log(obj)
    table_points.addPoint(obj)
}