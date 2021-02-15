import React from 'react';
import {connect} from 'react-redux';
import {createStructuredSelector} from 'reselect';

import './signUpPage.scss';

import SignUp from '../../components/sign-up/SignUp';
import Failure from '../../components/failure/Failure';

import {selectLoginErrorStatus, selectLoginErrorMessage} from '../../redux/user/userSelector';


const SignUpPage = ({error, errorMessage}) => (
    <div className='sign-up-container'>
        {error && <Failure errorMessage={errorMessage}/>}
        <div className="sign-up">
            <SignUp />
        </div>
    </div>
);


const mapStateToProps = createStructuredSelector({
    error: selectLoginErrorStatus,
    errorMessage: selectLoginErrorMessage,
});


export default connect(mapStateToProps)(SignUpPage);
