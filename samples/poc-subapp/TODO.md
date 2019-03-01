# Streaming SSR

- Enable support for `renderToNodeStream`
- Enable HTTP streaming
- Update bottom app to mock slow prepare for redux data
- Verify header/main-body app can SSR and display in browser while bottom continue to load and render

# Dynamic subapp loading

- Generate bundle mapping
- Store bundle load status in `window.webSubApps`
- When rendering subapp without bundle yet, dynamically load them
