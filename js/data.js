import { updateData_plot1, Params as data_p1 } from "/js/index.js"
import { updateData_plot2, Params as data_p2 } from "/js/index2.js"
import { updateData_plot1_points as upd_p1_p } from "/js/index_points.js"
import { plot1_point_styling_p as plot1_psp } from "/js/const.js"

let select_x_Val = "income"
let select_y_Val = "employee_num"
let select2_y_Val = "income"
let select_d_Val = 1

const Period = {
    year: "",
    quarter: ""
}

/** Company list */
const comp_table = {
    table: document.getElementById("table_point"),
    points: [],
    addPoint: function (p) {
        this.points.push(p)
    },
    removePoint: function (p) {
        this.points = this.points.filter(e => e.IID !== p.IID)
    },
    reload: function () {
        this.table.innerHTML = ""
        this.points.forEach((el) => {
            const child = document.createElement("li")
            child.id = el.IID
            child.innerHTML = `${el.IID}`
            if (el.isSelected) {
                child.classList.add("active")
            }
            this.table.appendChild(child)
            child.onclick = clickOrg
        })
        update_plot1_points()
    },
}

function getData_plot1() {
    data_p1.AxisSrc.x = select_x_Val
    data_p1.AxisSrc.y = select_y_Val
    data_p1.AxisSrc.z = select2_y_Val
    data_p1.AxisSrc.d = select_d_Val
    data_p1.Period.year = Period.year
    data_p1.Period.quarter = Period.quarter
}
function getData_plot2() {
    data_p2.AxisSrc.y = select2_y_Val
    data_p2.AxisSrc.d = select_d_Val
    data_p2.Period.year = Period.year
    data_p2.Period.quarter = Period.quarter
}
function get_p1_p() {
    return comp_table.points
        .map(el => {
            return [
                +el[select_x_Val],
                +el[select_y_Val],
                plot1_psp[el.isSelected ? "selected" : "not_selected"]
            ]
        })
}
export function update_plot1_points() {
    upd_p1_p(get_p1_p())
}
export function update_plot1() {
    getData_plot1()
    updateData_plot1()
    update_plot1_points()
}
export function update_plot2() {
    getData_plot2()
    updateData_plot2()
    update_plot1()
}
export function select_d_F(e) {
    select_d_Val = e.target.value
    update_plot2()
}
export function select_x_F(e) {
    select_x_Val = e.target.value
    update_plot1()
}
export function select_y_F(e) {
    select_y_Val = e.target.value
    update_plot1()
}
export function select2_y_F(e) {
    select2_y_Val = e.target.value
    update_plot2()
}
export function saveData(e) {
    e.preventDefault()
    const form = e.target
    const a = new FormData(form)
    const obj = {}
    for (const [key, value] of a) {
        if (key === "IID" && value === "") {
            return;
        }
        const v = +value
        if (key !== "IID") {
            if (Number.isNaN(v)) {
                obj[key] = 0
            } else {
                obj[key] = +value
            }
        } else {
            if (!Number.isNaN(v)) {
                obj[key] = Math.round(Math.random() * 1e9)
            } else {
                obj[key] = value
            }
        }
    }
    let companyList = localStorage.getItem('COMPANY_LIST');
    companyList = companyList ? JSON.parse(companyList) : [];
    const found = companyList.find(c => c.IID === obj.IID);
    const isUpdate = JSON.stringify(found) !== JSON.stringify(obj);
    if (found && !isUpdate) {
        return;
    }
    companyList = companyList.filter(c => c.IID !== obj.IID)
    companyList.push(obj);
    localStorage['COMPANY_LIST'] = JSON.stringify(companyList);
    form.querySelectorAll("input").forEach(el => el.value = "")
    if (isUpdate) {
        comp_table.removePoint(obj)
    }
    comp_table.addPoint(obj)
    comp_table.reload()
}

/**
 * Click on item in Организации в анализе
 * @param {*} e mouse click event
 */
export function clickOrg(e) {
    const id = e.target.id;
    comp_table.points.forEach(p => {
        p.isSelected = p.IID === id;
        return p;
    });
    comp_table.reload();
    const org = comp_table.points.filter(p => p.IID === id)[0];
    const xs = document.querySelectorAll("#form_comp form input");
    xs.forEach(x => {
        x.value = org[x.name];
    });
}

/**
 * Load saved companies
 */
export function readData() {
    const companyList = localStorage.getItem('COMPANY_LIST');
    comp_table.points = companyList ? JSON.parse(companyList) : [];
    comp_table.reload();
}
