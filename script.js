
        
(function combinationChart() {
    var width = 360,
        height = 240,
        colorScheme = ["#acd9f8", "#acd9f8", "#4fa4f9"];

    // Config for the Radar chart
    var config = {
        w: width,
        h: height,
        mTop: 40,
        mRight: 0,
        mBottom: 20,
        mLeft: 22
    };

    var data = [
        {year: "2015", salary: 3500, aver: 3700},
        {year: "2016", salary: 4500, aver: 4000},
        {year: "2017", salary: 5100, aver: 4500}
    ];
    var dataRange = {min: 3000, max: 5500};
    CombinationChart.draw('#combie', data, dataRange, config, colorScheme);
}());
(function stackedChart() {
    var width = 838,
        height = 330,
        colorScheme = ["#acd9f8", "#acd9f8", "#4fa4f9"];

    // Config for the Radar chart
    var config = {
        w: width,
        h: height,
        mTop: 40,
        mRight: 20,
        mBottom: 20,
        mLeft: 40
    };

    var data = [
        {year: "1년차", salary: 2500},
        {year: "2년차", salary: 3800},
        {year: "3년차", salary: 4000},
        {year: "4년차", salary: 4550},
        {year: "5년차", salary: 5210},
        {year: "6년차", salary: 5500},
        {year: "7년차", salary: 6500},
        {year: "8년차", salary: 7250},
        {year: "9년차", salary: 7595},
        {year: "10년차↑", salary: 8000}
    ];
    var dataRange = {min: 1000, max: 9000};
    StackedAreaChart.draw('#stacked_area', data, dataRange, config, colorScheme);
}());