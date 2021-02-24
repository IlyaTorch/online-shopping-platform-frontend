import React from 'react';

import './homepage.scss';

import ItemsList from '../../components/items-list/ItemsList';

import {API_URL} from '../../url-data/urlData';


const HomePage = () => (
    <div className="homepage-container">
        <h1>ITEMS</h1>
        <ItemsList url={API_URL} />
    </div>
);


export default HomePage;
