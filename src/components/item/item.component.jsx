import React from 'react';

import './item.styles.scss';

import CustomButton from "../custom-button/custom-button.component";


const Item = ({item}) => {
    return (
        <div className="item">
            <div className="image-container">
                <img src={item.images[0]} alt="item"/>
            </div>

            <span className="name">{item.title}</span>
            <span className="price">{item.price}$</span>
            <CustomButton>Add To Cart</CustomButton>

        </div>
    )
}


export default Item;
