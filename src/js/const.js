export const columns_plot1 = {
  x: {
    type: 'number',
    scale: 'log'
  },
  y: {
    type: 'number',
    scale: 'log'
  }
}
export const columns_plot2 = {
  x: {
    type: 'number',
    scale: 'linear'
  },
  y: {
    type: 'number',
    scale: 'linear'
  }
}
export const options_def = {
  hAxis: {
    minValue: 0,
    format: 'short',
    baselineColor: 'none'
  },
  vAxis: {
    minValue: 0,
    format: 'short',
    baselineColor: 'none'
  },
  legend: 'none',
  backgroundColor: {
    stroke: 'none',
    fill: 'transparent'
  },
  chartArea: {
    backgroundColor: {
      stroke: 'black',
      strokeWidth: '1px',
      fill: 'white'
    },
    left: 40,
    right: 18,
    bottom: 45,
    top: 30,
    width: '100%',
    height: '100%'
  },
  pointSize: 2,
  enableInteractivity: false,
  width: 'auto',
  height: 'auto'
}
export const options_trans = {
  hAxis: {
    baselineColor: 'none',
    gridlines: { color: 'none' },
    minorGridlines: { color: 'none' },
    textStyle: { color: 'black' },
    format: 'short',
    ticks: [],
  },
  vAxis: {
    baselineColor: 'none',
    gridlines: { color: 'none' },
    minorGridlines: { color: 'none' },
    textStyle: { color: 'black' },
    format: 'short',
    ticks: [],
  },
  legend: 'none',
  backgroundColor: {
    stroke: 'none',
    fill: 'none'
  },
  chartArea: {
    backgroundColor: {
      stroke: 'black',
      fill: 'none'
    },
    left: 45,
    right: 5,
    bottom: 30,
    top: 5,
    width: '100%',
    height: '100%'
  },
  aggregationTarget: "none",
  tooltip:{
    isHtml: true
  },
  series:{
    0:{
    },
    1:{
      lineWidth: 2,
      color: "purple",
      lineDashStyle: [3,3],
    }
  }
}
export const plot1_point_styling_p = {
  selected: `point {
        fill-color:cyan;
        stroke-color: blue;
        stroke-width: 2;
        size:4;
        visible:true; 
    }`,
  selected_predict: `point {
      fill-color:magenta;
      stroke-color: purple;
      stroke-width: 2;
      size:4;
      visible:true; 
  }`,
  not_selected: `point {
        fill-color: yellow;
        stroke-color: red;
        stroke-width: 1;
        visible:true; 
        size:4;
    }`
}
export const API_Chart_Keys = {
  ImgSize: {
    x: 'w',
    y: 'h'
  },
  AxisSrc: {
    x: 'x_src',
    y: 'y_src',
    z: 'abc_src',
    d: 'dataset',
    a: 'isAccredited'
  },
  AxisLable: {
    x: 'x_label',
    y: 'y_label'
  },
  Period: {
    year: 'year',
    quarter: 'quarter'
  },
  DPI: 'dpi'
}
export const Fields_Boolean = {
  isIT: 'isIT',
  isSpecialTaxRegime_insurance: 'isSpecialTaxRegime_insurance',
  isSpecialTaxRegime_profit: 'isSpecialTaxRegime_profit',
  isIP: 'isIP'
}
export const Fields_Info = {
  IID: 'IID',
  taxType: 'taxType',
  businessSize: 'businessSize'
}
export const Fields_Columns = {
  employee_num: 'employee_num',
  fot: 'fot',
  income: 'income',
  income_lic: 'income_lic',
  taxesProfit: 'taxesProfit',
  taxesVAT: 'taxesVAT',
  taxesEmplSal: 'taxesEmplSal',
  insurance: 'insurance',
  taxes: "taxes"
}
export const Fields_Columns_Names = {
  income: 'Доход',
  income_lic: 'Доход с лицензий',
  fot: 'Фонд оплаты труда',
  taxesProfit: 'Налог с прибыли',
  taxesVAT: 'НДС',
  taxesEmplSal: 'НДФЛ',
  insurance: 'Страховые сборы',
  taxes: "Cумма платежей в бюджет",
  employee_num: 'Количество сотрудников'
}
export const Fields_All = {
  ...Fields_Boolean,
  ...Fields_Columns,
  ...Fields_Info
}
export const dummyFormCompany = {
  IID: "",
  ogrn: "",
  income: "",
  income_lic: "",
  fot: "",
  taxesProfit: "",
  taxesVAT: "",
  taxesEmplSal: "",
  insurance: "",
  employee_num: "",
  events: undefined
}
export const dummyFormEvent = {
  id: "получение дохода от грантов и субсидий",
  year: "",
  quarter: "",
}

export const server = "https://greencert.car.cos.ru/";
export const startYear = 2021;
