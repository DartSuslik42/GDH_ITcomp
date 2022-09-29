import {update_plot2} from "/js/data.js"
google.charts.load('current', {'packages':['corechart']});
google.charts.setOnLoadCallback(update_plot2);

let columns = {
    x : {
        type : "number",
        scale : "linear",
    },
    y : {
        type : "number",
        scale : "linear",
    }
}

export function updateData_plot2(mydata = []) {
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
    data.addColumn({
        type: "boolean",
        role: "certainty",
    })
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
        tooltip: {isHtml: true},
        pointSize: 3,
    };

    var chart = new google.visualization.LineChart(document.getElementById('chart2_div'));
    chart.draw(data, options);
}