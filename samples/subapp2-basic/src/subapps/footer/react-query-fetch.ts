import { dehydrate } from "@xarc/react-query";

const maxDelay = 50;

export const demo3QueryFn = async ({ queryKey }) => {
  const delay = Math.floor(Math.random() * maxDelay);

  return new Promise((resolve) => {
    setTimeout(resolve, delay);
  }).then(() => {
    return { msg: "@tanstack/react-query", queryKey, delay };
  });
};

export const prefetchQuery = async ({ queryClient, ssrData }) => {
  await queryClient.prefetchQuery({ queryKey: ["demo3"], queryFn: demo3QueryFn });

  return {
    queryClient,
    dehydratedState: dehydrate(queryClient),
  };
};
