import {update_plot1} from "/js/data.js"
import {columns_plot1 as columns, options_def as options} from "/js/const.js"
google.charts.load('current', {'packages':['corechart']});
google.charts.setOnLoadCallback(update_plot1);

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
    
    options.hAxis.scaleType = columns.x.scale
    options.vAxis.scaleType = columns.y.scale

    const chart_div = document.getElementById('chart_div')    
    const chart = new google.visualization.ScatterChart(chart_div);
    chart.draw(data, options);
}