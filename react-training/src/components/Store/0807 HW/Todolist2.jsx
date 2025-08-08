import React, { useEffect, useMemo, useRef } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import {
  setInput, addTodo, deleteTodo, startEditTodo, changeEditTodo,
  saveEditTodo, cancelEditTodo, toggleTodo, fetchTodos
} from './todosSlice';

const Todolist2 = () => {
  const inputRef = useRef();
  const dispatch = useDispatch();

  const { input, todos, status, error } = useSelector(state => state.todos);

  useEffect(() => {
    dispatch(fetchTodos());
  }, [dispatch]);

  const pendingTodos = useMemo(() => todos.filter(t => t.status === 'pending'), [todos]);
  const completedTodos = useMemo(() => todos.filter(t => t.status === 'completed'), [todos]);

  const handleChange = e => dispatch(setInput(e.target.value));
  const handleSubmit = () => {
    dispatch(addTodo());
    inputRef.current.focus();
  };

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

      {status === 'loading' && <p>Loading...</p>}
      {status === 'failed' && <p style={{ color: 'red' }}>Error: {error}</p>}

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
                      onChange={e => dispatch(changeEditTodo({ id: item.id, text: e.target.value }))}
                    />
                    <button onClick={() => dispatch(saveEditTodo(item.id))}>Save</button>
                    <button onClick={() => dispatch(cancelEditTodo(item.id))}>Cancel</button>
                  </>
                ) : (
                  <>
                    <span>{item.title}</span>
                    <button onClick={() => dispatch(startEditTodo(item.id))}>Edit</button>
                  </>
                )}
                <button onClick={() => dispatch(deleteTodo(item.id))}>Delete</button>
                <button onClick={() => dispatch(toggleTodo(item.id))}>Switch</button>
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
                      onChange={e => dispatch(changeEditTodo({ id: item.id, text: e.target.value }))}
                    />
                    <button onClick={() => dispatch(saveEditTodo(item.id))}>Save</button>
                    <button onClick={() => dispatch(cancelEditTodo(item.id))}>Cancel</button>
                  </>
                ) : (
                  <>
                    <span>{item.title}</span>
                    <button onClick={() => dispatch(startEditTodo(item.id))}>Edit</button>
                  </>
                )}
                <button onClick={() => dispatch(deleteTodo(item.id))}>Delete</button>
                <button onClick={() => dispatch(toggleTodo(item.id))}>Switch</button>
              </li>
            ))}
          </ul>
        </section>
      </div>
    </form>
  );
};

export default Todolist2;
