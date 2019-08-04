import React from 'react';
import './App.css';

import Home from '../Home/Home';
import SignIn from '../SignIn';
import SignUp from '../SignUp';
import Error404 from '../errors/error404';
import Pricing from '../Home/Pricing';
import Account from '../Account';
// import { withFirebase } from '../Firebase';


import { BrowserRouter as Router, Route } from 'react-router-dom'

import * as ROUTES from '../constants/routes';
const App = () => (

  <Router>
    <Route exact path={ROUTES.LANDING} component={Home} />
    <Route path={ROUTES.HOME} component={Home} />
    <Route path={ROUTES.SIGN_IN} component={SignIn} />
    <Route path={ROUTES.SIGN_UP} component={SignUp} />
    <Route path={ROUTES.PRICING} component={Pricing} />
    <Route path={ROUTES.ERROR404} component={Error404} />
    <Route path={ROUTES.ACCOUNT} component={Account} />

  </Router >


)

export default App
