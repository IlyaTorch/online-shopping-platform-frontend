import React from 'react';

import './similarItems.scss';

import Item from '../item/Item';


const SimilarItems = ({mainItem, shopItems}) => (
    <div className="similar-items-container">
        <h2>YOU MIGHT ALSO LIKE</h2>
        <div className="similar-items-list">
            {
                shopItems
                    .filter((item) => item.id !== mainItem.id && item.category === mainItem.category)
                    .slice(0, 3)
                    .map((item) => <Item key={item.id} item={item}/>)
            }
        </div>
    </div>
);


export default SimilarItems;
