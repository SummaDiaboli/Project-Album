import React, { Component } from 'react'
import { Button, Dropdown, Icon, } from 'semantic-ui-react';
import { withFirebase } from '../Firebase';
import { Link, withRouter } from "react-router-dom"
import * as ROUTES from '../constants/routes';
import { compose } from 'recompose';
import { AuthUserContext } from '../Session';

const AccountButton = ({ inverted }) => (
    <Account inverted={inverted} />
)

class UserAccount extends Component {
    constructor(props) {
        super(props)
        this.state = {
            // username: ''
        }
    }

    componentDidMount() {
        const rehydrate = JSON.parse(localStorage.getItem('savedUsername'))
        this.setState(rehydrate)

        try {
            // const email = this.props.firebase.displayUserEmail()
            const uid = this.props.firebase.getUid()
            // console.log(uid)

            this.props.firebase
                .user(uid)
                .get()
                .then(doc => {
                    let data = doc.data()
                    // console.log(data.username)
                    let username = data.username
                    this.setState({
                        username
                    })
                })

            /* this.setState({
                email
            }) */

        } catch (error) {
            this.setState({
                email: null
            })
        }
        this.forceUpdate()
    }

    componentWillUnmount() {
        localStorage.setItem('savedUsername', JSON.stringify(this.state))
    }


    render() {
        const { username } = this.state
        const dropdownTrigger = (<Button inverted={this.props.inverted} icon="user" content={username} />)
        return (
            <div>
                <AuthUserContext.Consumer>
                    {/* {email === null &&
                        <Link to={ROUTES.SIGN_IN}>
                            <Button inverted={this.props.inverted}>
                                Sign In
                        </Button>
                        </Link>} */}
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
                    {/* {email &&

                        <Dropdown trigger={dropdownTrigger} pointing="top right" direction="left">
                            <Dropdown.Menu>
                                <Dropdown.Item disabled>
                                    <span>
                                        Signed in as <strong>{email}</strong>
                                    </span>
                                </Dropdown.Item>
                                <Link to={ROUTES.ACCOUNT}>
                                    <Dropdown.Item>
                                        <Icon name="user" style={{ color: "black", paddingRight: 5 }} />
                                        <span style={{ color: "black" }}>
                                            Account
                                    </span>
                                    </Dropdown.Item>
                                </Link>
                                <Link to={ROUTES.SETTINGS}>
                                    <Dropdown.Item>
                                        <Icon name="settings" style={{ color: "black", paddingRight: 5 }} />
                                        <span style={{ color: "black" }}>
                                            Settings
                                    </span>
                                    </Dropdown.Item>
                                </Link>
                                <Dropdown.Item onClick={() => {
                                    this.props.firebase.signOut()
                                }}>
                                    <Icon name="sign out" style={{ color: "black", paddingRight: 5 }} />
                                    <span style={{ color: "black" }}>
                                        Sign Out
                                </span>
                                </Dropdown.Item>
                            </Dropdown.Menu>
                        </Dropdown>
                        //     <Link to={ROUTES.ACCOUNT}>
                        // </Link>
                    } */}
                </AuthUserContext.Consumer>
            </div>
        )
    }
}

const Account = compose(withRouter, withFirebase)(UserAccount)

export default withFirebase(AccountButton)