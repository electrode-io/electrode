# Electrode React Context

Higher order React component used to add an `app` object property to the global React context. Each Electrode application can pass arbitrary props to make available to components via `this.context.app` but at a minimum should include the hapi `request`.

## Installing

```
npm install electrode-react-context --save
```

## Usage

The typical way to use the context is when contructing the app router. The `electrodeContext` wrapper is used to construct the parent Route component.

~~~js
import electrodeContext from "electrode-react-context";
import uiConfig from "electrode-ui-config";

// This function is invoked both on client and server. The `request` will be undefined on the client.
export const createRoutes = (request) => {
  return (
    <Route path={uiConfig.fullPath()} component={electrodeContext(Page, {request})}>
      <IndexRoute component={Home}/>
      <Route path={uiConfig.fullPath("/status")} component={Status}/>
      <Route path={uiConfig.fullPath("/store")} component={Store}/>
      <Route path={uiConfig.fullPath("/analytics")} component={AnalyticsDemo}/>
      <Route path={uiConfig.fullPath("/cookies")} component={CookiesDemo}/>
    </Route>
  );
};
~~~

Now all components in the app have access to an `app` property in the global context. This should be passed as the last argument to calls to functions exported by `electrode-ui-logger` and `electrode-cookies`. The `app.request` is needed for server-rendering since continuation local storage has been deprecated. By always passing in `app` component authors need not worry whether their component is rendering client or server-side.

~~~js
import log from "electrode-ui-logger";
import config from "electrode-ui-config";

export class Home extends React.Component {
  constructor(props, context) {
    super(props, context);
  }

  render() {
    log.info("Rendering Home component", this.context.app);
    return (
      <Well padded filled={false}>
        <Button onClick={() => log.info("Hi button clicked!", this.context.app)}>
          Hi! {config.ui.name} {config.ui.env}
        </Button>
      </Well>
    );
  }
}

Home.contextTypes = {
  app: PropTypes.object
};
~~~

### Functional Components

Context is also available to functional components as the second argument. The `Home` component above could be re-written as:

~~~js
export const Home = (props, {app}) => {
  log.info("Rendering Home component", app);
  return (
    <Well padded filled={false}>
      <Button onClick={() => log.info("Hi button clicked!", app)}>
        Hi! {config.ui.name} {config.ui.env}
      </Button>
    </Well>
  );
};
~~~

## Working with cookies

The `electrode-cookies` module requires the `request` option when being invoked on the server. Since the `app` has the `request`, it can act as the `options` argument:

~~~js
import Cookies from "electrode-cookies";

const CookieComponent = (props, {app}) => {
  const cookieValue = Cookies.get("cookieName", app);
  return <div>{cookieValue}</div>;
};

CookieComponent.contextTypes = {
  app: PropTypes.object
};
~~~

If you need to pass additional cookie specific options, you could do something like this:

~~~js
Cookies.get("cookieName", Object.assign({}, app, { matchSubStr: true }));
~~~