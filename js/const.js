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
export const options_trans = {
    hAxis: {
        baselineColor: 'none',
        gridlines: {color: 'none'},
        minorGridlines: {color: 'none'},
        textStyle: {color: 'none'},
    },
    vAxis: {
        baselineColor: 'none',
        gridlines: {color: 'none'},
        minorGridlines: {color: 'none'},
        textStyle: {color: 'none'},
    },
    legend: 'none',
    backgroundColor: {
        stroke: "none",
        fill: "transparent",
    },
    chartArea: {
        backgroundColor: {
            stroke: "none",
            fill: "transparent",
        },
        left:40,
        right:18,
        bottom:45,  
        top:30,
        width: "100%",
        height: "100%",    
    },
    enableInteractivity: false,
}
export const plot1_point_styling_p = {
    selected: `point {
        fill-color:cyan;
        stroke-color: blue;
        stroke-width: 2;
        size:6;
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
export const API_Chart_Keys ={
    ImgSize:{
        x : "w",
        y : "h",
    },
    AxisSrc:{
        x : "x_src",
        y : "y_src",
        z : "abc_src",
        d : "dataset",
    },
    AxisLable:{
        x: "x_label",
        y: "y_label",
    },
    Period:{
        year : "year",
        quarter : "quarter",
    },
    DPI : "dpi",
}
export const Fields_Boolean = {
    isIT : "isIT",
    isSpecialTaxRegime_insurance : "isSpecialTaxRegime_insurance",
    isSpecialTaxRegime_profit : "isSpecialTaxRegime_profit",
    isIP : "isIP",
}
export const Fields_Info = {
    IID : "IID",
    taxType : "taxType",
    businessSize : "businessSize",
}
export const Fields_Columns = {
    employee_num : "employee_num", 
    fot : "fot", 
    income : "income", 
    income_lic : "income_lic", 
    taxesProfit : "taxesProfit", 
    taxesVAT : "taxesVAT", 
    taxesEmplSal : "taxesEmplSal", 
    insurance : "insurance", 
}
export const Fields_Columns_Names = {
    income: "Доход",
    income_lic: "Доход с лицензий",
    fot: "Фонд оплаты труда",
    taxesProfit: "Налог с прибыли",
    taxesVAT: "НДС",
    taxesEmplSal: "НДФЛ",
    insurance: "Страховые сборы",
    employee_num: "Количество сотрудников",
}
export const Fields_All = {
    ...Fields_Boolean,
    ...Fields_Columns,
    ...Fields_Info,
}