//Now what this does is it allows our browser to actually cache our store
// now depending on certain configuration
import { createStore, applyMiddleware } from 'redux';
import { persistStore } from 'redux-persist';
import logger from 'redux-logger';
import createSagaMiddleware from 'redux-saga';
import rootSaga from "./root-saga";

import rootReducer from './root-reducer';

const sagaMiddleware = createSagaMiddleware();

export const middlewares = [sagaMiddleware];

if (process.env.NODE_ENV === 'development') {
    middlewares.push(logger);
}

export const store = createStore(rootReducer, applyMiddleware(...middlewares));

sagaMiddleware.run(rootSaga);


/*persist store passing in our store so this persists or is essentially a persisted version of our store
and using this and our store is how we will actually create our new provider that's wrapping our application. */
export const persistor = persistStore(store);

export default { store, persistor};
