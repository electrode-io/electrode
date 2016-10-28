import React, {PropTypes} from "react";
import MuiThemeProvider from "material-ui/styles/MuiThemeProvider";
import {Card, CardHeader, CardText} from "material-ui/Card";
import {Tabs, Tab} from "material-ui/Tabs";
import WebpackInfo from "./webpack-info";
import Legacy from "./legacy";
import WebpackAssets from "./webpack-assets";
import ModulesByPkg from "./modules-by-pkg";
import {connect} from "react-redux";

//////

const Home = (props) => {
  const warningsErrors = () => (
    <Card initiallyExpanded={true}>
      <CardHeader showExpandableButton={true} actAsExpander={true} subtitle="Warnings and Errors" />
      <CardText expandable={true} style={ {background: "black", color: "gray"} }>
        {props.warnings.map((e) => (<pre dangerouslySetInnerHTML={ {__html: e} }></pre>))}
      </CardText>
      <CardText expandable={true} style={ {background: "black", color: "gray"} }>
        {props.errors.map((e) => (<pre dangerouslySetInnerHTML={ {__html: e} }></pre>))}
      </CardText>
    </Card>
  );

  return (<MuiThemeProvider>
    <Tabs>
      <Tab label="Report">
        <div>
          <Card initiallyExpanded={true}>
            <CardText expandable={true}>
              <WebpackInfo {...props.info} />
            </CardText>
          </Card>
          <Card initiallyExpanded={true}>
            <CardHeader showExpandableButton={true} actAsExpander={true} subtitle="Assets" />
            <CardText expandable={true}>
              <WebpackAssets assets={props.assets}/>
            </CardText>
          </Card>
          {props.errors.length > 0 || props.warnings.length > 0 ? warningsErrors() : ""}
          <Card initiallyExpanded={true}>
            <CardHeader showExpandableButton={true} actAsExpander={true} subtitle="Modules" />
            <CardText expandable={true}>
              <ModulesByPkg modulesByPkg={props.modulesByPkg} totalSize={props.totalSizeByPkg}/>
            </CardText>
          </Card>
        </div>
      </Tab>
      <Tab label="Legacy">
        <div style={ {background: "black", color: "gray", padding: "5px"} }>
          <Legacy legacy={props.legacy}/>
        </div>
      </Tab>
    </Tabs>
  </MuiThemeProvider>);
};


Home.propTypes = {
  info: PropTypes.object,
  assets: PropTypes.object,
  modulesByPkg: PropTypes.object,
  warnings: PropTypes.array,
  errors: PropTypes.array,
  legacy: PropTypes.string,
  totalSizeByPkg: PropTypes.number
};

const mapStateToProps = (state) => state;

export default connect(
  mapStateToProps
)(Home);

