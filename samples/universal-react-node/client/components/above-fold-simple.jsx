import React from "react";
import styles from "../../client/styles/base.css";

export class AboveFold extends React.Component {

  render() {
    return (
      <AboveTheFoldOnlyServerRender skip={true}>
        <div className="renderMessage" style={{color: 'red'}}>
          <p>This will not be rendered on the server</p>
        </div>
      </AboveTheFoldOnlyServerRender>
    );
  }
}
