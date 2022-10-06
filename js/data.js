import data from "/data/y2019q1_1000.json" assert { type: "json" }
import all_table_points from "/data/pointsFromTable.json" assert { type: "json" }

import {updateData_plot1} from "/js/index.js"
import {updateData_plot2} from "/js/index2.js"
import {updateData_plot1_points as upd_p1_p} from "/js/index_points.js"
import {plot1_point_styling, plot2_point_styling, plot1_point_styling_p as plot1_psp} from "/js/const.js"

let select_x_Val = "income"
let select_y_Val = "employee_num"
let select2_y_Val = "income"

let data_plot1 = []
let data_plot2 = []

const table_points = {
    selected : [all_table_points[0],all_table_points[1],all_table_points[2]],
    all : all_table_points,
}

function getData_plot1(){

    data_plot1 = data.map((el)=>{
        return {
            x: +el[select_x_Val],
            y: +el[select_y_Val],
            z: +el[select2_y_Val]
        }
    })
    
    data_plot1.sort((el1, el2)=>{
        if (el2.z > el1.z){
            return 1
        }else 
            return -1
    })
    
    const aa = data_plot1.reduce((ret, el)=>{
        return (ret += el.z)
    }, 0)
    let AA = 0

    data_plot1 = data_plot1.map((el)=>{
        AA += el.z
        if(AA/aa*100 < 80){
            return [el.x, el.y, plot1_point_styling["A"]]
        }else if (AA/aa * 100 < 95){
            return [el.x, el.y, plot1_point_styling["B"]]
        }else{
            return [el.x, el.y, plot1_point_styling["C"]]
        }
    })
}
function getPoint(idx, AA, k){
    if(k < 80){
        return [idx + 1, AA, plot2_point_styling["A"],true]
    }else if (k < 95){
        return [idx + 1, AA, plot2_point_styling["B"],true]
    }else{
        return [idx + 1, AA, plot2_point_styling["C"],true]
    }
}
function mapData(data){
    const aa = data_plot2.reduce((ret, el)=>{
        return (ret += el.y)
    }, 0)
    let AA = 0
    let prev = "A"
    const add = []
    const ret = []
    let size = data.length
    for(let idx=0;idx < size;idx++){
        const el = data[idx]
        AA += el.y
        const k = AA/aa*100
        ret.push(getPoint(idx,AA,k))
        
        if (k > 80 && prev === "A"){
            add.push([idx,0,plot2_point_styling["not_visible"],true])
            add.push([idx,AA-el.y,plot2_point_styling["not_visible"],false])
            add.push([0,AA-el.y,plot2_point_styling["not_visible"],true])
            prev = "B"
        }else if(k > 95 && prev === "B"){
            add.push([idx,0,plot2_point_styling["not_visible"],true])
            add.push([idx,AA-el.y,plot2_point_styling["not_visible"],false])
            add.push([0,AA-el.y,plot2_point_styling["not_visible"],true])
            prev = "C"
            size = idx * 2.5 > size ? size : idx * 2.5
        }
    }
    return ret.concat(add)
}
function getData_plot2(){

    data_plot2 = data.map((el,idx)=>{
        return {
            x: 0,
            y: +el[select2_y_Val]
        }
    
    })
    
    data_plot2.sort((el1, el2)=>{
        if (el2.y > el1.y){
            return 1
        }else 
            return -1
    })
    
    data_plot2 = [[0, 0, plot2_point_styling["A"], true]]
        .concat(mapData(data_plot2))
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
    updateData_plot1(data_plot1)
    const d = document.getElementById("chart_div").querySelector("svg")
}
export function update_plot2(){
    getData_plot2()
    updateData_plot2(data_plot2)
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