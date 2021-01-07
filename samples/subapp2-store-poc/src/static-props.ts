const maxDelay = 50;

export const getStaticProps = async () => {
  const delay = Math.floor(Math.random() * maxDelay);
  return new Promise(resolve => {
    setTimeout(resolve, delay);
  }).then(() => {
    return {
      props: { message: "hello world! this is static props", delay }
    };
  });
};
