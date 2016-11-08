import React, {PropTypes} from "react";
import {Card, CardHeader, CardText} from "material-ui/Card";
import {Table, TableBody, TableHeader, TableHeaderColumn, TableRow, TableRowColumn} from 'material-ui/Table';
import styles from '../styles/base.css'

const WebpackInfo = (props) => (
    <Card initiallyExpanded={false}>
      <CardHeader showExpandableButton={true} actAsExpander={true} subtitle="Webpack Info" />
      <CardText expandable={true}>
        <div className={styles.content}>
          <Table style={{margin: '0 auto'}}>
            <TableHeader displaySelectAll={false} adjustForCheckbox={false}>
              <TableRow>
                <TableHeaderColumn>Hash</TableHeaderColumn>
                <TableHeaderColumn>Version</TableHeaderColumn>
                <TableHeaderColumn>Time</TableHeaderColumn>
                <TableHeaderColumn>publicPath</TableHeaderColumn>
              </TableRow>
            </TableHeader>
            <TableBody displayRowCheckbox={false}>
              <TableRow>
                <TableRowColumn>{props.hash}</TableRowColumn>
                <TableRowColumn>{props.version}</TableRowColumn>
                <TableRowColumn>{props.time !== undefined ? `${props.time}ms` : ""}</TableRowColumn>
                <TableRowColumn>{props.publicPath}</TableRowColumn>
              </TableRow>
            </TableBody>
          </Table>
        </div>
      </CardText>
    </Card>
);

WebpackInfo.propTypes = {
  hash: PropTypes.string,
  version: PropTypes.string,
  time: PropTypes.string,
  publicPath: PropTypes.string
};

export default WebpackInfo;
