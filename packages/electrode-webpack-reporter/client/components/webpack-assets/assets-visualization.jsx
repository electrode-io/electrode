import React, {PropTypes} from "react";
import createD3Visualization from './d3visualization'

export default class WebpackAssets extends React.Component {
  componentDidMount() {
    createD3Visualization({
      refs: this.refs,
      data: this.props.assets
    })
  }
  render() {
    return (
    	<div>
    		<div>
    			<ul ref='dataView' ></ul>
    		</div>
    		<div ref='assets'/>
    	</div>
    )
  }
}
