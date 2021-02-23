import React from 'react';
import ReactDOM from 'react-dom';
import {BrowserRouter} from 'react-router-dom';
import {Provider} from 'react-redux';
/* you can actually use this with multiple different platforms to persist exists for
any platform that might leverage redux including RAC native and electron those have their own separate
files that we need to import different things for.
*/

import { PersistGate } from 'redux-persist/integration/react';
import { store, persistor } from './redux/store';

import './index.css';
import App from './App';

/* With code like this in {Provider store={store}, now we have the access to redux inside of our application
we have to build out our store, we had to configure the route to reducer so we have some kind of value
------------------------------------------------------------------------------------------------------
root-reducer is for ( configuring the route to have some kind of value)
store.js is for creating our store
*/


ReactDOM.render(
    <Provider store={store}>
        <BrowserRouter>
            <PersistGate persistor={persistor} >
                <App/>
            </PersistGate>
        </BrowserRouter>
    </Provider>,
    document.getElementById('root')
);

