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
export const plot1_point_styling = {
    A: `point {
        fill-color:#b40000;
        visible:true; }`,
    B: `point {
        fill-color:#0000b4;
        visible:true; }`,
    C: `point {
        fill-color:#007800;
        visible:true; }`,
    D: `point {
        fill-color:yellow;
        stroke-width: 2;
        stroke-color: red;
        size:5;
        visible:true; }`,
    }
export const plot2_point_styling = {
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