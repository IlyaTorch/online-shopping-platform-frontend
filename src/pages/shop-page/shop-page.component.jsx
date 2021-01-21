import React from 'react';

import './shop-page.styles.scss';

import Item from "../../components/item/item.component";


class ShopPage extends React.Component {
    constructor(props) {
        super(props);
        this.shopId = this.props.match.params.id;

        this.state = {
            shop: {},
            shopItems: []
        };

        fetch(`http://127.0.0.1:8000/api/shops/${this.shopId}`)
            .then(response => response.json())
            .then(shop => this.setState({shop: shop}));

        fetch(`http://127.0.0.1:8000/api/shops/${this.shopId}/items/?format=json`)
            .then(response => response.json())
            .then(items => this.setState({shopItems: items}));
    }

    render() {
        return (
            <div
                className="shop-page-container"
                style={
                    {backgroundImage: `url(${this.state.shop.background_image})`}
                }
            >
                <h1 className="shop-title">{this.state.shop.title}</h1>
                {
                    this.state.shopItems.map(item => <Item key={item.id} item={item}/>)
                }
            </div>
        )
    }

}


export default ShopPage;
