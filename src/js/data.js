import { updateData_plot1, Params as data_p1 } from './index.js'
import { updateData_plot2, Params as data_p2 } from './index2.js'
import { updateData_plot1_points as upd_p1_p } from './index_points.js'
import { plot1_point_styling_p as plot1_psp } from './const.js'

let select_x_Val = 'income'
let select_y_Val = 'employee_num'
let select2_y_Val = 'income'
let select_d_Val = 1

const Period = {
  year: '',
  quarter: ''
}

function get_p1_p () {
  return comp_table.points
    .map(el => {
      return [
        +el[select_x_Val],
        +el[select_y_Val],
        plot1_psp[el.isSelected ? 'selected' : 'not_selected']
      ]
    })
}

export function update_plot1_points () {
  upd_p1_p(get_p1_p())
}

export function saveData (e) {
  // e.preventDefault()
  // const form = e.target
  // const a = new FormData(form)
  // const obj = {}
  // for (const [key, value] of a) {
  //   if (key === 'IID' && value === '') {
  //     return
  //   }
  //   const v = +value
  //   if (key !== 'IID') {
  //     if (Number.isNaN(v)) {
  //       obj[key] = 0
  //     } else {
  //       obj[key] = +value
  //     }
  //   } else {
  //     if (!Number.isNaN(v)) {
  //       obj[key] = Math.round(Math.random() * 1e9)
  //     } else {
  //       obj[key] = value
  //     }
  //   }
  // }
  let companyList = localStorage.getItem('COMPANY_LIST')
  companyList = companyList ? JSON.parse(companyList) : []
  const found = companyList.find(c => c.IID === obj.IID)
  const isUpdate = JSON.stringify(found) !== JSON.stringify(obj)
  if (found && !isUpdate) {
    return
  }
  companyList = companyList.filter(c => c.IID !== obj.IID)
  companyList.push(obj)
  localStorage.COMPANY_LIST = JSON.stringify(companyList)
  form.querySelectorAll('input').forEach(el => el.value = '')
  if (isUpdate) {
    comp_table.removePoint(obj)
  }
  comp_table.addPoint(obj)
  comp_table.reload()
}
export function readData () {
  const companyList = localStorage.getItem('COMPANY_LIST')
  comp_table.points = companyList ? JSON.parse(companyList) : []
  comp_table.reload()
}
