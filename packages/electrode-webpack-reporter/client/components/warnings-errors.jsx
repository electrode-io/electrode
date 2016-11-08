import React, {PropTypes} from "react";
import {Table, TableBody, TableHeader, TableHeaderColumn, TableRow, TableRowColumn} from 'material-ui/Table';
import {Card, CardHeader, CardText} from "material-ui/Card";

const WarningsErrors = (props) => {
    const createWarningsErrorsCard = () => (
      <Card initiallyExpanded={true}>
        <CardHeader showExpandableButton={true} actAsExpander={true} subtitle="Warnings and Errors"/>
          <CardText expandable={true} style={ {background: "black", color: "gray"} }>
          {props.warnings.map((e) => (<pre dangerouslySetInnerHTML={ {__html: e} }></pre>))}
          </CardText>
          <CardText expandable={true} style={ {background: "black", color: "gray"} }>
          {props.errors.map((e) => (<pre dangerouslySetInnerHTML={ {__html: e} }></pre>))}
        </CardText>
      </Card>
  );
    return props.errors.length > 0 || props.warnings.length > 0 ? createWarningsErrorsCard() : "";
}

export default WarningsErrors;
