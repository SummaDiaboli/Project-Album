import React from 'react';
import './App.css';

import Home from '../Home/Home';
import SignIn from '../SignIn';
import SignUp from '../SignUp';
import Error404 from '../errors/error404';
import Pricing from '../Home/Pricing';
import Account from '../Account';

import { BrowserRouter as Router, Route } from 'react-router-dom'

import * as ROUTES from '../constants/routes';
import Album from '../Album';
import Callback from '../constants/Callback';
import SecuredRoute from '../constants/SecuredRoute';
import NewAlbum from '../Album/NewAlbum';
const App = () => (

  <Router>
    <Route exact path={ROUTES.LANDING} component={Home} />
    <Route path={ROUTES.HOME} component={Home} />
    <Route path={ROUTES.SIGN_IN} component={SignIn} />
    <Route path={ROUTES.SIGN_UP} component={SignUp} />
    <Route path={ROUTES.PRICING} component={Pricing} />
    <Route path={ROUTES.ERROR404} component={Error404} />
    {/* <SecuredRoute path={ROUTES.ACCOUNT} component={Account} /> */}
    <Route path={ROUTES.ACCOUNT} component={Account} />

    <Route path={ROUTES.ALBUM} component={Album} />
    <Route path={ROUTES.CALLBACK} component={Callback} />
    {/* <SecuredRoute path={ROUTES.NEWALBUM} component={NewAlbum} /> */}
    <Route path={ROUTES.NEWALBUM} component={NewAlbum} />

  </Router >


)

export default App
