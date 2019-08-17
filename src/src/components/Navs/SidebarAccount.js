import React, { Component } from 'react'
import { Menu } from 'semantic-ui-react'
import { Link, withRouter } from 'react-router-dom'
import { connect } from 'react-redux'
import { compose } from 'recompose'
import { withFirebase } from '../../utils/Firebase'

import * as ROUTES from '../../utils/routes'

class SidebarAccountBase extends Component {
    constructor(props) {
        super(props)
        this.state = {}
    }

    componentDidMount() {
        const rehydrate = JSON.parse(localStorage.getItem('savedUsername'))
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
        localStorage.setItem('savedUsername', JSON.stringify(this.state))
    }

    render() {
        const { username } = this.state
        const { authUser } = this.props
        return (
            <div>
                {
                    authUser
                        ? <Menu.Item>
                            {username}

                            <Menu.Menu>
                                <Menu.Item>
                                    Signed in as <strong>{authUser.email}</strong>
                                </Menu.Item>

                                <Menu.Item
                                    as={Link}
                                    to={ROUTES.ACCOUNT}
                                    style={{
                                        fontSize: 14,
                                        paddingLeft: 30,
                                        paddingBottom: 10,
                                        color: "rgba(255,255,255,.9)"
                                    }}>
                                    Account
                                </Menu.Item>

                                <Menu.Item
                                    as={Link}
                                    to={ROUTES.SETTINGS}
                                    style={{
                                        fontSize: 14,
                                        paddingLeft: 30,
                                        paddingBottom: 10,
                                        color: "rgba(255,255,255,.9)"
                                    }}>
                                    Settings
                                </Menu.Item>

                                <Menu.Item
                                    onClick={() => {
                                        this.setState({
                                            username: ''
                                        })
                                        this.props.firebase.signOut()
                                    }}
                                    to={ROUTES.ACCOUNT}
                                    style={{
                                        fontSize: 14,
                                        paddingLeft: 30,
                                        color: "rgba(255,255,255,.9)"
                                    }}
                                >
                                    Sign Out
                                </Menu.Item>
                            </Menu.Menu>
                        </Menu.Item>

                        : <Menu.Item as={Link} to={ROUTES.SIGN_IN}>
                            Sign In
                        </Menu.Item>

                }
            </div>
        );
    }
}

const mapStateToProps = state => ({
    authUser: state.sessionState.authUser,
})

const SidebarAccount = compose(
    withRouter,
    withFirebase,
    connect(mapStateToProps)
)(SidebarAccountBase)

export default SidebarAccount;