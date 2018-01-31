# Add Components to Your Demo-app

After you finish developing your components, its time to demo them in `demo-app`. You don't need to re-install the components if they get updated, all the components are automatically linked to `demo-app`. (Required by `generator-electrode@3Â.0.0` above)

Go to the `<your-component>/demo-app/src/client/components/home.jsx` file. Copy, paste, and save the code below into this file and then rename your component and package.

```js

import React from "react";
import { connect } from "react-redux";
import { IntlProvider } from "react-intl";

import { YourComponent } from "your-component";

const locale = "en";

/*eslint-disable*/
export class Home extends React.Component {
  render() {
    return (
      <IntlProvider locale={locale}>
        <div>
          <p>Some content in same parent div as</p>
          <YourComponent
            ourFriends={[
               {name: "electrode", img: "//goo.gl/CZ4wAF", size: 12},
               {name: "hapi", img: "//goo.gl/q9uIFW", size: 12},
               {name: "React", img: "//goo.gl/dL5MXT", size: 12}
              ]}

              invitees={[
               {name: "electrode", invited: true},
               {name: "hapi", invited: false},
               {name: "React", invited: true}
              ]}

              toggleGuest={(invitee) =>
                alert("Edit invitees array in playground to invite a guest!")
              }

              message={(c) => (
                <div className={c}>
                  Change key "invited" to true in "invitees" array in the playground above to invite guests!
                </div>
              )}
            />
        </div>
      </IntlProvider>
    );
  }
}

export default connect((state) => state)(Home);
/*eslint-enable*/

```
