import React, { Component } from 'react'
import { Button, Form, Grid, Header, Image, Message, Segment } from 'semantic-ui-react'
import { Link } from "react-router-dom"
import * as ROUTES from '../../constants/routes';


export class SignUp extends Component {
    render() {
        document.title = "Sign Up"
        return (
            <div>
                <Grid textAlign="center" className="login-background" style={{
                    height: 100 + 'vh',
                    // background: "linear-gradient(300deg, rgba(210,142,142,1) 21%, rgba(203,17,17,1) 60%, rgba(247,63,63,1) 100%)",
                    margin: 0
                }} verticalAlign="middle">
                    <Grid.Column
                        floated="right"
                        style={{
                            paddingTop: "20vh",
                            maxWidth: 450,
                            backgroundColor: "white",
                            height: "100vh"
                        }}
                    >
                        <Header as="h2" style={{ color: "black" }} textAlign="center">
                            <Image src={require('../../assets/images/album-icon.png')} circular />
                            Sign Up to Project Album
                        </Header>
                        <Form size="large">
                            <Segment stacked >
                                <Grid celled="internally">
                                    <Grid.Row stretched>
                                        <Form.Input width="8" icon="address card" iconPosition="left" placeholder="First name" />
                                        <Form.Input width="8" icon="address card" iconPosition="left" placeholder="Last name" />
                                    </Grid.Row>
                                </Grid>
                                <Form.Input fluid icon="user" iconPosition="left" placeholder="E-mail Address" />
                                <Form.Input fluid icon='lock' iconPosition="left" placeholder="Password" type="password" />
                                <Form.Input fluid icon='lock' iconPosition='left' placeholder="Confirm Password" type="password" />

                                <Link to={ROUTES.ACCOUNT} style={{ color: "black" }}>
                                    <Button color="green" fluid size="large" /* onClick={this.handleOnClick} */>
                                        Sign up
                                    </Button>
                                </Link>
                            </Segment>
                        </Form>
                        <Message>
                            Already have an account? <Link to={ROUTES.SIGN_IN}>Log in</Link>
                        </Message>
                    </Grid.Column>
                </Grid>
            </div>
        )
    }
}

export default SignUp
