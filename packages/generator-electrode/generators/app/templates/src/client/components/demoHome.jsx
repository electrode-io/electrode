import React from "react";
import { connect } from "react-redux";
import { IntlProvider, addLocaleData } from "react-intl";

import {<%= className %>} from "<%= packageName %>";

const locale = "en";

export class Home extends React.Component {
  render() {
    return (
      <IntlProvider locale={locale}>
        <div>
          <p>Some content in same parent div as</p>
        <<%= className %> />
      </div>
      </IntlProvider>
    );
  }
}

export default connect((state) => state)(Home);
