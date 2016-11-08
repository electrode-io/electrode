import d3 from 'd3';

let modes = null;

export default (updateMode, domElements) => {
  modes = d3.select(domElements.scaleList)
    .selectAll('li')
    .data(['count', 'size'])
    .enter()
    .append('li')
    .style('height', '48px')
    .style('line-height', '48px')
    .style('margin-bottom', '12px')
    .style('cursor', 'pointer')
    .style('font-size', '1.2em')
    .style('text-align', 'right')
    .style('opacity', '0.5')
    .style('padding-right', '64px')
    .style('transition', '0.2s')
    .style('position', 'relative')
    .style('opacity', '0')
    .on('click', (d) => updateMode(d, true))
    .on("mouseover", (d) => {
        d3.select('[ref=' + d +']')
            .style('left', '0px')
            .style('opacity', '1')
    })
    .on("mouseout", (d) => {
        d3.select('[ref=' + d +']')
            .style('left', '100px')
            .style('opacity', '0')
    });

  modes.append('span')
    .text(d => {
      return {
        count: 'File Count',
        size: 'File Size'
      }[d]
    })
    .attr('ref', d => d)
    .style('position', 'relative')
    .style('left', '100px')
    .style('opacity', '0')
    .style('transition', 'opacity 0.2s, left 0.2s')

  modes.append('svg')
    .style('position', 'absolute')
    .style('top', '0')
    .style('right', '0')
    .attr({ width: 48, height: 48 })
    .append('g')
    .each(function(type) {
      d3.select(this)
        .attr('transform', 'translate(8, 8)')
        .selectAll('circle')
        .data(d3.range(0, 16))
        .enter()
        .append('circle').attr('fill', '#fff')
        .attr('r', (d, i) => type !== 'size' ? 3 : (i === 0 || i === 6) ? 6 : 3)
        .attr('transform', d => `translate(${[(d % 4) * 10, Math.floor(d / 4) * 10]})`)
    })
}

export const highlightMode = (mode) => {
    console.log('hlMode: ', mode)
  modes.style('opacity', (d) => {
        console.log("in style fn: ", d);
        return d === mode ? 1 : null
    })
}
