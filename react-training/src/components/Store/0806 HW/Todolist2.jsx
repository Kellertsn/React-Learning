import React, { useMemo, useRef } from 'react';
import {useSelector, useDispatch} from 'react-redux'

const Todolist2 = () => {
  const inputRef = useRef();
  const dispatch = useDispatch();

  const input = useSelector(state => state.input);
  const todos = useSelector(state => state.todos);


  const pendingTodos = useMemo(
    () => todos.filter(t => t.status === 'pending'),
    [todos]
  );
  const completedTodos = useMemo(
    () => todos.filter(t => t.status === 'completed'),
    [todos]
  );

  const handleChange = e =>
    dispatch({ type: 'SET_INPUT', payload: e.target.value });

  const handleSubmit = () => {
    dispatch({ type: 'ADD_TODO' });
    inputRef.current.focus();
  };

  const handleDelete = id =>
    dispatch({ type: 'DELETE_TODO', payload: id });

  const handleEditClick = id =>
    dispatch({ type: 'START_EDIT_TODO', payload: id });

  const handleEditChange = (id, text) =>
    dispatch({ type: 'CHANGE_EDIT_TODO', payload: { id, text } });

  const handleSave = id =>
    dispatch({ type: 'SAVE_EDIT_TODO', payload: id });

  const handleCancel = id =>
    dispatch({ type: 'CANCEL_EDIT_TODO', payload: id });

  const handleSwitch = id =>
    dispatch({ type: 'TOGGLE_TODO', payload: id });

  return (
    <form onSubmit={e => e.preventDefault()}>
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
            {pendingTodos.map(item => (
              <li key={item.id}>
                {item.isEditing ? (
                  <>
                    <input
                      value={item.editText}
                      onChange={e =>
                        handleEditChange(item.id, e.target.value)
                      }
                    />
                    <button onClick={() => handleSave(item.id)}>
                      Save
                    </button>
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
                <button onClick={() => handleDelete(item.id)}>
                  Delete
                </button>
                <button onClick={() => handleSwitch(item.id)}>
                  Switch
                </button>
              </li>
            ))}
          </ul>
        </section>

        <section className="todo__completed-list">
          <h3>Completed</h3>
          <ul>
            {completedTodos.map(item => (
              <li key={item.id}>
                {item.isEditing ? (
                  <>
                    <input
                      value={item.editText}
                      onChange={e =>
                        handleEditChange(item.id, e.target.value)
                      }
                    />
                    <button onClick={() => handleSave(item.id)}>
                      Save
                    </button>
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
                <button onClick={() => handleDelete(item.id)}>
                  Delete
                </button>
                <button onClick={() => handleSwitch(item.id)}>
                  Switch
                </button>
              </li>
            ))}
          </ul>
        </section>
      </div>
    </form>
  );
};

export default Todolist2;

/*
import React, { useRef, useMemo } from 'react';
import { useSelector, useDispatch } from 'react-redux';

const Todolist2 = () => {
  const inputRef = useRef();
  const dispatch = useDispatch();

  const input = useSelector(state => state.input);
  const todos = useSelector(state => state.todos);

  const pendingTodos = useMemo(() => todos.filter(t => t.status === 'pending'), [todos]);
  const completedTodos = useMemo(() => todos.filter(t => t.status === 'completed'), [todos]);

  const handleChange = (e) => {
    dispatch({ type: 'SET_INPUT', payload: e.target.value });
  };

  const handleSubmit = () => {
    dispatch({ type: 'ADD_TODO' });
    inputRef.current.focus();
  };

  const handleDelete = (id) => dispatch({ type: 'DELETE_TODO', payload: id });

  const handleEditClick = (id) => dispatch({ type: 'START_EDIT_TODO', payload: id });

  const handleEditChange = (id, text) =>
    dispatch({ type: 'CHANGE_EDIT_TODO', payload: { id, text } });

  const handleSave = (id) => dispatch({ type: 'SAVE_EDIT_TODO', payload: id });

  const handleCancel = (id) => dispatch({ type: 'CANCEL_EDIT_TODO', payload: id });

  const handleSwitch = (id) => dispatch({ type: 'TOGGLE_TODO', payload: id });

  return (
    <form onSubmit={e => e.preventDefault()}>
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
            {pendingTodos.map(item => (
              <li key={item.id}>
                {item.isEditing ? (
                  <>
                    <input
                      value={item.editText}
                      onChange={e => handleEditChange(item.id, e.target.value)}
                    />
                    <button onClick={() => handleSave(item.id)}>Save</button>
                    <button onClick={() => handleCancel(item.id)}>Cancel</button>
                  </>
                ) : (
                  <>
                    <span>{item.title}</span>
                    <button onClick={() => handleEditClick(item.id)}>Edit</button>
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
            {completedTodos.map(item => (
              <li key={item.id}>
                {item.isEditing ? (
                  <>
                    <input
                      value={item.editText}
                      onChange={e => handleEditChange(item.id, e.target.value)}
                    />
                    <button onClick={() => handleSave(item.id)}>Save</button>
                    <button onClick={() => handleCancel(item.id)}>Cancel</button>
                  </>
                ) : (
                  <>
                    <span>{item.title}</span>
                    <button onClick={() => handleEditClick(item.id)}>Edit</button>
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

*/