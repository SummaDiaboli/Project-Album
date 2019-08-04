import React, { Component } from 'react';
import PropTypes from 'prop-types'
import {
    Responsive,
    Container,
    Header,
    Button,
    Icon,
    Visibility,
    Segment,
    Menu,
    Sidebar,
    Grid,
    List,
    Card,
    Image
} from 'semantic-ui-react'
import { Link } from 'react-router-dom'

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
                                <Menu.Item>
                                    <Link to={ROUTES.PRICING}>Pricing</Link>
                                </Menu.Item>
                                <Menu.Item active>
                                    <Link to={ROUTES.ACCOUNT}>Account</Link>
                                </Menu.Item>
                                <Menu.Item position="right">
                                    <Link to={ROUTES.ERROR404}>
                                        <Button icon="user" inverted={!fixed} content="SummaDiaboli" circular />
                                    </Link>
                                    <Link to={ROUTES.ERROR404}>
                                        <Button inverted={!fixed} circular content="Sign Out" />
                                    </Link>
                                    {/* <Link to='/signin'><Button inverted={!fixed}>
                                        Log in
                                    </Button>
                                    </Link>
                                    <Link to='/signup'>
                                        <Button
                                            inverted={!fixed}
                                            // primary={!fixed}
                                            style={{ marginLeft: '0.5em' }}
                                        >
                                            Sign up
                                        </Button>
                                    </Link> */}
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
                        <Menu.Item>
                            Pricing
                        </Menu.Item>
                    </Link>
                    <Link to={ROUTES.ACCOUNT}>
                        <Menu.Item active>
                            Account
                        </Menu.Item>
                    </Link>
                    <Link to={ROUTES.SIGN_IN} >
                        <Menu.Item>Sign out</Menu.Item>
                    </Link>
                    {/* <Link to='/signup'>
                        <Menu.Item>Sign in</Menu.Item>
                    </Link> */}
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
                                    <Link to={ROUTES.ERROR404}>
                                        <Button icon="user" inverted content="SummaDiaboli" circular />
                                    </Link>
                                    <Link to={ROUTES.ERROR404}>
                                        <Button icon="setting" inverted circular />
                                    </Link>
                                    {/* <Link to="/signin">
                                        <Button inverted>
                                            Log in
                                        </Button>
                                    </Link>

                                    <Link to="/signup">
                                        <Button inverted style={{ marginLeft: '0.5em' }}>
                                            Sign up
                                        </Button>
                                    </Link> */}
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



class Account extends Component {
    render() {
        document.title = "Account"
        return (
            <div>
                <ResponsiveContainer>
                    <Segment vertical /* style={{ height: "100vh" }} */>
                        <Grid
                            stackable
                            container
                            celled="internally"
                        >
                            <Segment
                                style={{
                                    padding: '3em 2em',
                                    maxWidth: 180,
                                    marginLeft: "0.5em",
                                    marginTop: "1em"
                                }}
                            >
                                <Grid.Column floated="left">
                                    <Button style={{ width: "8em", marginBottom: "10px" }}>
                                        <Icon name="images" />
                                        Albums
                                    </Button >

                                    <Button style={{ width: "8em", marginBottom: "10px" }}>
                                        <Icon name="file image" />
                                        Photos
                                    </Button>

                                    <Button style={{ width: "8em", marginBottom: "10px" }}>
                                        <Icon name="video" />
                                        Videos
                                    </Button>
                                </Grid.Column>
                            </Segment>

                            <Segment style={{ width: "80%", marginLeft: "1em", marginBottom: "1em" }}>
                                <Grid.Column /* style={{ height: "100vh" }} */ >
                                    <Grid.Row style={{ verticalAlign: "top", float: "right" }} /* verticalAlign="top"  */ textAlign="right" >
                                        <Button icon="filter" />
                                        <Button icon="sort amount down" />
                                        <Button icon="ellipsis vertical" />
                                    </Grid.Row>

                                    <Grid.Row style={{ clear: "both", paddingTop: "10px" }} >
                                        <Card.Group>
                                            <Card style={{ maxWidth: "10em" }} href="#">
                                                <Image src='https://react.semantic-ui.com/images/avatar/large/matthew.png' size="small" />
                                                <Card.Content >
                                                    <Card.Header>Matthew</Card.Header>
                                                    <Card.Meta>
                                                        <span className='date'>Created in 2015</span>
                                                    </Card.Meta>
                                                    <Card.Description >
                                                        Pictures of my grandson
                                                </Card.Description>
                                                </Card.Content>
                                            </Card>

                                            <Card style={{ maxWidth: "10em" }} href="#">
                                                <Image src='https://react.semantic-ui.com/images/avatar/large/matthew.png' size="small" />
                                                <Card.Content >
                                                    <Card.Header>Matthew</Card.Header>
                                                    <Card.Meta>
                                                        <span className='date'>Created in 2015</span>
                                                    </Card.Meta>
                                                    <Card.Description >
                                                        Pictures of my grandson
                                                </Card.Description>
                                                </Card.Content>
                                            </Card>

                                            <Card style={{ maxWidth: "10em" }} href="#">
                                                <Image src='https://react.semantic-ui.com/images/avatar/large/matthew.png' size="small" />
                                                <Card.Content >
                                                    <Card.Header>Matthew</Card.Header>
                                                    <Card.Meta>
                                                        <span className='date'>Created in 2015</span>
                                                    </Card.Meta>
                                                    <Card.Description >
                                                        Pictures of my grandson
                                                </Card.Description>
                                                </Card.Content>
                                            </Card>

                                            <Card style={{ maxWidth: "10em" }} href="#">
                                                <Image src='https://react.semantic-ui.com/images/avatar/large/matthew.png' size="small" />
                                                <Card.Content >
                                                    <Card.Header>Matthew</Card.Header>
                                                    <Card.Meta>
                                                        <span className='date'>Created in 2015</span>
                                                    </Card.Meta>
                                                    <Card.Description >
                                                        Pictures of my grandson
                                                </Card.Description>
                                                </Card.Content>
                                            </Card>

                                            <Card style={{ maxWidth: "10em" }} href="#">
                                                <Image src='https://react.semantic-ui.com/images/avatar/large/matthew.png' size="small" />
                                                <Card.Content >
                                                    <Card.Header>Matthew</Card.Header>
                                                    <Card.Meta>
                                                        <span className='date'>Created in 2015</span>
                                                    </Card.Meta>
                                                    <Card.Description >
                                                        Pictures of my grandson
                                                </Card.Description>
                                                </Card.Content>
                                            </Card>

                                            <Card style={{ maxWidth: "10em" }} href="#">
                                                <Image src='https://react.semantic-ui.com/images/avatar/large/matthew.png' size="small" />
                                                <Card.Content >
                                                    <Card.Header>Matthew</Card.Header>
                                                    <Card.Meta>
                                                        <span className='date'>Created in 2015</span>
                                                    </Card.Meta>
                                                    <Card.Description >
                                                        Pictures of my grandson
                                                </Card.Description>
                                                </Card.Content>
                                            </Card>
                                        </Card.Group>
                                    </Grid.Row>
                                </Grid.Column>
                            </Segment>
                        </Grid>
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
            </div>
        );
    }
}

export default Account;