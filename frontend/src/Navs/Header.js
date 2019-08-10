import React, { Component } from 'react'
import {
    Button,
    Container,
    Icon,
    Menu,
    Responsive,
    Segment,
    Sidebar,
    Visibility,
    Header,
} from 'semantic-ui-react'
import PropTypes from 'prop-types'
import { Link, withRouter } from "react-router-dom"
import auth0Client from '../constants/Auth';


import * as ROUTES from '../constants/routes'


const getWidth = () => {
    const isSSR = typeof window == 'undefined'

    return isSSR ? Responsive.onlyTablet.minWidth : window.innerWidth
}

const HomepageHeading = ({ mobile }) => (
    <Container text>
        <Header
            as='h1'
            content='Welcome to Project Album'
            inverted
            style={{
                fontSize: mobile ? '2em' : '4em',
                fontWeight: 'normal',
                marginBottom: 0,
                marginTop: mobile ? '1.5em' : '3em',
            }}
        />
        <Header
            as='h2'
            content='Save your memories on the internet'
            inverted
            style={{
                fontSize: mobile ? '1.5em' : '1.7em',
                fontWeight: 'normal',
                marginTop: mobile ? '0.5em' : '0em',
            }}
        />
        {/* <Link to={ROUTES.SIGN_UP}> */}
        <Button primary style={{ backgroundColor: "#00a226" }} size='huge' onClick={auth0Client.signIn}>
            Get Started
                <Icon name='right arrow' />
        </Button>
    </Container>
)

class DesktopContainer extends Component {
    state = {}


    hideFixedMenu = () => this.setState({ fixed: false })
    showFixedMenu = () => this.setState({ fixed: true })

    render() {
        const { children, history } = this.props
        const { fixed } = this.state
        // const { history } = this.props

        const signOut = () => {
            auth0Client.signOut()
            history.replace('/')
        }

        return (
            <Responsive getWidth={getWidth} minWidth={Responsive.onlyTablet.minWidth}>
                <Visibility
                    once={false}
                    onBottomPassed={this.showFixedMenu}
                    onBottomPassedReverse={this.hideFixedMenu}
                >
                    <Segment
                        inverted
                        textAlign='center'
                        style={this.props.style}/* {{ minHeight: 700, padding: '1em 0em', }} */
                        vertical
                    >
                        <Menu
                            fixed={fixed ? 'top' : null}
                            inverted={!fixed}
                            pointing={!fixed}
                            secondary={!fixed}
                            size='large'
                        >
                            <Container>
                                <Menu.Item active={this.props.homeActive}>
                                    <Link to={ROUTES.HOME}>Home</Link>
                                </Menu.Item>
                                <Menu.Item active={this.props.pricingActive}>
                                    <Link to={ROUTES.PRICING}>Pricing</Link>
                                </Menu.Item>
                                {/* <Menu.Item active={this.props.accountActive}>
                                    <Link to={ROUTES.ACCOUNT}>Account</Link>
                                </Menu.Item> */}
                                {
                                    !auth0Client.isAuthenticated() &&
                                    <Menu.Item position="right">
                                        <Button inverted={!fixed} onClick={auth0Client.signIn}>
                                            Sign In
                                        </Button>
                                        {/* <Link to={ROUTES.SIGN_IN}>
                                            <Button inverted={!fixed}>
                                                Log in
                                            </Button>
                                        </Link>

                                        <Link to={ROUTES.SIGN_UP}>
                                            <Button inverted={!fixed}  style={{ marginLeft: '0.5em' }}>
                                                Sign up
                                            </Button>
                                        </Link> */}

                                    </Menu.Item>
                                }
                                {
                                    auth0Client.isAuthenticated() &&
                                    <Menu.Item position="right">
                                        <Link to={ROUTES.ACCOUNT}>
                                            <Button circular inverted={!fixed}>
                                                {auth0Client.getProfile().name}
                                            </Button>
                                        </Link>
                                        <Button circular inverted={!fixed} onClick={signOut}>
                                            Sign Out
                                        </Button>
                                    </Menu.Item>
                                }
                            </Container>
                        </Menu>
                        {this.props.homeHeading}
                    </Segment>
                </Visibility>

                {children}
            </Responsive >
        )
    }
}

DesktopContainer.propTypes = {
    children: PropTypes.node,
    history: PropTypes.object.isRequired
    // homeHeading: PropTypes.node,
}

class MobileContainer extends Component {
    state = {}
    handleSideBarMode = () => this.setState({ sidebarOpened: false })
    handleToggle = () => this.setState({ sidebarOpened: true })

    componentWillMount() {
        if (this.props.homeHeading != null) {
            if (this.props.mobile != null) {
                this.setState({ homepage: true, mobile: true })
            }
        }
    }

    changeStyle() {
        if (this.props.style != null) {
            return 500
        }
    }

