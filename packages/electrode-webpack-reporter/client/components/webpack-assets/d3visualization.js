import d3 from "d3";
import formatSize from "../../../lib/format-size";
import {map, each} from "lodash";

export default function ({refs, data}) { //eslint-disable-line func-style, max-statements
  const width = 850;
  const height = 500;
  const barHeight = 70;
  data = data.sort((x, y) => d3.ascending(y.size, x.size));
  const maxAssetFileSize = d3.max(map(data, (d) => d.size));
  const minAssetFileSize = d3.min(map(data, (d) => d.size));
  const logScale = d3.scale
    .log()
    .domain([minAssetFileSize, maxAssetFileSize])
    .range([0, width]);

  each(data, (asset) => asset.logScaledSize = logScale(asset.size));

  const chart = d3.select(refs.assets).append("svg");
  chart.attr("preserveAspectRatio", "xMinYMin meet")
    .attr("viewBox", `0 0 ${width} ${barHeight * data.length * 2}`)
    .append("g")
    .classed("asset");

  const asset = chart.selectAll("g.asset")
    .data(data)
    .enter()
    .append("g");

  asset.append("text")
    .attr("y", (d, i) => i * barHeight * 2)
    .attr("dy", "1em")
    .text((d) => d.name)
    .style("font-size", "2em")
    .style("fill", "white");

  const bars = asset.append("rect")
    .attr("transform", (d, i) => `translate(30,${i * barHeight * 2 + barHeight})`)
    .attr("height", barHeight * 0.7)
    .attr("width", ((d) => d.size));

  bars.style("fill", "#ff8553")
    .attr("width", "0")
    .transition()
    .duration(2000)
    .attr("width", (d) => d.logScaledSize);

  bars
    .on("mouseover", function () { //do not use arrow fn
      d3.select(this)
        .transition()
        .ease("back-out", 5)
        .duration(500)
        .attr("height", barHeight * 0.8);
    })
    .on("mouseleave", function () { //do not use arrow fn
      d3.select(this)
        .transition()
        .ease("back-out", 5)
        .duration(500)
        .attr("height", barHeight * 0.7);
    });

  asset.append("text")
    .attr("x", "50")
    .attr("y", (d, i) => i * barHeight * 2 + barHeight * 1.35)
    .attr("dy", ".35em")
    .text((d) => formatSize(d.size))
    .style("font-size", "2.6em")
    .style("fill", "white")
    .on("mouseover", function (d, i) { //do not use arrow fn
      bars.each(function (e, j) {
        if (j === i) {
          d3.select(this)
            .transition()
            .ease("back-out", 5)
            .duration(500)
            .attr("height", barHeight * 0.8);
        }
      });
    })
    .on("mouseleave", function (d, i) { //do not use arrow fn
      bars.each(function (e, j) {
        if (j === i) {
          d3.select(this)
            .transition()
            .ease("back-out", 5)
            .duration(500)
            .attr("height", barHeight * 0.7);
        }
      });
    });
}
