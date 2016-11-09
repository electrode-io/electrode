import React, {PropTypes} from "react";
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
};

WarningsErrors.propTypes = {
  warnings: PropTypes.array,
  errors: PropTypes.array
};


export default WarningsErrors;
