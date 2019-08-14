import React, { Component } from 'react';
import {
    Loader,
    Segment,
    Header,
    Grid,
    Breadcrumb,
} from "semantic-ui-react";
import { Link } from 'react-router-dom'
import { Footer, ResponsiveContainer } from "../Navs";
import * as ROUTES from '../constants/routes'

import axios from 'axios';

class AlbumPage extends Component {
    constructor(props) {
        super(props);
        this.state = {
            album: null,
            selectedFile: null,
        }
    }

    // TODO: Replace this with a working firebase version later
    async componentDidMount() {
        const { match: { params } } = this.props
        const album = (await axios.get(`http://localhost:8081/${params.albumId}`)).data
        this.setState({
            album
        })
    }

    /* async componentDidMount() {
        const { match: { params } } = this.props
        const album = (await axios.get(`http://localhost:5001/${params.albumId}`)).data
        this.setState({
            album
        })
    } */

    /* onChangeHandler = event => {
        const selectedFile = event.target.files[0]
        this.setState({
            selectedFile,
        })
        console.log(event.target.files[0])
    } */

    /* updatePictures(value) {
        this.setState({
            selectedFile: value
        })
    }

    onClickHandler() {
        const selectedFile = this.state.selectedFile
        console.log(selectedFile)
        const data = new FormData()
        data.append('file', selectedFile)
        axios.post('http://localhost:8081/upload', data, {
            headers: { 'Authorization': `Bearer ${auth0Client.getIdToken()}` }
        }).then(res => { // then print response status
            console.log(res.statusText)
        })
    } */


    render() {
        const { album } = this.state
        if (album === null) return <Loader active inline="centered" indeterminate>Loading</Loader>
        return (
            <ResponsiveContainer style={{ minHeight: 70 }}>
                <Segment vertical style={{ minHeight: 700 }}>
                    <Segment style={{ marginLeft: 100, marginRight: 100 }}>
                        <Breadcrumb>
                            <Breadcrumb.Section link>
                                <Link to={ROUTES.ACCOUNT}>Albums</Link>
                            </Breadcrumb.Section>
                            <Breadcrumb.Divider icon="right angle" />
                            <Breadcrumb.Section active>{album.title}</Breadcrumb.Section>
                        </Breadcrumb>
                    </Segment>
                    <Grid
                        stackable
                        container
                        celled="internally"
                        style={{ minHeight: 700 }}
                    >
                        <Segment style={{ width: "100%", }}>
                            <Header as="h2">{album.title}
                                <Header.Subheader>
                                    {album.description}
                                </Header.Subheader>
                            </Header>
                            {
                                album.pictures &&
                                <div>
                                    No Pictures
                                    {/* <Input type="file" name="file" onChange={(e) => { this.updatePictures(e.target.value) }} />
                                    <Button onClick={this.onClickHandler}>Upload</Button> */}
                                </div>
                            }
                            {
                                album.pictures.map((picture, idx) => (
                                    <p key={idx}>{picture.picture}</p>
                                ))
                            }
                        </Segment>
                    </Grid>
                </Segment>
                <Footer />
            </ResponsiveContainer>
        );
    }
}

export default AlbumPage;