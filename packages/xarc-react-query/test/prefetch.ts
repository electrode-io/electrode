import { dehydrate } from "react-query/hydration";

export const testFetch = async ({ queryKey }) => {
  return { msg: "foo", queryKey };
};

export const prefetchQuery = async ({ queryClient }) => {
  await queryClient.prefetchQuery("test", testFetch);
  const dehydratedState = dehydrate(queryClient);
  queryClient.resetQueries();
  return { queryClient, dehydratedState };
};
