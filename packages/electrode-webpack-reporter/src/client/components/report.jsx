import React from "react";
import PropTypes from "prop-types";
import MuiThemeProvider from "material-ui/styles/MuiThemeProvider";
import darkBaseTheme from "material-ui/styles/baseThemes/darkBaseTheme";
import getMuiTheme from "material-ui/styles/getMuiTheme";
import WarningsErrors from "./warnings-errors";

const Report = (props) => {
  //MuiThemeProvider children must be wrapped
  return (
    <MuiThemeProvider muiTheme={getMuiTheme(darkBaseTheme)}>
      <div>
        <WarningsErrors
          warnings={props.webpackInfo.warnings}
          errors={props.webpackInfo.errors}
        />
      </div>
    </MuiThemeProvider>);
};

Report.propTypes = {
  webpackInfo: PropTypes.object
};

export default Report;
