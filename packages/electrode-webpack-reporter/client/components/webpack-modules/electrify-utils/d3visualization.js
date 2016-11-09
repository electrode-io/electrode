import d3 from "d3";
import pretty from "prettysize";
import schemes from "./schemes";
import { arc, initArc, bounceHigh, arcTween, hoverTween, rotateTween } from "./d3-utils";
import createModes, { highlightMode } from "./mode";

const modeInitial = "size";
const modeFns = {
  count: () => 1,
  size: (d) => d.size
};

export default function (d3Data) { //eslint disbable line max-statements
  const domElements = d3Data.refs, //eslint disable-line one-var
    root = d3Data.root,
    width = window.innerWidth * 0.8,
    height = Math.max(window.innerHeight - 100, 100) * 0.8,
    radius = Math.min(width, height) * 0.45,
    deg = 120;

  const svg = d3.select(domElements.svg).append("div")
    .classed("svgContainer", true)
    .append("svg")
    .attr("preserveAspectRatio", "xMinYMin meet") //responsive SVG needs these 2 attr and no width or hight attr
    .attr("viewBox", "0 0 660 380")
    .style("overflow", "visible")
    .append("g")
    .attr("transform", `translate(${width / 3.6},${height * .3})`);

  const partition = d3.layout.partition()
    .sort(null)
    .size([2 * Math.PI, radius * radius])
    .value(modeFns[modeInitial]);

  //
  // Creates the title text in
  // the center of the rings.
  //
  const title = svg.append("text")
    .text(root.name)
    .attr("x", 0)
    .attr("y", -5)
    .style("font-size", "18px")
    .style("fill", "white")
    .style("font-weight", 500)
    .style("alignment-baseline", "middle")
    .style("text-anchor", "middle");

  //
  // Likewise, this is the file
  // percentage size stat below the title
  //
  let percentageSize = svg.append("text")
    .text(pretty(root.value || root.size))
    .attr("x", 0)
    .attr("y", 20)
    .style("fill", "white")
    .style("font-size", "16px")
    .style("font-weight", 300)
    .style("alignment-baseline", "middle")
    .style("text-anchor", "middle")

  //
  // Likewise, this is the file
  // size stat below the title
  //
  const size = svg.append("text")
    .text(`("${pretty(root.value || root.size)})`)
    .attr("x", 0)
    .attr("y", 40)
    .style("fill", "white")
    .style("font-size", "16px")
    .style("alignment-baseline", "middle")
    .style("text-anchor", "middle");

  //
  // Each arc is wrapped in a group element,
  // to apply rotation transforms while
  // changing size and shape.
  //
const groups = svg.datum(root).selectAll("g")
    .data(partition.nodes)
    .enter()
    .append("g")
    .attr("transform", `rotate(${deg})`);

  const maxdepth = groups[0].reduce((max, el) => Math.max(max, el.__data__.depth), 0);

  //
  // Actually create the arcs for each
  // file.
  //
  const path = groups.append("path")
    .attr("d", initArc)
    .attr("display", (d) => d.depth ? null : "none")
    .style("stroke", "#2B2B2B")
    .style("stroke-width", "0")
    .style("fill-rule", "evenodd")
    .each(function (d) {
      d.x0 = d.x;
      d.dx0 = d.dx;
      d.el = this
    })

  let found = [];
  let _select = (node, selector) => {
    node.enabled = selector(node);
    if (node.enabled) {
      found.push(node);
    }
    if (node.children) {
      for (let c of node.children) {
        _select(c, selector);
      }
    }
  }
  _select(root, () => true);

  d3.select(domElements.search).on("keyup", function() {
    const text = this.value.replace(/^\s+/, "").replace(/\s+$/, "");
    if (text.length > 0) {
      found = [];
      const re = new RegExp(text, "i");
      _select(root, (node) => node.name.match(re) !== null);
      if (found.length === 1) {
        title.text(found[0].name);
        size.text(pretty(found[0].value || found[0].size));
      } else {
        title.text("Multiple found");
        let completeSize = 0;
        for (let n of found) {
          completeSize += n.size;
        }
        size.text(`${pretty(completeSize)} total`);
      }
    } else {
      _select(root, () => true);
    }
    groups
      .select("path")
      .transition()
      .duration(200)
      .style("opacity", (d) => {
        return d.enabled ? 1.0 : 0.2;
      });
  });

  //
  // Colour scheme functionality.
  //
  // Triggered immediately with the default
  // scheme, must be passed a d3 selection.
  //
  let background,
  scheme = 0,
  specials,
  color;

   function useScheme(n) {
    specials = schemes[n].specials;

    const colors = schemes[n].main;
    Object.keys(specials).forEach((key) => {
      const idx = colors.indexOf(specials[key].toLowerCase())
      if (idx === -1) { return };
      colors.splice(idx, 1);
    });

    color = d3.scale
      .ordinal()
      .range(colors);

    const _path = path.transition()
      .duration(600)
      .ease(bounceHigh, 1000)
      .delay((d) => d.x * 100 + d.y / maxdepth * 0.06125);

    _path.style("fill", (d) => {
      const name = d.children ? d.name : d.parent.name;
      d.c = schemes[n].modifier.call(d
        , specials[name] || color(name)
        , root
      );
      return d.c;
    });
  }
  useScheme(scheme);

  let ptrans = 0;
  path.transition()
    .duration(1000)
    .each(() => ptrans++)
    .ease("elastic", 2, 1)
    .delay((d, i) => d.x * 100 + (i % 4) * 250 + d.y / maxdepth * 0.25)
    .attr("d", arc)
    .each("interrupt", () => {
      d3.select(domElements.search).transition().duration(200).style("opacity", 1);
    })
    .each("end", () => {
      ptrans--;
    });

  //
  // Rotates the newly created
  // arcs back towards their original
  // position.
  //
  let gtrans = 0;
  groups.transition()
    .duration(3250)
    .each(() => gtrans++)
    .delay((d, i) => d.x * 100 + (i % 4) * 250 + d.y / maxdepth * 0.25 + 250)
    .attrTween("transform", rotateTween(deg))
    .each("end", () => {
      gtrans--;
      if (ptrans === 0 && gtrans === 0) {
        d3.select(domElements.search).transition().duration(200).style("opacity", 1);
      }
    });

  groups.on("mouseover", (d) => {
    highlight(d);
    title.text(d.name);

    let sizeInPercentage = (d.value/root.value*100).toFixed(2);
    percentageSize.text(`${sizeInPercentage}%`)

    size.text("(" + pretty(d.value || d.size) + ")");
  }).on("mouseout", (d) => {
    unhighlight(d);
    title.text(root.name);
    size.text(pretty(root.value || root.size));
  });

  highlight.tween = hoverTween(1);
  function highlight(d){
    if (d.el) d3.select(d.el)
      .transition()
      .delay(d => (d.depth - 1) * 300 / maxdepth)
      .ease('back-out', 10)
      .duration(500)
      .attrTween('d', highlight.tween)
      .style('fill', d => d.c)

    if (d.children) {
      let i = d.children.length;
      while (i--){ highlight(d.children[i]) };
    }
  }

  unhighlight.tween = hoverTween(0)
  function unhighlight(d) {
    if (d.el) d3.select(d.el)
      .transition()
      .delay(d => (d.depth - 1) * 300 / maxdepth)
      .ease('back-out', 4)
      .duration(500)
      .attrTween('d', unhighlight.tween)
      .style('fill', d => d.c);

    if (d.children) {
      let i = d.children.length
      while (i--){ unhighlight(d.children[i]) }
    }
  }

  createModes(updateMode, domElements);

  updateMode(modeInitial, false);

  function updateMode(mode, update) {
    highlightMode(mode);
    if (!update){ return };
    groups
      .data(partition.value(modeFns[mode]).nodes)
      .select('path')
      .transition()
      .duration(1500)
      .attrTween('d', arcTween);
  };
}