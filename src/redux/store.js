import { createStore, compose, applyMiddleware } from 'redux'; 
import logger from 'redux-logger';
import { persistStore } from 'redux-persist';

import rootReducer from './root-reducer';

const middlewares = [logger]; 
// solution for composing enhancers from https://stackoverflow.com/a/63390909/1036945
const composeEnhancers = (typeof window !== 'undefined' && window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__) || compose;

export const store = createStore(rootReducer, composeEnhancers(
                applyMiddleware(...middlewares))); 
export const persistor = persistStore(store); // is a persisted version of the store

export default {store, persistor}; 