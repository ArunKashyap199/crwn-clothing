import React from 'react';
import {connect} from 'react-redux';
import {createStructuredSelector} from "reselect";
import {withRouter} from 'react-router-dom';

import CustomButton from "../custom-button/custom-button.component";
import CartItem from "../cart-item/cart-item.component";
import { toggleCartHidden } from "../../redux/cart/cart.actions";

import {SelectCartItems} from '../../redux/cart/cart.selector';
import './cart-dropdown.styles.scss';

const CartDropDown = ({cartItems, history, dispatch}) => (
    <div className='cart-dropdown'>
        <div className='cart-items'>
            {cartItems.length ? (
                cartItems.map(cartItem => (
                    <CartItem key={cartItem.id} item={cartItem}/>
                ))
            ) : (
                <span className='empty-message'>Your Cart Is Empty</span>
            )}
        </div>
        <CustomButton onClick={() => {
            {
                history.push('/checkout');
                dispatch(toggleCartHidden());
            }
        }}> Go TO CHECKOUT </CustomButton>
    </div>
)

/* Here createStructuredSelector function hold the state and it directly pass the top level state to the object*/
/* Here SelectCartItems is Selector Which is taking the action and giving the state to cartItems from selector */

const mapStateToProps = createStructuredSelector({
    cartItems: SelectCartItems
});

export default withRouter(connect(mapStateToProps)(CartDropDown));