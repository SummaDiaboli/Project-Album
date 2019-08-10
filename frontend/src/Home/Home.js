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
    Segment,
} from 'semantic-ui-react'
import "./Home.css"

import * as ROUTES from '../constants/routes';
import Footer from '../Navs/Footer';
import ResponsiveContainer from '../Navs/Header';
import auth0Client from '../constants/Auth';

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
        <Button primary /* color="orange"  */ style={{ backgroundColor: "#00a226" }} size='huge' onClick={auth0Client.signIn}>
            Get Started
                <Icon name='right arrow' />
        </Button>
    </Container>
)


HomepageHeading.propTypes = {
    mobile: PropTypes.bool
}

export class Home extends Component {

    render() {

        return (
            <ResponsiveContainer
                style={{ minHeight: 700, /* padding: '1em 0em', */ }}
                homeHeading={<HomepageHeading />}
                mobile
                homeActive
            >
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

                <Footer />
            </ResponsiveContainer>
        )
    }
}

export default Home
