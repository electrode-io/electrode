export default function(options) {
  return {
    reducer: {},
    initialState: {
      skip: options.req.url.query.skip === "true"
    }
  };
}
