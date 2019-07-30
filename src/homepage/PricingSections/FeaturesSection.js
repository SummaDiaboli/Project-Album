import React, { Component } from 'react';
import {
    Grid,
    Button,
    Header,
} from 'semantic-ui-react'

class FeaturesSection extends Component {
    render() {
        return (
            <div>
                <Grid columns="3">
                    <Grid.Row style={{ paddingBottom: 30 }} centered>
                        <Header as="h2" style={{ paddingLeft: 16 }}>
                            All plans come with...
                        </Header>
                    </Grid.Row>


                    <Grid.Row>
                        <Grid.Column>
                            <Header as="h3">
                                Client Billing
                            </Header>

                            <p style={{ color: "grey" }}>
                                Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                                Sed vitae pharetra tortor. Duis scelerisque augue ex,
                                in ultricies turpis ultrices sed.
                            </p>
                        </Grid.Column>

                        <Grid.Column>
                            <Header as="h3">
                                Picture Templates
                            </Header>

                            <p style={{ color: "grey" }}>
                                Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                                Sed vitae pharetra tortor. Duis scelerisque augue ex,
                                in ultricies turpis ultrices sed.
                            </p>
                        </Grid.Column>

                        <Grid.Column>
                            <Header as="h3">
                                Upload Custom Fonts
                            </Header>

                            <p style={{ color: "grey" }}>
                                Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                                Sed vitae pharetra tortor. Duis scelerisque augue ex,
                                in ultricies turpis ultrices sed.
                            </p>
                        </Grid.Column>
                    </Grid.Row>

                    <Grid.Row>
                        <Grid.Column>
                            <Header as="h3">
                                Global themes
                            </Header>

                            <p style={{ color: "grey" }}>
                                Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                                Sed vitae pharetra tortor. Duis scelerisque augue ex,
                                in ultricies turpis ultrices sed.
                            </p>
                        </Grid.Column>
                    </Grid.Row>

                    <Grid.Row centered>
                        <Button color="google plus" >EXPLORE ALL FEATURES</Button>
                    </Grid.Row>
                </Grid>
            </div>
        )
    }
}

export default FeaturesSection;