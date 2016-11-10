import d3 from 'd3';
import parseAssetsData from './assets-utils';
import formatSize from "../../../lib/format-size";
import createDataViews from './data-view';
import max from 'lodash/max'
export default function({refs, data}) {

   		const width = 850
	    const height = 500
	    const barHeight = 40
	    const chart = d3.select(refs.assets).append("svg")
	    chart.attr("preserveAspectRatio", "xMinYMin meet") 
		    .attr("viewBox", `0 0 ${width} ${barHeight*data.length*2}`)
		    .append("g")
	 
	    const asset = chart.selectAll("g")
	    	.data(data)
	    	.enter()
	    	.append("g")

	    asset.append("text")
	    	.attr("y", (d,i) => i*barHeight*2)
	    	.attr("dy", "1em")
	    	.text((d) => d.name)
	    	.style("font-size", "1.5em")
	    	.style('fill', 'white')

	    const bars = asset.append('rect')
			.attr("transform", (d,i) => `translate(30,${i*barHeight*2+barHeight})`)
			.attr('height', barHeight*0.7)
			.style('fill', 'darkslategrey')
			.attr('width', '0')

		asset.append("text")
			.attr("x", "50")
		    .attr("y", (d,i) => i*barHeight*2+barHeight*1.35)
		    .attr("dy", ".35em")
		    .text((d) => formatSize(d.size))
		    .style("font-size", "1.5em")
		    .style('fill', 'orange')

   const updateDataView = function(view, update){
			if(view === "expanded") { 
   				let expandedScale = max(data.map((asset)=>asset.size))/width
				bars.transition()
				.duration(2000)
				.attr('width', (d) => d.size/expandedScale)
   			}
	   		if(view === "shortened") {
	   			bars.transition()
				.duration(2000)
	   			.attr('width', (d) => Math.min(d.size, 820)) 
	   		}
    }

	const initialView = "shortened";
	createDataViews(updateDataView, refs)
	updateDataView(initialView, true)
}
