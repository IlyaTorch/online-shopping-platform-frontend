import React from "react";

import OrderForm from "../../components/order-form/OrderForm";
import {createStructuredSelector} from "reselect";
import {selectCartItems, selectCartTotal} from "../../redux/cart/cartSelectors";
import {connect} from "react-redux";


const OrderPage = ({cartItems, total}) => (
    <OrderForm items={cartItems} totalSum={total}/>
);

const mapStateToProps = createStructuredSelector({
    cartItems: selectCartItems,
    total: selectCartTotal
});


export default connect(mapStateToProps)(OrderPage);
