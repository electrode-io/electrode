import React from "react";
import sugar from "../styles/custom-sugarss.styl";

class DemoSugarss extends React.Component {
  render() {
    return (
      <div>
        <h6 styleName="sugar.header">Demo SugarSS</h6>
        <div styleName="sugar.section">
          <div styleName="sugar.main">
            <button styleName="sugar.button-one">Tap Me</button>
            <button styleName="sugar.button-two">
              <span>Hover Me</span>
            </button>
            <button styleName="sugar.button-three">Click Me</button>
          </div>
        </div>
      </div>
    );
  }
}

export default DemoSugarss;
