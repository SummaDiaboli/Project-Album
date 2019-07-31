import React from 'react';
import './App.css';

import Home from '../Home/Home';
import SignIn from '../SignIn';
import SignUp from '../SignUp';
import Error404 from '../errors/error404';
import Pricing from '../Home/Pricing';
import Account from '../Account';
// import { withFirebase } from '../Firebase';
import { /* AuthUserContext */ withAuthentication } from '../Session';


import { BrowserRouter as Router, Route } from 'react-router-dom'

import * as ROUTES from '../../constants/routes';
import PasswordForgetPage from '../PasswordForget';
// import PasswordForgetPage from '../PasswordForget';

/* const Navigation = () => (
  <div>
    <AuthUserContext.Consumer>
      {authUser =>
        authUser ? <NavigationAuth /> : <NavigationNonAuth />
      }
    </AuthUserContext.Consumer>
  </div>
)

const NavigationAuth = () => (
  <div>
    <Route path={ROUTES.ACCOUNT} component={Account} />
    <Route path={ROUTES.PRICING} component={Pricing} />
    <Route path={ROUTES.ERROR404} component={Error404} />
  </div>
)

const NavigationNonAuth = () => (
  <div>
    <Route exact path={ROUTES.LANDING} component={Home} />
    <Route path={ROUTES.HOME} component={Home} />
    <Route path={ROUTES.SIGN_IN} component={SignIn} />
    <Route path={ROUTES.SIGN_UP} component={SignUp} />
    <Route path={ROUTES.PRICING} component={Pricing} />
    <Route path={ROUTES.ERROR404} component={Error404} />
    <Route path={ROUTES.PASSWORD_FORGET} component={PasswordForgPage} />
  </div>

) */


const App = () => (

  <Router>

    {/* <Navigation /> */}

    <Route exact path={ROUTES.LANDING} component={Home} />
    <Route path={ROUTES.HOME} component={Home} />
    <Route path={ROUTES.SIGN_IN} component={SignIn} />
    <Route path={ROUTES.SIGN_UP} component={SignUp} />
    <Route path={ROUTES.PRICING} component={Pricing} />
    <Route path={ROUTES.ERROR404} component={Error404} />
    <Route path={ROUTES.ACCOUNT} component={Account} />
    <Route path={ROUTES.PASSWORD_FORGET} component={PasswordForgetPage} />

  </Router >


)

export default withAuthentication(App)
