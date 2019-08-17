import React, { Component } from 'react';
import './App.css';
import { Route, withRouter, Switch } from 'react-router-dom'
import { compose } from 'recompose';
import { withFirebase } from '../Firebase';
import { withAuthentication } from '../Session';
import * as ROUTES from '../constants/routes';

import { Home, Pricing } from '../Home'
import SignIn from '../SignIn';
import SignUp from '../SignUp';
import Error404 from '../errors/error404';
import Account from '../Account';
import UserSettings from '../Settings';
import PasswordForgetPage from '../PasswordForget';
import PasswordChangePage from '../PasswordChange';
import { AlbumDetailPage, NewAlbum } from '../Album'

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
        <Route exact path={ROUTES.LANDING} component={Home} />
        <Route path={ROUTES.HOME} component={Home} />
        <Route path={ROUTES.PRICING} component={Pricing} />
        <Route path={ROUTES.SIGN_IN} component={SignIn} />
        <Route path={ROUTES.SIGN_UP} component={SignUp} />

        <Route path={ROUTES.ACCOUNT} component={Account} />
        <Route path={ROUTES.ALBUM} component={AlbumDetailPage} />
        <Route path={ROUTES.NEWALBUM} component={NewAlbum} />
        <Route path={ROUTES.SETTINGS} component={UserSettings} />
        <Route path={ROUTES.PASSWORD_FORGET} component={PasswordForgetPage} />
        <Route path={ROUTES.PASSWORD_CHANGE} component={PasswordChangePage} />

        <Route exact path={ROUTES.ALBUM} component={AlbumDetailPage} />

        <Route path={ROUTES.ERROR404} component={Error404} />
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
