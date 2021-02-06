import React from 'react';
import {PAYMENT_URL} from "../../url-data/urlData";
import {Col, Form} from "react-bootstrap";

import './orderForm.scss';

import CustomButton from "../custom-button/CustomButton";


const OrderForm = ({items, totalSum}) => {
    const initialFormData = Object.freeze({
        email: "",
        address: "",
        name: "",

        cc_number: "",
        cc_expiry: "",
        cc_code: "",
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
                    cc_number: formData.cc_number,
                    cc_code: formData.cc_code,
                    cc_expiry: formData.cc_expiry
                },
                total_sum: totalSum
            };

            fetch(PAYMENT_URL, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json;charset=utf-8'
                },
                body: JSON.stringify(order)
            }).then(response => response.status === 201
                ? window.location.href='success-payment'
                : console.error(response));
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
                                name="cc_number"
                                onChange={handleChange}
                            />
                        </Col>
                        <Col>
                            <Form.Control
                                type="date"
                                placeholder="Expiration Date"
                                aria-describedby="inputGroupPrepend"
                                required
                                name="cc_expiry"
                                onChange={handleChange}
                            />
                        </Col>
                        <Col>
                            <Form.Control
                                type="text"
                                placeholder="Security Code"
                                aria-describedby="inputGroupPrepend"
                                required
                                name="cc_code"
                                onChange={handleChange}
                                width="50"
                            />
                        </Col>
                    </Form.Row>
                </Form.Group>

                <CustomButton type="submit">Make Order</CustomButton>
            </Form>
        </div>
  );
};


export default OrderForm;
