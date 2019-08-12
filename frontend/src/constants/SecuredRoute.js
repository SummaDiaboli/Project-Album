import React from 'react'
import { Route, Redirect } from 'react-router-dom'
import * as ROUTES from './routes'
// import auth0Client from './Auth';
import { Loader } from 'semantic-ui-react';
import { AuthUserContext, } from '../Session';

function SecuredRoute(props) {
    const { component: Component, path, checkingSession, secure /* , authUser */ } = props;
    return (
        <div>
            <AuthUserContext.Consumer>
                {authUser => authUser
                    ? <Route path={path} render={() => {
                        if (checkingSession) return <Loader active size="big" content="Loading Session..." />
                        /* if (authUser === null) {

                            // auth0Client.signIn()
                            return <div></div>
                        } */
                        return <Component />
                    }} />
                    : <Route path={path} render={() => {
                        if (secure) return <Redirect to={ROUTES.SIGN_IN} />
                        return <Component />
                    }} />}
            </AuthUserContext.Consumer>
        </div>
    )
}

export default SecuredRoute
