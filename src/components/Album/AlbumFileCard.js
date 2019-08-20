import React from 'react'
import { Card, Image } from 'semantic-ui-react';
// import PropTypes from 'prop-types'

function AlbumFileCard(props) {
    const image = props.url

    return (
        <Card
            style={{
                display: "inline-block",
                padding: "10px",
                margin: "1em"
            }}
            raised
        >
            <Image src={image} />
        </Card>
    )
}

export default AlbumFileCard
