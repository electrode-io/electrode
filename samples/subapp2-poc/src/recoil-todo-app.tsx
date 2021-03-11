import { React, ReactSubApp, xarcV2, AppContext } from "@xarc/react";
import { recoilFeature, Recoil } from "@xarc/react-recoil";

const selectorsMap = new Map();

const filteredTodoListState = store => {
  if (selectorsMap.get("filteredTodoListState") === undefined) {
    const selector = Recoil.selector({
      key: "filteredTodoListState",
      get: ({ get }) => {
        const filter = get(store.get("todoListFilterState"));
        const list = get(store.get("todoListState"));

        switch (filter) {
          case "Show Completed":
            return list.filter(item => item.isComplete);
          case "Show Uncompleted":
            return list.filter(item => !item.isComplete);
          default:
            return list;
        }
      }
    });
    selectorsMap.set("filteredTodoListState", selector);
  }

  return function () {
    return selectorsMap.get("filteredTodoListState");
  };
};

const todoListStatsState = store => {
  if (selectorsMap.get("todoListStatsState") === undefined) {
    const selector = Recoil.selector({
      key: "todoListStatsState",
      get: ({ get }) => {
        const todoList = get(store.get("todoListState"));
        const totalNum = todoList.length;
        const totalCompletedNum = todoList.filter(item => item.isComplete).length;
        const totalUncompletedNum = totalNum - totalCompletedNum;
        const percentCompleted = totalNum === 0 ? 0 : (totalCompletedNum / totalNum) * 100;

        return {
          totalNum,
          totalCompletedNum,
          totalUncompletedNum,
          percentCompleted
        };
      }
    });
    selectorsMap.set("todoListStatsState", selector);
  }
  return function () {
    return selectorsMap.get("todoListStatsState");
  };
};

function TodoItemCreator(props) {
  const { store } = props;
  const [inputValue, setInputValue] = React.useState("");
  const setTodoList = Recoil.useSetRecoilState(store.get("todoListState"));

  const addItem = () => {
    setTodoList(oldTodoList => [
      ...oldTodoList,
      {
        id: getId(),
        text: inputValue,
        isComplete: false
      }
    ]);
    setInputValue("");
  };

  const onChange = ({ target: { value } }) => {
    setInputValue(value);
  };

  return (
    <div>
      <input type="text" value={inputValue} onChange={onChange} />
      <button onClick={addItem}>Add</button>
    </div>
  );
}

// utility for creating unique Id
let id = 0;
function getId() {
  return id++;
}

function TodoItem(props) {
  const { item, store } = props;
  const [todoList, setTodoList] = Recoil.useRecoilState(store.get("todoListState"));
  const index = todoList.findIndex(listItem => listItem === item);

  const editItemText = ({ target: { value } }) => {
    const newList = replaceItemAtIndex(todoList, index, {
      ...item,
      text: value
    });

    setTodoList(newList);
  };

  const toggleItemCompletion = () => {
    const newList = replaceItemAtIndex(todoList, index, {
      ...item,
      isComplete: !item.isComplete
    });

    setTodoList(newList);
  };

  const deleteItem = () => {
    const newList = removeItemAtIndex(todoList, index);

    setTodoList(newList);
  };

  return (
    <div>
      <input type="text" value={item.text} onChange={editItemText} />
      <input type="checkbox" checked={item.isComplete} onChange={toggleItemCompletion} />
      <button onClick={deleteItem}>X</button>
    </div>
  );
}

function replaceItemAtIndex(arr, index, newValue) {
  return [...arr.slice(0, index), newValue, ...arr.slice(index + 1)];
}

function removeItemAtIndex(arr, index) {
  return [...arr.slice(0, index), ...arr.slice(index + 1)];
}

function TodoListFilters(props) {
  const { store } = props;
  const [filter, setFilter] = Recoil.useRecoilState(store.get("todoListFilterState"));

  const updateFilter = ({ target: { value } }) => {
    setFilter(value);
  };

  return (
    <>
      Filter:
      <select value={filter} onChange={updateFilter}>
        <option value="Show All">All</option>
        <option value="Show Completed">Completed</option>
        <option value="Show Uncompleted">Uncompleted</option>
      </select>
    </>
  );
}

function TodoListStats(props) {
  const { store } = props;
  const {
    totalNum,
    totalCompletedNum,
    totalUncompletedNum,
    percentCompleted
  } = Recoil.useRecoilValue(todoListStatsState(store)());

  const formattedPercentCompleted = Math.round(percentCompleted);

  return (
    <ul>
      <li>Total items: {totalNum}</li>
      <li>Items completed: {totalCompletedNum}</li>
      <li>Items not completed: {totalUncompletedNum}</li>
      <li>Percent completed: {formattedPercentCompleted}</li>
    </ul>
  );
}

function TodoItems(props) {
  const { store } = props;
  // changed from todoListState to filteredTodoListState
  const todoList = Recoil.useRecoilValue(filteredTodoListState(store)());
  return (
    <div>
      {todoList.map(todoItem => (
        <TodoItem item={todoItem} key={todoItem.id} store={store} />
      ))}
    </div>
  );
}

function TodoList(props) {
  console.log(`checking the render `);
  return (
    <div>
      <TodoListStats {...props} />
      <TodoListFilters {...props} />
      <TodoItemCreator {...props} />
      <TodoItems {...props} />
    </div>
  );
}

const TodoListApp = (props: any) => {
  return <TodoList {...props} />;
};

const RecoilTodoApp = props => {
  const { store } = props;
  return (
    <AppContext.Consumer>
      {({ isSsr, ssr }) => {
        return (
          <div
            style={{
              backgroundColor: "cyan",
              padding: "10px",
              border: "solid",
              marginLeft: "15%",
              marginRight: "15%",
              marginBottom: 20
            }}
          >
            <h1>Recoil Todo App</h1>
            <TodoList {...props} />
          </div>
        );
      }}
    </AppContext.Consumer>
  );
};

export { RecoilTodoApp as Component };

export const subapp: ReactSubApp = {
  Component: RecoilTodoApp,
  wantFeatures: [
    recoilFeature({
      React,
      prepare: async initialState => {
        xarcV2.debug("Recoil subapp recoil prepare, initialState:", initialState);
        if (initialState) {
          return { initialState };
        }
        return {
          // create two sections now - one for the state and another for selectors and should not be created twice because of the duplicate issue
          initialState: {
            state: {
              todoListState: { key: "todoListState", value: [] },
              todoListFilterState: { key: "todoListFilterState", value: "Show All" }
            },
            selectors: {}
          }
        };
      }
    })
  ]
};
