import React from 'react';
import {Link} from 'react-router-dom';
import {connect} from "react-redux";
import {createStructuredSelector} from "reselect";

import './header.scss';

import {ReactComponent as Logo} from '../../assets/crown.svg'
import CartIcon from "../cart-icon/CartIcon";
import SearchForm from "../search-form/SearchForm";
import CartDropdown from "../cart/cart-dropdown/CartDropdown";

import {selectCartHidden} from "../../redux/cart/cartSelectors";


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
        {
            props.hidden ? null : <CartDropdown />
        }

    </div>
);

const mapStateToProps = createStructuredSelector({
    hidden: selectCartHidden
});

export default connect(mapStateToProps)(Header);
