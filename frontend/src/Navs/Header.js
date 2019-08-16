import React, { Component, } from 'react'
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

import * as ROUTES from '../constants/routes'
import AccountButton from './AccountButton';
import { compose } from 'recompose';
import { withFirebase } from '../Firebase';
import SidebarAccount from './SidebarAccount';

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
        <Button primary style={{ backgroundColor: "#00a226" }} size='huge' as={Link} to={ROUTES.SIGN_IN}>
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
        const { children, /* history */ } = this.props
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
                        style={this.props.style}
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

                                <Menu.Item position="right">
                                    <AccountButton inverted={!fixed} />
                                </Menu.Item>

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
}

class MobileContainer extends Component {
    state = {}
    handleSideBarMode = () => this.setState({ sidebarOpened: false })
    handleToggle = () => this.setState({ sidebarOpened: true })

    componentWillMount() {
        if (this.props.homeHeading != null) {
            if (this.props.mobile != null) {
                this.setState({ homepage: true, mobile: true, minHeight: 340 })
            } else {
                this.setState({ minHeight: "100vh" })
            }
        } else {
            this.setState({ minHeight: 60 })
        }
    }

    changeStyle() {
        if (this.props.style != null && this.props.homeActive != null) {
            // return 500
            return { minHeight: 500 }
        } else {
            return this.props.style
        }
    }

    render() {
        const { children, /* history  */ } = this.props
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
                    fixed="left"
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

                    <SidebarAccount />
                </Sidebar>

                <Sidebar.Pusher dimmed={sidebarOpened}>

                    <Segment
                        inverted
                        textAlign='center'
                        // style={this.props.style}
                        style={{ minHeight: this.state.minHeight }}
                        vertical
                    >
                        <Container>
                            <Menu inverted pointing secondary size='large' fixed="top">
                                <Menu.Item onClick={this.handleToggle} position="left" fitted>
                                    <Icon fitted name="sidebar" size="large" />
                                </Menu.Item>
                            </Menu>
                        </Container>
                        {/* {this.props.homeHeading} */}
                        {this.state.homepage && <HomepageHeading mobile />}
                    </Segment>


                    {children}
                </Sidebar.Pusher>
            </Responsive >
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

const DesktopWithRouter = compose(withRouter, withFirebase)(DesktopContainer)
const MobileWithRouter = compose(withRouter, withFirebase)(MobileContainer)

export default withRouter(ResponsiveContainer);