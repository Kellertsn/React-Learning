import { createStore, applyMiddleware, compose } from 'redux';
import {todoReducer} from './reducer.jsx'; 
import { addTodoTitleMiddleware } from './middleware'; 
import { timingEnhancer } from './enhancer';


const middlewareEnhancer = applyMiddleware(addTodoTitleMiddleware);


const composedEnhancer = compose(
  middlewareEnhancer,
  timingEnhancer
);


export const store = createStore(todoReducer, composedEnhancer);




