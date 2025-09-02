import React, { createContext, useReducer, useContext } from 'react';
import { v4 as uuidv4 } from 'uuid';

const TodoContext = createContext();

const initialState = {
  input: '',
  todos: []
};

function todoReducer(state, action) {
  switch (action.type) {
    case 'SET_INPUT':
      return { ...state, input: action.payload };

    case 'ADD_TODO':
      if (!state.input.trim()) return state;
      const newTodo = {
        id: uuidv4(),
        title: state.input.trim(),
        isEditing: false,
        editText: '',
        status: 'pending'
      };
      return {
        ...state,
        todos: [...state.todos, newTodo],
        input: ''
      };

    case 'DELETE_TODO':
      return {
        ...state,
        todos: state.todos.filter(t => t.id !== action.payload)
      };

    case 'START_EDIT_TODO':
      return {
        ...state,
        todos: state.todos.map(t =>
          t.id === action.payload
            ? { ...t, isEditing: true, editText: t.title }
            : t
        )
      };

    case 'CHANGE_EDIT_TODO':
      return {
        ...state,
        todos: state.todos.map(t =>
          t.id === action.payload.id
            ? { ...t, editText: action.payload.text }
            : t
        )
      };

    case 'SAVE_EDIT_TODO':
      return {
        ...state,
        todos: state.todos.map(t =>
          t.id === action.payload
            ? { ...t, title: t.editText, isEditing: false, editText: '' }
            : t
        )
      };

    case 'CANCEL_EDIT_TODO':
      return {
        ...state,
        todos: state.todos.map(t =>
          t.id === action.payload
            ? { ...t, isEditing: false, editText: '' }
            : t
        )
      };

    case 'TOGGLE_TODO':
      return {
        ...state,
        todos: state.todos.map(t =>
          t.id === action.payload
            ? {
                ...t,
                status: t.status === 'pending' ? 'completed' : 'pending'
              }
            : t
        )
      };

    default:
      return state;
  }
}

export function TodoProvider({ children }) {
  const [state, dispatch] = useReducer(todoReducer, initialState);
  return (
    <TodoContext.Provider value={{ state, dispatch }}>
      {children}
    </TodoContext.Provider>
  );
}

export function useTodoContext() {
  const context = useContext(TodoContext);
  if (!context) {
    throw new Error('useTodoContext must be used within a TodoProvider');
  }
  return context;
}