import React, { Component } from 'react';
import './App.css';

import Home from '../Home/Home';
import SignIn from '../SignIn';
import SignUp from '../SignUp';
import Error404 from '../errors/error404';
import Pricing from '../Home/Pricing';
import Account from '../Account';
import UserSettings from '../Settings';
import PasswordForgetPage from '../PasswordForget';
import PasswordChangePage from '../PasswordChange';
import Album from '../Album';
import Callback from '../constants/Callback';
import NewAlbum from '../Album/NewAlbum';

import * as ROUTES from '../constants/routes';
import { Route, withRouter } from 'react-router-dom'
import { compose } from 'recompose';
import { withFirebase } from '../Firebase';
import { withAuthentication } from '../Session';


// import Navigation from '../constants/Navigation';
// import SecuredRoute from '../constants/SecuredRoute';
// import auth0Client from '../constants/Auth';

class AppBase extends Component {
  constructor(props) {
    super(props);
    this.state = {
      // checkingSession: true,
      authUser: null
    }
  }

  async componentDidMount() {
    if (this.props.location.pathname === '/callback') {
      this.setState({ checkingSession: false })
      return
    }

    try {
      this.forceUpdate();
    } catch (err) {
      if (err.error !== 'login_required') console.log(err.error);
    }

    this.setState({ checkingSession: false })
  }

  render() {
    return (
      <div>
        <Route exact path={ROUTES.LANDING} component={Home} />
        <Route path={ROUTES.HOME} component={Home} />
        <Route path={ROUTES.SIGN_IN} component={SignIn} />
        <Route path={ROUTES.SIGN_UP} component={SignUp} />
        <Route path={ROUTES.PRICING} component={Pricing} />
        <Route path={ROUTES.ERROR404} component={Error404} />
        <Route path={ROUTES.ACCOUNT} component={Account} />

        <Route path={ROUTES.SETTINGS} component={UserSettings} />


        <Route path={ROUTES.PASSWORD_FORGET} component={PasswordForgetPage} />

        <Route path={ROUTES.PASSWORD_CHANGE} component={PasswordChangePage} />

        <Route path={ROUTES.ALBUM} component={Album} />
        <Route path={ROUTES.CALLBACK} component={Callback} />

        <Route path={ROUTES.NEWALBUM} component={NewAlbum} />
      </div>
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
