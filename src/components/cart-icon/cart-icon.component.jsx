import React from 'react';
import {connect} from 'react-redux';
import {createStructuredSelector} from "reselect";

import {toggleCartHidden} from "../../redux/cart/cart.actions";
import {ReactComponent as ShoppingIcon} from '../../assets/shopping-bag.svg';
import {SelectCartItemsCount} from '../../redux/cart/cart.selector';

import './cart-icon.styles.scss';



const CartIcon = ({toggleCartHidden, itemCount }) => (
    <div className='cart-icon' onClick={toggleCartHidden}>
        <ShoppingIcon className='shopping-icon'/>
        <span className='item-count'>{itemCount}</span>
    </div>
);

/* Here createStructuredSelector function hold the state and it directly pass the top level state to the object*/
/* Here SelectCartItemsCount is Selector Which is taking the action and giving the state to itemCount from selector */

const mapStateToProps = createStructuredSelector({
   itemCount : SelectCartItemsCount
});

const mapDispatchToProps = dispatch => ({
    toggleCartHidden: () => dispatch(toggleCartHidden())
});

export default connect(mapStateToProps, mapDispatchToProps)(CartIcon);