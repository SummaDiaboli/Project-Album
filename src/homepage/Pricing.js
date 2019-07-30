import React, { Component } from 'react'
import PropTypes from 'prop-types'
import {
    Segment,
    Container,
    Responsive,
    Visibility,
    Menu,
    Button,
    Icon,
    Sidebar,
    Divider
} from 'semantic-ui-react'
import { Link } from "react-router-dom"
import FeaturesSection from './PricingSections/FeaturesSection'
import PricingSection from './PricingSections/PricingSection'

const getWidth = () => {
    const isSSR = typeof window == 'undefined'

    return isSSR ? Responsive.onlyTablet.minWidth : window.innerWidth
}

class DesktopContainer extends Component {
    state = {}

    hideFixedMenu = () => this.setState({ fixed: false })
    showFixedMenu = () => this.setState({ fixed: true })

    render() {
        const { children } = this.props
        const { fixed } = this.state

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
                        // style={{ minHeight: 700, /* padding: '1em 0em', */ }}
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
                                <Menu.Item>
                                    <Link to='/home'>Home</Link>
                                </Menu.Item>
                                <Menu.Item active>
                                    <Link to='/pricing'>Pricing</Link>
                                </Menu.Item>
                                <Menu.Item position="right">
                                    <Link to='/login'><Button inverted={!fixed}>
                                        Log in
                                    </Button>
                                    </Link>
                                    <Link to='/sign-up'>
                                        <Button
                                            inverted={!fixed}
                                            primary={!fixed}
                                            style={{ marginLeft: '0.5em' }}
                                        >
                                            Sign up
                                        </Button>
                                    </Link>
                                </Menu.Item>
                            </Container>
                        </Menu>
                    </Segment>
                </Visibility>

                {children}
            </Responsive>
        )
    }
}

DesktopContainer.propTypes = {
    children: PropTypes.node,
}

class MobileContainer extends Component {
    state = {}
    handleSideBarMode = () => this.setState({ sidebarOpened: false })
    handleToggle = () => this.setState({ sidebarOpened: true })

    render() {
        const { children } = this.props
        const { sidebarOpened } = this.state
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
                    <Link to="/home">
                        <Menu.Item>
                            Home
                        </Menu.Item>
                    </Link>
                    <Link to="/pricing">
                        <Menu.Item active>
                            Pricing
                        </Menu.Item>
                    </Link>
                    <Link to='/login' >
                        <Menu.Item>Log in</Menu.Item>
                    </Link>
                    <Link to='/sign-up'>
                        <Menu.Item>Sign in</Menu.Item>
                    </Link>
                </Sidebar>

                <Sidebar.Pusher dimmed={sidebarOpened}>
                    <Segment
                        inverted
                        textAlign='center'
                        // style={{ minHeight: 350, padding: '1em 0em' }}
                        vertical
                    >
                        <Container>
                            <Menu inverted pointing secondary size='large'>
                                <Menu.Item onClick={this.handleToggle} position="left" fitted>
                                    <Icon fitted name="sidebar" size="large" />
                                </Menu.Item>
                                <Menu.Item position='right'>
                                    <Link to="/login">
                                        <Button inverted>
                                            Log in
                                        </Button>
                                    </Link>

                                    <Link to="/sign-up">
                                        <Button inverted style={{ marginLeft: '0.5em' }}>
                                            Sign up
                                        </Button>
                                    </Link>
                                </Menu.Item>
                            </Menu>
                        </Container>
                    </Segment>

                    {children}
                </Sidebar.Pusher>
            </Responsive>
        );
    }
}

MobileContainer.propTypes = {
    children: PropTypes.node,
}

const ResponsiveContainer = ({ children }) => (
    <div>
        <DesktopContainer>{children}</DesktopContainer>
        <MobileContainer>{children}</MobileContainer>
    </div>
)

ResponsiveContainer.propTypes = {
    children: PropTypes.node,
}





class Pricing extends Component {
    state = {
        subscribed: true
    }
    handleSubscription = () => this.setState({ subscribed: !this.subscribed })

    render() {
        document.title = "Pricing"
        return (
            <div>
                <ResponsiveContainer>
                    <Segment style={{ padding: '1vh 8vw' }} vertical>
                        <Segment style={{ padding: '3em 2em' }}>
                            <PricingSection />

                            <Divider section />

                            <FeaturesSection />

                        </Segment>
                    </Segment>
                </ResponsiveContainer>
            </div >
        )
    }
}

export default Pricing
