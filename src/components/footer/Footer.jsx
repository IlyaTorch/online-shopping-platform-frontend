import React from 'react';
import {Link} from 'react-router-dom';


import './footer.scss';


const Footer = () => (
    <div className="footer">
        <Link className="option" to="/contact">
                CONTACT US
        </Link>
    </div>
);


export default Footer;
