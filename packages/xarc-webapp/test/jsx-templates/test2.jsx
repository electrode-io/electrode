/* @jsx createElement */

import { IndexPage, createElement, Token, Require, Literal, Component } from "../../lib/jsx";

const getBogelFontUrl = () => {
  return "bogel";
};

const MyTest = (props, context) => {
  return (
    <div {...props} v={() => 50}>
      <Token _id="PAGE_TITLE" />
      my test
    </div>
  );
};

class TestComponent1 extends Component {
  constructor(props, context) {
    super(props, context);
  }

  render() {
    return <div>from test component1{this.props.test1}</div>;
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
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <MyTest a={1} b="2" />
        <link rel="stylesheet" id="bogel-font" href="" />
        <Token _id="META_TAGS" />
        <Token _id="PAGE_TITLE" />
        <Require _id="subapp-web/lib/init" />
        <Token _id="CRITICAL_CSS" />
        <style>
          <Literal _memoize={false} file={`${__dirname}/style.css`} />
          <Literal file={`test/data/style2.css`} />
          <Literal _memoize={false} file={`bad-file`} />
          <Literal
            // should be memoized
            file={`test/data/style2.css`}
          />
          <Literal
          // test missing file prop
          />
        </style>
        <NestAsyncComponent>
          <div id="nestAsync">test nested async components 1</div>
        </NestAsyncComponent>
      </head>
      <body>
        <TestComponent1 test1="hello" />
        <Token _id="user-token-2" />
        <img src="blah.gif" />
        <noscript>
          <h4>JavaScript is Disabled</h4>
          <p>Sorry, this webpage requires JavaScript to function correctly.</p>
          <p>Please enable JavaScript in your browser and reload the page.</p>
        </noscript>
        <div class="blah" style="background: cyan;">
          <Require _id="../fixtures/custom-1" />
        </div>
      </body>
    </html>
  </IndexPage>
);

export default Template;
