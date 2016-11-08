import React from 'react';
import {parseBundle, getStats, bundle} from './electrify-utils/parsing-utils';
import createD3Visualization from './electrify-utils/d3Visualization';
import styles from './electrify-utils/style/electrify.css';

export default class D3ElectrifyChart extends React.Component {
	parsePureWebpackStats(){
		return bundle(this.props.pureWebpackStats, (err, data)=>{
			return JSON.parse(data.data);
		});
	}
	componentDidMount(){
		const root = this.parsePureWebpackStats();
		createD3Visualization({
			refs: this.refs,
			root: root
		});
	}

	render() {
		return(
	 		<div>
	 			<input type="search" className={styles.searchBox} placeholder="Search File..."  ref="search"/>
	 			<div className={styles.modes}>
	 				<ul ref="scaleList"className={styles.scaleList}>
	 				</ul>
	 			</div>
	 				<div className={styles.electrifyChartContainer}>
	 					<div className ={styles.electrifyChart} ref="svg" />
	 				</div>
	 			<div ref="paletteWrap" />
	 		</div>
		);
	}
}
