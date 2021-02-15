import React from 'react';
import {Link} from 'react-router-dom';
import {connect} from 'react-redux';
import {Formik, ErrorMessage} from 'formik';
import {Form} from 'react-bootstrap';
import * as Yup from 'yup';

import './signIn.scss';

import CustomButton from '../custom-button/CustomButton';

import {setCurrentUser, showLoginError} from '../../redux/user/userActions';

import {sendPost} from '../../utils';

import {SIGN_IN_URL} from '../../url-data/urlData';


const SignIn = ({setCurrentUser, showLoginError}) => {
    const handleSubmit = (data, {setSubmitting, resetForm}) => {
        sendPost(SIGN_IN_URL, data)
            .then(({user, token, error}) => {
                if (token) {
                    setCurrentUser({...user, password: data.password, token});
                    resetForm();
                } else {
                    showLoginError(error);
                }
            });
        setSubmitting(false);
    };

    return (
        <div>
            <h1>Sign in with email and password</h1>

            <Formik
                initialValues={{email: '', password: ''}}
                validationSchema={Yup.object({
                    email: Yup.string()
                        .email('Invalid email address')
                        .required('Email is required'),
                    password: Yup.string()
                        .required('Password is required'),
                })}
                onSubmit={handleSubmit}
            >
                {(formik) => (
                    <form onSubmit={formik.handleSubmit}>
                        <Form.Group>
                            <Form.Label>Email</Form.Label>
                            <Form.Control
                                required
                                id="email"
                                type="email"
                                placeholder="Email Address"
                                {...formik.getFieldProps('email')}
                            />
                            <span className="error">
                                <ErrorMessage name="email" />
                            </span>
                        </Form.Group>

                        <Form.Group>
                            <Form.Label>Password</Form.Label>
                            <Form.Control
                                required
                                id="password"
                                type="password"
                                placeholder="Password"
                                {...formik.getFieldProps('password')}
                            />
                            <span className="error">
                                <ErrorMessage name="password" />
                            </span>
                        </Form.Group>

                        <CustomButton type="submit">SIGN IN</CustomButton>
                    </form>
                )}
            </Formik>
            <Link style={{
                fontSize: 20,
                fontWeight: 'normal',
                textDecorationLine: 'underline',
            }} to='/signup'>Create an account</Link>
        </div>
    );
};


const mapDispatchToProps = (dispatch) => ({
    setCurrentUser: (user) => dispatch(setCurrentUser(user)),
    showLoginError: (errorMessage) => dispatch(showLoginError(errorMessage)),
});


export default connect(null, mapDispatchToProps)(SignIn);
