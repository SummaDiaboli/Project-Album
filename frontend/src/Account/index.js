import React, { Component } from 'react';
import {
    /* Button,
    Icon, */
    Segment,
    Grid,
    // Image,
    Card,
    // Loader,
    Menu,
    Input,
    Button,
    Placeholder
} from 'semantic-ui-react'
import { Link } from "react-router-dom";
import ResponsiveContainer from '../Navs/Header';
import Footer from '../Navs/Footer';
import axios from 'axios'
import * as ROUTES from '../constants/routes';
import { withAuthorization } from '../Session';

class Account extends Component {
    constructor(props) {
        super(props);

        this.state = {
            albums: null,
            activeMenuItem: 'newest'
        }
    }

    async componentDidMount() {
        const albums = (await axios.get('http://localhost:8081/')).data
        this.setState({
            albums
        })
    }

    /* async componentDidMount() {
        const albums = (await axios.get('http://localhost:5001/')).data
        this.setState({
            albums
        })
    } */

    handleMenuItemClick = (e, { name }) => this.setState({ activeMenuItem: name })

    createPlaceholders = () => {
        let placeholders = []

        for (let i = 0; i < 8; i++) {
            placeholders.push(
                <Card key={i} raised style={{ minHeight: 150, margin: 15 }}>
                    <Card.Content>
                        <Card.Header>
                            <Placeholder>
                                <Placeholder.Header>
                                    <Placeholder.Line length="very long" />
                                </Placeholder.Header>
                            </Placeholder>
                        </Card.Header>
                        <Card.Meta style={{ marginBottom: 15, marginTop: 10 }}>
                            <Placeholder>
                                <Placeholder.Line length="medium" />
                            </Placeholder>
                        </Card.Meta>
                        <Card.Description>
                            <Placeholder>
                                <Placeholder.Paragraph>
                                    <Placeholder.Line length="very long" />
                                    <Placeholder.Line length="long" />
                                    <Placeholder.Line length="long" />
                                    <Placeholder.Line length="long" />
                                </Placeholder.Paragraph>
                            </Placeholder>
                        </Card.Description>
                    </Card.Content>
                </Card>
            )
        }

        return placeholders
    }

    render() {
        return (
            <div>
                <ResponsiveContainer accountActive style={{ minHeight: 70 }}>
                    <Segment vertical style={{ minHeight: 700 }}>
                        <Segment style={{ width: "100%" }}>
                            <Grid
                                // stackable
                                // container
                                celled="internally"
                                style={{ minHeight: 700, /* marginRight: 10 */ }}
                            >
                                <Grid.Column>
                                    <Menu stackable borderless>
                                        <Menu.Item header>Sort By</Menu.Item>
                                        <Menu.Item
                                            name='newest'
                                            active={this.state.activeMenuItem === 'newest'}
                                            color="green"
                                            onClick={this.handleMenuItemClick}
                                        />
                                        <Menu.Item
                                            name='oldest'
                                            active={this.state.activeMenuItem === 'oldest'}
                                            color="green"
                                            onClick={this.handleMenuItemClick}
                                        />
                                        <Menu.Item
                                            name='mostPictures'
                                            active={this.state.activeMenuItem === 'mostPictures'}
                                            color="green"
                                            onClick={this.handleMenuItemClick}
                                        />
                                        <Menu.Item
                                            name='fewestPictures'
                                            active={this.state.activeMenuItem === 'fewestPictures'}
                                            color="green"
                                            onClick={this.handleMenuItemClick}
                                        />
                                        <Menu.Menu position="right">
                                            <Menu.Item position="right">
                                                <Link to={ROUTES.NEWALBUM}>
                                                    <Button icon="plus" />
                                                </Link>
                                            </Menu.Item>
                                            <Menu.Item>
                                                <Input icon="search" placeholder="Search..." />
                                            </Menu.Item>

                                        </Menu.Menu>
                                    </Menu>

                                    <Grid.Row style={{ clear: "both", paddingTop: "10px" }} >
                                        <Card.Group>
                                            {
                                                this.state.albums === null &&

                                                this.createPlaceholders()

                                                // {/* <Loader active inline="centered" indeterminate>
                                                //     Getting Albums
                                                // </Loader> */}
                                            }
                                            {
                                                this.state.albums && this.state.albums.map((album, index) => (
                                                    <Link to={`/album/${album.id}`} key={index}>
                                                        <Card color="green" style={{ margin: 10 }}>
                                                            <Card.Content>
                                                                <Card.Header>
                                                                    {album.title}
                                                                </Card.Header>
                                                                <Card.Meta>{album.pictures} pictures</Card.Meta>
                                                                <Card.Description>{album.description}</Card.Description>
                                                            </Card.Content>
                                                        </Card>
                                                    </Link>
                                                ))
                                            }
                                        </Card.Group>
                                    </Grid.Row>
                                </Grid.Column>
                            </Grid>
                        </Segment>
                    </Segment>

                    <Footer />
                </ResponsiveContainer>
            </div>
        );
    }
}

const condition = authUser => !!authUser

export default withAuthorization(condition)(Account);