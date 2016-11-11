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
import AssetsVisualization from './webpack-assets/assets-visualization';

const WebpackAssets = (props) => (
      <Card initiallyExpanded={true}>
        <CardHeader showExpandableButton={true} actAsExpander={true} subtitle="Webpack Assets"/>
          <CardText expandable={true}>
            <AssetsVisualization assets={props.assets} /> {/*this extra component is needed because expanding an mui card triggers a component re-mount*/}
          </CardText>
      </Card>
    )
WebpackAssets.propTypes = {
  assets: PropTypes.array
};

export default WebpackAssets
