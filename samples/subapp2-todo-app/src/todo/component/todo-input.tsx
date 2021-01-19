import { React, ReactSubApp } from "@xarc/react";
import { connect } from "@xarc/react-redux";
import { addTodo } from "../redux/action";

const TodoInput = (props) => {
    const [input, setInput] = React.useState("");
    const { dispatch } = props;
    return (
      <div>
        <input
          onChange={(e) => setInput(e.target.value)}
          value={input}
        />
        <button onClick={() => {if(input) dispatch(addTodo(input), setInput(''))}}>Add Todo</button>
      </div>
    );
}

export const subapp: ReactSubApp = {
  Component: connect(null, (dispatch) => ({ dispatch }))(TodoInput),
};
