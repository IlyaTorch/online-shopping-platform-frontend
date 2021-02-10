import React from 'react';
import {connect} from 'react-redux';

import './itemBodyStyles.scss';

import ImageSlider from '../image-slider/ImageSlider';
import CustomButton from '../custom-button/CustomButton';

import {addItem} from '../../redux/cart/cartActions';


class ItemBody extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            color: this.props.item.colors[0],
            size: this.props.item.sizes[0],
        };
    }

    handleSubmit(event) {
        event.preventDefault();

        this.props.addItem({...this.props.item, size: this.state.size, color: this.state.color});
    }

    changeSize(event) {
        this.setState({size: event.target.value});
    }
    changeColor(event) {
        this.setState({color: event.target.value});
    }

    render() {
        const {item} = this.props;

        return (
            <div className="item-container">
                {
                    <div className="item-images">
                        <ImageSlider images={item.images}/>
                    </div>
                }
                <form className="item-info" onSubmit={this.handleSubmit}>
                    <h1 className="item-title">{item.title}</h1>
                    <p className="option"><b>CATEGORY: </b>{item.category}</p>
                    <p className="option">
                        <b>SIZE: </b>
                        <select name="size" onChange={this.changeSize}>
                            {
                                item.sizes.map((size, index) =>
                                    <option key={index} value={size}>{size}</option>,
                                )
                            }
                        </select>

                    </p>
                    <p className="option">
                        <b>COLOR: </b>
                        <select name="color" onChange={this.changeColor}>
                            {
                                item.colors.map(
                                    (color, index) => <option key={index} value={color}>{color}</option>,
                                )
                            }
                        </select>
                    </p>
                    <p className="option"><b>PRICE: </b>{item.price}$</p>
                    <p className="option">
                        <b>REST: </b>{item.total_quantity - item.purchased_quantity}
                    </p>
                    {
                        item.limit_offer_period ?
                            <p className="option special-offer"><b>END OF SPECIAL OFFER: </b>
                                {
                                    item.limit_offer_period.slice(0, 10)
                                }
                            </p> :
                            null
                    }

                    <p className="option"><b>DESCRIPTION: </b><br/>{item.description}</p>
                    <CustomButton type="submit">ADD TO CART</CustomButton>
                </form>
            </div>
        );
    }
}

const mapDispatchToProps = (dispatch) => ({
    addItem: (item) => dispatch(addItem(item)),
});


export default connect(null, mapDispatchToProps)(ItemBody);
