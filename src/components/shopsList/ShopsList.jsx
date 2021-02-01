import React from "react";

import './shopsListStyles.scss';

import Shop from "../shop/Shop";


const ShopsList = ({shops}) => (
    <div className="shops-container">
        {
            shops.map(shop => <Shop key={shop.id} shop={shop}/>)
        }
    </div>
);

export default ShopsList;
