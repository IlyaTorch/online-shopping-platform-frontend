import React from 'react';
import {connect} from 'react-redux';
import {createStructuredSelector} from 'reselect';

import './signInPage.scss';

import SignIn from '../../components/sign-in/SignIn';
import Failure from '../../components/failure/Failure';

import {selectLoginErrorStatus, selectLoginErrorMessage} from '../../redux/user/userSelector';


const SignInPage = ({error, errorMessage}) => (
    <div className='sign-in-container'>
        {error && <Failure errorMessage={errorMessage}/>}
        <div className="sign-in">
            <SignIn />
        </div>
    </div>
);


const mapStateToProps = createStructuredSelector({
    error: selectLoginErrorStatus,
    errorMessage: selectLoginErrorMessage,
});


export default connect(mapStateToProps)(SignInPage);
