import React, { Component, } from 'react';
import {
    Loader,
    Segment,
    Header,
    Grid,
    Breadcrumb,
    // Placeholder,
    Message,
    Form,
    Button,
    Card,
} from "semantic-ui-react";
import { Link } from 'react-router-dom'
import { Footer, ResponsiveContainer } from "../Navs";
import * as ROUTES from '../../utils/routes'

import { compose } from 'recompose';
import { withFirebase } from '../../utils/Firebase';
import { withAuthorization, withEmailVerification } from '../../utils/Session';
import AlbumFileCard from './AlbumFileCard';

class AlbumDetailPageBase extends Component {
    constructor(props) {
        super(props);
        this.state = {
            authUser: JSON.parse(localStorage.getItem('authUser')),
            album: null,
            loading: false,
            filesSelected: false,
            isUploading: false,
            files: [],
            filenames: []
        }
    }

    componentDidMount() {
        this.getFiles()
    }

    // * Fetches the files from the firestore to "refresh"
    // * the page
    getFiles = () => {
        this.setState({ loading: true })

        const uid = this.state.authUser.uid

        this.props.firebase
            .getAlbum(uid, this.props.match.params.albumId)
            .get()
            .then(snapshot => {
                const album = snapshot.data()
                this.setState({
                    album,
                    loading: false,
                    isUploading: false,
                    files: [],
                    filenames: [],
                    filesSelected: false
                })
            })
    }

    uploadFiles = () => {
        const { filenames, files } = this.state
        const uid = this.state.authUser.uid
        const albumId = this.props.match.params.albumId

        this.setState({
            filesSelected: true
        })

        //* The code below checks the firebase firestore for instances
        //* of a file with the same filename and evaluates
        //* If true then the process will not go through
        //* If false the file will be uploaded

        filenames.forEach(async (file, index) => {
            this.setState({
                isDisabled: true
            })

            let exists = false
            await this.props.firebase
                .getAlbum(uid, albumId)
                .collection("filePaths")
                .where("path", "==", `${uid}/${albumId}/${file}`)
                .get()
                .then(snapshot => {
                    snapshot.forEach((doc) => {
                        exists = true
                        return (doc.data())
                    })
                })
                .catch(() => {
                    console.log("Entry doesn't exist")
                })

            console.log(exists)

            if (exists === false) {
                this.setState({
                    isUploading: true
                })
                await this.props.firebase
                    .uploadFile(uid, albumId, file, files[index])
                    .then((snapshot) => {
                        console.log(snapshot.ref.fullPath)
                        this.addDownloadURLToDatabase(snapshot, uid, albumId)
                        this.addPathToDatabase(uid, albumId, snapshot)
                    })
                    .catch(err => {
                        console.log(err)
                        this.setState({
                            isUploading: false,
                            isDisabled: false
                        })
                    })

            } else {
                this.setState({
                    isDisabled: false
                })
            }

            this.setState({
                isDisabled: false
            })
        })
    }

    // * Adds the full path to the file from firebase storage to
    // * a collection in the album's document to be used later
    // * for checking for duplicates
    addPathToDatabase = (uid, albumid, snapshot) => {
        this.props.firebase
            .getAlbum(uid, albumid)
            .collection("filePaths")
            .add({ path: snapshot.ref.fullPath })
            .then(() => {
                console.log("Path added to database")
            })
            .catch(err => {
                console.log("Path not added to database:", err)
            })
    }

    // * Gets the URL from the snapshot and then adds that to
    // * the album's firestore document in the files field
    addDownloadURLToDatabase = (snapshot, uid, albumid) => {
        snapshot.ref.getDownloadURL()
            .then(url => {
                this.props.firebase
                    .getAlbum(uid, albumid)
                    .update({
                        files: this.props.firebase.updateFiles(`${url}`)
                    })
                    .then(() => {
                        console.log("Upload successful")
                        this.getFiles()
                    })
                    .catch(err => {
                        console.log("Upload error:", err)
                        this.setState({
                            isUploading: false,
                            isDisabled: false
                        })
                    })
            })
            .catch(err => {
                console.log(err)
            })
    }

    // * Gets the selected files from the state
    // * and retrieves their names
    getFileNames = () => {
        const filenames = []
        Array.from(this.state.files).forEach(
            file => {
                filenames.push(file.name)
                console.log(file.name)
            }
        )
        this.setState({
            filenames
        })
    }

    fileInputRef = React.createRef()

    onFormSubmit = e => {
        e.preventDefault()
        this.uploadFiles()
    }

    // * Adds selected files to state and then gets the filenames
    fileChange = e => {
        this.setState({ files: e.target.files, filesSelected: true }, () => {
            console.log("File chosen -->", this.state.files)
            this.getFileNames()
        })
    }

    /*
    * A form that allows the user to select files
    * from their system and upload it to firebase
    */
    FilePicker = () => (
        <>
            <Form onSubmit={this.onFormSubmit}>
                <Form.Field>
                    <Button
                        // content="Choose file"
                        // labelPosition="left"
                        type="button"
                        icon="add"
                        onClick={() => this.fileInputRef.current.click()}
                        positive={this.state.files.length !== 0}
                    />
                    <input
                        multiple
                        ref={this.fileInputRef}
                        type="file"
                        hidden
                        onChange={this.fileChange}
                    />
                    <Button
                        type="submit"
                        positive
                        disabled={this.state.isDisabled}
                        loading={this.state.isUploading}
                    >
                        Upload
                    </Button>
                </Form.Field>
            </Form>
        </>
    )

    /* createPlaceholder = () => (
        <Placeholder>
            <Placeholder.Header>
                <Placeholder.Line length="very long" />
            </Placeholder.Header>
            <Placeholder.Paragraph>
                <Placeholder.Line length="very long" />
            </Placeholder.Paragraph>
            <Placeholder.Image />
        </Placeholder>
    ) */

    render() {
        const { album } = this.state
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
                            <Link to={ROUTES.ACCOUNT} style={{ color: "#21ba45" }}>
                                Albums
                            </Link>
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
                        <Segment style={{ width: "100%", overflow: "auto", whiteSpace: "no-wrap" }}>
                            <Header as="h2">
                                Title: {album.title}
                                <div style={{ float: "right" }}>
                                    <this.FilePicker />
                                </div>

                                <Header.Subheader>
                                    Description: {album.description}
                                </Header.Subheader>
                            </Header>
                            <Card.Group>
                                {
                                    album.files.length < 1
                                        ? <div>

                                            <Message style={{ width: "25em", marginTop: "2em" }}>
                                                You have no pictures or videos in this album
                                            </Message>
                                        </div>
                                        : <div>
                                            {
                                                album.files.map((file, idx) => (
                                                    < AlbumFileCard url={file} key={idx} />
                                                ))

                                            }
                                        </div>
                                }
                            </Card.Group>
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