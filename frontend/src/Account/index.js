import React, { Component } from 'react';
import {
    /* Button,
    Icon, */
    Segment,
    Grid,
    // Image,
    Card,
    Loader,
    Menu,
    Input,
    Button
} from 'semantic-ui-react'
import { Link } from "react-router-dom";
import ResponsiveContainer from '../Navs/Header';
import Footer from '../Navs/Footer';
import axios from 'axios'
import * as ROUTES from '../constants/routes';

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

    render() {
        document.title = "Account"
        return (
            <div>
                <ResponsiveContainer accountActive>
                    <Segment vertical style={{ minHeight: 700 }}>
                        <Grid
                            stackable
                            container
                            celled="internally"
                            style={{ minHeight: 700 }}
                        >
                            <Segment style={{ width: "100%" }}>
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
                                                <Loader active inline="centered" indeterminate>
                                                    Getting Albums
                                                </Loader>
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
                            </Segment>
                        </Grid>
                    </Segment>

                    <Footer />
                </ResponsiveContainer>
            </div>
        );
    }
}

export default Account;