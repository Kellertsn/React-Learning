export const addTodoTitleMiddleware = (store) => (next) => (action) => {
  if (action.type === "ADD_TODO") {
    const input = store.getState().input;
    const today = new Date().toISOString().split("T")[0];
    const formattedTitle = `Added at ${today}: ${input}`;

    const newAction = {
      ...action,
      payload: { title: formattedTitle },
    };

    return next(newAction);
  }

  return next(action);
};