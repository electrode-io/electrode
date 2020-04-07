/** @jsx h */

import { h, reduxBundlerLoadSubApp, Component } from "subapp-pbundle";

class Demo3 extends Component {
  constructor(props) {
    super(props);
    this.state = { num: 0 };
    this.interval = setInterval(
      this.autoIncrement.bind(this),
      1000
    );
  }

  autoIncrement() {
    const { num } = this.state;
    console.log("Demo 3 Auto Incrementing", num);
    this.setState({ num: num + 1 });
  }

  componentWillUnmount() {
    console.log("Demo 3 Unmounting");
    clearInterval(this.interval);
  }

  render() {
    const { num } = this.state;
    return (
      <div>
        <h1>
          Demo3 Page auto increment: &nbsp;
          &nbsp;{num}&nbsp;
        </h1>
      </div>
    );
  }
}

export default reduxBundlerLoadSubApp({
  name: "Demo3",
  Component: Demo3
});
