import PropTypes from 'prop-types'
import React, { Component } from 'react'
import { Link } from "react-router-dom"
import {
    Button,
    Container,
    Divider,
    Grid,
    Header,
    Icon,
    Image,
    List,
    Menu,
    Responsive,
    Segment,
    Sidebar,
    Visibility,
} from 'semantic-ui-react'
import "./Home.css"

import * as ROUTES from '../constants/routes';

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
        <Link to={ROUTES.SIGN_UP}>
            <Button primary /* color="orange"  */ style={{ backgroundColor: "#00a226" }} size='huge'>
                Get Started
                <Icon name='right arrow' />
            </Button>
        </Link>
    </Container>
)


HomepageHeading.propTypes = {
    mobile: PropTypes.bool
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
                        style={{ minHeight: 700, /* padding: '1em 0em', */ }}
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
                                <Menu.Item active>
                                    <Link to={ROUTES.HOME}>Home</Link>
                                </Menu.Item>
                                <Menu.Item>
                                    <Link to={ROUTES.PRICING}>Pricing</Link>
                                </Menu.Item>
                                <Menu.Item position="right">
                                    <Link to={ROUTES.SIGN_IN}><Button inverted={!fixed}>
                                        Log in
                                    </Button>
                                    </Link>
                                    <Link to={ROUTES.SIGN_UP}>
                                        <Button inverted={!fixed} /* primary={!fixed} */ style={{ marginLeft: '0.5em' }}>
                                            Sign up
                                        </Button>
                                    </Link>
                                </Menu.Item>
                            </Container>
                        </Menu>
                        <HomepageHeading />
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
                        <Menu.Item active>
                            Home
                        </Menu.Item>
                    </Link>
                    <Link to={ROUTES.PRICING}>
                        <Menu.Item>
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
                        style={{ minHeight: 350, padding: '1em 0em' }}
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
                        <HomepageHeading mobile />
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

export class Home extends Component {

    render() {

        return (
            <ResponsiveContainer>
                <Segment style={{ padding: '8em 0em' }} vertical>
                    <Grid container stackable verticalAlign="middle">
                        <Grid.Row>
                            <Grid.Column width={8}>
                                <Header as='h3' style={{ fontSize: '2em' }}>
                                    We make sure your precious memories are never lost
                                </Header>
                                <p style={{ fontSize: '1.33em' }}>
                                    We give your family something no one else can do...
                                    An album on the internet that can be shared with whoever
                                    you want
                                </p>
                                <Header as='h3' style={{ fontSize: '2em' }}>
                                    We Store Your Memories on the Internet
                                </Header>
                                <p style={{ fontSize: '1.33em' }}>
                                    Yes, that's right, you thought it was the stuff of dreams,
                                    but your grandma can now share your baby pictures with whomever
                                    she wants
                                </p>
                            </Grid.Column>
                            <Grid.Column floated="right" width={6}>
                                <Image bordered rounded size='large' src={require('../assets/images/album.jpeg')} />
                            </Grid.Column>
                        </Grid.Row>
                        <Grid.Row>
                            <Grid.Column textAlign='center'>
                                <Link to={ROUTES.ERROR404}>
                                    <Button size='huge'>Check it out</Button>
                                </Link>
                            </Grid.Column>
                        </Grid.Row>
                    </Grid>
                </Segment>

                <Segment style={{ padding: '0em' }} vertical>
                    <Grid celled='internally' columns='equal' stackable>
                        <Grid.Row textAlign='center'>
                            <Grid.Column style={{ paddingBottom: '5em', paddingTop: '5em' }}>
                                <Header as='h3' style={{ fontSize: '2em' }}>
                                    "This is amazing!"
                                </Header>
                                <p style={{ fontSize: '1.33em' }}>
                                    That is what they all say
                                </p>
                            </Grid.Column>
                            <Grid.Column style={{ paddingBottom: '5em', paddingTop: '5em' }}>
                                <Header as="h3" style={{ fontSize: '2em' }}>
                                    "I should move all my pictures from Google Drive"
                                </Header>
                                <p style={{ fontSize: '1.33em' }}>
                                    <Image avatar src={require('../assets/images/avatar.png')} />
                                    <b>Nan</b> Chief Grandchild Embarasser
                                </p>
                            </Grid.Column>
                        </Grid.Row>
                    </Grid>
                </Segment>

                <Segment style={{ padding: '8em 0em' }} vertical >
                    <Container text>
                        <Header as='h3' style={{ fontSize: '2em' }}>
                            Preserve intimacy
                        </Header>
                        <p style={{ fontSize: '1.33em' }}>
                            We have learned about the impact pictures have on relationships.
                            The memories we make deserve to last forever, ready for us to retrieve
                            whenever we need them.
                        </p>
                        <Link to="/error404/">
                            <Button size="large">
                                Read More
                            </Button>
                        </Link>

                        <Divider
                            as="h4"
                            className="header"
                            horizontal
                            style={{ margin: '3em 0em', textTransform: 'uppercase' }}
                        >
                            <Link to="/error404/">
                                Sample Albums
                            </Link>
                        </Divider>

                        <Header as='h3' style={{ fontSize: '2em' }}>
                            Customizable Albums
                        </Header>
                        <p style={{ fontSize: '1.33em' }}>
                            It took a lot of effort, but you can customize your albums
                            from the picture sizes to the shapes to the frames
                        </p>
                        <Link to="/error404/">
                            <Button size='large'>
                                I'm Still Quite Interested
                            </Button>
                        </Link>
                    </Container>
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
        )
    }
}

export default Home
