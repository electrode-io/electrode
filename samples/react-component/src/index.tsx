import { Component, createElement } from "react"; // eslint-disable-line
import { TestComponent } from "./other-components";

export class DemoComponent extends Component {
  render() {
    return (
      <div>
        <h1>Hello from DemoComponent</h1>
        <p>
          <TestComponent />
        </p>
      </div>
    );
  }
}
