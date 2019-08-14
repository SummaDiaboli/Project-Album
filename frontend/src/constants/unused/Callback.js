import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
// import auth0Client from './Auth';
import { Loader } from 'semantic-ui-react';

class Callback extends Component {
    componentDidMount() {
        // await auth0Client.handleAuthentication();
        this.props.history.replace('/account');
    }

    render() {
        return (
            <Loader active content="Loading..." />
        );
    }
}

export default withRouter(Callback);