import { combineReducers } from 'redux'
import { reducer as formReducer } from 'redux-form'
import { reducer as toastrReducer } from 'react-redux-toastr'
import AuthReducer from '../auth/authReducer'
import UserReducer from '../user/userReducer'

const rootReducer = combineReducers({
    auth: AuthReducer,
    toastr: toastrReducer,
    user: UserReducer,
    form: formReducer
})

export default rootReducer