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
    const newTodo = {
      id: uuidv4(),
      title: input,
      isEditing: false,
      editText: "",
    };
    const newTodos = [...todos, newTodo];
    setTodos(newTodos);
    setInput("");
  };

  const handleDelete = (inputId) => {
    setTodos(todos.filter((item) => item.id !== inputId));
  };

  const handleEditClick = (inputId) => {
    setTodos(
      todos.map((item) =>
        item.id === inputId ? { ...item, isEditing: true, editText: item.title } : item
      )
    );
  };

  const handleEditChange = (inputId, newText) => {
    setTodos(
      todos.map((item) =>
        item.id === inputId ? { ...item, editText: newText } : item
      )
    );
  };

  const handleSave = (inputId) => {
    setTodos(todos.map(item =>
      item.id === inputId
      ? {...item, title: item.editText, isEditing: false, editText: ""}
      : item
    ))
  }

  const handleCancel = (inputId) => {
    setTodos(todos.map(item =>
      item.id === inputId
      ? {...item, isEditing: false, editText: ""}
      : item
    ))
  }

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
              {/* <span>{item.title}</span>
              <button onClick={() => handleEdit(item.id)}>Edit</button> */}
              {item.isEditing ? (
                  <>
                    <input value={item.editText} onChange={(e) => handleEditChange(item.id, e.target.value)} />
                    <button onClick={() => handleSave(item.id)}>Save</button>
                    <button onClick={() => handleCancel(item.id)}>Cancel</button>
                  </>
                ) : (
                  <>
                    <span>{item.title}</span>
                    <button onClick={() => handleEditClick(item.id)}>Edit</button>
                  </>
                )
              }

              <button onClick={() => handleDelete(item.id)}>Delete</button>
            </li>
          ))}
        </ul>
      </div>
    </form>
  );
};

export default Todolist;
