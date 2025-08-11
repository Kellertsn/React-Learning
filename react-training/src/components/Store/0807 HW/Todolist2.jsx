import React, { useMemo, useRef, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  setInput,
  addTodo,
  deleteTodo,
  startEditTodo,
  changeEditTodo,
  saveEditTodo,
  cancelEditTodo,
  toggleTodo,
  fetchTodos,
} from "./todoSlice";

const Todolist2 = () => {
  const inputRef = useRef();
  const dispatch = useDispatch();

  const input = useSelector((s) => s.input);
  const todos = useSelector((s) => s.todos);
  const status = useSelector((s) => s.status);
  const error = useSelector((s) => s.error);

  useEffect(() => {
    dispatch(fetchTodos());
  }, [dispatch]);

  {
    status === "loading" && <p>Fetching initial todos…</p>;
  }
  {
    status === "failed" && <p>Error: {error}</p>;
  }

  const pendingTodos = useMemo(
    () => todos.filter((t) => t.status === "pending"),
    [todos]
  );
  const completedTodos = useMemo(
    () => todos.filter((t) => t.status === "completed"),
    [todos]
  );

  // const handleChange = e =>
  //   dispatch({ type: 'SET_INPUT', payload: e.target.value });

  const handleChange = (e) => dispatch(setInput(e.target.value));

  const handleSubmit = () => {
    if (!input.trim()) return;
    dispatch(addTodo(input)); // pass raw input, prepare handles payload
    inputRef.current.focus();
  };

  const handleDelete = (id) => dispatch(deleteTodo(id));
  const handleEditClick = (id) => dispatch(startEditTodo(id));
  const handleEditChange = (id, text) => dispatch(changeEditTodo({ id, text }));
  const handleSave = (id) => dispatch(saveEditTodo(id));
  const handleCancel = (id) => dispatch(cancelEditTodo(id));
  const handleSwitch = (id) => dispatch(toggleTodo(id));

  return (
    <form onSubmit={(e) => e.preventDefault()}>
      <div className="todo__submit">
        <input
          ref={inputRef}
          value={input}
          onChange={handleChange}
          placeholder="What needs doing?"
        />
        <button onClick={handleSubmit}>Submit</button>
      </div>

      <div className="todo__lists">
        <section className="todo__pending-list">
          <h3>Pending</h3>
          <ul>
            {pendingTodos.map((item) => (
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
        </section>

        <section className="todo__completed-list">
          <h3>Completed</h3>
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
        </section>
      </div>
    </form>
  );
};

export default Todolist2;
