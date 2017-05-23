# Add Components to Your Demo-app

After you have finished developing your components, its time for us to demo them in `demo-app`. Rebuild your developed components by running anther npm install:

```
$ cd <your-awesome-component>/packages/<componentName>
$ npm install
```

Also go to your demo-app and reinstall your components as a dependencies.

```
$ cd <your-awesome-component>/demo-app
$ rm -rf node_modules/<componentName>
$ npm install
```

Next, go to `<your-awesome-component>/demo-app/src/client/components/home.jsx` file. Copy, paste and save the code below into this file and replace your component and package name with your own:

```

import {} from "test1";
import React from "react";
import { connect } from "react-redux";

import { GuestList, RenderFriend, YourAwesomeComponent } from "test1";

const locale = "en";

export class Home extends React.Component {
  render() {
    return (
      <div>
        <YourAwesomeComponent
          ourFriends={[
             {name: "electrode", img: "//goo.gl/CZ4wAF", size: 12},
             {name: "hapi", img: "//goo.gl/q9uIFW", size: 12},
             {name: "React", img: "//goo.gl/dL5MXT", size: 12},
            ]}

            invitees={[
             {name: "electrode", invited: true},
             {name: "hapi", invited: false},
             {name: "React", invited: true}
            ]}

            toggleGuest={(invitee) => alert('Edit invitees array in playground to invite a guest!')}

            message={(c)=>(
              <div className={c}>
                Change key 'invited' to true in 'invitees' array in the playground above to invite guests!
              </div>
            )}
            />
        </div>
      );
    }
}

export default connect((state) => state)(Home);

```
