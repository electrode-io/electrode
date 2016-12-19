import React, {PropTypes} from "react";
import MuiThemeProvider from "material-ui/styles/MuiThemeProvider";
import darkBaseTheme from "material-ui/styles/baseThemes/darkBaseTheme";
import getMuiTheme from "material-ui/styles/getMuiTheme";
import {Tabs, Tab} from "material-ui/Tabs";
import WarningsErrors from "./warnings-errors";
import WebpackInfo from "./webpack-info";
import Legacy from "./legacy";
import {connect} from "react-redux";
import styles from "../styles/base.css";
import Electrify from "electrode-electrify-react-component";

const Home = (props) => {
  return (
    <div className={styles.container}>
      <MuiThemeProvider muiTheme={getMuiTheme(darkBaseTheme)}>
        <Tabs>
          <Tab label="Report">
            <WebpackInfo {...props.info} />
            <WarningsErrors errors={props.errors} warnings={props.warnings} />
            <Electrify
              assets={props.assets}
              modulesByPkg={props.modulesByPkg}
              totalSizeByPkg={props.totalSizeByPkg}
              modules={props.modules}
            />
          </Tab>
          <Tab label="Legacy">
            <div style={ {background: "black", color: "gray", padding: "10px"} }>
              <Legacy legacy={props.legacy}/>
            </div>
          </Tab>
        </Tabs>
      </MuiThemeProvider>
    </div>
  );
};

Home.propTypes = {
  info: PropTypes.object,
  assets: PropTypes.array,
  modulesByPkg: PropTypes.object,
  warnings: PropTypes.array,
  errors: PropTypes.array,
  legacy: PropTypes.string,
  totalSizeByPkg: PropTypes.number,
  modules: PropTypes.array
};

const mapStateToProps = (state) => state;

export default connect(
  mapStateToProps
)(Home);

