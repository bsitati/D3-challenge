var svgWidth = 960;
var svgHeight = 500;

var radius = 15;

var tip = d3.tip()
.attr('class', 'd3-tip')

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
    .call(tip)


d3.csv('data/data.csv').then(function(data) {

// d3.csv('data/hairData.csv').then(function(data) {

    console.log(data);

    data.forEach(d => {
        d.state = d.state;
        d.abbr = d.abbr;
        d.income = +d.income;
        d.healthcare = +d.healthcare;

    console.log(d.state);
    console.log(d.income);
    console.log(d.healthcare);
    console.log(d.abbr);

    })
    
    drawChart(data, "income");
})

function drawChart(data, xProperty) {

    tip.html(function(d) { 
        if (xProperty === "income") {
            return `<h3>${d.state}</h3><hr><h4>Income: ${Intl.NumberFormat().format(d.income)}</h4><h4>Health Care: ${d.healthcare}%</h4>`; 
        } else if (xProperty === "obesity") {
            return `<h3>${d.state}</h3><hr><h4>Obesity: ${d.obesity}%</h4><h4>Health Care: ${d.healthcare}%</h4>`; 
        }
    });

    // create scales
    // default x value is income
    var xScale = d3.scaleLinear()
        .domain([
            d3.min(data, d => d[xProperty]),
            d3.max(data, d => d[xProperty])
        ])
        .range([2 * radius, width - 2 * radius])
    
    var yScale = d3.scaleLinear()
        .domain([
            d3.min(data, d => d.healthcare),
            d3.max(data, d => d.healthcare),
        ])
        .range([height - 2 * radius, 2 * radius])

    
    
        // create axes
    var xAxisF = d3.axisBottom(xScale)
    var yAxisF = d3.axisLeft(yScale)

    var xAxis = chartArea.selectAll('.x-axis')
        .data([0])

    xAxis.enter()
        .append('g')
        .classed('x-axis', true)
        .merge(xAxis)
        .attr('transform', `translate(0,${height})`)
        .transition()
        .duration(500)
        .call(xAxisF)
        
    var yAxis = chartArea.selectAll('.y-axis')
        .data([0])
    
    yAxis.enter()
        .append('g')
        .classed('y-axis', true)
        .transition()
        .duration(500)
        .call(yAxisF)

    xAxisLabels = [
        {
            display: 'Household Income (median)',
            value: 'income'
        },
        {
            display: 'Obesity (%)',
            value: 'obesity'
        }  
        ,
        {
            display: 'Poverty (%)',
            value: 'poverty'
        }]

        yAxisLabels = [
            {
                display: 'Lacks Healthcare (%)',
                value: 'healthcare'
            }
        
        
        ]

    chartArea.selectAll('.x-axis-label')
    .data(xAxisLabels)
    .enter()
    .append('text')
    .classed('x-axis-label', true)
    .attr('transform', (d, i) => `translate(${width/2},${height + (i + 1) * 20 + 20})`)
    .text(d => d.display)
    .on('click', function(d) {
        drawChart(data, d.value)
    })

    chartArea.selectAll('.y-axis-label')
    .data(yAxisLabels)
    .enter()
    .append('text')
    .classed('y-axis-label', true)
    .attr("transform", "rotate(-90)")
      .attr("y", 0 - margin.left)
      .attr("x",0 - (height / 2))
      .attr("dy", "1em")
      .style("text-anchor", "middle")
      .text(d => d.display)
      .on('click', function(d) {
        drawChart(data, d.value)
    })


    // draw dots
    var dots = chartArea.selectAll('circle')
        .data(data)
    
    dots
        .enter()
        .append('circle')
        .attr('cx', d => xScale(d[xProperty]))
        .attr('cy', d => yScale(d.healthcare))
        .attr('opacity', 0.5)
        .merge(dots)
        .on('mouseover', function(d) { tip.show(d, this); })
        .on('mouseout', function(d) { tip.hide(); })
        .transition()
        .duration(500)
        .attr('cx', d => xScale(d[xProperty]))
        .attr('cy', d => yScale(d.healthcare))
        .attr('r', radius)
        .attr('fill', 'blue')

        var circleText = chartArea.selectAll() 
       
        .data(data)   
        .enter()    
        .append("text")    
        .merge(dots) 
        .text(d => d.abbr)    
        .attr("x", d => xScale(d.income))
        // look at this data point 
        // poverty property and apply return that 
        //x coordinate    
        .attr("y", d => yScale(d.healthcare))    
        .attr("class","stateText") 
        // .stateText class in d3Style.css stying 
        //for circle text    
        .attr("font-size","9")  
        .transition()
        .duration(500)    
      
        // console.log(data);


        // dots.append("text")
        // .attr("dx",12)
        // .attr("dy",".35em")
        // .text(function(d){return d.abbr})
    //     .attr('cx', d => xScale(d[xProperty]))
    //     .attr('cy', d => yScale(d.healthcare))

    //     // var text = dots.selectAll("text")
    //     // .data(data).enter()
        
    //  .attr("x", function(d) {
    //   return d.income;
    // })
    // .text("y", function(d) {
    //   return d.healthcare;
    // })
        
    // var circleText = chartGroup.selectAll()    
    // .data(data)    
    // .enter()    
    // .append("text")    
    // .text(d => d.abbr)    
    // .attr("x", d => xLinearScale(d.poverty)) 
    // // look at this data point 
    // // poverty property and apply return that x coordinate  
    //  .attr("y", d => yLinearScale(d.healthcare))    
    //  .attr("class","stateText") 
    //  // .stateText class in d3Style.css stying 
    //  //for circle text    
    //  .attr("font-size","9");      
        
    // // .attr("dx",12)
    //     // .attr("dy",".35em")
    //     var circleText = chartArea.selectAll()    
    //     .data(data)    
    //     .enter()
    //     // .attr("dx",12)
    //     // .attr("dy",".35em")   
    //     .append("text")    
    //     .text(d => d.abbr)    
    //     .attr("y", d => xScale(d.abbr)) 
    //     // look at this data point / poverty property and 
    //     //apply return that x coordinate    
    //     .attr("y", d => yLinearScale(d.healthcare))    
    //     .attr("class","stateText") 
    //     // .stateText class in d3Style.css 
    //     //stying for circle text    
    //     .attr("font-size","9");      
    //     console.log(data); 
        


}

// refactoring steps:
// 1: make a static scatter plot

// 2a: refactor to init/redraw function
// 2b: add second category to x-axis -> make event

// 4: add transitions to animate