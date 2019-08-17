import React, { Component } from 'react'
import { Button, Form, Grid, Header, Image, Message, Segment } from 'semantic-ui-react'
import { Link, withRouter } from "react-router-dom"
import { compose } from 'recompose';

import * as ROUTES from '../constants/routes';
import { withFirebase } from '../Firebase';

const INITIAL_STATE = {
    username: '',
    email: '',
    passwordOne: '',
    passwordTwo: '',
    error: null,
    loading: false
};

const SignUpPage = () => (
    <div>
        <Grid textAlign="center" className="login-background" style={{
            minHeight: "100vh",
            margin: 0
        }} verticalAlign="middle">
            <Grid.Column

                floated="right"
                style={{
                    paddingTop: "20vh",
                    maxWidth: 450,
                    backgroundColor: "white",
                    minheight: "100vh",
                    height: "100vh"
                }}
            >
                <Header as="h2" style={{ color: "black" }} textAlign="center">
                    <Image src={require('../assets/images/album-icon.png')} circular />
                    Sign Up to Project Album
                </Header>

                <SignUpForm />

                <Message>
                    Already have an account? <Link to={ROUTES.SIGN_IN}>Log in</Link>
                </Message>
            </Grid.Column>
        </Grid>
    </div>
)

class SignUpFormBase extends Component {
    constructor(props) {
        super(props);

        this.state = { ...INITIAL_STATE }
    }

    onSubmit = (event) => {
        const { username, email, passwordOne } = this.state

        this.setState({
            loading: true
        })

        this.props.firebase
            .createUserWithEmailAndPassword(email, passwordOne)
            .then(authUser => {
                return this.props.firebase
                    .user(authUser.user.uid)
                    .set({
                        username,
                        email
                    })
            })
            .then(() => {
                return this.props.firebase.sendEmailVerification()
            })
            .then(() => {
                this.setState({ ...INITIAL_STATE })
                this.props.history.push(ROUTES.ACCOUNT)
            })
            .catch(error => {
                this.setState({ error, loading: false })
            })

        event.preventDefault();
    }

    onChange = (event) => {
        this.setState({ [event.target.name]: event.target.value })
    }

    render() {

        const {
            username,
            email,
            passwordOne,
            passwordTwo,
            error,
            loading
        } = this.state

        const isInvalid =
            passwordOne !== passwordTwo ||
            passwordOne === '' ||
            passwordOne.length < 8 ||
            email === '' ||
            username === ''

        return (
            <div>
                <Form size="large" onSubmit={this.onSubmit}>
                    <Segment /* stacked */ >
                        <Form.Input
                            fluid
                            name="username"
                            value={username}
                            icon="address card"
                            iconPosition="left"
                            placeholder="Full Name"
                            onChange={this.onChange}
                        />

                        <Form.Input
                            fluid
                            name="email"
                            value={email}
                            icon="user"
                            iconPosition="left"
                            placeholder="E-mail Address"
                            onChange={this.onChange}
                        />

                        <Form.Input
                            fluid
                            name="passwordOne"
                            value={passwordOne}
                            icon='lock'
                            iconPosition="left"
                            placeholder="Password"
                            type="password"
                            onChange={this.onChange}
                        />

                        <Form.Input
                            fluid
                            name="passwordTwo"
                            value={passwordTwo}
                            icon='lock'
                            iconPosition='left'
                            placeholder="Confirm Password"
                            type="password"
                            onChange={this.onChange}
                        />

                        <Button
                            disabled={isInvalid}
                            color="green"
                            fluid
                            size="large"
                            type='submit'
                            loading={loading}
                        >
                            Sign up
                        </Button>

                        {error && <Message>{error.message}</Message>}
                    </Segment>
                </Form>

            </div>
        )
    }
}

const SignUpLink = () => (
    <p>
        Don't have an account? <Link to={ROUTES.SIGN_UP}>Sign up</Link>
    </p>
)

const SignUpForm = compose(
    withRouter,
    withFirebase
)(SignUpFormBase)

export default SignUpPage
export { SignUpLink, SignUpForm }
