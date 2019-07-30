import React, { Component } from 'react'
import { Grid, Icon, Segment, Button, Container } from 'semantic-ui-react'
import Emoji from "../supplementary/Emoji"
import { Link } from "react-router-dom";

class Error404 extends Component {
    render() {
        return (
            <div>
                <Segment
                    style={{
                        padding: 0,
                        height: "100vh",
                        backgroundColor: "#1b1c1d",
                    }}
                    vertical
                >
                    <Grid
                        textAlign="center"
                        verticalAlign="middle"
                        style={{
                            margin: 0,
                            height: "80vh"
                        }}
                    >
                        <Grid.Column
                            width={8}
                            style={{
                                // backgroundColor: "white",
                                // maxWidth: 200
                            }}
                        >
                            <Icon bordered name="warning sign" size="massive" inverted />
                            <p style={{
                                fontSize: "2em",
                                color: "white"
                            }}>
                                Our Developers Are Working Hard To Get This Page Up And Running
                                <Emoji symbol=" 👨‍💻" />
                            </p>
                            <Container style={{ paddingTop: "30px" }}>
                                <Link to="/home">
                                    <Button inverted size="big">Return to Home</Button>
                                </Link>
                            </Container>
                        </Grid.Column>
                    </Grid>
                </Segment>
            </div>
        );
    }
}

export default Error404;