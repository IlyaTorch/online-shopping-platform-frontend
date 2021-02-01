import React from 'react';
import {Switch, Route, Router} from "react-router-dom";

import {createBrowserHistory} from "history";

import './App.css';

import Header from "./components/header/Header";
import HomePage from "./pages/homepage/HomePage";
import ShopsPage from "./pages/shops-page/ShopsPage";
import ShopPage from "./pages/shop-page/ShopPage";
import ItemPage from "./pages/item-page/ItemPage";
import CheckoutPage from "./pages/checkout/CheckoutPage";
import Footer from "./components/footer/Footer";



let history = createBrowserHistory();

const App = () => (
    <Router history={history}>
        <div className='wrapper'>
            <div className="content">
                <Route path='' component={Header}/>
                <Switch>
                    <Route exact path='/' component={HomePage} />
                    <Route exact path='/checkout' component={CheckoutPage} />
                    <Route exact path='/shops' component={ShopsPage} />
                    <Route exact path='/shops/:shopId' component={ShopPage} />
                    <Route exact path='/shops/:shopId/:itemId' component={ItemPage} />
                </Switch>
            </div>

            <Footer/>
        </div>
    </Router>
);


export default App;
