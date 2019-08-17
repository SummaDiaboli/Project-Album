const INITIAL_STATE = {
    authUser: null
}

const applyAuthUser = (state, action) => ({
    ...state,
    authUser: action.authUser
})

function sessionReducer(state = INITIAL_STATE, action) {
    switch (action.type) {
        case 'AUTH_USER_SET': {
            return applyAuthUser(state, action)
        }
        default:
            return state
    }
}

export default sessionReducer