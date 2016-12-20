/*eslint-disable react/prop-types*/
import React, {PropTypes} from "react";
import {Card, CardHeader, CardText} from "material-ui/Card";
import CodeExpandButton from "./code-expand-button";
import {warningsErrorsStyles as styles} from "../styles/inline-styles";

const WarningsErrors = (props) => {
  const createWarningsErrorsCard = () => {
    return (
      <div style={styles().container}>
        <div style={styles().title}>
          <i style={styles().icon} className="material-icons md-36">warning</i>
          <h2 style={styles().titleText}>
            Warnings and Errors!
          </h2>
        </div>
        {props.errors.map((e) => {
          const errorHasExpandableCode = e.indexOf(")") > 0;
          const errorTitle = errorHasExpandableCode ? e.slice(0, e.indexOf(")") + 1) : e;
          if (errorHasExpandableCode) {
            return (<div>
                <Card>
                  <CardHeader actAsExpander={true} style={styles().errorContainer}>
                    <pre style={styles().error}>
                      {errorTitle}
                    </pre>
                    <CodeExpandButton />
                  </CardHeader>
                  <CardText expandable={true}>
                    <pre
                      dangerouslySetInnerHTML={{__html: e.slice(e.indexOf("<span"), e.length)}}
                    />
                  </CardText>
                </Card>
              </div>);
          } else {
            return (<div>
              <Card>
                <CardHeader style={styles().errorContainer}>
                  <pre style={styles().error}>
                    {errorTitle}
                  </pre>
                </CardHeader>
              </Card>
            </div>);
          }
        }
      )}
      </div>
    );
  };

  const createEmptyWarningsErrorsCard = () => {
    return (<h2>No warnings or errors</h2>);
  };

  return (
    props.errors.length > 0 || props.warnings.length > 0 ?
    createWarningsErrorsCard() : createEmptyWarningsErrorsCard()
  );
};

WarningsErrors.propTypes = {
  warnings: PropTypes.array,
  errors: PropTypes.array
};


export default WarningsErrors;
