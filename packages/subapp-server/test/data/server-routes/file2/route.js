module.exports = {
  name: "file2",
  dir: __dirname,
  path: "/file2",
  paths: [{ "/file2/a": ["get"] }, { "/file2/b": ["get"] }],
  methods: ["get"],
  setup: () => {},
  initialize: () => {},
  htmlFile: "file2.html"
};
