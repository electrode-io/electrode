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
  return new Promise(resolve => {
    setTimeout(() => {
      scope.output.add(`${props.indent}async component ${props.key}\n`);
      resolve(<div>async component children: {props.children}</div>);
    }, props.delay);
  });
}

function ChildrenNesting(props) {
  return (
    <div>
      component nesting children
      {props.children}
    </div>
  );
}

const Template = () => (
  <IndexPage DOCTYPE="html">
    <TestComponent1 />
    <Token _id="INITIALIZE" />
    <html lang="en">
      <head>
        <meta charset="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <link
          rel="stylesheet"
          href="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.7/css/bootstrap.min.css"
        />
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
        <script id="test-script" src="http://localhost/test.js" defer />
        <ChildrenNesting>
          <AsyncComponent key="1" indent="=" delay={50}>
            <div id="asyncComponent1">test nested async components 1</div>
          </AsyncComponent>
          <AsyncComponent key="2" indent="==" delay={10}>
            <div id="asyncComponent2">test nested async components 2</div>
          </AsyncComponent>
        </ChildrenNesting>
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
          <Require
            // Do any preparation work need for the Server Side Rendering content
            // Particular any async data needed for Redux store
            // This may depend on CCM or SEO so it has to be after those're awaited
            // If app has provide a content.prepare, then it will be invoked.
            // It's expected to be async, and fire and forget
            // It should internally store any state into request.app
            // For example, an async promise, which would be awaited for later when
            // content.render is called.
            // If no prepare step is needed, then app can set a handler that
            // override this Token to null.
            // Or just create your own index.html and remove this Token.
            _id="subapp-web/lib/load"
            _concurrent
            name="Header"
            timestamp
            startOnLoad
            elementId="subapp-header01"
            serverSideRendering
            hydrateServerData
            clientSideRendering
            inlineScript
          />
        </div>

        <div class="blah" style="background: green;">
          <Require
            _id="subapp-web/lib/load"
            _concurrent
            name="MainBody"
            timestamp
            elementId="subapp-mainbody"
            useStream
            async
            hydrateServerData
            serverSideRendering
          />
        </div>
      </body>
    </html>
  </IndexPage>
);

export default Template;
