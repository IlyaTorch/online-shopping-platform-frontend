import React from 'react';

import './itemsListStyles.scss';

import Item from '../item/Item';


class ItemsList extends React.Component {
    render() {
        return (
            <div className="items-container">
                {
                    this.props.items.map((item) => <Item key={item.id} item={item}/>)
                }
            </div>
        );
    }
}


export default ItemsList;
