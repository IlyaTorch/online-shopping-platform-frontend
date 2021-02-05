import React from 'react';
import {PAYMENT_URL} from "../../url-data/urlData";
import {Form} from "react-bootstrap";

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
            console.log(order)
            fetch(PAYMENT_URL, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json;charset=utf-8'
                },
                body: JSON.stringify(order)
            }).then(response => console.log(response));
        }

        setValidated(true);
        };

    return (
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

            <Form.Group  md="4" controlId="validationCustomUsername">
                <Form.Label>Card</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Card Number"
                  aria-describedby="inputGroupPrepend"
                  required
                  name="cc_number"
                  onChange={handleChange}
                />
            </Form.Group>

            <Form.Group  md="4" controlId="validationCustomUsername">
                <Form.Control
                  type="date"
                  placeholder="Expiration Date"
                  aria-describedby="inputGroupPrepend"
                  required
                  name="cc_expiry"
                  onChange={handleChange}
                />
            </Form.Group>

            <Form.Group  md="4" controlId="validationCustomUsername">
                <Form.Control
                  type="text"
                  placeholder="Security Code"
                  aria-describedby="inputGroupPrepend"
                  required
                  name="cc_code"
                  onChange={handleChange}
                />
            </Form.Group>

      <CustomButton type="submit">Make Order</CustomButton>
    </Form>
  );
};


export default OrderForm;
