import { dehydrate } from "@xarc/react-query";

const maxDelay = 50;

export const demo4QueryFn = async ({ queryKey }) => {
  const delay = Math.floor(Math.random() * maxDelay);

  console.debug("demo4 react-query getting data, delay:", delay);

  return new Promise(resolve => {
    setTimeout(resolve, delay);
  }).then(() => {
    return { msg: "react-query", queryKey, delay };
  });
};

export const prefetchQuery = async ({ queryClient, ssrData }) => {
  await queryClient.prefetchQuery("demo4", demo4QueryFn);
  return {
    queryClient,
    dehydratedState: dehydrate(queryClient)
  };
};
