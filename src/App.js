import React from 'react';
import {Switch, Route} from "react-router-dom";

import './App.css';

import Header from "./components/header/Header";
import HomePage from "./pages/homepage/HomePage";
import ShopsPage from "./pages/shops-page/ShopsPage";
import ShopPage from "./pages/shop-page/ShopPage";
import Footer from "./components/footer/Footer";


const App = () => (
    <div className='wrapper'>
        <div className="content">
            <Route path='' component={Header}/>
            <Switch>
                <Route exact path='/' component={HomePage} />
                <Route exact path='/shops' component={ShopsPage} />
                <Route exact path='/shops/:id' component={ShopPage} />
            </Switch>
        </div>

        <Footer/>
    </div>
);


export default App;
