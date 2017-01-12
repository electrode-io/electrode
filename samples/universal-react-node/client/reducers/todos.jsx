const todo = (state = {}, action) => {
  let currentId;
  if (state.length > 0) {
    currentId = state[state.length -1].id;
  }
  switch (action.type) {
    case 'ADD_TODO':
      return {
        id: ++currentId || action.id,
        text: action.text,
        completed: false
      }
    case 'TOGGLE_TODO':
      if (state.id !== action.id) {
        return state;
      }

      return Object.assign({}, state, {
        completed: !state.completed
      });

    default:
      return state;
  }
};

const todos = (state = [], action) => {
  switch (action.type) {
    case 'ADD_TODO':
      return [
        ...state,
        todo(state, action)
      ]
    case 'TOGGLE_TODO':
      return state.map(t =>
        todo(t, action)
      )
    default:
      return state;
  }
};

export default todos;
