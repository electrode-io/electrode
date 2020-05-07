module.exports = function setup(setupContext, token) {
  const props = token.props;

  return {
    process: () => props.name
  };
};
