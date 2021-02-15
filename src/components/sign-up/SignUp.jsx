import React from 'react';
import {Link} from 'react-router-dom';
import {connect} from 'react-redux';
import {ErrorMessage, Formik} from 'formik';
import {Form} from 'react-bootstrap';
import * as Yup from 'yup';

import './signUp.scss';

import CustomButton from '../custom-button/CustomButton';

import {setCurrentUser, showLoginError} from '../../redux/user/userActions';

import {SIGN_UP_URL} from '../../url-data/urlData';

import {sendPost} from '../../utils';


const SignUp = ({setCurrentUser, showLoginError}) => {
    const handleSubmit = (user, {setSubmitting, resetForm}) => {
        sendPost(SIGN_UP_URL, {email: user.email, password: user.password})
            .then(({token, error}) => {
                if (token) {
                    setCurrentUser({...user, token});
                    resetForm();
                } else {
                    showLoginError(error);
                }
            });
        setSubmitting(false);
    };

    return (
        <div className="sign-up">
            <h1>Create new account</h1>

            <Formik
                initialValues={
                    {
                        email: '',
                        password: '',
                        confirmedPassword: '',
                    }
                }
                validationSchema={Yup.object({
                    email: Yup.string()
                        .email('Invalid email address')
                        .required('Email is required'),
                    password: Yup.string()
                        .required('Password is required'),
                    confirmedPassword: Yup.string()
                        .required('Repeat your password')
                        .test(
                            'equal',
                            'Passwords don\'t match!',
                            function(confirmedPassword) {
                                const ref = Yup.ref('password');
                                return confirmedPassword === this.resolve(ref);
                            }),
                })}
                onSubmit={handleSubmit}
            >
                {(formik) => (
                    <form onSubmit={formik.handleSubmit}>
                        <Form.Group>
                            <Form.Label>Email</Form.Label>
                            <Form.Control
                                required
                                type="email"
                                placeholder="Email Address"
                                id="email"
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
                                type="password"
                                placeholder="Password"
                                id="password"
                                {...formik.getFieldProps('password')}
                            />
                            <span className="error">
                                <ErrorMessage name="password" />
                            </span>
                        </Form.Group>
                        <Form.Group>
                            <Form.Control
                                required
                                type="password"
                                placeholder="Confirm Password"
                                name="confirmedPassword"
                                {...formik.getFieldProps('confirmedPassword')}
                            />
                            <span className="error">
                                <ErrorMessage name="confirmedPassword" />
                            </span>
                        </Form.Group>

                        <CustomButton type="submit">Sign Up</CustomButton>
                    </form>
                )}
            </Formik>

            <Link style={{
                fontSize: 20,
                fontWeight: 'normal',
                textDecorationLine: 'underline',
            }} to='/signin'>Sign in with email and password</Link>
        </div>
    );
};


const mapDispatchToProps = (dispatch) => ({
    setCurrentUser: (user) => dispatch(setCurrentUser(user)),
    showLoginError: (errorMessage) => dispatch(showLoginError(errorMessage)),
});


export default connect(null, mapDispatchToProps)(SignUp);
