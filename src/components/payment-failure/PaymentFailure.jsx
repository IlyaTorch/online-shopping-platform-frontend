import React from 'react';

import './paymentFailure.scss';


const PaymentFailure = ({errorMessage}) => (
    <div className="payment-failure">
        <h1>Opps! Something went wrong</h1>
        <span>{errorMessage}</span>
    </div>
);


export default PaymentFailure;
