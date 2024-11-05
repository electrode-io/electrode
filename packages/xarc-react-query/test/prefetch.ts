import { dehydrate } from "@tanstack/react-query";

export const testFetch = async ({ queryKey }) => {
  return { msg: "foo", queryKey };
};

export const prefetchQuery = async ({ queryClient }) => {
  await queryClient.prefetchQuery({ queryKey: ["test"], queryFn: testFetch });
  const dehydratedState = dehydrate(queryClient);
  queryClient.resetQueries();
  return { queryClient, dehydratedState };
};
