import React, {PropTypes} from "react";
import {Card, CardHeader, CardText} from "material-ui/Card";
import AssetsVisualization from "./webpack-assets/assets-visualization";

const WebpackAssets = (props) => (
      <Card initiallyExpanded={true}>
        <CardHeader showExpandableButton={true} actAsExpander={true} subtitle="Webpack Assets"/>
          <CardText expandable={true}>
            <AssetsVisualization assets={props.assets} />
          </CardText>
      </Card>
    );
WebpackAssets.propTypes = {
  assets: PropTypes.array
};

export default WebpackAssets;
