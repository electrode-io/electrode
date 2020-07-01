let count = 0;
module.exports = () => {
  count++;
  return {
    process: () => `${count}`
  };
};
