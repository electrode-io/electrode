/* @jsx createElement */

/* eslint-disable no-unused-vars */

import { IndexPage, createElement } from "../../lib/jsx"; // eslint-disable-line

function Component1(props) {
  return (
    <div>
      component1 {props.key} {props.children}
    </div>
  );
}

function AsyncChildren(props) {
  return new Promise(resolve =>
    setTimeout(() => {
      resolve(
        <div>
          async component {props.key} children: {props.children}
        </div>
      );
    }, 10)
  );
}

function NestChildren(props) {
  return (
    <div>
      nesting children
      {props.children}
      <Component1 key="+a">
        <div>inside component1</div>
      </Component1>
    </div>
  );
}

export default (
  <IndexPage>
    <NestChildren>
      <Component1 key="a" />
      <Component1 key="b" />
    </NestChildren>

    <AsyncChildren key="x">
      <Component1 key="x1" />
      <NestChildren>
        <Component1 key="m" />
        <Component1 key="n" />
      </NestChildren>
      <Component1 key="x2" />
    </AsyncChildren>
  </IndexPage>
);
