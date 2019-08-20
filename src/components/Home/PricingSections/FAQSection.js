import React, { Component } from 'react';
import { Grid, Header, Container, Icon, Button } from 'semantic-ui-react';
import { Link } from 'react-router-dom'

class FAQSection extends Component {
    render() {
        return (
            <div>
                <Grid stackable container columns="2">
                    <Grid.Row style={{ paddingBottom: 30 }} centered>
                        <Header as="h1">
                            Common Questions
                        </Header>
                    </Grid.Row>

                    <Grid.Column style={{ paddingLeft: 40, paddingRight: 40 }}>
                        <Container style={{ paddingBottom: 30, fontSize: 16 }}>
                            <Header as="h3">
                                Can I trial Project Album before paying?
                            </Header>

                            <p style={{ color: "grey" }}>
                                Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                                In tincidunt ornare facilisis. Aliquam laoreet sem dolor,
                                dictum mollis massa dapibus eu.
                            </p>
                        </Container>

                        <Container style={{ paddingBottom: 30, fontSize: 16 }}>
                            <Header as="h3">
                                What can I do with an album?
                            </Header>

                            <p style={{ color: "grey" }}>
                                Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                                In tincidunt ornare facilisis. Aliquam laoreet sem dolor,
                                dictum mollis massa dapibus eu.
                            </p>
                        </Container>

                        <Container style={{ paddingBottom: 30, fontSize: 16 }}>
                            <Header as="h3">
                                Can I frame my album?
                            </Header>

                            <p style={{ color: "grey" }}>
                                Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                                In tincidunt ornare facilisis. Aliquam laoreet sem dolor,
                                dictum mollis massa dapibus eu.
                            </p>
                        </Container>

                        <Container style={{ paddingBottom: 30, fontSize: 16 }}>
                            <Header as="h3">
                                Does Project Album have an API?
                            </Header>

                            <p style={{ color: "grey" }}>
                                Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                                In tincidunt ornare facilisis. Aliquam laoreet sem dolor,
                                dictum mollis massa dapibus eu.
                            </p>
                        </Container>

                        <Container style={{ paddingBottom: 30, fontSize: 16 }}>
                            <Header as="h3">
                                Is there an accompanying mobile app?
                            </Header>

                            <p style={{ color: "grey" }}>
                                Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                                In tincidunt ornare facilisis. Aliquam laoreet sem dolor,
                                dictum mollis massa dapibus eu.
                            </p>
                        </Container>
                    </Grid.Column>

                    <Grid.Column style={{ paddingRight: 40 }}>
                        <Container style={{ borderRadius: 7, border: "2px solid rgba(34,36,38,.15)", }}>
                            <Header as="h3" style={{ paddingTop: 30, paddingLeft: 20 }}>
                                <Icon name="comment alternate outline" />
                                Need help with anything?
                            </Header>

                            <p style={{ paddingLeft: 20, fontSize: 15, paddingRight: 20 }}>
                                We're here to help with any questions you have about
                                plans, pricing, and supported features.
                            </p>

                            <Container style={{ paddingLeft: 20, paddingBottom: 20, paddingTop: 10 }}>
                                <Link to="/error404">
                                    <Button basic color="green">
                                        <Icon name="envelope" />
                                        info@project-album.com
                                    </Button>
                                </Link>
                            </Container>
                        </Container>

                        <Container style={{ paddingTop: 30, paddingBottom: 30, fontSize: 16 }}>
                            <Header as="h3">
                                Can I import pictures and videos from Google Drive or iCloud?
                            </Header>

                            <p style={{ color: "grey" }}>
                                Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                                In tincidunt ornare facilisis. Aliquam laoreet sem dolor,
                                dictum mollis massa dapibus eu.
                            </p>
                        </Container>

                        <Container style={{ paddingBottom: 30, fontSize: 16 }}>
                            <Header as="h3">
                                Can I upload videos and GIFS?
                            </Header>

                            <p style={{ color: "grey" }}>
                                Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                                In tincidunt ornare facilisis. Aliquam laoreet sem dolor,
                                dictum mollis massa dapibus eu.
                            </p>
                        </Container>
                    </Grid.Column>
                </Grid>
            </div>
        );
    }
}

export default FAQSection;