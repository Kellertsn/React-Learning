export const timingEnhancer = (createStore) => (...args) => {
    const store = createStore(...args);
    const originalDispatch = store.dispatch;

    store.dispatch = (action) =>{
        const start = performance.now();
        const result = originalDispatch(action);
        const end = performance.now();

        const time = (end-start).toFixed(2);
        console.log(`[TimingEnhancer] Action '${action.type}' took ${time}`);
        return result;
    }

    return store;
}