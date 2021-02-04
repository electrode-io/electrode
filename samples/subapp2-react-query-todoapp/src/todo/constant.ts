export const VISIBILITY_FILTERS = {
  ALL: "all",
  COMPLETED: "completed",
  INCOMPLETE: "incomplete"
};

import { dehydrate } from "react-query/hydration";

let id = 0;

export const mockTodos = {
  todos: []
};

export const create = async ({ content }) => {
  console.log("create");
  mockTodos.todos.push({ id: id++, content, completed: false });
};

export const update = async id => {
  console.log("update");
  mockTodos.todos = mockTodos.todos.map(element => {
    if (element.id === id) {
      return { ...element, completed: !element.completed };
    }

    return element;
  });

  console.log(mockTodos.todos);
};

export const fetch = async ({ queryKey }) => {
  return mockTodos;
};

export const prefetchQuery = async ({ queryClient }) => {
  await queryClient.prefetchQuery("test", fetch);
  const dehydratedState = dehydrate(queryClient);
  queryClient.resetQueries();
  return { queryClient, dehydratedState };
};
