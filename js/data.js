import data from "/data/y2019q1_1000.json" assert { type: "json" }
import {updateData_plot1} from "/js/index.js"
import {updateData_plot2} from "/js/index2.js"

let select_x_Val = "income"
let select_y_Val = "employee_num"
let select2_y_Val = "income"

const plot1_point_styling = {
    A: `point {
        fill-color:#b40000;
        visible:true; }`,
    B: `point {
        fill-color:#0000b4;
        visible:true; }`,
    C: `point {
        fill-color:#007800;
        visible:true; }`,
}
const plot2_point_styling = {
    A: `line {
            color:#b40000;}
        point {
            visible:false;}`,
    B: `line {
        color:#0000b4;}
        point {
            visible:false; }`,
    C: `line {
        color:#007800;}
        point {
            visible:false; }`,
    not_visible: `line {
        color: none;}
    point {
        visible:false;}`,
}

let data_plot1 = []
let data_plot2 = []
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

export function update_plot1(){
    getData_plot1()
    updateData_plot1(data_plot1)
}
export function update_plot2(){
    getData_plot2()
    updateData_plot2(data_plot2)
    update_plot1()
}
export const columns_plot1 = {
    x : {
        type : "number",
        scale : "log",
    },
    y : {
        type : "number",
        scale : "log",
    }
}
export const columns_plot2 = {
    x : {
        type : "number",
        scale : "linear",
    },
    y : {
        type : "number",
        scale : "linear",
    }
}
export const options_def = {
    hAxis: { 
        minValue: 0,
        format: 'short',
        baselineColor: 'none',
    },
    vAxis: {
        minValue: 0,
        format: 'short',
        baselineColor: 'none',
    },
    legend: 'none',
    backgroundColor: {
        stroke: "none",
        fill: "transparent",
    },
    chartArea: {
        backgroundColor: {
            stroke: "black",
            strokeWidth: "1px",
            fill: "white",
        },
        left:40,
        right:18,
        bottom:45,  
        top:30,
        width: "100%",
        height: "100%",    
    },
    pointSize: 2,
    enableInteractivity: false,
    width: "auto",
    height: "auto",
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