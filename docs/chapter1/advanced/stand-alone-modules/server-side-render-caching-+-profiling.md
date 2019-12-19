# Server Side Render Caching + Profiling

Use the The electrode-react-ssr-caching module to optimize React SSR with profiling and component caching.  

The [electrode-react-ssr-caching](https://github.com/electrode-io/electrode-react-ssr-caching) module supports profiling React Server Side Rendering time to enable component caching to help you speed up Server Side Rendering of your components.

This module is a stand-alone module and can be configured to work in any [Electrode](https://github.com/electrode-io/electrode), [Express.js](https://github.com/electrode-samples/express-example-with-standalone-electrode-modules), or [Hapi.js](https://github.com/electrode-samples/hapijs-example-with-standalone-electrode-modules) application.

## Module: [electrode-react-ssr-caching](https://github.com/electrode-io/electrode-react-ssr-caching)

### Install via`npm`

```
$ npm install --save electrode-react-ssr-caching
```

### Example Applications

* [Electrode Boilerplate](https://github.com/electrode-io/electrode/tree/master/samples/universal-react-node#electrode-react-ssr-caching)

* [Express React Redux Webpack Example](https://github.com/docs-code-examples-electrode-io/express-react-redux-webpack#electrode-react-ssr-caching)

* [Hapi React Redux Example](https://github.com/docs-code-examples-electrode-io/hapi-react-redux#electrode-react-ssr-caching)

## Usage

#### Profiling

You can use this module to inspect the time each component took to render.

```
import SSRCaching from "electrode-react-ssr-caching";
import { renderToString } from "react-dom/server";
import MyComponent from "mycomponent";

// First you should render your component in
// a loop to prime the JS engine (i.e: V8 for NodeJS)
for( let i = 0; i < 10; i ++ ) {
    renderToString(<MyComponent />);
}

SSRCaching.clearProfileData();
SSRCaching.enableProfiling();
const html = renderToString(<MyComponent />);
SSRCaching.enableProfiling(false);
console.log(JSON.stringify(SSRCaching.profileData, null, 2));
```

#### Caching

Once you've determined the most expensive components with profiling, you can enable the component caching in this module to speed up SSR performance.

The basic steps to enabling caching are:

```
import SSRCaching from "electrode-react-ssr-caching";

SSRCaching.enableCaching();
SSRCaching.setCachingConfig(cacheConfig);
```

Where `cacheConfig` contains information on what component to apply caching to. See below for details.

##### cacheConfig

SSR component caching was first demonstrated in [Sasha Aickin's talk](https://www.youtube.com/watch?v=PnpfGy7q96U).

His demo requires each component to provide a function for generating the cache key.

Here we implemented two cache key generation strategies: `simple` and `template`.

You are required to pass in the `cacheConfig` to tell this module what component to apply caching to.

For example:

```
const cacheConfig = {
  components: {
    "Component1": {
      strategy: "simple",
      enable: true
    },
    "Component2": {
      strategy: "template",
      enable: true
    }
  }
}

SSRCaching.setCachingConfig(cacheConfig);
```

#### Caching Strategies

##### simple

The `simple`caching strategy is basically doing a `JSON.stringify` on the component's props. You can also specify a callback in `cacheConfig` to return the key.

For example:

```
const cacheConfig = {
  components: {
    Component1: {
      strategy: "simple",
      enable: true,
      genCacheKey: (props) => JSON.stringify(props)
    }
  }
};
```

This strategy is not very flexible. You need a cache entry for each component instance with different props. However it requires very little processing time.

##### template

The`template`caching strategy is more complex but flexible.

The idea is similar to generating logic-less handlebars templates from your React components and then use string replace to process the template with different props.

If you have this component:

```
class Hello extends Component {
  render() {
    return <div>Hello, {this.props.name}.  {this.props.message}</div>
  }
}
```

And you render it with props:

```
const props = { name: "Bob", message: "How're you?" }
```

The following HTML string is returned:

```
<div>Hello, <span>Bob</span>.  <span>How&#x27;re you?</span></div>
```

Now if you replace values in props with tokens, and you remember that `@0@` refers to `props.name` and `@1@` refers to `props.message`:

```
const tokenProps = { name: "@0@", message: "@1@" }
```

An HTML string is returned. This could be similar to a handlebars template:

```
<div>Hello, <span>@0@</span>.  <span>@1@</span></div>
```

We cache this template HTML using the tokenized props as a cache key. When we need to render the same component with different properties later, we can just locate the template in the cache and use the string to replace and apply the values:

```
cachedTemplateHtml.replace( /@0@/g, props.name ).replace( /@1@/g, props.message );
```

That's the idea of the template strategy. Of course there are small details such as handling the encoding of special characters, preserving properties that can't be tokenized, avoiding tokenizing non-string properties, or preserving`data-reactid` and `data-react-checksum`.

To specify a component to be cached with the `template` strategy:

```
const cacheConfig = {
    components: {
        Hello: {
            strategy: "template",
            enable: true,
            preserveKeys: [ "key1", "key2" ],
            preserveEmptyKeys: [ "key3", "key4" ],
            ignoreKeys: [ "key5", "key6" ],
            whiteListNonStringKeys: [ "key7", "key8" ]
        }
    }
};
```

* `preserveKeys`- List of keys that should not be tokenized.
* `preserveEmptyKeys`- List of keys that should not be tokenized if they are the empty string `""`
* `ignoreKeys`- List of keys that should be completely ignored as part of the template cache key.
* `whiteListNonStringKeys`- List of non-string keys that should be tokenized.

# API

### [`enableProfiling(flag)`](https://docs.electrode.io/other/stand-alone-modules/server-side-render-caching-+-profiling#enableprofiling-flag)

Enable profiling according to flag

* `undefined`or `true`- enable profiling
* `false`- disable profiling

### [`enableCaching(flag)`](https://docs.electrode.io/other/stand-alone-modules/server-side-render-caching-+-profiling#enablecaching-flag)

Enable cache according to flag

* `undefined` or `true`- enable caching
* `false`- disable caching

### [`enableCachingDebug(flag)`](https://docs.electrode.io/other/stand-alone-modules/server-side-render-caching-+-profiling#enablecachingdebug-flag)

Enable cache debugging according to flag.

> Caching must be enabled for this to have any effect.

* `undefined` or `true`- enable cache debugging
* `false`- disable cache debugging

### [`setCachingConfig(config)`](https://docs.electrode.io/other/stand-alone-modules/server-side-render-caching-+-profiling#setcachingconfig-config)

Set the caching configuration to`config`.

### [`stripUrlProtocol(flag)`](https://docs.electrode.io/other/stand-alone-modules/server-side-render-caching-+-profiling#stripurlprotocol-flag)

Remove`http:`or`https:`from prop values that are URLs according to flag.

> Caching must be enabled for this to have any effect.

* `undefined`or `true`- strip URL protocol
* `false`- don't strip

### [`shouldHashKeys(flag, [hashFn])`](https://docs.electrode.io/other/stand-alone-modules/server-side-render-caching-+-profiling#shouldhashkeys-flag-hashfn)

Set whether the `template` strategy should hash the cache key and use that instead.

> Caching must be enabled for this to have any effect.

* `flag`

* * `undefined` or `true` - use a hash value of the cache key
  * `false`- don't use a hash valueo f the cache key
* `hashFn`- optional, a custom callback to generate the hash from the cache key, which is passed in as a string
  * i.e.`function customHashFn(key) { return hash(key); }`

If no `hashFn` is provided, then [farmhash](https://github.com/google/farmhash) is used if it's available, otherwise hashing is turned off.

### [`clearProfileData()`](https://docs.electrode.io/other/stand-alone-modules/server-side-render-caching-+-profiling#clearprofiledata)

Clear profiling data

### [`clearCache()`](https://docs.electrode.io/other/stand-alone-modules/server-side-render-caching-+-profiling#clearcache)

Clear caching data

### [`cacheEntries()`](https://docs.electrode.io/other/stand-alone-modules/server-side-render-caching-+-profiling#cacheentries)

Get total number of cache entries

### [`cacheHitReport()`](https://docs.electrode.io/other/stand-alone-modules/server-side-render-caching-+-profiling#cachehitreport)

Print out cache entries and number of hits each one has.
