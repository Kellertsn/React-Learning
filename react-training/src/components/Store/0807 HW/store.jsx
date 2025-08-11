import { configureStore } from '@reduxjs/toolkit';
import todosReducer from './todoSlice';
import {timingEnhancer} from './enhancer';

export const store = configureStore({
  reducer: todosReducer,
  enhancers: (getDefaultEnhancers) =>
    getDefaultEnhancers().concat(timingEnhancer),
});