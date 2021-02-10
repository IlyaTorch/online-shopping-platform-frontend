import React from 'react';

import './cartItem.scss';


const CartItem = ({item}) => (
    <div className="cart-item">
        <img src={item.images[0]} alt="item"/>
        <div className="item-details">
            <span className="title">
                {item.title}
            </span>
            <span className="option">
                SIZE: {item.size}
            </span>
            <span className="option">
                COLOR: {item.color}
            </span>
            <span className="option">
                {item.quantity} x ${item.price}
            </span>
        </div>
    </div>
);


export default CartItem;
