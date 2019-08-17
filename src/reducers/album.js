const INITIAL_STATE = {
    albums: null,
    limit: 20,
}

const applySetAlbums = (state, action) => ({
    ...state,
    albums: action.albums
})

const applySetAlbum = (state, action) => ({
    ...state,
    albums: {
        ...state.albums,
        [action.uid]: action.album
    }
})

const applySetAlbumsLimit = (state, action) => ({
    ...state,
    limit: action.limit
})

function albumReducer(state = INITIAL_STATE, action) {
    switch (action.value) {
        case 'ALBUMS_SET': {
            return applySetAlbums(state, action)
        }

        case 'ALBUM_SET': {
            return applySetAlbum(state, action)
        }

        case 'ALBUM_LIMIT_SET': {
            return applySetAlbumsLimit(state, action)
        }

        default:
            return state
    }
}

export default albumReducer
