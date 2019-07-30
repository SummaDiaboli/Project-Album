import React, { Component } from 'react';
import {
    Grid,
    Button,
    Header,
    List,
} from 'semantic-ui-react'

class PricingSection extends Component {
    render() {
        return (
            <div>
                <Header as="h2">Pricing Plans</Header>

                <p
                    style={{
                        color: "grey",
                        fontSize: 16,
                        addingBottom: 10
                    }}
                >
                    Pick an account plan that fits with number of albums
                    and pictures you want.
                </p>

                <Grid
                    // textAlign="center"
                    verticalAlign="middle"
                    stackable
                    container
                    doubling
                    celled="internally"
                >
                    <Grid.Row columns="3" textAlign="center">
                        <Grid.Column
                            style={{
                                border: "1px solid rgba(34,36,38,.15)",
                                height: "40em"
                            }}
                        >
                            <Header as="h3">
                                Starter
                            </Header>

                            <p style={{
                                color: "#8D021F",
                                fontSize: 36,
                                margin: 12,
                            }}>
                                Free
                            </p>

                            <p style={{ color: "grey", fontSize: 14 }}>
                                NEW ACCOUNTS START HERE
                            </p>

                            <p style={{
                                padding: "0 30px 20px 30px",
                                color: "#8D021F",
                                fontSize: 14
                            }}>
                                Free account forever when you create a new account
                            </p>

                            <List style={{
                                float: "left",
                                paddingLeft: 16,
                                fontSize: 16,
                            }}>
                                <List.Item style={{ paddingBottom: 16 }}>
                                    <List.Icon
                                        style={{
                                            float: "right",
                                            color: "grey",
                                            paddingLeft: 1 + 'em',
                                            paddingRight: 1 + 'em'
                                        }}
                                        name="question circle outline"
                                    />
                                    <List.Content>2 Albums</List.Content>
                                </List.Item>

                                <List.Item style={{ paddingBottom: 16 }}>
                                    <List.Icon
                                        style={{
                                            float: "right",
                                            color: "grey",
                                            paddingLeft: 1 + 'em',
                                            paddingRight: 1 + 'em'
                                        }}
                                        name="question circle outline"
                                    />
                                    <List.Content>200 Pictures</List.Content>
                                </List.Item>

                                <List.Item style={{ paddingBottom: 16 }}>
                                    <List.Icon
                                        style={{
                                            float: "right",
                                            color: "grey",
                                            paddingLeft: 8 + 'em',
                                            paddingRight: 1 + 'em'
                                        }}
                                        name="question circle outline"
                                    />
                                    <List.Content>Picture Customization</List.Content>
                                </List.Item>

                                <List.Item disabled style={{ paddingBottom: 30 }}>
                                    <List.Icon
                                        style={{
                                            float: "right",
                                            color: "grey",
                                            paddingLeft: 0 + 'em',
                                            paddingRight: 1 + 'em'
                                        }}
                                        name="question circle outline"
                                    />
                                    <List.Content>No Custom Album Frames</List.Content>
                                </List.Item>

                                <Button
                                    disabled
                                    fluid
                                    content="Subscribed"
                                    color="google plus"
                                    icon="check" />
                            </List>

                        </Grid.Column>


                        <Grid.Column
                            style={{
                                border: "1px solid rgba(34,36,38,.15)",
                                height: "40em"
                            }}
                        >
                            <Header as="h3">
                                Individual
                            </Header>

                            <p style={{
                                color: "#8D021F",
                                fontSize: 36,
                                margin: 6,
                            }}>
                                $30<span style={{ color: "grey", fontSize: 20 }}>/6mo</span>
                            </p>

                            <p style={{
                                color: "grey",
                                fontSize: 14,
                                paddingLeft: 20,
                                paddingRight: 20,
                            }}>
                                EVERY SIX MONTHS BILLED ANNUALLY
                            </p>

                            <p style={{
                                padding: "0 30px 20px 30px",
                                color: "#8D021F",
                                fontSize: 14
                            }}>
                                When you need a personal album.
                                For you and only you.
                            </p>

                            <List style={{
                                float: "left",
                                paddingLeft: 16,
                                fontSize: 16,
                            }}>
                                <List.Item style={{ paddingBottom: 16 }}>
                                    <List.Icon
                                        style={{
                                            float: "right",
                                            color: "grey",
                                            paddingLeft: 1 + 'em',
                                            paddingRight: 1 + 'em'
                                        }}
                                        name="question circle outline"
                                    />
                                    <List.Content>10 Albums</List.Content>
                                </List.Item>

                                <List.Item style={{ paddingBottom: 16 }}>
                                    <List.Icon
                                        style={{
                                            float: "right",
                                            color: "grey",
                                            paddingLeft: 1 + 'em',
                                            paddingRight: 1 + 'em'
                                        }}
                                        name="question circle outline"
                                    />
                                    <List.Content>2000 Pictures</List.Content>
                                </List.Item>

                                <List.Item style={{ paddingBottom: 16 }}>
                                    <List.Icon
                                        style={{
                                            float: "right",
                                            color: "grey",
                                            paddingLeft: 8 + 'em',
                                            paddingRight: 1 + 'em'
                                        }}
                                        name="question circle outline"
                                    />
                                    <List.Content>Picture Customization</List.Content>
                                </List.Item>

                                <List.Item style={{ paddingBottom: 30 }}>
                                    <List.Icon
                                        style={{
                                            float: "right",
                                            color: "grey",
                                            paddingLeft: 1 + 'em',
                                            paddingRight: 1 + 'em'
                                        }}
                                        name="question circle outline"
                                    />
                                    <List.Content>Custom Album Frames</List.Content>
                                </List.Item>

                                <Button
                                    fluid
                                    content="Subscribe"
                                    color="google plus"
                                    // icon={"check"}
                                    disabled={this.subscribed}
                                />
                            </List>
                        </Grid.Column>


                        <Grid.Column
                            style={{
                                border: "1px solid rgba(34,36,38,.15)",
                                height: "40em"
                            }}
                        >
                            <Header as="h3">
                                Family
                            </Header>

                            <p style={{
                                color: "#8D021F",
                                fontSize: 36,
                                margin: 6,
                            }}>
                                $100<span style={{ color: "grey", fontSize: 20 }}>/6mo</span>
                            </p>

                            <p style={{
                                color: "grey",
                                fontSize: 14,
                                paddingLeft: 20,
                                paddingRight: 20,
                            }}>
                                EVERY SIX MONTHS BILLED ANNUALLY
                            </p>

                            <p style={{
                                padding: "0 30px 20px 30px",
                                color: "#8D021F",
                                fontSize: 14
                            }}>
                                Albums for the family. Keep all the precious
                                family memories in one place.
                            </p>

                            <List style={{
                                float: "left",
                                paddingLeft: 16,
                                fontSize: 16,
                            }}>
                                <List.Item style={{ paddingBottom: 16 }}>
                                    <List.Icon
                                        style={{
                                            float: "right",
                                            color: "grey",
                                            paddingLeft: 1 + 'em',
                                            paddingRight: 1 + 'em'
                                        }}
                                        name="question circle outline"
                                    />
                                    <List.Content>Unlimited Albums</List.Content>
                                </List.Item>

                                <List.Item style={{ paddingBottom: 16 }}>
                                    <List.Icon
                                        style={{
                                            float: "right",
                                            color: "grey",
                                            paddingLeft: 1 + 'em',
                                            paddingRight: 1 + 'em'
                                        }}
                                        name="question circle outline"
                                    />
                                    <List.Content>Unlimited Pictures</List.Content>
                                </List.Item>

                                <List.Item style={{ paddingBottom: 16 }}>
                                    <List.Icon
                                        style={{
                                            float: "right",
                                            color: "grey",
                                            paddingLeft: 8 + 'em',
                                            paddingRight: 1 + 'em'
                                        }}
                                        name="question circle outline"
                                    />
                                    <List.Content>Picture Customization</List.Content>
                                </List.Item>

                                <List.Item style={{ paddingBottom: 30 }}>
                                    <List.Icon
                                        style={{
                                            float: "right",
                                            color: "grey",
                                            paddingLeft: 1 + 'em',
                                            paddingRight: 1 + 'em'
                                        }}
                                        name="question circle outline"
                                    />
                                    <List.Content>Custom Album Frames</List.Content>
                                </List.Item>

                                <Button
                                    fluid
                                    content="Subscribe"
                                    color="google plus"
                                    // icon={"check"}
                                    disabled={this.subscribed}
                                />
                            </List>
                        </Grid.Column>
                    </Grid.Row>
                </Grid>
            </div>
        )
    }
}

export default PricingSection;