import React from 'react';
import {Link} from 'react-router-dom';

import './shop.scss';

import CustomButton from '../custom-button/CustomButton';


const Shop = ({shop}) => (
    <div className="shop">
        <span className="shop-title">{shop.title}</span>
        <Link to={'shops/' + shop.id}> <CustomButton>OPEN SHOP PAGE</CustomButton> </Link>
    </div>
);


export default Shop;
