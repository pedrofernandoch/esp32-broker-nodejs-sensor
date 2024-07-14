import { SET_USER_TO_INITIAL_STATE, SET_CURRENT_USER } from '../common/utils/actionTypes'

const INITIAL_STATE = {
    currentUser: {}
}

export default function userReducer(state = INITIAL_STATE, action) {
    switch (action.type) {
        case SET_CURRENT_USER:
            return { ...state, currentUser: action.currentUser }
        case SET_USER_TO_INITIAL_STATE:
            return INITIAL_STATE
        default:
            return state
    }
}