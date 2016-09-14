import React from "react";
import styles from "../../client/styles/base.css";

export class ContextKey extends React.Component {
  render() {
    return (
      <AboveTheFoldOnlyServerRender contextKey="aboveTheFoldOnlyServerRender.ContextKey">
        <div className="renderMessage" style={{color: 'b;'}}>
          This will not be server side rendered based on the context. It used a context key.
        </div>
      </AboveTheFoldOnlyServerRender>
    );
  }
}
