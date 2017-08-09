! function() {
    var lh = d3.lh || {};
    lh.version = "1.0.0";
    lh.description = "none";
    lh.chart = function(id_) {
        return lh_chart(id_);
    }

    function lh_chart(id_) {
        var _ = Object.create(lh);
        var option;
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
            _.option = {};

            return _;
        }
        var Obj = {};
        Obj = {

            pie: {
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
                },
                event: {
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



            },
            title: {
                enable: true,
                title: "标题预留",
                subTitle: "子标题预留"
            },
            legend: {
                enable: true,
                position: "e"
            }
        }

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
            // _.option = option[_.quickly];
            option = _.option = {}
            _.option[_.quickly] = Obj[_.quickly];
            _.option["title"] = Obj.title;
            _.option["legend"] = Obj.legend;
            return _;
        }


        _.Option = function(option) {
            // Object.assign(_.option, option);

            for (var key in option) {
                Object.assign(_.option[key], option[key])
            }
            return _;
        }

        _.Data = function(data) {
            _.data = data;
            return _;
        }

        _.Draw = function() {

            draw_();
            return _;
        }

        function draw_() {
            draw_div()
            var pie = new component_pie();
            pie.Option(_.option.pie)
            pie.Draw()
        }

        function draw_div() {
            createTagForDom("topDiv")
            createTagForDom("contentDiv")

            createTagForDom("titleDiv");

            createTagForDom("contentDiv");

            createTagForDom("chartDiv");
            createTagForDom("legendDiv");

            var divs = _.selecter.div = {};

            divs.parent = d3.select("#" + _.labelid);
            divs.topDiv = divs.parent.selectAll("." + _.tag.c.topDiv).data(["only"]);
            divs.contentDiv = divs.parent.selectAll("." + _.tag.c.contentDiv).data(["only"])

            divs.parent //.attr('class', "lh_chart_parent")
                .classed("c_parent_d3_lh", true)

            divs.topDiv.enter()
                .append('div')
                .attr("class", _.tag.c.topDiv)
                .attr("id", _.tag.c.topDiv)
                // .call(callDiv);
                .classed("lh_show", function() {
                    return !option.title.enable
                })

            divs.topDiv
                .attr("class", _.tag.c.topDiv)
                .attr("id", _.tag.c.topDiv)
                .classed("lh_show", function() {
                    console.log(!option.title.enable)
                    return !option.title.enable
                })


            divs.topDiv.exit().remove()

            divs.contentDiv.enter()
                .append('div')
                .attr("class", _.tag.c.contentDiv)
                .attr("id", _.tag.c.contentDiv)
                .classed("lh-flex-" + option.legend.position, true);

            divs.contentDiv
                .attr("class", _.tag.c.contentDiv)
                .attr("id", _.tag.c.contentDiv)
                .classed("lh-flex-" + option.legend.position, true);


            divs.contentDiv.exit().remove()

            // divs.topDiv.enter()
            //     .append('div')
            //     .attr("class", _.tag.c.topDiv)
            //     .attr("id", _.tag.c.topDiv);
            // divs.topDiv
            //     .attr("class", _.tag.c.topDiv)
            //     .attr("id", _.tag.c.topDiv);
            // divs.topDiv.exit().remove()
            divs.titleDiv = divs.topDiv.selectAll("." + _.tag.c.titleDiv).data(['only']);
            divs.chartDiv = divs.contentDiv.selectAll("." + _.tag.c.chartDiv).data(['only']);
            divs.legendDiv = divs.contentDiv.selectAll("." + _.tag.c.legendDiv).data(['only']);



            divs.titleDiv
                .enter()
                .append("div")
                .attr("id", _.tag.d.titleDiv)
                .attr("class", _.tag.c.titleDiv);
            divs.titleDiv
                // .classed("o")
            divs.titleDiv.exit().remove()

            divs.legendDiv
                .enter()
                .append("div")
                .attr("id", _.tag.d.legendDiv)
                .classed("lh_show", function() {
                    return !option.legend.enable
                })


            .attr("class", _.tag.c.legendDiv);
            divs.legendDiv
                .classed("lh_show", function() {
                    return !option.legend.enable
                }) // .classed("o")
            divs.legendDiv.exit().remove()


            divs.chartDiv
                .enter()
                .append("div")
                .attr("id", _.tag.d.chartDiv)
                .attr("class", _.tag.c.chartDiv);
            divs.chartDiv
                // .classed("o")
            divs.chartDiv.exit().remove()

        }

        // function callDiv() {
        //     console.log(this)
        //     d3.select(this)
        //         .attr("class", function(d) {
        //             console.log(d)
        //         })
        //         .classed("lh_show", function(d) {
        //             console.log(d)
        //             return 1;
        //         })
        // }


        if (id_) _.Labelid(id_);

        /**
         * 根据元素生成class and id；
         * @param {any} dom 
         */
        function createTagForDom(dom) {
            // _.tag.o = dom;
            _.tag.c[dom] = "c_" + dom + "_d3_lh";
            _.tag.d[dom] = "d_" + _.labelid + "_" + dom + "_d3_lh";
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

                // _.tag.d.chartDiv = _.labelid

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
                    .innerRadius(pie.option.innerRadius)
                    .outerRadius(pie.option.outerRadius)

                pie.tool.pie = d3.layout.pie()
                    .sort(function(a, b) {
                        return ChartSort.apply(pie, [pie.option.sequence, a, b])
                    })
                    .startAngle(pie.option.startAngle)
                    .endAngle(pie.option.endAngle)
                    .padAngle(pie.option.padAngle)
                    .value(function(d) {
                        return pie.option.value(d)
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
                _.isUpdate = true;
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
                        return color(pie.option.name(d.data));
                    })
                    .attr("transform", "translate(150,150)")
                    .on({
                        "mousemove": function(d, i) {
                            pie.option.event.mousemove.apply(pie, [d, i])
                        },
                        "mouseout": function(d, i) {
                            pie.option.event.mouseout.apply(pie, [d, i])
                        },
                        "mouseover": function(d, i) {
                            pie.option.event.mouseover.apply(pie, [d, i])
                        }
                    })

                chart.pie
                    .attr("d", function(d) {
                        return pie.tool.arc(d);
                    })
                    .attr("fill", function(d) {
                        return color(pie.option.name(d.data));
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