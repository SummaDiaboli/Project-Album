import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import { BrowserRouter as Router, Route } from 'react-router-dom'
import * as serviceWorker from './serviceWorker';

import App from './App';
import Login from './log-in/Login';
import SignUp from './sign-up/SignUp';
import HomePage from './homepage/Homepage';
import Error404 from './errors/error404';
import Pricing from './homepage/Pricing';
import Account from './account/Account';

const routing = (
    <Router>
        <div>
            <Route exact path="/" component={App} />
            <Route path="/account" component={Account} />
            <Route path="/login" component={Login} />
            <Route path="/sign-up" component={SignUp} />
            <Route path="/home" component={HomePage} />
            <Route path="/pricing" component={Pricing} />
            <Route path="/error404" component={Error404} />
        </div>
    </Router>
)

ReactDOM.render(
    routing,
    document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
