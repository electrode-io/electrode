import React from "react";
import { connect } from "react-redux";
import { IntlProvider } from "react-intl";

import DemoComponent from "demo-component/demo/demo";
import DemoComponentStyle from "demo-component/demo/demo.css";

const locale = "en";

export class Home extends React.Component {
  render() {
    return (
      <IntlProvider locale={locale}>
        <div>
          <h2>Electrode Component Demo App</h2>
          <DemoComponent />
        </div>
      </IntlProvider>
    );
  }
}

export default connect(state => state)(Home);
