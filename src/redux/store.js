import { createStore, compose, applyMiddleware } from 'redux'; 
import logger from 'redux-logger';

import rootReducer from './root-reducer';

const middlewares = [logger]; 
// solution for composing enhancers from https://stackoverflow.com/a/63390909/1036945
const composeEnhancers = (typeof window !== 'undefined' && window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__) || compose;

const store = createStore(rootReducer, composeEnhancers(
                applyMiddleware(...middlewares))); 

export default store; 