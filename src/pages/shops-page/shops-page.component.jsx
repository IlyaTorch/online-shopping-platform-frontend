import React from 'react';

import './shops-page.styles.scss';

import CustomButton from "../../components/custom-button/custom-button.component";


class ShopsPage extends React.Component {
    constructor() {
        super();

        this.state = {
            shops: []
        };

    }

    componentDidMount() {
        fetch("http://127.0.0.1:8000/api/shops/?format=json")
            .then(response => response.json())
            .then(shops => this.setState({shops: shops}));
    }

    render() {
        return (
            <div className="shops-container">
                {
                    this.state.shops.map(shop => (
                        <div
                            key={shop.id}
                            className="shop"
                            style={
                                {backgroundImage: `url(${shop.background_image})`}
                            }
                        >
                            <span className="shop-title">{shop.title}</span>
                            <CustomButton>OPEN SHOP PAGE</CustomButton>
                        </div>
                    ))
                }
            </div>
        )
    }
}


export default ShopsPage;
