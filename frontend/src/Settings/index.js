import React, { Component } from 'react';
import { Footer, ResponsiveContainer } from "../Navs";
import { Segment, Tab, Header, } from 'semantic-ui-react';
import { PasswordChangeForm } from '../PasswordChange';
import { PasswordForgetForm } from '../PasswordForget';
import { withAuthorization, withEmailVerification } from '../Session';
import { compose } from 'recompose';

class UserSettingsBase extends Component {
    handleItemClick = (e, { name }) => this.setState({ activeItem: name })

    render() {
        const panes = [
            {
                menuItem: 'Change Password',
                render: () =>
                    <Tab.Pane key="Tab 1">
                        <PasswordChangeForm />
                    </Tab.Pane>
            },

            {
                menuItem: 'Reset Password',
                render: () =>
                    <Tab.Pane>
                        <PasswordForgetForm />
                    </Tab.Pane>
            },
        ]

        return (
            <div>
                <ResponsiveContainer style={{ minHeight: 70 }}>
                    <Segment vertical style={{ minHeight: 700 }}>
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
const UserSettings = compose(
    withEmailVerification,
    withAuthorization(condition)
)(UserSettingsBase)

export default UserSettings;