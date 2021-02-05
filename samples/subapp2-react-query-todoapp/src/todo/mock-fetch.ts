import { dehydrate } from "react-query/hydration";

let id = 0;
export const mockTodos = {
  todos: []
};

export const create = async ({ content }) => {
  mockTodos.todos.push({ id: id++, content, completed: false });
};

export const update = async id => {
  mockTodos.todos = mockTodos.todos.map(element => {
    if (element.id === id) {
      return { ...element, completed: !element.completed };
    }

    return element;
  });
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
