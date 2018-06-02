# Build Electrode Application

You can continue your app development based on the generated Electrode app. Let's make a visual library for our present stack and exciting technologies! Copy the code example below and paste it into the following file:

`<electrode-app>/src/client/components/home.jsx`:

```js
import React from "react";
import PropTypes from "prop-types";
import {connect} from "react-redux";
import {toggleCheck, incNumber, decNumber} from "../actions";
import "../styles/home.css";

export const imageUrls = [
  'http://daynin.github.io/clojurescript-presentation/img/react-logo.png',
  'https://raw.githubusercontent.com/reactjs/redux/master/logo/logo.png',
  'http://freevector.co/wp-content/uploads/2014/04/webpack.png',
  'https://raw.github.com/hapijs/hapi/master/images/hapi.png',
  'https://upload.wikimedia.org/wikipedia/commons/thumb/d/d0/Emoji_u26a1.svg/2000px-Emoji_u26a1.svg.png'
];

class Home extends React.Component {
  renderImage(imageUrl, key) {
    return (
        <img key={key} src={imageUrl} width="10%" height="10%"/>
    );
  }

  render() {
    const props = this.props;
    const {checked, value} = props;
    return (
      <div>
        <h1>Hello <a href={"https://github.com/electrode-io"}>{"Electrode"}</a></h1>
        <div> <p>Our beloved friends</p></div>
        <div className="images">
          {imageUrls.map((imageUrl, index) => this.renderImage(imageUrl, index))}
        </div>
        <div>
          <h2>Managing States with Redux</h2>
          <label>
            <input onChange={props.onChangeCheck} type={"checkbox"} checked={checked}/>
            Checkbox
          </label>
          <div>
            <button type={"button"} onClick={props.onDecrease}>-</button>
            &nbsp;{value}&nbsp;
            <button type={"button"} onClick={props.onIncrease}>+</button>
          </div>
        </div>
      </div>
    );
  }
}

Home.propTypes = {
  checked: PropTypes.bool,
  value: PropTypes.number.isRequired
};

const mapStateToProps = (state) => {
  return {
    checked: state.checkBox.checked, value: state.number.value
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    onChangeCheck: () => {
      dispatch(toggleCheck());
    },
    onIncrease: () => {
      dispatch(incNumber());
    },
    onDecrease: () => {
      dispatch(decNumber());
    }
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Home);
```

Finish the UI by adding styles. Create a new file `<electrode-app>/src/client/styles/home.css` and add the code below:

```css
h1 {
  font-size: 16px;
  color: red;
}

p {
    font-family: "Comic Sans MS", cursive, sans-serif;
}

a {
  font-size: 14px;
  color: red;
}

a:hover {
  color: blue;
}

.resource {
  margin-bottom: 10px;
}

.title {
  border-bottom: 2px solid blue;
  text-align: center;
}
```

Run our new favorite command to see your tech list:

```bash
$ clap dev
```

Navigate to [https://localhost:3000](https://localhost:3000]/).

> If you are already running your app in dev mode, then your changes should update automatically and you can just refresh your browser to see the changes.

**The page should resemble the following screenshot:**

![](/images/further-develop-app.png)
