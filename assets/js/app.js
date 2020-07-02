// @TODO: YOUR CODE HERE!
var svgWidth = 960;
var svgHeight = 500;

var radius = 15;

// var tip = d3.tip()
// .attr('class', 'd3-tip')

var svg = d3.select('#chart').append('svg')
    .attr('height', svgHeight)
    .attr('width', svgWidth)

var margin = {
    left: 50,
    top: 50,
    right: 50,
    bottom: 100
}

var height = svgHeight - margin.top - margin.bottom;
var width = svgWidth - margin.left - margin.right

var chartArea = svg.append('g')
    .attr('height', height)
    .attr('width', width)
    .attr('transform', `translate(${margin.left},${margin.top})`)
    // .call(tip)


d3.csv('Data/data.csv').then(function(data) {
    console.log(data);

    data.forEach(d => {
        d.state = d.state;
        d.obesity = +d.obesity;
        d.smokes = +d.smokes;
    })


    drawChart(data, "state");
})