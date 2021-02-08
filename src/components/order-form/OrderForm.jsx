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
        address: "",
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
                    address: formData.address
                },
                card: {
                    ccNumber: formData.ccNumber,
                    ccCode: formData.ccCode,
                    ccExpiry: formData.ccExpiry
                },
                totalSum: totalSum,
                saveUserData: formData.saveUserData
            };

            fetch(PAYMENT_URL, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json;charset=utf-8'
                },
                body: JSON.stringify(order)
            }).then(response => response.status === 201
                ? window.location.href='success-payment'
                : setPaymentError()
            );
        }

        setValidated(true);
        };

    return (
        <div className="order-form">
            <Form noValidate validated={validated} onSubmit={handleSubmit}>
                <Form.Group md="4" controlId="validationCustom01">
                    <Form.Label>Contact Info</Form.Label>
                    <Form.Control
                        required
                        type="email"
                        placeholder="Email Address"
                        name="email"
                        onChange={handleChange}
                    />
                </Form.Group>

                <Form.Group md="4" controlId="validationCustom02">
                    <Form.Label>Shipping info</Form.Label>
                    <Form.Control
                        required
                        type="text"
                        placeholder="Full Name"
                        name="name"
                        onChange={handleChange}
                    />
                </Form.Group>

                <Form.Group  md="4" controlId="validationCustomUsername">
                    <Form.Control
                        type="text"
                        placeholder="Address"
                        aria-describedby="inputGroupPrepend"
                        required
                        name="address"
                        onChange={handleChange}
                    />
                </Form.Group>

                <Form.Group  md="8" controlId="validationCustomUsername">
                    <Form.Label>Payment info</Form.Label>
                    <Form.Row>
                        <Col>
                            <Form.Control
                                type="text"
                                placeholder="Card Number"
                                aria-describedby="inputGroupPrepend"
                                required
                                name="ccNumber"
                                onChange={handleChange}
                            />
                        </Col>
                        <Col>
                            <Form.Control
                                type="date"
                                placeholder="Expiration Date"
                                aria-describedby="inputGroupPrepend"
                                required
                                name="ccExpiry"
                                onChange={handleChange}
                            />
                        </Col>
                        <Col>
                            <Form.Control
                                type="text"
                                placeholder="Security Code"
                                aria-describedby="inputGroupPrepend"
                                required
                                name="ccCode"
                                onChange={handleChange}
                                width="50"
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
                    <Form.Check.Label>Save data for future orders</Form.Check.Label>
                </Form.Group>

                <CustomButton type="submit">Make Order</CustomButton>
            </Form>
        </div>
  );
};


const mapDispatchToProps = dispatch => ({
    setPaymentError: () => dispatch(setPaymentError())
});

export default connect(null, mapDispatchToProps)(OrderForm);
