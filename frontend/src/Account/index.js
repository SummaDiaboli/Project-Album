import React, { Component } from 'react';
import {
    Segment,
    Grid,
    // Card,
    Menu,
    Input,
    Button,
    // Placeholder
} from 'semantic-ui-react'
import { Link, withRouter } from "react-router-dom";
import { withAuthorization } from '../Session';
import { Footer, ResponsiveContainer } from '../Navs'

import * as ROUTES from '../constants/routes';
import { compose } from 'recompose';
import { withFirebase } from '../Firebase';
import { AlbumList } from '../Album';

class AccountBase extends Component {
    constructor(props) {
        super(props);

        this.state = {
            activeMenuItem: 'newest',
            loading: false,
        }
    }

    handleMenuItemClick = (e, { name }) => this.setState({ activeMenuItem: name })

    render() {
        return (
            <div>
                <ResponsiveContainer accountActive style={{ minHeight: 70 }}>
                    <Segment vertical style={{ minHeight: 700 }}>
                        <Segment style={{ width: "100%" }}>
                            <Grid
                                celled="internally"
                                style={{ minHeight: 700, }}
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
                                        {/* <Card.Group> */}
                                        <AlbumList />
                                        {/* </Card.Group> */}
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
const Account = compose(
    withRouter,
    withFirebase,
    withAuthorization(condition),
)(AccountBase)

export default (Account);