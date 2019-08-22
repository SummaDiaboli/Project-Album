import React from 'react'
import { Card, Image, Embed } from 'semantic-ui-react';
// import PropTypes from 'prop-types'

function AlbumFileCard(props) {
    const file = props.url
    const extention = file.split('.').pop().split(/#|\?/g)[0]

    if (
        extention === 'gif' ||
        extention === 'jpg' ||
        extention === 'jpeg' ||
        extention === 'png' ||
        extention === 'tif' ||
        extention === 'webp') {

        return (
            <Card
                style={{
                    display: "inline-block",
                    padding: "10px",
                    margin: "1em"
                }}
                raised
            >
                <Image src={file} />
            </Card>
        )
    } else {
        return (
            <Card
                style={{
                    display: 'inline-block',
                    padding: "10px",
                    margin: "1em"
                }}
            >
                <Embed url={file} />
            </Card>
        )
    }
}

export default AlbumFileCard
