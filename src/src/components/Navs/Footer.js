import React, { Component } from 'react';
import { Segment, Container, Grid, Header, List } from 'semantic-ui-react'
import { Link } from "react-router-dom"
import * as ROUTES from '../../utils/routes';


class Footer extends Component {
    render() {
        return (
            <div>
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
            </div>
        );
    }
}

export default Footer;