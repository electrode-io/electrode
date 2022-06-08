const fetchFakeData = (fakeData, delay) => {
  let status = "pending"
  let result;
  let suspender = new Promise((resolve, reject) => {
    setTimeout(() => {
      status = "success";
      result = fakeData;
      resolve();
    }, delay);
  });

  return {
    read() {
      if (status === "pending") {
        throw suspender;
      }
      if (status === "success") {
        return result;
      }      
    },
  };
};

export default fetchFakeData;