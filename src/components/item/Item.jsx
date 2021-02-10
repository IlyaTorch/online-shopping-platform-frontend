import React from 'react';
import {useHistory} from 'react-router-dom';
import './item.scss';


const Item = ({item}) => {
    const history = useHistory();
    const openItemPage = (shopId, itemId) => history.push(`/shops/${shopId}/${itemId}`);
    const goToItemPageOnClick = () => openItemPage(item.shop_id, item.id);

    return (
        <div className="item">
            <div className="image" onClick={goToItemPageOnClick}>
                <img src={item.images[0]} alt={item.title}/>
            </div>
            <div className="item-footer">
                <span className="title">{item.title}</span>
                <span className="price">{item.price}$</span>
            </div>
        </div>
    );
};


export default Item;
