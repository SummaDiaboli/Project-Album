import React, { Component } from "react"
import { Button, Form, Grid, Header, Image, Message, Segment } from 'semantic-ui-react'
import { Link, withRouter } from "react-router-dom"
import { compose } from 'recompose';

import * as ROUTES from '../constants/routes';
// import { SignUpLink } from '../SignUp'

import "./SignIn.css"

const SignInPage = () => (
    <div>
        <Grid textAlign="center" className="login-background" style={{
            height: 100 + 'vh',
            // background: "linear-gradient(300deg, rgba(210,142,142,1) 21%, rgba(203,17,17,1) 60%, rgba(247,63,63,1) 100%)",
            margin: 0
        }} verticalAlign="middle">
            <Grid.Column
                floated="right"
                style={{
                    paddingTop: "25vh",
                    maxWidth: 450,
                    backgroundColor: "white",
                    height: "100vh",
                    alignContent: "left"
                }}
                width="16"
            >
                <Header as="h2" /* color="black" */ style={{ color: "black" }} textAlign="center">
                    <Image src={require('../assets/images/album-icon.png')} circular />
                    Log in to your account
                </Header>

                <SignInForm />

                <Message>
                    New to us? <Link to={ROUTES.SIGN_UP}>Sign up</Link>
                </Message>
            </Grid.Column>
        </Grid>
    </div>
)

const INITIAL_STATE = {
    email: '',
    password: '',
    error: null,
};

class SignInFormBase extends Component {
    constructor(props) {
        super(props);

        this.state = { ...INITIAL_STATE };
    }

    onChange = (event) => {
        this.setState({ [event.target.name]: event.target.value })
    }

    render() {

        const { email, password, error } = this.state;

        const isInvalid = password === '' || email === '';

        return (
            <div>

                <Form
                    size="large"
                    onSubmit={this.onSubmit}
                >
                    <Segment stacked>
                        <Form.Input
                            fluid
                            name="email"
                            value={email}
                            onChange={this.onChange}
                            icon="user"
                            iconPosition="left"
                            placeholder="E-mail Address"
                        />
                        <Form.Input
                            fluid
                            name="password"
                            value={password}
                            onChange={this.onChange}
                            icon='lock'
                            iconPosition="left"
                            placeholder="Password"
                            type="password"
                        />
                        <Link to={ROUTES.ACCOUNT}>
                            <Button disabled={isInvalid} color="green" fluid size="large" type="submit">
                                Login
                            </Button>
                        </Link>

                        {error && <Message>{error.message}</Message>}
                    </Segment>
                </Form>


            </div >
        )
    }
}

const SignInForm = compose(
    withRouter,
)(SignInFormBase)

export default SignInPage
export { SignInForm };
