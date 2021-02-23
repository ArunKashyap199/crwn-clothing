import React from "react";

import StripeCheckout from 'react-stripe-checkout';

const StripeCheckoutButton = ({ price }) => {
    const priceForStripe = price * 100;
    const publishableKey = 'pk_test_51INf9nFrwdu3LFWjYvwww3bLnjO0zrZBfiVYgccCpMCtforksy3MRDAs26lJjEpMyelk1hjMSBrwwuthonconnXi00piVxG6Bx';

    const onToken = token => {
        console.log('Token',token);
        alert("Payment Successful");
    }
    return (
        <StripeCheckout
            label='Pay Now'
            name='CRWN CLOTHING LMT.'
            billingAddress
            shippingAddress
            image='https://svgshare.com/i/CUz.svg'
            description={`You Total is ${price}`}
            amount={priceForStripe}
            panelLabel='Pay Now'
            token={onToken}
            stripeKey={publishableKey}
        />
    )
};

export default StripeCheckoutButton;
