//based on https://bl.ocks.org/mbostock/1096355
"use strict";

(function () {

    //Function to return the data for the inset rings.
    //Probably won't need to use a funciton could just set this to a variable
    var triRadialData = function () {
        return [{
                index: 0,
                name: 'Funded',
                icon: "",
                percentage: 95
            },
            {
                index: 1,
                name: 'Worked',
                icon: "",
                percentage: 64
            },
            {
                index: 2,
                name: 'Planned',
                icon: "",
                percentage: 20
            }
        ];

    };


    //Function to return the data for the single ring.
    //Probably won't need a function
    var singleRadialData = function () {
        return [{
            index: 0,
            name: 'Funded',
            icon: "P",
            percentage: 95
        }];

    };

    //Colors array.
    var colors = ["#1565c0", "#FF9800", "#4CAF50"];



    //build function that creates the visuals
    function build(dataset, elementToBind) {

        //Width and height of the visual boxes.
        //Also includes length of arc variable.
        //Also caculates gap as a percentage of the outter radius to keep it responsive.
        var container = d3.select(elementToBind),
            width = container.node().getBoundingClientRect().width,
            height = container.node().getBoundingClientRect().height,
            outterRadius = Math.min(width, height) / 2.5,
            innerRadius = (outterRadius / 5) * 4,
            gap = .09 * outterRadius,
            tau = 2 * Math.PI;

        //variable to get inner ring start angle
        var data = dataset();

        var arc = d3.svg.arc()
            .startAngle(function (d) {

                if (d.index === 2) {
                    //need to replace this with variables
                    return data[1].percentage / 100 * tau;
                } else {
                    return 0;
                }
            })
            .endAngle(function (d) {

                if (d.index === 2) {
                    return (d.percentage + data[1].percentage) / 100 * tau;
                } else {
                    return d.percentage / 100 * tau;
                }
            })
            .innerRadius(function (d) {
                return innerRadius - d.index * (30 + gap)
            })
            .outerRadius(function (d) {
                return outterRadius - d.index * (30 + gap)
            })
            .cornerRadius(2); //modified d3 api only

        //Create the opaque background ring
        var background = d3.svg.arc()
            .startAngle(0)
            .endAngle(tau)
            .innerRadius(function (d, i) {
                return innerRadius - d.index * (30 + gap)
            })
            .outerRadius(function (d, i) {
                return outterRadius - d.index * (30 + gap)
            });

        //Append the background ring to the body
        var svg = d3.select(elementToBind).append("svg")
            .attr("width", '100%')
            .attr("height", '100%')
            .attr('viewBox', '0 0 ' + Math.min(width, height) + ' ' + Math.min(width, height))
            .attr('preserveAspectRatio', 'xMinYMin')
            .append("g")
            .attr("transform", "translate(" + Math.min(width, height) / 2 + "," + Math.min(width, height) / 2 + ")");



        //enter the data set and loop through it
        var field = svg.selectAll("g")
            .data(dataset)
            .enter().append("g");

        //Attach the filled in progress path
        field.append("path")
            .attr("class", "progress")
            .style("fill", function (d) {
                return colors[d.index];
            });

        //Append the background path
        field.append("path").attr("class", "bg")
            .style("fill", function (d) {
                return colors[d.index];
            })
            .style("opacity", 0.2)
            .attr("d", background);

        field.append("text")
            .attr('class', 'icon')
            .attr('fill', '#212121');


        d3.transition().duration(1750).each(update);

        function update() {
            field = field
                .each(function (d) {
                    this._value = d.percentage;
                })
                .data(dataset)
                .each(function (d) {
                    d.previousValue = this._value;
                });

            //Animation to paint the bars one by one
            field.select("path.progress").transition().duration(750).delay(function (d, i) {
                    return i * 500
                })
                .ease("sin")
                .attrTween("d", arcTween);

            field.select("text.icon").text(function (d) {
                    return d.icon;
                })
                .attr("transform", function (d) {
                    return "translate(5," + -((innerRadius + 7) - d.index * (30 + gap)) + ")"

                });

            field.select("text.completed").text(function (d) {
                return Math.round(d.percentage / 100 * 10);
            });
        }

        function arcTween(d) {
            var i = d3.interpolateNumber(0, d.percentage);
            return function (t) {
                d.percentage = i(t);
                return arc(d);
            };
        }
    }

    //Call the build function
    build(triRadialData, ".donut");

    //example on how to create a single radial chart with text in the center.
    //build(singleRadialData,true);
})()