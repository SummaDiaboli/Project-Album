import { combineReducers } from 'redux'
import sessionReducer from './session';
import albumReducer from './album';

const rootReducer = combineReducers({
    sessionState: sessionReducer,
    albumState: albumReducer,
})

export default rootReducer
