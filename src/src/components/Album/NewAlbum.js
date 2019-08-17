import React, { Component } from 'react';
import { withRouter, Link } from 'react-router-dom'
import {
    Form,
    Button,
    Segment,
    Breadcrumb
} from 'semantic-ui-react';
import { withAuthorization, withEmailVerification } from '../../utils/Session'
import { Footer, ResponsiveContainer } from '../Navs'

import * as ROUTES from '../../utils/routes'

import { compose } from 'recompose';
import { withFirebase } from '../../utils/Firebase';

class NewAlbumBase extends Component {
    constructor(props) {
        super(props);

        this.state = {
            disabled: false,
            title: '',
            description: '',
            authUser: JSON.parse(localStorage.getItem('authUser'))
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

    /* TODO: Replace this with a working function */

    async submit() {
        this.setState({
            disabled: true
        })

        /* await axios.post('http://localhost:8081', {
            title: this.state.title,
            description: this.state.description
        }, {
                headers: { 'Authorization': `Bearer ${auth0Client.getIdToken()}` }
            }) */

        const uid = this.state.authUser.uid
        const { title, description } = this.state
        this.props.firebase.newAlbum(uid/* , title */)
            .set({
                title,
                description,
                pictures: []
            })
            .then(() => {
                // console.log("Document successfully written")
                this.props.history.push('/account')
            })
            .catch(error => {
                console.log(error)
            })

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

const condition = authUser => !!authUser
const NewAlbumComponent = compose(
    withRouter,
    withFirebase,
    withEmailVerification,
    withAuthorization(condition),
)(NewAlbumBase)

export default (NewAlbumComponent);