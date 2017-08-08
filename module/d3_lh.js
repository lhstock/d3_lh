! function() {
    var lh = d3.lh || {};
    lh.version = "1.0.0";
    lh.description = "none";
    lh.chart = function(id_) {
        return lh_chart(id_);
    }

    function lh_chart(id_) {
        var _ = Object.create(lh);

        /**
         * 初始化原型
         * 
         * @returns _;
         */
        function init_obj() {
            _.selecter = {};
            _.layout = {};
            _.component = {};
            _.tool = {};
            _.tag = { c: {}, d: {}, o: {} };
            return _;
        }
        var option = {};
        option.pie = {
            type: "pie",
            innerRadius: 0,
            outerRadius: 100,
            endAngle: 2 * Math.PI,
            startAngle: 0,
            sequence: 1,
            padAngle: 0.00,
            value: function(d) {
                return d[1]
            },
            name: function(d) {
                return d[0]
            }

        }

        option.pie.event = {
            "mouseover": function a(d, i) {
                // var option = option.pie;
                console.log("in", this.option.name(d.data), this.option.value(d.data))
            },
            "mousemove": function(d) {
                // var option = option.pie;
                console.log("move", this.option.name(d.data), this.option.value(d.data))
            },
            "mouseout": function(d) {
                // var option = option.pie;
                console.log("out", d)
            }
        }

        // function options_() {
        // }

        /**
         * 执行初始化
         */
        _ = init_obj();


        _.Labelid = function(s) {
            _.labelid = s;
            return _;
        }

        _.Quickly = function(s) {
            _.quickly = s;
            _.option = option[_.quickly];
            return _;
        }
        _.Data = function(data) {
            _.data = data;
            return _;
        }

        _.Option = function(option) {
            // _.option =
            Object.assign(_.option, option);
            return _;
        }
        _.Draw = function() {

            var pie = new component_pie();
            pie.Draw()
            return _;
        }

        if (id_) _.Labelid(id_);
        /**
         * 根据元素生成class and id；
         * @param {any} dom 
         */
        function createTagForDom(dom) {
            // _.tag.o = dom;
            _.tag.c[dom] = "c_" + dom + "_d3_lh";
            _.tag.d[dom] = "d_" + dom + "_d3_lh";
        }



        /**
         * 组件——pie
         * 
         */
        function component_pie() {

            var pie = Object.create(_);

            var option = pie.option // = {};

            var chart = _.selecter.chart = {};

            pie.isUpdate = false;

            pie.Option = function(option) {

                return pie_option(option);

            }
            pie.Draw = function() {

                _.tag.d.chartDiv = _.labelid

                pie.isUpdate || init();

                // init();

                draw_pie()

                return pie;
            }

            function init() {

                pie.tool = pie.tool || {};

                createTagForDom("chart_svg");

                createTagForDom("chart_pie_g");

                createTagForDom("pie_g");

                pie.tool.arc = d3.svg.arc()
                    .innerRadius(option.innerRadius)
                    .outerRadius(option.outerRadius)

                pie.tool.pie = d3.layout.pie()
                    .sort(function(a, b) {
                        return ChartSort.apply(pie, [option.sequence, a, b])
                    })
                    .startAngle(option.startAngle)
                    .endAngle(option.endAngle)
                    .padAngle(option.padAngle)
                    .value(function(d) {
                        return option.value(d)
                    })

                width = "300px";

                chart.chartSvg = d3.select("#" + _.tag.d.chartDiv)
                    .append("svg")
                    .attr("class", _.tag.c.chartSvg)
                    .style("width", width)
                    .style("height", width);

                chart.chart_pie_g = chart.chartSvg.append("g")
                    .attr("class", _.tag.c.chart_pie_g);

                chart.pie_g = chart.chart_pie_g.append("g")
                    .attr("class", _.tag.c.pie_g);

            }

            function draw_pie() {

                var pie_data = pie.tool.pie(_.data);

                var color = d3.scale.category10()

                chart.pie = chart.chart_pie_g.selectAll("." + _.tag.c.pie).data(pie_data);

                chart.pie.enter()
                    .append("path")
                    .attr("class", _.tag.c.pie)
                    .attr("d", function(d) {
                        return pie.tool.arc(d);
                    })
                    .attr("fill", function(d) {
                        return color(option.name(d.data));
                    })
                    .attr("transform", "translate(150,150)")
                    .on({
                        "mousemove": function(d, i) {
                            option.event.mousemove.apply(pie, [d, i])
                        },
                        "mouseout": function(d, i) {
                            option.event.mouseout.apply(pie, [d, i])
                        },
                        "mouseover": function(d, i) {
                            option.event.mouseover.apply(pie, [d, i])
                        }
                    })

                chart.pie
                    .attr("d", function(d) {
                        return pie.tool.arc(d);
                    })
                    .attr("fill", function(d) {
                        return color(option.name(d.data));
                    })
                    .attr("transform", "translate(150,150)")

                chart.pie.exit().remove()


            }


            function pie_option(option) {
                pie.option = option;
                return pie;
            }

            function ChartSort(v, a, b) {
                switch (v) {
                    case 1:
                        return d3.ascending(Number(this.option.value(a)), Number(this.option.value(b)));
                        break;
                    case -1:
                        return d3.descending(Number(this.option.value(a)), Number(this.option.value(b)));
                    default:
                        return null;
                        // }
                        break;
                }
            }

            return pie;
        }


        return _;
    }

    if (typeof define === "function" && define.amd) define(lh);
    else if (typeof module === "object" && module.exports) module.exports = d3.lh;
    d3.lh = lh;
}()