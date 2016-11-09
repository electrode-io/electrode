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

const assetRow = (asset) => (
  <TableRow>
    <TableRowColumn>{asset.name}</TableRowColumn>
    <TableRowColumn>{formatSize(asset.size)}</TableRowColumn>
    <TableRowColumn>{asset.chunkNames.join(", ")}</TableRowColumn>
    <TableRowColumn>{asset.emitted ? "[emitted]" : "" }</TableRowColumn>
    <TableRowColumn>{asset.chunkNames.join(", ")}</TableRowColumn>
  </TableRow>
);

const WebpackAssets = (props) => (
  <Card initiallyExpanded={true}>
    <CardHeader showExpandableButton={true} actAsExpander={true} subtitle="Webpack Assets"/>
      <CardText expandable={true}>
        <div className={styles.content}>
          <Table style={{margin: "0 auto"}}>
           <TableHeader displaySelectAll={false} adjustForCheckbox={false}>
            <TableRow>
              <TableHeaderColumn>Asset</TableHeaderColumn>
              <TableHeaderColumn>Size</TableHeaderColumn>
              <TableHeaderColumn>Chunks</TableHeaderColumn>
              <TableHeaderColumn></TableHeaderColumn>
              <TableHeaderColumn>Chunk Names</TableHeaderColumn>
            </TableRow>
            </TableHeader>
            <TableBody displayRowCheckbox={false}>
              {props.assets.map(assetRow)}
            </TableBody>
          </Table>
        </div>
      </CardText>
  </Card>
);

WebpackAssets.propTypes = {
  assets: PropTypes.array
};

export default WebpackAssets;
