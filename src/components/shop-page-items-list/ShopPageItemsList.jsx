import React from 'react';

import './shopPageItemsListStyles.scss';

import Item from '../item/Item';


const ShopPageItemsList = ({items}) => (
    <div className="items-container">
        {
            items.map((item) => <Item key={item.id} item={item}/>)
        }
    </div>
);

export default ShopPageItemsList;
