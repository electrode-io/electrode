import d3 from "d3";

let dataView = null;

export default (updateView, refs) => {
  const views = d3.select(refs.dataView)
    .selectAll("li")
    .data(["shortened", "expanded"])
    .enter()
    .append("li")
    .style("cursor", "pointer")
    .style('display', 'inline')
    .style('margin-right', '25px')
    .append("text")
    .text((d) => d)
    .on("click", (d) => {
        console.log(d, ' clicked')
        updateView(d, true)
    })
    .on("mouseover", (d) => {
      d3.select(`[ref=${d}]`)
        .style("left", "0px")
        .style("opacity", "1");
    })
    .on("mouseout", (d) => {
      d3.select(`[ref=${d}]`)
        .style("left", "100px")
        .style("opacity", "0");
    });
};