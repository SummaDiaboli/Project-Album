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
    Divider,
    Grid,
    Header,
    List
} from 'semantic-ui-react'
import { Link } from "react-router-dom"
import FeaturesSection from './PricingSections/FeaturesSection'
import PricingSection from './PricingSections/PricingSection'
import FAQSection from './PricingSections/FAQSection';

import * as ROUTES from '../constants/routes';


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
                                    <Link to={ROUTES.HOME}>Home</Link>
                                </Menu.Item>
                                <Menu.Item active>
                                    <Link to={ROUTES.PRICING}>Pricing</Link>
                                </Menu.Item>
                                <Menu.Item position="right">
                                    <Link to={ROUTES.SIGN_IN}><Button inverted={!fixed}>
                                        Log in
                                    </Button>
                                    </Link>
                                    <Link to={ROUTES.SIGN_UP}>
                                        <Button
                                            inverted={!fixed}
                                            // primary={!fixed}
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
                    <Link to={ROUTES.HOME}>
                        <Menu.Item>
                            Home
                        </Menu.Item>
                    </Link>
                    <Link to={ROUTES.PRICING}>
                        <Menu.Item active>
                            Pricing
                        </Menu.Item>
                    </Link>
                    <Link to={ROUTES.SIGN_IN} >
                        <Menu.Item>Log in</Menu.Item>
                    </Link>
                    <Link to={ROUTES.SIGN_UP}>
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
                                    <Link to={ROUTES.SIGN_IN}>
                                        <Button inverted>
                                            Log in
                                        </Button>
                                    </Link>

                                    <Link to={ROUTES.SIGN_UP}>
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
                    <Segment /* style={{ padding: '1vh 8vw' }} */ vertical>
                        <Segment style={{ padding: '3em 2em' }}>
                            <PricingSection />

                            <Divider section />

                            <FeaturesSection />

                            <Divider section />

                            <FAQSection />

                        </Segment>
                    </Segment>

                    <Segment inverted vertical style={{ padding: '5em 0em' }}>
                        <Container>
                            <Grid divided inverted stackable>
                                <Grid.Row>
                                    <Grid.Column width={3}>
                                        <Header inverted as='h4' content='About' />
                                        <List link inverted>
                                            <Link className="subnav_link" to={ROUTES.PRICING}>Pricing</Link>
                                            <List.Item as='a'>Contact Us</List.Item>
                                            <List.Item as='a'>Terms of Service</List.Item>
                                            <List.Item as='a'>Privacy Policy</List.Item>
                                        </List>
                                    </Grid.Column>
                                    <Grid.Column width={7}>
                                        <Header as='h4' inverted>
                                            Ipsum
                                    </Header>
                                        <p>
                                            Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                                            Nullam a hendrerit tortor. Vestibulum ornare finibus felis vel dignissim.
                                    </p>
                                    </Grid.Column>
                                </Grid.Row>
                            </Grid>
                        </Container>
                    </Segment>
                </ResponsiveContainer>
            </div >
        )
    }
}

export default Pricing
