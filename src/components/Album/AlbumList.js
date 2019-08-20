import React, { Component } from 'react';
import { Link, withRouter } from 'react-router-dom'
import { Card, Placeholder, } from 'semantic-ui-react';
import { compose } from 'recompose';
import { withFirebase } from '../../utils/Firebase';
import { withAuthentication } from '../../utils/Session';

// import * as ROUTES from '../constants/routes'

class AlbumListBase extends Component {
    constructor(props) {
        super(props);

        this.state = {
            albums: null,
            loading: false,
            authUser: JSON.parse(localStorage.getItem('authUser')),
            visibility: "hidden"
        }
    }

    async componentDidMount() {
        this.setState({
            loading: true,
        })

        const uid = this.state.authUser.uid

        await this.props.firebase.albums(uid)
            .get()
            .then(querysnapshot => {
                if (!querysnapshot.empty) {
                    const albumList = querysnapshot.docs.map(key => ({
                        id: key.id,
                        ...key.data(),
                    }))

                    this.setState({
                        albums: albumList,
                        loading: false,
                    })
                } else {
                    this.setState({
                        album: null,
                        loading: false,
                        visibility: "visible"
                    })
                }
            })
            .catch(err => {
                console.log(err)
            })
    }

    createPlaceholders = () => {
        let placeholders = []

        for (let i = 0; i < 8; i++) {
            placeholders.push(
                <Card key={i} raised style={{ minHeight: 150, margin: 15 }}>
                    <Card.Content>
                        <Card.Header>
                            <Placeholder>
                                <Placeholder.Header>
                                    <Placeholder.Line length="very long" />
                                </Placeholder.Header>
                            </Placeholder>
                        </Card.Header>
                        <Card.Meta style={{ marginBottom: 15, marginTop: 10 }}>
                            <Placeholder>
                                <Placeholder.Line length="medium" />
                            </Placeholder>
                        </Card.Meta>
                        <Card.Description>
                            <Placeholder>
                                <Placeholder.Paragraph>
                                    <Placeholder.Line length="very long" />
                                    <Placeholder.Line length="long" />
                                    <Placeholder.Line length="long" />
                                    <Placeholder.Line length="long" />
                                </Placeholder.Paragraph>
                            </Placeholder>
                        </Card.Description>
                    </Card.Content>
                </Card>
            )
        }

        return placeholders
    }

    render() {
        const { albums, loading, visibility } = this.state
        return (
            <Card.Group>
                {
                    loading && this.createPlaceholders()
                }
                {
                    albums
                        ? (
                            albums.map((album, index) => (
                                <Link to={`album/${album.id}`} /* to={`/album/${album.id}`} */ key={index}>
                                    <Card color="green" style={{ margin: 10 }}>
                                        <Card.Content>
                                            <Card.Header>
                                                {album.title}
                                            </Card.Header>
                                            <Card.Meta>
                                                {album.files.length === 1
                                                    ? <div>
                                                        1 File
                                                    </div>
                                                    : <div>
                                                        {album.files.length} Files
                                                    </div>

                                                }
                                            </Card.Meta>
                                            <Card.Description>{album.description}</Card.Description>
                                        </Card.Content>
                                    </Card>
                                </Link>
                            ))
                        )
                        : (
                            <Card centered style={{ visibility: visibility }}>
                                <Card.Content>
                                    Sorry,  it seems you don't have any albums.
                                </Card.Content>
                            </Card>
                        )
                }
            </Card.Group>
        );
    }
}

const AlbumList = compose(
    withRouter,
    withFirebase,
    withAuthentication,
)(AlbumListBase)

export default AlbumList;