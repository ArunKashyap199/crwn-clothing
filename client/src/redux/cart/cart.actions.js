import CartActionTypes from './cart.types';
import UserActionTypes from "../user/user.types";

export const toggleCartHidden = () => ({
    type: CartActionTypes.TOGGLE_CART_HIDDEN
});

export const addItem = (item) => ({
    type: CartActionTypes.ADD_ITEM,
    payload: item,
});

// on checkout page
export const removeItem = item => ({
    type: CartActionTypes.REMOVE_ITEM,
    payload: item
});
export const clearItemFromCart = item => ({
    type: CartActionTypes.CLEAR_ITEM_FROM_CART,
    payload: item
});

// creating action for clearing item from the cart
export const clearCart = () => ({
    type: CartActionTypes.CLEAR_CART,
});


