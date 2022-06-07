const fetchFakeData = (fakeData) => {
  let status = "pending"
  let result;
  let suspender = new Promise((resolve, reject) => {
    setTimeout(() => {
      status = "success";
      result = fakeData;
      resolve();
    }, 2500);
  });

  return {
    read() {
      if (status === "pending") {
        throw suspender;
      }
      return result;
    },
  };
};

export default fetchFakeData;