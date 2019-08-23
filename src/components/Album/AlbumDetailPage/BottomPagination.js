import React, { useState, useEffect } from 'react'
import { Pagination } from 'semantic-ui-react';

const BottomPagination = ({ handlepageChange, album, activePage }) => {
    const [totalPageNumber, setTotalPageNumber] = useState(1)
    const [showFirstAndLastNav, setShowFirstAndLastNav] = useState(true)
    const [visibility, setVisibility] = useState("visible")

    const totalPages = function () {
        if (album.length <= 15) {
            setTotalPageNumber(1)
            setShowFirstAndLastNav(false)
            // setShowPrevAndNextNav(false)
        } else {
            if ((album.length % 15) === 0) {
                setTotalPageNumber(album.length / 15)
                setShowFirstAndLastNav(true)
                // setShowPrevAndNextNav(true)
            } else {
                setTotalPageNumber((album.length / 15))
                setShowFirstAndLastNav(true)
                // setShowPrevAndNextNav(true)
            }
        }
    }

    const checkVisibility = () => {
        if (album.length === 0) {
            setVisibility('hidden')
        }
    }

    useEffect(() => {
        totalPages()
        checkVisibility()
    })

    return (
        <Pagination
            activePage={activePage}
            disabled={(album.length / 15 <= 1) ? true : false}
            style={{ visibility: visibility }}
            boundaryRange={1}
            onPageChange={handlepageChange}
            totalPages={totalPageNumber}
            firstItem={showFirstAndLastNav ? null : null}
            lastItem={showFirstAndLastNav ? null : null}
        />
    )
}

export default BottomPagination