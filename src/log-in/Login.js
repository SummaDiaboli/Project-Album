import React from "react"
import { Button, Form, Grid, Header, Image, Message, Segment } from 'semantic-ui-react'
import { Link } from "react-router-dom"
import "./Login.css"

export class Login extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            redirect: false
        };
    }


    handleOnClick = () => {
        this.setState({ redirect: true });
    }

    render() {
        document.title = "Login"

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
                        <Form size="large">
                            <Segment stacked>
                                <Form.Input fluid icon="user" iconPosition="left" placeholder="E-mail Address" />
                                <Form.Input fluid icon='lock' iconPosition="left" placeholder="Password" type="password" />

                                <Link to="/home" style={{ color: "white" }}>
                                    <Button color="google plus" fluid size="large" /* onClick={this.handleOnClick} */>
                                        Login
                                    </Button>
                                </Link>
                            </Segment>
                        </Form>
                        <Message>
                            New to us? <Link to="/sign-up">Sign up</Link>
                        </Message>
                    </Grid.Column>
                </Grid>

            </div >
        )
    }
}

export default Login