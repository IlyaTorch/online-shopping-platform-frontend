import React from 'react';

import './item.scss';


const Item = ({item}) => {
    return (
        <div className="item">
            <div className="image">
                <img src={item.images[0]} alt={item.title}/>
            </div>
            <div className="item-footer">
                <span className="title">{item.title}</span>
                <span className="price">{item.price}$</span>
            </div>
        </div>
    )
}


export default Item;
