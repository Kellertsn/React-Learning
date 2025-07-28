import React from "react";
import { useState } from "react";
import { v4 as uuidv4 } from "uuid";

const Todolist = () => {
  const [input, setInput] = useState("");
  const [todos, setTodos] = useState([]);

  const handleChange = (e) => {
    // console.log(e.target.value);
    setInput(e.target.value);
  };
  const handleAdd = () => {
    const newTodo = { id: uuidv4(), title: input, isEditing: false, editText: "" };
    const newTodos = [...todos, newTodo];
    setTodos(newTodos);
    setInput("");
  };

  const handleDelete = (inputId) => {
    setTodos(todos.filter((item) => item.id !== inputId));
  };

  const handleEdit = (inputId, isEdit = false) => {
    setTodos(
      todos.map((item) => {
        if (isEdit) {
          if (item.id === input.id) {
            return <li>S</li>;
          }
        }
      })
    );
  };
  return (
    <form onSubmit={(e) => e.preventDefault()}>
      <div>
        <input value={input} onChange={handleChange} />
        <button onClick={handleAdd}>Add</button>
      </div>
      <div>
        <ul>
          {todos.map((item) => (
            <li key={item.id}>
              <span>{item.title}</span>
              <button onClick={() => handleEdit(item.id)}>Edit</button>
              <button onClick={() => handleDelete(item.id)}>Delete</button>
            </li>
          ))}
        </ul>
      </div>
    </form>
  );
};

export default Todolist;
