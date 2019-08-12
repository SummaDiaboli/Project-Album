import React, { Component } from 'react';
import ResponsiveContainer from '../Navs/Header';
import Footer from '../Navs/Footer';
import { Segment, Tab, Header, } from 'semantic-ui-react';
// import { Link } from 'react-router-dom'
// import * as ROUTES from '../constants/routes'
import { PasswordChangeForm } from '../PasswordChange';
import { PasswordForgetForm } from '../PasswordForget';
import { withAuthorization } from '../Session';

class UserSettings extends Component {
    state = { activeItem: 'pw_change' }

    handleItemClick = (e, { name }) => this.setState({ activeItem: name })
    render() {
        // const { activeItem } = this.state
        const panes = [
            {
                menuItem: 'Change Password', render: () =>
                    <Tab.Pane key="Tab 1">
                        <PasswordChangeForm />
                    </Tab.Pane>
            },
            {
                menuItem: 'Reset Password', render: () =>
                    <Tab.Pane>
                        <PasswordForgetForm />
                    </Tab.Pane>
            },
        ]

        return (
            <div>
                <ResponsiveContainer style={{ minHeight: 70 }}>
                    <Segment vertical stacked style={{ minHeight: 700 }}>
                        <Header textAlign="center">User Settings</Header>
                        <Tab menu={{ fluid: true, vertical: true, tabular: true }} panes={panes} />
                    </Segment>
                    <Footer />
                </ResponsiveContainer>
            </div>
        );
    }
}


const condition = authUser => !!authUser
export default withAuthorization(condition)(UserSettings);