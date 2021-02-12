import React from 'react';
import {Redirect} from 'react-router';
import {createStructuredSelector} from 'reselect';
import {connect} from 'react-redux';

import './orderPage.scss';

import PaymentFailure from '../../components/payment-failure/PaymentFailure';
import OrderForm from '../../components/order-form/OrderForm';
import SideItemsList from '../../components/side-items-list/SideItemsList';

import {selectCartItems, selectCartTotal} from '../../redux/cart/cartSelectors';
import {selectPaymentErrorMessage, selectPaymentErrorStatus} from '../../redux/shop/shopSelectors';


const OrderPage = ({cartItems, total, paymentError, errorMessage}) => (
    <div>
        {!cartItems.length && <Redirect to="/" />}
        {paymentError && <PaymentFailure errorMessage={errorMessage}/>}
        <div className="order-page-container">
            <OrderForm items={cartItems} totalSum={total}/>
            <SideItemsList items={cartItems} />
        </div>
    </div>
);

const mapStateToProps = createStructuredSelector({
    cartItems: selectCartItems,
    total: selectCartTotal,
    paymentError: selectPaymentErrorStatus,
    errorMessage: selectPaymentErrorMessage,
});


export default connect(mapStateToProps)(OrderPage);
