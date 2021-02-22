import React from 'react';
import {Link} from 'react-router-dom';
import {connect} from 'react-redux';
import {createStructuredSelector} from 'reselect';

import './header.scss';

import {ReactComponent as Logo} from '../../assets/crown.svg';
import CartIcon from '../cart-icon/CartIcon';
import SearchForm from '../search-form/SearchForm';
import CartDropdown from '../cart/cart-dropdown/CartDropdown';

import {selectCartHidden} from '../../redux/cart/cartSelectors';
import {selectCurrentUser} from '../../redux/user/userSelector';
import {setCurrentUser} from '../../redux/user/userActions';


const Header = ({location, hidden, currentUser, setCurrentUser}) => {
    const signOut = () => {
        setCurrentUser(null);
    };

    return (
        <div className="header">
            <Link className="logo-container" to="/">
                <Logo className="logo"/>
            </Link>

            <div className="options">
                {
                    !location.pathname.includes('/platform/') ?
                        <span style={
                            {
                                display: 'flex',
                                flexDirection: 'row',
                                alignItems: 'center',
                            }
                        }>
                            {location.pathname === '/' && <SearchForm />}
                            <Link className="option" to="/shops">SHOPS</Link>
                        </span> :
                        null
                }

                {!currentUser ?
                    <Link className="option" to="/signin">
                        SIGN IN
                    </Link> :
                    <span
                        className="option"
                        onClick={signOut}
                    >SIGN OUT</span>
                }

                <CartIcon />
            </div>
            {
                hidden ? null : <CartDropdown />
            }
        </div>
    );
};

const mapStateToProps = createStructuredSelector({
    hidden: selectCartHidden,
    currentUser: selectCurrentUser,
});

const mapDispatchToProps = (dispatch) => ({
    setCurrentUser: (user) => dispatch(setCurrentUser(user)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Header);
