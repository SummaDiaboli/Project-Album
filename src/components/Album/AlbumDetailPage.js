import React, { Component } from 'react';
import {
    Loader,
    Segment,
    Header,
    Grid,
    Breadcrumb,
    Placeholder,
} from "semantic-ui-react";
import { Link } from 'react-router-dom'
import { Footer, ResponsiveContainer } from "../Navs";
import * as ROUTES from '../../utils/routes'

import { compose } from 'recompose';
import { withFirebase } from '../../utils/Firebase';
import { withAuthorization, withEmailVerification } from '../../utils/Session';

class AlbumDetailPageBase extends Component {
    constructor(props) {
        super(props);
        this.state = {
            authUser: JSON.parse(localStorage.getItem('authUser')),
            album: null,
            selectedFile: null,
            loading: false
        }
    }

    componentDidMount() {
        this.setState({ loading: true })
        // console.log(this.props.match.params.albumId)

        const uid = this.state.authUser.uid

        this.props.firebase
            .getAlbum(uid, this.props.match.params.albumId)
            .get()
            .then(snapshot => {
                const album = snapshot.data()
                this.setState({
                    album,
                    loading: false
                })
            })
    }

    createPlaceholder = () => (
        <Placeholder>
            <Placeholder.Header>
                <Placeholder.Line length="very long" />
            </Placeholder.Header>
            <Placeholder.Paragraph>
                <Placeholder.Line length="very long" />
            </Placeholder.Paragraph>
            <Placeholder.Image />
        </Placeholder>
    )


    render() {
        const { album, loading } = this.state
        if (album === null) {
            return (
                <Grid verticalAlign="middle" textAlign="center" style={{ height: "100vh" }}>
                    <Grid.Column>
                        <Loader active inline="centered" indeterminate>
                            Please wait while your album is being prepared
                        </Loader>
                    </Grid.Column>
                </Grid>
            )
        }
        return (
            <ResponsiveContainer style={{ minHeight: 70 }}>
                <Segment vertical style={{ minHeight: 700 }}>
                    <Segment style={{ marginLeft: 100, marginRight: 100 }}>
                        <Breadcrumb>
                            {/* <Breadcrumb.Section link> */}
                            <Link to={ROUTES.ACCOUNT}>Albums</Link>
                            {/* </Breadcrumb.Section> */}
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
                                loading && this.createPlaceholder()
                            }
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

const condition = authUser => !!authUser
const AlbumDetailComponent = compose(
    withFirebase,
    withEmailVerification,
    withAuthorization(condition),
)(AlbumDetailPageBase)

export default AlbumDetailComponent;