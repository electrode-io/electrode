/*eslint-disable react/prop-types*/
import React from "react";
import PropTypes from "prop-types";
import {Card, CardHeader, CardText} from "material-ui/Card";
import {warningsErrorsStyles as inlineStyles} from "../styles/inline-styles";
import styles from "../styles/base.css";
import classNames from "classnames/bind";
import RaisedButton from "material-ui/RaisedButton";
const cx = classNames.bind(styles);

class WarningsErrors extends React.Component {
  constructor(props) {
    super(props);
    this.state = {codeExpanded: false};
  }

  createWarningsErrorsCard() {
    const hasWarnings = this.props.warnings.length > 0;
    const hasErrors = this.props.errors.length > 0;
    const warningErrorMessage = hasWarnings ? "Warning" : "Error";
    return (
      <div className={styles.warningsErrorsContainer}>
        <div className={cx({
          warningTitle: hasWarnings,
          errorTitle: hasErrors
        })}>
        <div className={cx([
          {iconContainer: true,
            errorIconContainer: hasErrors,
            warningIconContainer: hasWarnings}
        ])}>
          <i
            className={cx([
              {warningErrorIcon: true},
              "material-icons",
              "md-36",
              "md-light"
            ])}>warning</i>
        </div>
          <h2 className={styles.warningErrorText}>
            {warningErrorMessage}
          </h2>
        </div>

        {this.props.errors.map((errStr) => {
          const codeIdx = errStr.indexOf("<span");
          const hasCode = codeIdx > 0;
          const errorTitle = hasCode ? errStr.slice(0, codeIdx) : errStr;
          if (hasCode) {
            return (<div>
                <Card>
                  <CardHeader
                    actAsExpander={true}
                    style={inlineStyles().errorContainer}
                    onClick={() => this.setState({
                      codeExpanded: !this.state.codeExpanded
                    })}>
                    <pre style={inlineStyles().error}>
                      {errorTitle}
                    </pre>
                    <RaisedButton
                      onClick={() => this.setState({codeExpanded: !this.state.codeExpanded})}
                      label={this.state.codeExpanded ? "Hide" : "View code"}
                      style={inlineStyles().expandCodeButton}
                      backgroundColor="white"
                      labelColor="black"
                      expander={true} />
                  </CardHeader>
                  <CardText expandable={true} style={{backgroundColor: "black"}}>
                    <pre dangerouslySetInnerHTML={{__html: errStr.slice(codeIdx, errStr.length)}}/>
                  </CardText>
                </Card>
              </div>);
          } else {
            return (<div>
              <Card>
                <CardHeader style={inlineStyles().errorContainer}>
                  <pre style={inlineStyles().error}>
                    {errorTitle}
                  </pre>
                </CardHeader>
              </Card>
            </div>);
          }
        })}
      </div>);
  }

  createEmptyWarningsErrorsCard() {
    return (
      <div className={styles.warningsErrorsContainer}>
        <div className={cx({
          warningErrorCardTitle: true,
          successTitle: true
        })}>
          <div className={cx([
            {iconContainer: true},
            {successIconContainer: true}
          ])}>
            <i
              className={cx([
                {successIcon: true},
                {warningErrorIcon: true},
                "material-icons",
                "md-36",
                "md-light"
              ])}>
              check_circle
            </i>
          </div>
          <h2 className={styles.warningErrorText}>
            Webpack build complete - No Warnings or Errors!
          </h2>
        </div>
      </div>);
  }

  render() {
    return (this.props.errors.length > 0 || this.props.warnings.length > 0 ?
      this.createWarningsErrorsCard() : this.createEmptyWarningsErrorsCard());
  }
}

WarningsErrors.propTypes = {
  warnings: PropTypes.array,
  errors: PropTypes.array
};

export default WarningsErrors;
