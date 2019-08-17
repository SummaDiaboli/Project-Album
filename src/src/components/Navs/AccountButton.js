import React, { Component } from 'react'
import { Button, Dropdown, Icon, } from 'semantic-ui-react';
import { withFirebase } from '../../utils/Firebase';
import { Link, withRouter } from "react-router-dom"
import { compose } from 'recompose';
import { connect } from 'react-redux'

import * as ROUTES from '../../utils/routes';

const AccountButtonBase = ({ inverted }) => (
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
        const { authUser } = this.props
        return (
            <div>
                {
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
                }
            </div>
        )
    }
}

const mapStateToProps = state => ({
    authUser: state.sessionState.authUser,
})

const Account = compose(withRouter,
    withFirebase,
    connect(mapStateToProps)
)(UserAccount)

const AccountButton = compose(
    withFirebase,
)(AccountButtonBase)

export default (AccountButton)