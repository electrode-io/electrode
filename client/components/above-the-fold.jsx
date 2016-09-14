import React from "react";

export class AboveFold extends React.Component {

  render() {
    return (
      // <AboveTheFoldOnlyServerRender skip={true}>
        <div className="renderMessage" style={{color: "blue"}}>
          <h3>Above-the-fold-only-server-render: Increase Your Performance</h3>
          <p>This will skip server rendering if the 'AboveTheFoldOnlyServerRender'
            lines are present, or uncommented out.</p>
          <p>This will be rendered on the server and visible if the 'AboveTheFoldOnlyServerRender'
            lines are commented out.</p>
          <p>Try manually toggling this component to see it in action</p>
          <p>
            <a href="https://github.com/electrode-io/above-the-fold-only-server-render"
              target="_blank">Read more about this module and see our live demo
            </a>
          </p>
        </div>
      //  </AboveTheFoldOnlyServerRender>
    );
  }
}
