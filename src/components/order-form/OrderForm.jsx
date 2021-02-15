import React from 'react';
import {connect} from 'react-redux';
import {Col, Form} from 'react-bootstrap';

import './orderForm.scss';

import {PAYMENT_URL} from '../../url-data/urlData';

import CustomButton from '../custom-button/CustomButton';

import {showOrderError} from '../../redux/shop/shopActions';


const OrderForm = ({items, totalSum, showOrderError}) => {
    const initialFormData = Object.freeze({
        email: '',
        city: '',
        region: '',
        streetAddress: '',
        postalCode: '',

        fullName: '',

        ccNumber: '',
        ccExpiry: '',
        ccCode: '',

        saveUserData: false,
    });

    const [formData, updateFormData] = React.useState(initialFormData);

    const handleChange = (event) => {
        updateFormData({
            ...formData,
            [event.target.name]: event.target.value.trim(),
        });
    };

    const [validated, setValidated] = React.useState(false);

    const pushOrder = (order, errorStatus=undefined) => fetch(PAYMENT_URL, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json;charset=utf-8',
        },
        body: JSON.stringify(order),
    })
        .then((response) => {
            if (response.status === 201) {
                window.location.href = 'success-payment';
            } else {
                response.json().then(({error}) => showOrderError(error));
            }
        })
        .catch((error) => {
            if (!error.response) {
                errorStatus = 'Network Error';
            } else {
                errorStatus = error.response.data.message;
            }

            showOrderError(errorStatus);
        });

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
                    fullName: formData.fullName,
                    city: formData.city,
                    region: formData.region,
                    postalCode: formData.postalCode,
                    streetAddress: formData.streetAddress,
                },
                card: {
                    ccNumber: formData.ccNumber,
                    ccExpiry: formData.ccExpiry,
                    ccCode: formData.ccCode,
                },
                totalSum: totalSum,
                saveUserData: formData.saveUserData,
            };
            pushOrder(order);
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
                        name="fullName"
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
                                placeholder="Region"
                                required
                                name="region"
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
                                minLength="16"
                                maxLength="16"
                            />
                        </Col>
                        <Col>
                            <Form.Control
                                type="date"
                                placeholder="Expiration Date"
                                required
                                name="ccExpiry"
                                onChange={handleChange}
                                min={new Date().toISOString().split('T')[0]} // current date for input
                            />
                        </Col>
                        <Col>
                            <Form.Control
                                type="text"
                                placeholder="Security Code"
                                required
                                name="ccCode"
                                onChange={handleChange}
                                minLength="3"
                                maxLength="3"
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


const mapDispatchToProps = (dispatch) => ({
    showOrderError: (errorMessage) => dispatch(showOrderError(errorMessage)),
});

export default connect(null, mapDispatchToProps)(OrderForm);
