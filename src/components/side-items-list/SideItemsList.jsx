import React from 'react';
import {createStructuredSelector} from 'reselect';
import {connect} from 'react-redux';

import './sideItemsList.scss';

import CartItem from '../cart-item/CartItem';

import {selectCartTotal} from '../../redux/cart/cartSelectors';


const SideItemsList = ({items, total}) => (
    <div className="side-items-container">
        <div className="side-items">
            {items.map((cartItem, index) => <CartItem key={index} item={cartItem}/>)}
        </div>
        <div className="total">
            <h1>TOTAL: ${total}</h1>
        </div>
    </div>
);


const mapStateToProps = createStructuredSelector({
    total: selectCartTotal,
});

export default connect(mapStateToProps)(SideItemsList);
