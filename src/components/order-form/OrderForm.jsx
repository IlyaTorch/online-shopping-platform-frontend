import React from 'react';
import {connect} from 'react-redux';
import {Col, Form} from 'react-bootstrap';
import {Formik} from 'formik';
import {createStructuredSelector} from 'reselect';

import './orderForm.scss';

import {PAYMENT_URL} from '../../url-data/urlData';

import CustomButton from '../custom-button/CustomButton';

import {showOrderError} from '../../redux/shop/shopActions';

import {sendPost} from '../../utils';

import {selectCurrentUser} from '../../redux/user/userSelector';


const OrderForm = ({items, totalSum, showOrderError, currentUser}) => {
    const handleSubmit = (order, {setSubmitting, resetForm}) => {
        const orderData = {
            items: items,
            customer: {
                email: order.email,
                fullName: order.fullName,
                city: order.city,
                region: order.region,
                postalCode: order.postalCode,
                streetAddress: order.streetAddress,
            },
            card: {
                ccNumber: order.ccNumber,
                ccExpiry: order.ccExpiry,
                ccCode: order.ccCode,
            },
            totalSum: totalSum,
            saveUserData: order.saveUserData,
        };

        sendPost(PAYMENT_URL, orderData)
            .then(({OK, error}) => {
                if (OK) {
                    window.location.href = 'success-payment';
                    resetForm();
                } else {
                    showOrderError(error);
                }
            });

        setSubmitting(false);
    };

    return (
        <div className="order-form">
            <Formik
                initialValues={
                    {
                        email: currentUser ? currentUser.email : '',
                        city: (currentUser && currentUser.city) ? currentUser.city : '',
                        region: (currentUser && currentUser.region) ? currentUser.region : '',
                        streetAddress: (currentUser && currentUser.streetAddress) ? currentUser.streetAddress : '',
                        postalCode: (currentUser && currentUser.postalCode) ? currentUser.postalCode : '',

                        fullName: (currentUser && currentUser.fullName) ? currentUser.fullName : '',

                        ccNumber: (currentUser && currentUser.ccNumber) ? currentUser.ccNumber : '',
                        ccExpiry: (currentUser && currentUser.ccExpiry) ? currentUser.ccExpiry : '',
                        ccCode: (currentUser && currentUser.ccCode) ? currentUser.ccCode : '',

                        saveUserData: false,
                        registerUser: false,
                    }}
                onSubmit={handleSubmit}
            >
                {(formik) => (
                    <form onSubmit={formik.handleSubmit}>
                        {!currentUser &&
                        <Form.Group>
                            <Form.Label>Contact Info</Form.Label>
                            <Form.Control
                                required
                                type="email"
                                placeholder="Email Address"
                                id="email"
                                {...formik.getFieldProps('email')}
                            />
                        </Form.Group>
                        }
                        <Form.Group>
                            <Form.Group>
                                <Form.Label>Shipping info</Form.Label>
                                <Form.Control
                                    required
                                    type="text"
                                    placeholder="Full Name"
                                    id="fullName"
                                    {...formik.getFieldProps('fullName')}
                                />
                            </Form.Group>
                            <Form.Group>
                                <Form.Control
                                    type="text"
                                    placeholder="Street address"
                                    required
                                    id="streetAddress"
                                    {...formik.getFieldProps('streetAddress')}
                                />
                            </Form.Group>
                            <Form.Group>
                                <Form.Row>
                                    <Col>
                                        <Form.Control
                                            type="text"
                                            placeholder="City"
                                            required
                                            id="city"
                                            {...formik.getFieldProps('city')}
                                        />
                                    </Col>
                                    <Col>
                                        <Form.Control
                                            type="text"
                                            placeholder="Region"
                                            required
                                            id="region"
                                            {...formik.getFieldProps('region')}
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
                                            id="postalCode"
                                            {...formik.getFieldProps('postalCode')}
                                        />
                                    </Col>
                                    <Col></Col>
                                </Form.Row>
                            </Form.Group>
                        </Form.Group>
                        <Form.Group>
                            <Form.Label>Payment info</Form.Label>
                            <Form.Row>
                                <Col>
                                    <Form.Control
                                        type="text"
                                        placeholder="Card Number"
                                        required
                                        id="ccNumber"
                                        minLength="16"
                                        maxLength="16"
                                        {...formik.getFieldProps('ccNumber')}
                                    />
                                </Col>
                                <Col>
                                    <Form.Control
                                        type="date"
                                        placeholder="Expiration Date"
                                        required
                                        id="ccExpiry"
                                        min={new Date().toISOString().split('T')[0]} // current date for input
                                        {...formik.getFieldProps('ccExpiry')}
                                    />
                                </Col>
                                <Col>
                                    <Form.Control
                                        type="text"
                                        placeholder="Security Code"
                                        required
                                        id="ccCode"
                                        minLength="3"
                                        maxLength="3"
                                        {...formik.getFieldProps('ccCode')}
                                    />
                                </Col>
                            </Form.Row>
                        </Form.Group>
                        {currentUser &&
                        <Form.Group>
                            <Form.Check.Input
                                type="checkbox"
                                id="saveUserData"
                                {...formik.getFieldProps('saveUserData')}
                            />
                            <Form.Check.Label>Save data for future orders</Form.Check.Label>
                        </Form.Group>
                        }
                        {!currentUser &&
                        <Form.Group>
                            <Form.Check.Input
                                type="checkbox"
                                id="registerUser"
                                {...formik.getFieldProps('registerUser')}
                            />
                            <Form.Check.Label>Save data for future orders</Form.Check.Label>
                        </Form.Group>
                        }
                        <CustomButton type="submit">Submit</CustomButton>
                    </form>
                )}
            </Formik>
        </div>
    );
};

const mapStateToProps = createStructuredSelector({
    currentUser: selectCurrentUser,
});


const mapDispatchToProps = (dispatch) => ({
    showOrderError: (errorMessage) => dispatch(showOrderError(errorMessage)),
});

export default connect(mapStateToProps, mapDispatchToProps)(OrderForm);
