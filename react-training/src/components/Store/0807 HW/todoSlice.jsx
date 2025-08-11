import { createSlice, createAsyncThunk, nanoid } from "@reduxjs/toolkit";

export const fetchTodos = createAsyncThunk('todos/fetchTodos', async () => {
  const res = await fetch('https://jsonplaceholder.typicode.com/todos');
  if (!res.ok) throw new Error(`Failed to fetch todos (HTTP ${res.status})`)
  const data = await res.json();
  return data.slice(0,8).map(t=> ({
    id: t.id,
    title: t.title,
    isEditing: false,
    editText: '',
    status: t.completed ? 'completed' : 'pending',
  }));
});


const initialState = {
  input: '',
  todos: [],
  status: "idle",
  error: null,
};

const todosSlice = createSlice({
    name:'todos',
    initialState,
    reducers: {
      setInput(state,action) {
        state.input =action.payload;
      },
      addTodo: {
        reducer(state,action) {
          const{id,title} = action.payload;
          state.todos.push({
            id, title,isEditing:false, editText:'',status:'pending',
          });
          state.input='';
        },
        prepare(rawTitle) {
          const Today = new Date().toISOString().split("T")[0];
          const stamped = `Added at ${Today}: ${rawTitle}`;
          return {payload: {id:nanoid(), title:stamped}};
        }
      },
      deleteTodo(state, action) {
      state.todos = state.todos.filter(t => t.id !== action.payload);
    },
    startEditTodo(state, action) {
      state.todos = state.todos.map(t =>
        t.id === action.payload ? { ...t, isEditing: true, editText: t.title } : t
      );
    },
    changeEditTodo(state, action) {
      const { id, text } = action.payload;
      state.todos = state.todos.map(t =>
        t.id === id ? { ...t, editText: text } : t
      );
    },
    saveEditTodo(state, action) {
      state.todos = state.todos.map(t =>
        t.id === action.payload ? { ...t, title: t.editText, isEditing: false, editText: '' } : t
      );
    },
    cancelEditTodo(state, action) {
      state.todos = state.todos.map(t =>
        t.id === action.payload ? { ...t, isEditing: false, editText: '' } : t
      );
    },
    toggleTodo(state, action) {
      state.todos = state.todos.map(t =>
        t.id === action.payload
          ? { ...t, status: t.status === 'pending' ? 'completed' : 'pending' }
          : t)}
    },
    extraReducers: builder => {
      builder.addCase(fetchTodos.pending, state => {state.status = 'loading'; state.error = null})
      .addCase(fetchTodos.fulfilled, (state,action) => {
        state.status = 'succeeded';
        state.error = null;
        if (state.todos.length === 0) state.todos = action.payload; //safe with stub []
      }).addCase(fetchTodos.rejected, (state,action) => {
        state.status = 'failed';
        state.error = action.error.message || 'Unknown error';
      });
    }
});

export const {
  setInput, addTodo, deleteTodo, startEditTodo,
  changeEditTodo, saveEditTodo, cancelEditTodo, toggleTodo
} = todosSlice.actions;

export default todosSlice.reducer;






