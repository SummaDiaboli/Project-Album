import React, { Component } from 'react';
import './App.css';

import Home from '../Home/Home';
import SignIn from '../SignIn';
import SignUp from '../SignUp';
import Error404 from '../errors/error404';
import Pricing from '../Home/Pricing';
import Account from '../Account';

import { Route, withRouter } from 'react-router-dom'

import * as ROUTES from '../constants/routes';
import Album from '../Album';
import Callback from '../constants/Callback';
import SecuredRoute from '../constants/SecuredRoute';
import NewAlbum from '../Album/NewAlbum';
import auth0Client from '../constants/Auth';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      checkingSession: true,
    }
  }

  async componentDidMount() {
    if (this.props.location.pathname === '/callback') {
      this.setState({ checkingSession: false })
      return
    }

    try {
      await auth0Client.silentAuth();
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
        <SecuredRoute path={ROUTES.ACCOUNT} component={Account} checkingSession={this.state.checkingSession} />
        {/* <Route path={ROUTES.ACCOUNT} component={Account} /> */}

        <Route path={ROUTES.ALBUM} component={Album} />
        <Route path={ROUTES.CALLBACK} component={Callback} />
        <SecuredRoute path={ROUTES.NEWALBUM} component={NewAlbum} checkingSession={this.state.checkingSession} />
        {/* <Route path={ROUTES.NEWALBUM} component={NewAlbum} /> */}

      </div>
    );
  }

}

export default withRouter(App)
