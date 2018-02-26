var BarCombieChart = {
    draw: function(selector, dataset, options, colorScheme) {
        var cfg = {
            width: 400,
            height: 210
        };
        if ('undefined' !== typeof options) {
            for (var i in options) {
                if ('undefined' !== typeof options[i]) {
                    cfg[i] = options[i];
                }
            }
        }
        dataset.forEach(function (d) {
            d.salary = +d.salary;
            d.ave = +d.ave;
            return d.salray;
        });
        console.log(d.salary);
    }
};