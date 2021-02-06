import React from "react";
import {createStructuredSelector} from "reselect";
import {connect} from "react-redux";

import OrderForm from "../../components/order-form/OrderForm";
import PaymentFailure from "../../components/payment-failure/PaymentFailure";

import {selectCartItems, selectCartTotal} from "../../redux/cart/cartSelectors";
import {selectPaymentErrorStatus} from "../../redux/shop/shopSelectors";


const OrderPage = ({cartItems, total, paymentError}) => (
    <div>
        {paymentError && <PaymentFailure />}
        <OrderForm items={cartItems} totalSum={total}/>
    </div>
);

const mapStateToProps = createStructuredSelector({
    cartItems: selectCartItems,
    total: selectCartTotal,
    paymentError: selectPaymentErrorStatus
});


export default connect(mapStateToProps)(OrderPage);
