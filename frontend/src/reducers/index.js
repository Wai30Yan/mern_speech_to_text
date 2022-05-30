import { combineReducers } from "redux";

import { speeches } from './speech'
import { authReducer } from './auth'

export default combineReducers({
    speeches,
    authReducer
})
