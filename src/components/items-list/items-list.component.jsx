import React from 'react';

import './items-list.component.scss';

import Item from "../item/item.component";


const ItemsList = ({shopItems}) => {
    return (
    <div className="items-list">
        {
            shopItems.map(item => <Item key={item.id} item={item}/>)
        }
    </div>
)};

export default ItemsList;