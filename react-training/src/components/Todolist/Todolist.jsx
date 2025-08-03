import React from "react";
import { useState, useRef, useCallback, useMemo } from "react";
import { v4 as uuidv4 } from "uuid";

const Todolist = () => {
  const [input, setInput] = useState("");
  const [todos, setTodos] = useState([]);
  const pendingTodos = useMemo(
    () => todos.filter((t) => t.status === "pending"),
    [todos]
  );
  const completedTodos = useMemo(
    () => todos.filter((t) => t.status === "completed"),
    [todos]
  );
  const inputRef = useRef();

  const handleChange = useCallback((e) => {
    // console.log(e.target.value);
    setInput(e.target.value);
  }, []);

  const handleSubmit = useCallback(() => {
    if (!input.trim()) return;
    const newTodo = {
      id: uuidv4(),
      title: input,
      isEditing: false,
      editText: "",
      status: "pending",
    };
    setTodos([...todos, newTodo]);
    setInput("");
    inputRef.current.focus();
  }, [input]);

  const handleDelete = useCallback(
    (inputId) => {
      setTodos(todos.filter((item) => item.id !== inputId));
    },
    [todos]
  );

  const handleEditClick = useCallback(
    (inputId) => {
      setTodos(
        todos.map((item) =>
          item.id === inputId
            ? { ...item, isEditing: true, editText: item.title }
            : item
        )
      );
    },
    [todos]
  );

  const handleEditChange = useCallback(
    (inputId, newText) => {
      setTodos(
        todos.map((item) =>
          item.id === inputId ? { ...item, editText: newText } : item
        )
      );
    },
    [todos]
  );

  const handleSave = useCallback(
    (inputId) => {
      setTodos(
        todos.map((item) =>
          item.id === inputId
            ? { ...item, title: item.editText, isEditing: false, editText: "" }
            : item
        )
      );
    },
    [todos]
  );

  const handleCancel = useCallback(
    (inputId) => {
      setTodos(
        todos.map((item) =>
          item.id === inputId
            ? { ...item, isEditing: false, editText: "" }
            : item
        )
      );
    },
    [todos]
  );

  const handleSwitch = useCallback(
    (inputId) => {
      setTodos(
        todos.map((item) =>
          item.id === inputId
            ? {
                ...item,
                status: item.status === "pending" ? "completed" : "pending",
              }
            : item
        )
      );
    },
    [todos]
  );

  return (
    <form onSubmit={(e) => e.preventDefault()}>
      <div className="todo__submit">
        <input value={input} onChange={handleChange} ref={inputRef} />
        <button onClick={handleSubmit}>Submit</button>
      </div>
      <div className="todo__lists">
        <div className="todo__pending-list">
          <h3>Pending List</h3>
          <ul>
            {pendingTodos.map((item) => (
              <li key={item.id}>
                {/* <span>{item.title}</span>
              <button onClick={() => handleEdit(item.id)}>Edit</button> */}
                {item.isEditing ? (
                  <>
                    <input
                      value={item.editText}
                      onChange={(e) =>
                        handleEditChange(item.id, e.target.value)
                      }
                    />
                    <button onClick={() => handleSave(item.id)}>Save</button>
                    <button onClick={() => handleCancel(item.id)}>
                      Cancel
                    </button>
                  </>
                ) : (
                  <>
                    <span>{item.title}</span>
                    <button onClick={() => handleEditClick(item.id)}>
                      Edit
                    </button>
                  </>
                )}
                <button onClick={() => handleDelete(item.id)}>Delete</button>
                <button onClick={() => handleSwitch(item.id)}>Switch</button>
              </li>
            ))}
          </ul>
        </div>

        <div className="todo__completed-list">
          <h3>Completed List</h3>
          <ul>
            {completedTodos.map((item) => (
              <li key={item.id}>
                {item.isEditing ? (
                  <>
                    <input
                      value={item.editText}
                      onChange={(e) =>
                        handleEditChange(item.id, e.target.value)
                      }
                    />
                    <button onClick={() => handleSave(item.id)}>Save</button>
                    <button onClick={() => handleCancel(item.id)}>
                      Cancel
                    </button>
                  </>
                ) : (
                  <>
                    <span>{item.title}</span>
                    <button onClick={() => handleEditClick(item.id)}>
                      Edit
                    </button>
                  </>
                )}

                <button onClick={() => handleDelete(item.id)}>Delete</button>
                <button onClick={() => handleSwitch(item.id)}>Switch</button>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </form>
  );
};

export default Todolist;
