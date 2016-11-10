import React, {PropTypes} from "react";
import formatSize from "../../lib/format-size.js";
import {Card, CardHeader, CardText} from "material-ui/Card";
import {
  Table,
  TableBody,
  TableHeader,
  TableHeaderColumn,
  TableRow,
  TableRowColumn
} from "material-ui/Table";
import styles from "../styles/base.css";
import createD3Visualization from './webpack-assets/d3visualization'

export default class WebpackAssets extends React.Component {
  componentDidMount(){
    console.log('webpack assests props: ', this.props.assets)
    createD3Visualization({
      refs: this.refs,
      data: this.props.assets
    })
  }
  render() {
    return (
      <Card initiallyExpanded={true}>
        <CardHeader showExpandableButton={true} actAsExpander={true} subtitle="Webpack Assets"/>
          <CardText expandable={true}>
            
              <div>
                <ul ref='dataView' ></ul>
              </div>
              <div ref='assets'/>
            
          </CardText>
      </Card>
    )
  }
}

WebpackAssets.propTypes = {
  assets: PropTypes.array
};
