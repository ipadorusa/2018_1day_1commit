
var margin = { top: 20, right: 20, bottom: 20, left: 40 },
width = 360 - margin.left - margin.right,
height = 240 - margin.top - margin.bottom;

var color = ['#acd9f8', '#acd9f8', '#4fa4f9'];
// set the ranges
var x = d3.scaleBand()
.range([0, width])
.padding(1);
var y = d3.scaleLinear()
.range([height, 0]);
var barW = 30;


// append the svg object to the body of the page
// append a 'group' element to 'svg'
// moves the 'group' element to the top left margin
var svg = d3.select("#combie").append("svg")
.classed("combie_chart", true)
.attr("width", width + margin.left + margin.right)
.attr("height", height + margin.top + margin.bottom)
.append("g")
.attr("transform", "translate(" + margin.left + "," + margin.top + ")");



// get the data
d3.csv('sales.csv', function (error, data) {
console.log(data)
if (error) throw error;

// format the data
data.forEach(function (d) {
    d.sales = +d.sales;
});

// Scale the range of the data in the domains
x.domain(data.map(function (d) { return d.salesperson; }));
y.domain([parseInt(d3.min(data, function (d) { return d.sales; }) / 500) * 500 - 500, d3.max(data, function (d) { return d.sales; })]);
// append the rectangles for the bar chart


// Axis 선 만들기
var xAxis = d3.axisBottom(x);
var yAxis = d3.axisLeft(y).ticks(4).tickSize(-width);
svg.append("g")
    .attr("transform", "translate(0," + height + ")")
    .classed("xAxis",true)
    .call(customXAxis);

svg.append("g")
    .classed("yAxis",true)
    .call(customYAxis);

function customXAxis(g) {
    g.call(xAxis);
    g.select(".domain").remove();
    g.selectAll("line").remove();
    g.selectAll(".tick text").attr("x", 15);
}

function customYAxis(g) {
    g.call(yAxis);
    g.select(".domain").remove();
    g.selectAll(".tick line").attr("stroke", "#f0f0f0");
    g.selectAll(".tick text").attr("x", 4).attr("dy", 3);
}

// Bar 그리기
svg.append("g")
    .classed('.bargroup',true)
    .selectAll('.bar')
    .data(data)
    .enter()
    .append('rect')
    .attr('x', function (d) { return x(d.salesperson); })
    .attr('height',0)
    .attr("fill", function(d,i) { return color[i]})
    .attr('width', barW)
    .attr('y', height)
    //.attr('y', function (d) { return y(d.sales); })
    .transition()
    .ease(d3.easeSinOut)
    .duration(550)
    .attr('y', function(d,i) { return y(d.sales)})
    .attr('height', function (d) { return height - y(d.sales); });



});