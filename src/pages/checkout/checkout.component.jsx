import React from "react";
import {connect} from 'react-redux';
import {createStructuredSelector} from "reselect";

import {SelectCartItems, SelectCartTotal} from "../../redux/cart/cart.selector";
import CheckOutItem from "../../components/checkout-item/checkout-item.component";

import './checkout.styles.scss';
import StripeCheckoutButton from "../../components/stripe-button/stripe-button.component";

const CheckOutPage = ({cartItems, total}) => (
    <div className='checkout-page'>
        <div className='checkout-header'>
            <div className='header-block'>
                <span>Product</span>
            </div>
            <div className='header-block'>
                <span>Description</span>
            </div>
            <div className='header-block'>
                <span>Price</span>
            </div>
            <div className='header-block'>
                <span>Remove</span>
            </div>
        </div>
        {
            cartItems.map(cartItem =>
                <CheckOutItem key={cartItem.id} cartItem={cartItem} />
            )
        }
        <div className='total'>TOTAL: ${total}</div>
        <div className='test-warning'>
            *Please use the following test credit card details for payment
            <br />
            4242 4242 4242 4242 - Exp: 1/23 - CVV: 123 - Brand: Visa
        </div>
        <StripeCheckoutButton price={total}/>
    </div>
)

const mapStateToProps = createStructuredSelector({
    cartItems: SelectCartItems,
    total: SelectCartTotal
})

export default connect(mapStateToProps)(CheckOutPage);
