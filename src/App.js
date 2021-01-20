import React from 'react';
import {Switch, Route} from "react-router-dom";

import './App.css';

import Header from "./components/header/header.component";
import HomePage from "./pages/homepage/homepage.component";
import ShopsPage from "./pages/shops-page/shops-page.component";
import ShopPage from "./pages/shop-page/shop-page.component";


function App() {
    return (
        <div>
            <Header/>
            <Switch>
                <Route exact path='/' component={HomePage} />
                <Route exact path='/shops' component={ShopsPage} />
                <Route exact path='/shops/:id' component={ShopPage} />

            </Switch>
        </div>
    );
}

export default App;
