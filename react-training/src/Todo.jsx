import React, { useState } from "react";
import { useState } from "react";

const Todo = () => {
  const [Todos, setTodos] = useState([])

  function handleIncreaseTodo() {
    setTodos([
      ...Todos,
      {id:nextId, item: e.target.value}
    ])
  }

  return (
    <div>
      <form onClick={e => {
        e.preventDefault()
      }}>
        <h1>Todo</h1>
        <input type="text"></input>
        <button onClick={handleIncreaseTodo}>add</button>
        <ul>
          
        </ul>
      </form>
    </div>
  );
};

export default Todo;
