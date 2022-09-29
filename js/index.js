import {update_plot1} from "/js/data.js"

google.charts.load('current', {'packages':['corechart']});
google.charts.setOnLoadCallback(update_plot1);

let columns = {
    x : {
        type : "number",
        scale : "log",
    },
    y : {
        type : "number",
        scale : "log",
    }
}

export function updateData_plot1(mydata = []) {
    var data = new google.visualization.DataTable();
    data.addColumn({
        type : columns.x.type,
    });
    data.addColumn({
        type : columns.y.type,
    });
    data.addColumn({
        type : "string",
        role : "style",
    });
    data.addRows(mydata)
    
    var options = {
        hAxis: {minValue: 0, scaleType: columns.x.scale },
        vAxis: {minValue: 0, scaleType: columns.y.scale },
        legend: 'none',
        backgroundColor: {
            stroke: "black",
            strokeWidth: "0px",
            fill: "transparent",
        },
        chartArea: {
            backgroundColor: {
                stroke: "black",
                strokeWidth: "0px",
                fill: "white",
            },
            left: "20%",
            top: "10%",
        },
        pointSize: 2,
    };

    var chart = new google.visualization.ScatterChart(document.getElementById('chart_div'));
    chart.draw(data, options);
}