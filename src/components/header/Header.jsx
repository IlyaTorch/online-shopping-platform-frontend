import React from 'react';
import {Link} from 'react-router-dom';

import './header.scss';

import {ReactComponent as Logo} from '../../assets/crown.svg'

import CartIcon from "../cart-icon/CartIcon";
import SearchForm from "../search-form/SearchForm";


const Header = (props) => (
    <div className="header">
        <Link className="logo-container" to="/">
            <Logo className="logo"/>
        </Link>

        <div className="options">
            {
                !props.location.pathname.includes('/shops/')
                ?
                    <span style={
                        {
                            display: 'flex',
                            flexDirection: 'row',
                            alignItems: 'center'
                        }
                    }>
                    <SearchForm />
                    <Link className="option" to="/shops">SHOPS</Link>
                    </span>
                : null
            }

            <Link className="option" to="/signin">
                SIGN IN
            </Link>

            <CartIcon />
        </div>

    </div>
);


export default Header;
