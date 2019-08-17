import React, { Component } from 'react';
import './App.css';
import { Route, withRouter, Switch } from 'react-router-dom'
import { compose } from 'recompose';
import { withFirebase } from '../../utils/Firebase';
import { withAuthentication } from '../../utils/Session';
import * as ROUTES from '../../utils/routes';

/* import { Home, Pricing } from '../../Home'
import SignIn from '../../components/SignIn';
import SignUp from '../../components/SignUp';
import Error404 from '../../components/Errors/error404';
import { AccountPage } from '../../components/Account';
import UserSettings from '../../components/Settings';
import PasswordForgetPage from '../../components/PasswordForget';
import PasswordChangePage from '../../components/PasswordChange';
import { AlbumDetailPage, NewAlbum } from '../../components/Album' */

import { HomePage } from '../Home'
import { PricingPage } from '../Pricing'
import { SignInPage, PasswordForgetPage } from '../SignIn'
import { SignUpPage } from '../SignUp';
import { AccountPage } from '../Account';
import { NewAlbumPage, ViewAlbumPage } from '../Albums'
import { SettingsPage } from '../Settings'
import { Error404Page } from '../Errors'

class AppBase extends Component {
  constructor(props) {
    super(props);
    this.state = {
      authUser: null
    }
  }

  render() {
    return (
      <Switch>
        <Route exact path={ROUTES.LANDING} component={HomePage} />
        <Route path={ROUTES.HOME} component={HomePage} />
        <Route path={ROUTES.PRICING} component={PricingPage} />
        <Route path={ROUTES.SIGN_IN} component={SignInPage} />
        <Route path={ROUTES.SIGN_UP} component={SignUpPage} />

        <Route path={ROUTES.ACCOUNT} component={AccountPage} />
        <Route path={ROUTES.ALBUM} component={ViewAlbumPage} />
        <Route path={ROUTES.NEWALBUM} component={NewAlbumPage} />
        <Route path={ROUTES.SETTINGS} component={SettingsPage} />
        <Route path={ROUTES.PASSWORD_FORGET} component={PasswordForgetPage} />

        {/* <Route exact path={ROUTES.ALBUM} component={AlbumDetailPage} /> */}

        <Route path={ROUTES.ERROR404} component={Error404Page} />
      </Switch>
    );
  }

}

const App = compose(
  withRouter,
  withAuthentication,
  withFirebase
)(AppBase)

export default App

// {/* <SecuredRoute path={ROUTES.PASSWORD_FORGET} component={PasswordForgetPage} checkingSession={this.state.checkingSession} authUser={this.state.authUser} secure/> */}
// {/* <SecuredRoute path={ROUTES.NEWALBUM} component={NewAlbum} checkingSession={this.state.checkingSession} authUser={this.state.authUser} secure/> */}
// {/* <SecuredRoute path={ROUTES.ACCOUNT} component={Account} checkingSession={this.state.checkingSession} authUser={this.state.authUser} secure/> */}
// {/* <SecuredRoute path={ROUTES.SETTINGS} component={UserSettings} checkingSession={this.state.checkingSession} authUser={this.state.authUser} secure/> */}
