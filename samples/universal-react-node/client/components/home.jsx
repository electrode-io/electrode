import React from "react";
import AboveFold from "./above-fold-simple";
import ContextKey from "./above-fold-context-key";
import styles from "../../client/styles/base.css";

export class Home extends React.Component {
  getChildContext() {
    return {
      aboveTheFoldOnlyServerRender: {
        ContextKey: true
      }
    };
  }

    render () {
      return (
        <div>
          <h1>Hello <a href="https://github.com/electrode-io">Electrode</a></h1>
          <h2>Demonstration Components</h2>
          <ul>
            <li><a href="/csrf">CSRF protection using electrode-csrf-jwt</a></li>

            <li className="aboveFold">
              <button>
                <a href="/above-fold-simple">
                  Above the Fold Render - increase your App's performance by using a skip prop
                </a>
              </button>
            </li>
            <li className="aboveFold">
              <button>
                <a href="/above-fold-context-key">
                  Above the Fold Render - increase your App's performance by setting context and passing a contextKey prop
                </a>
              </button>
            </li>
            <li>
              <ContextKey />
            </li>
          </ul>
        </div>
      );
    }
}

Home.childContextTypes = {
  aboveTheFoldOnlyServerRender: React.PropTypes.shape({
    AboveFold: React.PropTypes.bool
  })
};
