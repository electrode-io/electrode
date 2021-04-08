module.exports = (a, b) => {
  return (Array.isArray(a) && Array.isArray(b))
    ? [].concat(b).concat(a)
    : undefined;
};
