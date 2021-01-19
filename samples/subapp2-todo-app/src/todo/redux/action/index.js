export const ADD_TODO = "ADD_TODO";
export const TOGGLE_TODO = "TOGGLE_TODO";

let todoId = 0;

export const addTodo = (content) => ({
    type: ADD_TODO,
    payload: {
        id: todoId++,
        content,
        completed: false
    },
});

export const toggleTodo = (id) => {
   return {
    type: TOGGLE_TODO,
    payload: { id },
}};
