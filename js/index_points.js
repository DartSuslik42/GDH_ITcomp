import { update_plot1_points } from "/js/data.js"
import { columns_plot1 as columns, options_trans as options } from "/js/const.js"
google.charts.load('current', { 'packages': ['corechart'] });
google.charts.setOnLoadCallback(update_plot1_points);

export function updateData_plot1_points(mydata = []) {
    var data = new google.visualization.DataTable();
    data.addColumn({
        type: columns.x.type,
    });
    data.addColumn({
        type: columns.y.type,
    });
    data.addColumn({
        type: "string",
        role: "style",
    });
    data.addRows(mydata)

    options.hAxis.scaleType = columns.x.scale
    options.vAxis.scaleType = columns.y.scale

    const chart_points_div = document.getElementById('chart_points_div')
    const chart = new google.visualization.ScatterChart(chart_points_div);
    chart.draw(data, options)
}