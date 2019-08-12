import React from 'react';
import { Route, withRouter } from 'react-router-dom'
import * as ROUTES from './routes'
import Account from '../Account';
import Home from '../Home/Home';
import SignIn from '../SignIn';
import SignUp from '../SignUp';
import Error404 from '../errors/error404';
import Pricing from '../Home/Pricing';
import Album from '../Album';
import NewAlbum from '../Album/NewAlbum';

const Navigation = ({ authUser }) => (
    <div>{authUser ? <NavigationAuth /> : <NavigationNonAuth />}</div>
)

const NavigationAuth = () => (
    <div>
        <Route path={ROUTES.ACCOUNT} component={Account} />
        <Route path={ROUTES.ALBUM} component={Album} />
        <Route path={ROUTES.NEWALBUM} component={NewAlbum} />
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
    </div>
)

export default Navigation;