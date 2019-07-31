import React from 'react';
import './App.css';

import Home from '../Home/Home';
import SignIn from '../SignIn/SignIn';
import SignUp from '../SignUp/SignUp';
import Error404 from '../errors/error404';
import Pricing from '../Home/Pricing';

import Account from '../Account/Account';
import { BrowserRouter as Router, Route } from 'react-router-dom'

import * as ROUTES from '../../constants/routes';
/* <Router>
      <div>
        <Home />

      </div>
      <Route exact path="/" component={App} />
      <Route path="/account" component={Account} />
      <Route path="/signin" component={SignIn} />
      <Route path="/signup" component={SignUp} />
      <Route path="/home" component={Home} />
      <Route path="/pricing" component={Pricing} />
      <Route path="/error404" component={Error404} />
    </Router> */

const App = () => (
  <Router>
    <div>
      <Route exact path={ROUTES.LANDING} component={Home} />
      <Route path={ROUTES.ACCOUNT} component={Account} />
      <Route path={ROUTES.SIGN_IN} component={SignIn} />
      <Route path={ROUTES.SIGN_UP} component={SignUp} />
      <Route path={ROUTES.HOME} component={Home} />
      <Route path={ROUTES.PRICING} component={Pricing} />
      <Route path={ROUTES.ERROR404} component={Error404} />
    </div>
  </Router>

)

export default App;
