import React from 'react';

import './item.styles.scss';

import CustomButton from "../custom-button/custom-button.component";


const Item = ({item}) => {
    return (
        <div className="item">
            <div
                className="image"
                style={
                    {
                        // backgroundImage: `url(https://i.ibb.co/KV18Ysr/floral-skirt.png)`
                    }
                }
            />
            <div className="collection-footer">
                <span className="name">{item.title}</span>
                <span className="price">{item.price}</span>
            </div>
            <CustomButton>
                Add to cart
            </CustomButton>
        </div>
    )
}


export default Item;
