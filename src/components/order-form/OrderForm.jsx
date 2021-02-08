import React from 'react';
import {connect} from "react-redux";
import {Col, Form} from "react-bootstrap";

import './orderForm.scss';

import {PAYMENT_URL} from "../../url-data/urlData";

import CustomButton from "../custom-button/CustomButton";

import {setPaymentError} from "../../redux/shop/shopActions";


const OrderForm = ({items, totalSum, setPaymentError}) => {
    const initialFormData = Object.freeze({
        email: "",
        city: "",
        province: "",
        streetAddress: "",
        postalCode: "",

        name: "",

        ccNumber: "",
        ccExpiry: "",
        ccCode: "",

        saveUserData: false
    });

    const [formData, updateFormData] = React.useState(initialFormData);

    const handleChange = (event) => {
        updateFormData({
            ...formData,
            [event.target.name]: event.target.value.trim()
        });
    };

    const [validated, setValidated] = React.useState(false);

    const pushOrder = order => fetch(PAYMENT_URL, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json;charset=utf-8'
            },
            body: JSON.stringify(order)
        })
        .then(response => response.status === 201
            ? window.location.href='success-payment'
            : response.json())
        .then(({error}) => setPaymentError(error));

    const isCardNumberCorrect = cardNumber => cardNumber.length === 16;
    const isCardExpiryCorrect = expiry => Date.parse(expiry) > Date.now();
    const isSecurityCodeCorrect = code => code.length === 3;

    const validateCardData = ({ccNumber, ccExpiry, ccCode}) => {
        return isCardNumberCorrect(ccNumber) &&
               isCardExpiryCorrect(ccExpiry) &&
               isSecurityCodeCorrect(ccCode);
    };

    const handleSubmit = (event) => {
        const form = event.currentTarget;
        if (form.checkValidity() === false) {
            event.preventDefault();
            event.stopPropagation();
        } else {
            event.preventDefault();

            const order = {
                items: items,
                customer: {
                    email: formData.email,
                    name: formData.name,
                    city: formData.city,
                    province: formData.province,
                    postalCode: formData.postalCode,
                    streetAddress: formData.streetAddress
                },
                card: {
                    ccNumber: formData.ccNumber,
                    ccExpiry: formData.ccExpiry,
                    ccCode: formData.ccCode
                },
                totalSum: totalSum,
                saveUserData: formData.saveUserData
            };
            if (validateCardData(order.card)) {
                pushOrder(order);
            }
            else {
                setPaymentError("Incorrect card data!");
            }
        }

        setValidated(true);
        };

    return (
        <div className="order-form">
            <Form validated={validated} onSubmit={handleSubmit}>
                <Form.Group>
                    <Form.Label>Contact Info</Form.Label>
                    <Form.Control
                        required
                        type="email"
                        placeholder="Email Address"
                        name="email"
                        onChange={handleChange}
                    />
                </Form.Group>

                <Form.Group>
                    <Form.Label>Shipping info</Form.Label>
                    <Form.Control
                        required
                        type="text"
                        placeholder="Full Name"
                        name="name"
                        onChange={handleChange}
                    />
                </Form.Group>

                <Form.Group>
                    <Form.Control
                        type="text"
                        placeholder="Street address"
                        required
                        name="streetAddress"
                        onChange={handleChange}
                    />
                </Form.Group>
                <Form.Group>
                    <Form.Row>
                        <Col>
                            <Form.Control
                                type="text"
                                placeholder="City"
                                required
                                name="city"
                                onChange={handleChange}
                            />
                        </Col>
                        <Col>
                            <Form.Control
                                type="text"
                                placeholder="Province"
                                required
                                name="province"
                                onChange={handleChange}
                            />
                        </Col>
                    </Form.Row>
                </Form.Group>
                <Form.Group>
                    <Form.Row>
                        <Col>
                            <Form.Control
                                type="text"
                                placeholder="Postal code"
                                required
                                name="postalCode"
                                onChange={handleChange}
                            />
                        </Col>
                        <Col></Col>
                    </Form.Row>
                </Form.Group>

                <Form.Group>
                    <Form.Label>Payment info</Form.Label>
                    <Form.Row>
                        <Col>
                            <Form.Control
                                type="text"
                                placeholder="Card Number"
                                required
                                name="ccNumber"
                                onChange={handleChange}
                            />
                        </Col>
                        <Col>
                            <Form.Control
                                type="date"
                                placeholder="Expiration Date"
                                required
                                name="ccExpiry"
                                onChange={handleChange}
                            />
                        </Col>
                        <Col>
                            <Form.Control
                                type="text"
                                placeholder="Security Code"
                                required
                                name="ccCode"
                                onChange={handleChange}
                            />
                        </Col>
                    </Form.Row>
                </Form.Group>

                <Form.Group>
                    <Form.Check.Input
                        type="checkbox"
                        name="saveUserData"
                        onChange={handleChange}
                    />
                    <Form.Check.Label>User will be registered</Form.Check.Label>
                </Form.Group>

                <CustomButton type="submit">Submit</CustomButton>
            </Form>
        </div>
  );
};


const mapDispatchToProps = dispatch => ({
    setPaymentError: errorMessage => dispatch(setPaymentError(errorMessage))
});

export default connect(null, mapDispatchToProps)(OrderForm);
