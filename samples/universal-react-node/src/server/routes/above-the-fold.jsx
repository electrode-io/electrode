export default function(options) {
  return {
    reducer: {},
    initialState: {
      skip: options.req.query.skip === "true"
    }
  };
}
