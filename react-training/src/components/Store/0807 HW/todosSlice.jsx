import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

export const fetchTodos = createAsyncThunk(
  'todos/fetchTodos',
  async () => {
    const res = await fetch('https://jsonplaceholder.typicode.com/todos');
    const data = await res.json();
    return data.slice(0, 10); // limit for demo
  }
);

const initialState = {
  input: '',
  todos: [],
  status: 'idle',
  error: null,
};

const todosSlice = createSlice({
  name: 'todos',
  initialState,
  reducers: {
    setInput: (state, action) => {
      state.input = action.payload;
    },
    addTodo: (state) => {
      if (!state.input.trim()) return;
      const today = new Date().toISOString().split("T")[0];
      state.todos.push({
        id: crypto.randomUUID(),
        title: `Added at ${today}: ${state.input}`,
        isEditing: false,
        editText: '',
        status: 'pending',
      });
      state.input = '';
    },
    deleteTodo: (state, action) => {
      state.todos = state.todos.filter(todo => todo.id !== action.payload);
    },
    startEditTodo: (state, action) => {
      const todo = state.todos.find(t => t.id === action.payload);
      if (todo) {
        todo.isEditing = true;
        todo.editText = todo.title;
      }
    },
    changeEditTodo: (state, action) => {
      const { id, text } = action.payload;
      const todo = state.todos.find(t => t.id === id);
      if (todo) {
        todo.editText = text;
      }
    },
    saveEditTodo: (state, action) => {
      const todo = state.todos.find(t => t.id === action.payload);
      if (todo) {
        todo.title = todo.editText;
        todo.editText = '';
        todo.isEditing = false;
      }
    },
    cancelEditTodo: (state, action) => {
      const todo = state.todos.find(t => t.id === action.payload);
      if (todo) {
        todo.editText = '';
        todo.isEditing = false;
      }
    },
    toggleTodo: (state, action) => {
      const todo = state.todos.find(t => t.id === action.payload);
      if (todo) {
        todo.status = todo.status === 'pending' ? 'completed' : 'pending';
      }
    },
  },
  extraReducers: builder => {
    builder
      .addCase(fetchTodos.pending, (state) => {
        state.status = 'loading';
        state.error = null;
      })
      .addCase(fetchTodos.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.todos = action.payload.map(todo => ({
          ...todo,
          isEditing: false,
          editText: '',
          status: todo.completed ? 'completed' : 'pending'
        }));
      })
      .addCase(fetchTodos.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      });
  }
});

export const {
  setInput, addTodo, deleteTodo, startEditTodo,
  changeEditTodo, saveEditTodo, cancelEditTodo, toggleTodo
} = todosSlice.actions;

export default todosSlice.reducer;
