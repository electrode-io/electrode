const maxDelay = 50;

export async function getStaticProps() {
  const delay = Math.floor(Math.random() * maxDelay);
  return new Promise((resolve) => {
    return setTimeout(
      () => resolve({ props: { message: "Hello from static props", delay } }),
      delay
    );
  });
}
