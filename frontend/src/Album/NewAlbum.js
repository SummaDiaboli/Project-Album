import React, { Component } from 'react';
import { withRouter, Link } from 'react-router-dom'
import axios from 'axios'
import auth0Client from '../constants/Auth';
import ResponsiveContainer from '../Navs/Header';
import Footer from '../Navs/Footer';
import {
    // Grid,
    // Card,
    Form,
    Button,
    Segment,
    Breadcrumb
} from 'semantic-ui-react';
import * as ROUTES from '../constants/routes'
import { withAuthorization } from '../Session';

class NewAlbumBase extends Component {
    constructor(props) {
        super(props);

        this.state = {
            disabled: false,
            title: '',
            description: ''
        }
    }

    updateDescription(value) {
        this.setState({
            description: value
        })
    }

    updateTitle(value) {
        this.setState({
            title: value
        })
    }

    async submit() {
        this.setState({
            disabled: true
        })

        await axios.post('http://localhost:8081', {
            title: this.state.title,
            description: this.state.description
        }, {
                headers: { 'Authorization': `Bearer ${auth0Client.getIdToken()}` }
            })

        /* await axios.post('http://localhost:5001', {
            title: this.state.title,
            description: this.state.description
        }, {
                headers: { 'Authorization': `Bearer ${auth0Client.getIdToken()}` }
            }) */

        this.props.history.push('/account')
    }

    onChange = (event) => {
        this.setState({ [event.target.name]: event.target.value })
    }

    render() {
        const { title, description } = this.state
        const isInvalid =
            title === "" ||
            description === ""

        return (
            <ResponsiveContainer style={{ minHeight: 70 }}>
                <Segment vertical stacked style={{ minHeight: 700 }}>
                    {/* <Segment style={{ marginLeft: 112, marginRight: 112, minHeight: "100vh" }}> */}
                    <Segment style={{ margin: 10 }}>
                        <Breadcrumb>
                            {/* <Breadcrumb.Section href={ROUTES.ACCOUNT}> */}
                            <Link to={ROUTES.ACCOUNT}>
                                Albums
                                </Link>
                            {/* </Breadcrumb.Section> */}
                            <Breadcrumb.Divider icon="right angle" />
                            <Breadcrumb.Section active>New Album</Breadcrumb.Section>
                        </Breadcrumb>
                    </Segment>

                    <Segment style={{ margin: 10 }}>
                        <Form>
                            <Form.Input
                                label="Title:"
                                disabled={this.state.disabled}
                                type="Text"
                                value={title}
                                onChange={(e) => { this.updateTitle(e.target.value) }}
                                // onChange={this.onChange}
                                placeholder="Give your album a title"
                            />
                            <Form.Input
                                label="Description:"
                                disabled={this.state.disabled}
                                type="Text"
                                value={description}
                                onChange={(e) => { this.updateDescription(e.target.value) }}
                                // onChange={this.onChange}
                                placeholder="Give more context about your album"
                            />
                            <Button
                                primary
                                disabled={this.state.disabled || isInvalid}
                                content="Submit"
                                style={{ backgroundColor: "#21ba45," }}
                                onClick={() => { this.submit() }}
                            />
                        </Form>

                    </Segment>
                </Segment>
                {/* </Segment> */}
                <Footer />
            </ResponsiveContainer>
        );
    }
}

const NewAlbum = withRouter(NewAlbumBase)

const condition = authUser => !!authUser
export default withAuthorization(condition)(NewAlbum);