import React, { Component } from 'react';
import { Grid, Message, Button, Form, Segment, Header, Image } from 'semantic-ui-react';
import * as ROUTES from '../constants/routes'
import { Link } from 'react-router-dom'
import { withFirebase } from '../Firebase';

const PasswordForgetPage = () => (
    <div>
        <Grid textAlign="center" className="login-background" style={{
            height: 100 + 'vh',
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
                <Header as="h2" style={{ color: "black" }} textAlign="center">
                    <Image src={require('../assets/images/album-icon.png')} circular />
                    Reset Your Password
                </Header>

                <PasswordForgetForm />
            </Grid.Column>
        </Grid>
    </div>
)

const INITIAL_STATE = {
    email: '',
    error: null,
    loading: false,
}

class PasswordForgetFormBase extends Component {
    constructor(props) {
        super(props);

        this.state = { ...INITIAL_STATE }
    }

    onSubmit = event => {
        const { email } = this.state

        this.setState({
            loading: true
        })

        this.props.firebase
            .resetPassword(email)
            .then(() => {
                this.setState({ ...INITIAL_STATE })
            })
            .catch(error => {
                this.setState({ error, loading: false })
            })

        event.preventDefault()
    }

    onChange = event => {
        this.setState({ [event.target.name]: event.target.value });
    }

    render() {
        const { email, error, loading } = this.state
        const isInvalid = email === ''

        return (
            <div>
                <Form
                    size="large"
                    onSubmit={this.onSubmit}
                >
                    <Segment>
                        <Form.Input
                            fluid
                            name="email"
                            value={this.state.email}
                            onChange={this.onChange}
                            icon="user"
                            iconPosition="left"
                            placeholder="E-mail Address"
                        />

                        <Button
                            disabled={isInvalid}
                            color="google plus"
                            fluid
                            size="large"
                            type="submit"
                            loading={loading}
                        >
                            Reset My Password
                        </Button>
                        
                        {error && <Message>{error.message}</Message>}
                    </Segment>
                </Form>
            </div>
        );
    }
}

const PasswordForgetLink = () => (
    <Message>
        <Link to={ROUTES.PASSWORD_FORGET}>Forgot Password?</Link>
    </Message>
)

const PasswordForgetForm = withFirebase(PasswordForgetFormBase)

export default PasswordForgetPage;
export { PasswordForgetForm, PasswordForgetLink }