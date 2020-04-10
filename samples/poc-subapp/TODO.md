# Streaming SSR [x]

- Enable support for `renderToNodeStream`
- Enable HTTP streaming
- Update bottom app to mock slow prepare for redux data
- Verify header/main-body app can SSR and display in browser while bottom continue to load and render

# Dynamic subapp loading [x]

- Generate bundle mapping
- Store bundle load status in `window.webSubApps`
- When rendering subapp without bundle yet, dynamically load them

# Dynamic SSR [x]

- Allow each route and subapp to dynamically turn on/off SSR for a request

# Detached subapp

- Allow subapp to be served by different routes
- So a page can dynamically load in a subapp and run it within a DOM node
