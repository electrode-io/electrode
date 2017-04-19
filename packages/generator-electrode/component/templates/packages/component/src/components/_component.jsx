import React from "react";
import { FormattedMessage } from "react-intl";

import styles from "../../src/styles/<%= projectName %>.css";
import messages from "../lang/default-messages";

export default class <%= componentName %> extends React.Component {
  render() {
    return (
      <div className={styles.someStyle}>
        <FormattedMessage {...messages.editMe} />
      </div>
    );
  }
}

<%= componentName %>.displayName = "<%= componentName %>";

<%= componentName %>.propTypes = { };

<%= componentName %>.defaultProps = { };
