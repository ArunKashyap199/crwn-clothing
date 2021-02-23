/*So what we want to write first is actually this root reducer and what the root reducer is
the actual base reducer object that represents all of the state of our application so this root reducer
will end up being the actual code that combines all of our other states together.*/
/*Now why do we want to do that.
Well if we wrote all of the code related to all the states in our application in one file you
can imagine that it becomes really unwieldy. So what we want to do is break the code up into its
individual sections*/
// Storage location of our local storagedirectoryReducer{combineReducers} from 'redux';
import {persistReducer, persistStore} from "redux-persist";
import storage from 'redux-persist/lib/storage';

import userReducer from "./user/user-reducer";
import cartReducer from "./cart/cart.reducer";
import directoryReducer from "./directory/directory.reducer";
import {combineReducers} from "redux";
import shopReducer from "./shop/shop.reducer";

/* this is pretty much just the Jason object that represents the possible configurations
that we want for redux persist to use as I mentioned.
It's just an object and we need to tell it the key.
So our key is root essentially meaning at what point inside of our reducer object do we want to start
storing everything and we want to start from the root then we want to pass storage in as storage.
So,this will say the storage key goes to whatever the storage object from redux persist we're trying
to use this.


And then finally we can pass in this whitelist property and this property is an array containing the
string names of any of the reducer that we want to store.
So here we have two user and cart.
But of course our user is being handled by firebase authentication.
So there's no reason for us to actually persist this.
Instead all we want to persist is the cart.
So we're just gonna pass in a string that says cart which lets redux persist.
That the only thing we want to white list I E the only reducer that we actually want to persist is the
cart.
*/

const persistConfig = {
    key: 'root',
    storage,
    whitelist: ['cart']
}

const rootReducer = combineReducers({
    user: userReducer,
    cart: cartReducer,
    directory: directoryReducer,
    shop : shopReducer
});

export default persistReducer(persistConfig, rootReducer);