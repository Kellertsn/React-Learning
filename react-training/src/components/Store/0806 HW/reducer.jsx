import { v4 as uuidv4 } from "uuid";

const initialState = { input: "", todos: [] };

export const todoReducer = (state = initialState, action) => {
  switch (action.type) {
    case "SET_INPUT":
      return { ...state, input: action.payload };

    case "ADD_TODO":
      if (!state.input.trim()) return state;
      const newTodo = {
        id: uuidv4(),
        title: action.payload.title,
        isEditing: false,
        editText: "",
        status: "pending",
      };
      return { ...state, todos: [...state.todos, newTodo], input: "" };

    case "DELETE_TODO":
      return {
        ...state,
        todos: state.todos.filter((item) => item.id !== action.payload),
      };
    case "START_EDIT_TODO":
      return {
        ...state,
        todos: state.todos.map((t) =>
          t.id === action.payload
            ? { ...t, isEditing: true, editText: t.title }
            : t
        ),
      };
    case "CHANGE_EDIT_TODO":
      const {id,text} = action.payload
      return {
        ...state,
        todos: state.todos.map((t) =>
          t.id === id ? { ...t, editText: text } : t
        ),
      };
    case "SAVE_EDIT_TODO":
      return {
        ...state,
        todos: state.todos.map((t) =>
          t.id === action.payload
            ? { ...t, title: t.editText, isEditing: false, editText: "" }
            : t
        ),
      };
    case "CANCEL_EDIT_TODO":
      return {
        ...state,
        todos: state.todos.map((t) =>
          t.id === action.payload
            ? { ...t, isEditing: false, editText: "" }
            : t
        ),
      };
    case "TOGGLE_TODO":
      return {
        ...state,
        todos: state.todos.map((t) =>
          t.id === action.payload
            ? { ...t, status: t.status === "pending" ? "completed" :  "pending" }
            : t
        ),
      };
    
    default:
      return state;
  }
};