    render() {
        const { children, history } = this.props
        const { sidebarOpened } = this.state

        const signOut = () => {
            auth0Client.signOut()
            history.replace('/')
        }

        return (
            <Responsive
                as={Sidebar.Pushable}
                getWidth={getWidth}
                maxWidth={Responsive.onlyMobile.maxWidth}
            >
                <Sidebar
                    as={Menu}
                    animation='push'
                    inverted
                    onHide={this.handleSideBarMode}
                    vertical
                    visible={sidebarOpened}
                >
                    <Link to={ROUTES.HOME}>
                        <Menu.Item active={this.props.homeActive}>
                            Home
                        </Menu.Item>
                    </Link>
                    <Link to={ROUTES.PRICING}>
                        <Menu.Item active={this.props.pricingActive}>
                            Pricing
                        </Menu.Item>
                    </Link>
                    <Link to={ROUTES.ACCOUNT}>
                        <Menu.Item active={this.props.accountActive}>
                            Account
                        </Menu.Item>
                    </Link>
                    {/* <Link to={ROUTES.SIGN_IN} >
                        <Menu.Item>Log in</Menu.Item>
                    </Link>
                    <Link to={ROUTES.SIGN_UP}>
                        <Menu.Item>Sign in</Menu.Item>
                    </Link> */}
                    {
                        !auth0Client.isAuthenticated() &&
                        <Menu.Item onClick={auth0Client.signIn} as="a">
                            Sign In
                            {/* <Link to={ROUTES.SIGN_IN}>
                                            <Button inverted={!fixed}>
                                                Log in
                                            </Button>
                                        </Link>

                                        <Link to={ROUTES.SIGN_UP}>
                                            <Button inverted={!fixed}  style={{ marginLeft: '0.5em' }}>
                                                Sign up
                                            </Button>
                                </Link> */}

                        </Menu.Item>
                    }
                    {
                        auth0Client.isAuthenticated() &&
                        <div>
                            <Menu.Item>
                                <Link to={ROUTES.ACCOUNT}>
                                    {auth0Client.getProfile().name}
                                </Link>
                            </Menu.Item>
                            <Menu.Item onClick={signOut}>
                                Sign Out
                            </Menu.Item>
                        </div>
                    }
                </Sidebar>

                <Sidebar.Pusher dimmed={sidebarOpened}>
                    <Segment
                        inverted
                        textAlign='center'
                        style={{ minHeight: this.changeStyle }}
                        vertical
                    >
                        <Container>
                            <Menu inverted pointing secondary size='large' fixed="top">
                                <Menu.Item onClick={this.handleToggle} position="left" fitted>
                                    <Icon fitted name="sidebar" size="large" />
                                </Menu.Item>
                                <Menu.Item>
                                    {
                                        !auth0Client.isAuthenticated() &&
                                        <div>
                                            <Button inverted onClick={auth0Client.signIn} style={{ margin: 0 }}>
                                                Sign In
                                            </Button>
                                            {/* <Link to={ROUTES.SIGN_IN}>
                                            <Button inverted={!fixed}>
                                                Log in
                                            </Button>
                                        </Link>

                                        <Link to={ROUTES.SIGN_UP}>
                                            <Button inverted={!fixed}  style={{ marginLeft: '0.5em' }}>
                                                Sign up
                                            </Button>
                                        </Link> */}
                                        </div>
                                    }
                                    {
                                        auth0Client.isAuthenticated() &&
                                        <Menu.Item position="right">
                                            <Link to={ROUTES.ACCOUNT}>
                                                <Button circular inverted>
                                                    {auth0Client.getProfile().name}
                                                </Button>
                                            </Link>
                                        </Menu.Item>
                                    }
                                </Menu.Item>
                            </Menu>
                        </Container>
                        {/* {this.props.homeHeading} */}
                        {this.state.homepage && <HomepageHeading mobile />}
                    </Segment>

                    {children}
                </Sidebar.Pusher>
            </Responsive>
        );
    }
}

MobileContainer.propTypes = {
    children: PropTypes.node,
    history: PropTypes.object.isRequired
}

const ResponsiveContainer = ({ children, homeHeading, style, homeActive, pricingActive, accountActive, mobile }) => (
    <div>
        <DesktopWithRouter
            homeActive={homeActive}
            pricingActive={pricingActive}
            // accountActive={accountActive}
            style={style}
            homeHeading={homeHeading}
        >
            {children}
        </DesktopWithRouter>
        <MobileWithRouter
            homeActive={homeActive}
            pricingActive={pricingActive}
            accountActive={accountActive}
            style={style}
            homeHeading={homeHeading}
            mobile={mobile}
        >
            {children}
        </MobileWithRouter>
    </div>
)

ResponsiveContainer.propTypes = {
    children: PropTypes.node,
    homeHeading: PropTypes.node
}

const DesktopWithRouter = withRouter(DesktopContainer)
const MobileWithRouter = withRouter(MobileContainer)

export default withRouter(ResponsiveContainer);