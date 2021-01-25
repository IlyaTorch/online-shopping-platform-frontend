import React from "react";

import './itemBodyStyles.scss';

import ImageSlider from "../image-slider/ImageSlider";
import CustomButton from "../custom-button/CustomButton";


const ItemBody = ({item}) => (
    <div className="item-container">
        {
            <div className="item-images">
                <ImageSlider images={item.images}/>
            </div>
        }
        <div className="item-info">
            <h1 className="item-title">{item.title}</h1>
            <p className="option"><b>CATEGORY: </b>{item.category}</p>
            <p className="option">
                <b>SIZE: </b>
                <select name="size">
                    {
                        item.sizes.map((size, index) =>
                            <option key={index} value={size}>{size}</option>
                        )
                    }
                </select>

            </p>
            <p className="option">
                <b>COLOR: </b>
                <select name="color">
                    {
                        item.colors.map((color, index) => <option key={index} value={color}>{color}</option>)
                    }
                </select>
            </p>
            <p className="option"><b>PRICE: </b>{item.price}$</p>
            <p className="option">
                <b>REST: </b>{item.total_quantity - item.purchased_quantity}
            </p>
            {
                item.limit_offer_period
                    ? <p className="option special-offer"><b>END OF SPECIAL OFFER: </b>
                        {
                            item.limit_offer_period.slice(0, 10)
                        }
                    </p>
                    : null
            }

            <p className="option"><b>DESCRIPTION: </b><br/>{item.description}</p>
            <CustomButton>ADD TO CART</CustomButton>
        </div>
    </div>
);


export default ItemBody;
