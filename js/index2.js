import {update_plot2} from "/js/data.js"
import {columns_plot2 as columns, options_def as options} from "/js/const.js"
google.charts.load('current', {'packages':['corechart']});
google.charts.setOnLoadCallback(update_plot2);

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
    
    options.hAxis.scaleType = columns.x.scale
    options.vAxis.scaleType = columns.y.scale
    
    const chart2_div = document.getElementById('chart2_div')
    const chart = new google.visualization.LineChart(chart2_div);
    chart.draw(data, options);
}