import React, { Component } from 'react'
import { Button, Dropdown, Icon, } from 'semantic-ui-react';
import { withFirebase } from '../Firebase';
import { Link, withRouter } from "react-router-dom"
import { compose } from 'recompose';
import { AuthUserContext } from '../Session';

import * as ROUTES from '../constants/routes';

const AccountButton = ({ inverted }) => (
    <Account inverted={inverted} />
)

class UserAccount extends Component {
    constructor(props) {
        super(props)
        this.state = {}
    }

    componentDidMount() {
        const rehydrate = JSON.parse(localStorage.getItem('username'))
        this.setState(rehydrate)

        try {
            const uid = this.props.firebase.getUid()

            this.props.firebase
                .user(uid)
                .get()
                .then(doc => {
                    let data = doc.data()
                    let username = data.username
                    this.setState({
                        username
                    })
                })

        } catch (error) {
            this.setState({
                email: null
            })
        }
        this.forceUpdate()
    }

    componentWillUnmount() {
        localStorage.setItem('username', JSON.stringify(this.state))
    }


    render() {
        const { username } = this.state
        const dropdownTrigger = (<Button inverted={this.props.inverted} icon="user" content={username} />)
        return (
            <div>
                <AuthUserContext.Consumer>
                    {authUser => (
                        authUser
                            ? <Dropdown trigger={dropdownTrigger} pointing="top right" direction="left">
                                <Dropdown.Menu>

                                    <Dropdown.Item disabled>
                                        <span>
                                            Signed in as <strong>{authUser.email}</strong>
                                        </span>
                                    </Dropdown.Item>

                                    <Dropdown.Item as={Link} to={ROUTES.ACCOUNT}>
                                        <span style={{ color: "black", }}>
                                            <Icon name="user" style={{ color: "black", paddingRight: 5 }} />
                                            Account
                                        </span>
                                    </Dropdown.Item>

                                    <Dropdown.Item as={Link} to={ROUTES.SETTINGS}>
                                        <span style={{ color: "black", width: "100%", display: "block" }}>
                                            <Icon name="settings" style={{ color: "black", paddingRight: 5 }} />
                                            Settings
                                        </span>
                                    </Dropdown.Item>

                                    <Dropdown.Item onClick={() => {
                                        this.setState({
                                            username: ''
                                        })
                                        this.props.firebase.signOut()
                                    }}>
                                        <Icon name="sign out" style={{ color: "black", paddingRight: 5 }} />
                                        <span style={{ color: "black" }}>Sign Out</span>
                                    </Dropdown.Item>

                                </Dropdown.Menu>
                            </Dropdown>

                            : <Link to={ROUTES.SIGN_IN}>
                                <Button inverted={this.props.inverted}>
                                    Sign In
                                </Button>
                            </Link>
                    )}
                </AuthUserContext.Consumer>
            </div>
        )
    }
}

const Account = compose(withRouter, withFirebase)(UserAccount)

export default withFirebase(AccountButton)