//Now what this does is it allows our browser to actually cache our store now depending on certain configuration
import {applyMiddleware, createStore} from 'redux';
import { persistStore } from 'redux-persist';
import logger from 'redux-logger';

import rootReducer from './root-reducer';

export const middlewares = [logger];

export const store = createStore(rootReducer, applyMiddleware(...middlewares));

/*persist store passing in our store so this persists or is essentially a persisted version of our store
and using this and our store is how we will actually create our new provider that's wrapping our application. */
export const persistor = persistStore(store);

export default { store, persistor};
