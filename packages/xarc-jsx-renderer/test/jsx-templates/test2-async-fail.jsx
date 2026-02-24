/* @jsx createElement */

import { IndexPage, createElement, Token, Component } from "../../src";

class TestComponent1 extends Component {
  render() {
    return <div>from test component1</div>;
  }
}

function AsyncComponent(props, context, scope) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (props.fail) {
        reject(new Error("test async component fail"));
      } else {
        scope.output.add(`${props.indent}async component ${props.key}\n`);
        resolve();
      }
    }, props.delay);
  });
}

function NestAsyncComponent() {
  return (
    <AsyncComponent key="2" indent="==" delay={10} fail={true}>
      <div id="asyncComponent2">test nested async components failed</div>
    </AsyncComponent>
  );
}

const Template = (
  <IndexPage DOCTYPE="html">
    <TestComponent1 />
    <Token _id="INITIALIZE" />
    <html lang="en">
      <head>
        <meta charset="UTF-8" />
        <NestAsyncComponent>
          <div id="nestAsync">test nested async components 1</div>
        </NestAsyncComponent>
      </head>
      <body>
        <TestComponent1 test1="hello" />
      </body>
    </html>
  </IndexPage>
);

export default Template;
