# Low-Level Components

#### Add a new component under packages

Go to your `packages` folder and run `electrode:component-add`:

```bash
$ cd packages
$ yo electrode:component-add
```

Fill out the prompts again with your information, we took `your-component2` as a new component name and you should see something like below:

```bash
  _-----_
  |       |    ╭──────────────────────────╮
  |--(o)--|    │ Welcome to the Electrode │
 `---------´   │ Add Component generator! │
  ( _´U`_ )    ╰──────────────────────────╯
  /___A___\   /
  |  ~  |
  __'.___.'__
 ´   `  |° ´ Y `

  ? Component Name your-component2
  ? What is the ClassName for your component? your-component2
  ? What will be the npm package name? your-component2
  ? What will be the GitHub organization username (e.g., 'walmartlabs')?
  ? What is your name? (for copyright notice, etc.)
  ? What is your GitHub Username?
  ? Use double quotes or single quotes? "
  ? What is the name of the GitHub repo where this will be published?
  ? Would you like to create a new directory for your project? Yes
  conflict ../../demo-app/package.json
  ? Overwrite ../../demo-app/package.json? overwrite
  force ../../demo-app/package.json
  conflict ../../demo-app/src/client/components/home.jsx
  ? Overwrite ../../demo-app/src/client/components/home.jsx? overwrite
  force ../../demo-app/src/client/components/home.jsx
  identical ../../demo-app/archetype/config/index.js
  conflict ../../demo-app/archetype/config/webpack/webpack.config.dev.js
  ? Overwrite ../../demo-app/archetype/config/webpack/webpack.config.dev.js? overwrite
  force ../../demo-app/archetype/config/webpack/webpack.config.dev.js
  conflict ../../demo-app/archetype/config/webpack/webpack.config.js
  ? Overwrite ../../demo-app/archetype/config/webpack/webpack.config.js? overwrite
  force ../../demo-app/archetype/config/webpack/webpack.config.js
  create .babelrc
  create .gitignore
  create .npmignore
  create .editorconfig
  create clap.js
  create package.json
  create README.md
  create src/components/your-component2.jsx
  create src/styles/your-component2.css
  create src/lang/default-messages.js
  create src/lang/en.json
  create src/lang/tenants/electrodeio/default-messages.js
  create src/index.js
  create test/client/.eslintrc
  create test/client/components/your-component2.spec.jsx
  create test/client/components/helpers/intl-enzyme-test-helper.js
  ...

```

This will generate a new package and also update the demo-app. Don't get panic if you saw conflicts, the `demo-app/src/client/components/home.jsx` and `demo-app/package.json` expected to be overwritten during the update.

#### Develop the new generated component

Create a file called `<your-component>/packages/<componentName>/src/components/guest-list.jsx`. Copy the code from below into this file:

```js

import React from "react";

import PropTypes from "prop-types";
import styles from "../../src/styles/guest-list.css";

const GuestList = ({ invitees, toggleGuest }) => {

  const renderInvitees = (inviteesArr) => {
    return inviteesArr.map((invitee) => (
      <div key={invitee.name} className={styles.guestName}>
        <input
          id={invitee.name}
          type="checkbox"
          checked={invitee.invited}
          onChange={() => toggleGuest(invitee)}/>
        <label htmlFor={invitee.name}>
          {invitee.name}
        </label>
      </div>
    ));
  };

  return (
    <div className={styles.guestList}>
      <h1>Guest List:</h1>
      {renderInvitees(invitees)}
    </div>
  );

};

GuestList.propTypes = {
  invitees: PropTypes.array,
  toggleGuest: PropTypes.func
};

export default GuestList;

```

Create another file called `<your-component>/packages/<componentName>/src/components/render-friend.jsx`. Copy the code from below into this file. Don't worry—we'll cover the helper and css modules in the next section.

```js

import React from "react";
import PropTypes from "prop-types";
import styles from "../../src/styles/render-friend.css";
import style from "../helpers/graph-styles";

const DEFAULT_SIZE = 15;
const DEGREES_OF_COOL = 360;

const RenderFriend = ({ friend, styleObj, className }) => {

  const { name, img, profile, friends } = friend;
  let { size } = friend;
  const parentFriend = { name, img, profile };
  size = size ? size : DEFAULT_SIZE;

  const bgImg = { backgroundImage: `url(${img})` };
  let applyStyle = styleObj ?
    Object.assign(bgImg, styleObj) :
    Object.assign(bgImg, style("single", size));

  applyStyle = friends ? style("container", size) : applyStyle;
  let applyClass = friends ? styles.join : styles.friend;
  applyClass = styleObj ? applyClass : `${applyClass} ${styles.join} ${className || ""}`;

  const renderFriends = (friendsArr) => {
    const angleVal = (DEGREES_OF_COOL / friendsArr.length);
    let rotateVal = 0;

    return friendsArr.map((friendObj) => {
      rotateVal += angleVal;
      return (
        <RenderFriend
          key={friendObj.name}
          friend={friendObj}
          styleObj={style("child", size, rotateVal)}
        />
      );
    });
  };

  return (
    <div className={applyClass} style={applyStyle}>
      {!!friends && renderFriends(friends)}
      {!!friends && <RenderFriend friend={parentFriend} styleObj={style("parent", size)}/>}
    </div>
  );
};

RenderFriend.propTypes = {
  friend: PropTypes.object,
  styleObj: PropTypes.object,
  className: PropTypes.string
};

export default RenderFriend;

```
