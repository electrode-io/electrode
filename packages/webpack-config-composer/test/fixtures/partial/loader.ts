export default {
  loader: {
    config: () => {
      return {
        module: {
          rules: ["loader-rule1"],
        },
      };
    },
  },
};
