import { createElement } from "react"; // eslint-disable-line

export const TestComponent = () => {
  return (
    <div>
      <h1>Hello from TestComponent</h1>
      <p>test test test test test test test</p>
    </div>
  );
};

export const DeadCardExampleToBeRemovedByTreeShaking = () => {
  return (
    <div>
      <h1>Hello World!</h1>
      <p>You should not see this. This should have been removed by treeshaking.</p>
      <p>DeadCardExampleToBeRemovedByTreeShaking</p>
    </div>
  );
};
