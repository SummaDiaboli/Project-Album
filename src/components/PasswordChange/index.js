import React, { Component } from 'react';
import { /* Grid, Header, Image, */ Message, Button, Form, Segment,  } from 'semantic-ui-react';
import * as ROUTES from '../../utils/routes'
import { Link } from 'react-router-dom'
import { withFirebase } from '../../utils/Firebase';

/* const PasswordChangePage = () => (
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
                    Change Your Password
                </Header>

                <PasswordChangeForm />
            </Grid.Column>
        </Grid>
    </div>
) */

const INITIAL_STATE = {
    passwordOne: '',
    passwordTwo: '',
    error: null,
    loading: false,
}

class PasswordChangeFormBase extends Component {
    constructor(props) {
        super(props);

        this.state = { ...INITIAL_STATE }
    }

    onSubmit = event => {
        const { passwordOne } = this.state

        this.setState({
            loading: true
        })

        this.props.firebase
            .updatePassword(passwordOne)
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
        const { passwordOne, passwordTwo, error, loading } = this.state

        const isInvalid =
            passwordOne !== passwordTwo || passwordOne === ''

        return (
            <div>
                <Form
                    size="large"
                    onSubmit={this.onSubmit}
                >
                    <Segment>
                        <Form.Input
                            fluid
                            name="passwordOne"
                            value={passwordOne}
                            onChange={this.onChange}
                            icon="lock"
                            iconPosition="left"
                            placeholder="New Password"
                        />

                        <Form.Input
                            fluid
                            name="passwordTwo"
                            value={passwordTwo}
                            onChange={this.onChange}
                            icon="lock"
                            iconPosition="left"
                            placeholder="Confirm New Password"
                        />

                        <Button
                            disabled={isInvalid}
                            color="google plus"
                            fluid
                            size="large"
                            type="submit"
                            loading={loading}
                        >
                            Change My Password
                        </Button>
                        {/* </Link> */}

                        {error && <Message>{error.message}</Message>}
                    </Segment>
                </Form>
            </div>
        );
    }
}

const PasswordChangeLink = () => (
    <Message>
        <Link to={ROUTES.PASSWORD_CHANGE}>Forgot Password?</Link>
    </Message>
)

const PasswordChangeForm = withFirebase(PasswordChangeFormBase)

// export default PasswordChangePage;
export { PasswordChangeForm, PasswordChangeLink }