import React from 'react';

import './failure.scss';


const Failure = ({errorMessage}) => (
    <div className="failure">
        <h1>Opps! Something went wrong</h1>
        <span>{errorMessage}</span>
    </div>
);


export default Failure;
