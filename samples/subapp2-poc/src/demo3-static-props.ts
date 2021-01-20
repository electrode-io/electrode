const maxDelay = 50;

export const getStaticProps = async () => {
  const delay = Math.floor(Math.random() * maxDelay);
  return new Promise(resolve => {
    setTimeout(resolve, delay);
  }).then(() => {
    return {
      props: {
        message: "demo3 this is static props",
        // this actually won't execute even if we didn't escape the <script> tags
        // because this sample enables CSP nonce
        xss: "</script><script>alert('oops, xss')</script>",
        delay
      }
    };
  });
};
